import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";
import { computeTotal } from "@/app/lib/pricing";
import { rateLimit } from "@/app/lib/rateLimit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!rateLimit(ip, 5, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: { name: string; phone: string; date: string; session: string; room: string; players: string; note: string; addons: { id: string; qty: number }[] };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, phone, date, session, room, players, note, addons = [] } = body;

  if (!name || !phone || !date || !session) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const total = computeTotal(session, addons);

  const { error } = await supabase.from("bookings").insert({
    name: name.slice(0, 100),
    phone: phone.slice(0, 20),
    date,
    session,
    room: room || "Any",
    players: players || "1",
    note: note?.slice(0, 500) ?? "",
    addons: JSON.stringify(addons),
    total,
    status: "pending",
    created_at: new Date().toISOString(),
  });

  if (error) return NextResponse.json({ error: "Booking failed" }, { status: 500 });
  return NextResponse.json({ success: true });
}
