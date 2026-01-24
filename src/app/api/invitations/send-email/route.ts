import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  // Stub: integrate with SendGrid/Mailgun/etc.
  console.log("Stub email send:", body);
  return NextResponse.json({ ok: true }, { status: 202 });
}
