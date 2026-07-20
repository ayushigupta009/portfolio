import { Resend } from "resend";
import { siteConfig } from "@/config/site";

/**
 * Contact form endpoint. Runs server-side, so the API key never reaches the
 * browser. Delivers to the site owner's inbox with Reply-To set to the sender,
 * so replying from the mail client goes straight back to them.
 */

const MAX_PER_WINDOW = 3;
const WINDOW_MS = 10 * 60 * 1000;

/**
 * Best-effort rate limit. In-memory, so it resets on redeploy and is per
 * serverless instance — enough to blunt casual spam, not a security control.
 */
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.set(ip, [...recent, now]);
  return recent.length >= MAX_PER_WINDOW;
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return Response.json(
      { error: "Email is not configured." },
      { status: 500 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a real person never fills a field they cannot see. Report success
  // so the bot has nothing to learn from.
  if (typeof body.company === "string" && body.company.trim()) {
    return Response.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !message || !isEmail(email)) {
    return Response.json(
      { error: "Please fill in your name, a valid email, and a message." },
      { status: 400 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (rateLimited(ip)) {
    return Response.json(
      { error: "Too many messages just now — please try again later." },
      { status: 429 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      // Resend's shared sender. Swap for an address on your own domain once
      // one is verified, so replies and deliverability look first-party.
      from: `${siteConfig.name} Portfolio <onboarding@resend.dev>`,
      to: siteConfig.email,
      replyTo: email,
      subject: subject || `New message from ${name}`,
      text: [
        `From: ${name} <${email}>`,
        subject && `Subject: ${subject}`,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      console.error("Resend rejected the message:", error);
      return Response.json(
        { error: "Could not send right now. Please try again." },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact send failed:", err);
    return Response.json(
      { error: "Could not send right now. Please try again." },
      { status: 500 },
    );
  }
}
