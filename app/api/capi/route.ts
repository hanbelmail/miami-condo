// app/api/capi/route.ts
// ─────────────────────────────────────────────────────────────
// Meta Conversions API — server-side event forwarding
// Runs on Vercel Edge/Node; access token stays secret
// ─────────────────────────────────────────────────────────────
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;

function hashSHA256(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export async function POST(req: NextRequest) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return NextResponse.json({ error: "Missing CAPI config" }, { status: 500 });
  }

  const body = await req.json();
  const {
    eventName,
    eventId,
    sourceUrl,
    userEmail,
    userPhone,
    value,
    currency = "USD",
  } = body;

  // Build user_data – hash PII
  const userData: Record<string, string | string[]> = {
    client_ip_address:
      req.headers.get("x-forwarded-for")?.split(",")[0] ?? "0.0.0.0",
    client_user_agent: req.headers.get("user-agent") ?? "",
  };
  if (userEmail) userData.em = [hashSHA256(userEmail)];
  if (userPhone) userData.ph = [hashSHA256(userPhone.replace(/\D/g, ""))];

  const eventPayload: Record<string, unknown> = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_source_url: sourceUrl,
    event_id: eventId,
    action_source: "website",
    user_data: userData,
  };

  if (value !== undefined) {
    eventPayload.custom_data = { value, currency };
  }

  const capiRes = await fetch(
    `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [eventPayload] }),
    }
  );

  const result = await capiRes.json();

  if (!capiRes.ok) {
    console.error("CAPI error:", result);
    return NextResponse.json({ error: result }, { status: 500 });
  }

  return NextResponse.json({ success: true, result });
}
