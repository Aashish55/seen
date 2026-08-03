import { NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !message || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Name, a valid email, and a message are required" },
      { status: 400 }
    );
  }

  // TODO: forward via an email provider (e.g. Resend, SendGrid) or persist to
  // Sanity with a write token.
  console.log("Contact form submission:", { name, email, subject: body.subject });

  return NextResponse.json({ ok: true });
}
