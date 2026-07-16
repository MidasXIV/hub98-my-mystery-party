import { NextResponse } from "next/server";

type SendRequestBody = {
  type: "email" | "sms";
  url?: string;
  [k: string]: unknown;
};

async function handleEmail(body: SendRequestBody) {
  // Replace this stub with real email provider integration (SendGrid, Mailgun, etc.)
  console.log("Stub email send:", body);
  return NextResponse.json({ ok: true }, { status: 202 });
}

async function handleSms(body: SendRequestBody) {
  // Replace this stub with real SMS provider integration (Twilio, MessageBird, etc.)
  console.log("Stub SMS send:", body);
  return NextResponse.json({ ok: true }, { status: 202 });
}

export async function POST(req: Request) {
  let body: SendRequestBody;
  try {
    body = (await req.json()) as SendRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const t = body?.type;
  if (t !== "email" && t !== "sms") {
    return NextResponse.json({ error: "Missing or invalid 'type' (email|sms)" }, { status: 400 });
  }

  try {
    if (t === "email") return await handleEmail(body);
    return await handleSms(body);
  } catch (err) {
    console.error("Invite send failed", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
