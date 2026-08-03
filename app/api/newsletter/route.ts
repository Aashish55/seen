import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = body.email?.trim();
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }

  // TODO: integrate a newsletter provider (e.g. Mailchimp, Buttondown) or
  // store subscribers in Sanity with a write token.
  console.log("Newsletter signup:", email);

  return NextResponse.json({ ok: true });
}
