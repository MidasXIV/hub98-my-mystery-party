import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  // Stub: integrate with Twilio/MessageBird/etc.
  console.log("Stub SMS send:", body);
  return NextResponse.json({ ok: true }, { status: 202 });
}
