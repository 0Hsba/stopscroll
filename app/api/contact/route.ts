import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

import { SITE_URL } from "@/lib/site";

const MAX_NAME    = 120;
const MAX_EMAIL   = 254;
const MAX_MESSAGE = 3000;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isOriginAllowed(origin: string | null, host: string | null): boolean {
  if (!origin) return true;
  try {
    const url = new URL(origin);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL;
    const allowed = new URL(siteUrl);
    if (url.hostname === allowed.hostname) return true;
    if (url.hostname === "localhost" || url.hostname === "127.0.0.1") return true;
    if (host && url.hostname === host.split(":")[0]) return true;
    return false;
  } catch {
    return false;
  }
}

function getClientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() ?? "unknown";
  return req.headers.get("x-real-ip")?.trim() ?? "unknown";
}

// Simple in-memory rate limit (per IP, max 5 messages per 10 min)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return false;
  }
  if (entry.count >= 5) return true;
  entry.count++;
  return false;
}

function buildContactEmailHtml(name: string, email: string, message: string): string {
  const safeMessage = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>");
  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><title>Message StopScroll</title></head>
<body style="font-family:'Segoe UI',Arial,sans-serif;background:#f2f3f5;margin:0;padding:24px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08)">
    <div style="background:#E86B00;padding:24px 32px">
      <h1 style="margin:0;color:#fff;font-size:20px;font-weight:700">Nouveau message — StopScroll</h1>
    </div>
    <div style="padding:28px 32px">
      <table style="width:100%;border-collapse:collapse">
        <tr>
          <td style="padding:8px 0;font-size:13px;font-weight:600;color:#64748b;width:100px">Nom</td>
          <td style="padding:8px 0;font-size:15px;color:#0f172a">${name.replace(/&/g,"&amp;").replace(/</g,"&lt;")}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-size:13px;font-weight:600;color:#64748b">Email</td>
          <td style="padding:8px 0;font-size:15px;color:#E86B00"><a href="mailto:${email}" style="color:#E86B00">${email}</a></td>
        </tr>
      </table>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0">
      <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.06em">Message</p>
      <div style="background:#f8fafc;border-radius:8px;padding:16px;font-size:15px;color:#1e293b;line-height:1.6">${safeMessage}</div>
    </div>
    <div style="background:#f8fafc;padding:16px 32px;font-size:12px;color:#94a3b8;border-top:1px solid #e2e8f0">
      Envoyé depuis stop-scroll.com
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  // CSRF check
  const origin = request.headers.get("origin");
  const host   = request.headers.get("host");
  if (!isOriginAllowed(origin, host)) {
    return NextResponse.json({ ok: false, error: "FORBIDDEN" }, { status: 403 });
  }

  // Content-Type
  const ct = request.headers.get("content-type") ?? "";
  if (!ct.includes("application/json")) {
    return NextResponse.json({ ok: false, error: "UNSUPPORTED_MEDIA_TYPE" }, { status: 415 });
  }

  // Rate limit
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "RATE_LIMITED" }, { status: 429 });
  }

  // Parse body
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "INVALID_JSON" }, { status: 400 });
  }

  // Honeypot
  const honeypot = typeof body.website === "string" ? body.website : "";
  if (honeypot.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Extract fields
  const name    = (typeof body.name    === "string" ? body.name.trim().slice(0, MAX_NAME)    : "");
  const email   = (typeof body.email   === "string" ? body.email.trim().slice(0, MAX_EMAIL)  : "");
  const message = (typeof body.message === "string" ? body.message.trim().slice(0, MAX_MESSAGE) : "");

  // Validate
  if (!name || !email || !emailRegex.test(email) || !message) {
    return NextResponse.json({ ok: false, error: "VALIDATION_FAILED" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to     = process.env.RESEND_TO;
  const from   = process.env.RESEND_FROM?.trim() ||
    (process.env.RESEND_FALLBACK_SENDER ?? "onboarding@resend.dev").trim();

  if (!apiKey?.trim() || !to?.trim()) {
    return NextResponse.json({ ok: false, error: "EMAIL_NOT_CONFIGURED" }, { status: 503 });
  }

  const resend  = new Resend(apiKey);
  const subject = `Message StopScroll — ${name}`;
  const html    = buildContactEmailHtml(name, email, message);

  const { error } = await resend.emails.send({ from, to: [to.trim()], subject, html, replyTo: email });

  if (error) {
    console.error("[api/contact] Resend error:", error);
    return NextResponse.json({ ok: false, error: "SEND_FAILED" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
