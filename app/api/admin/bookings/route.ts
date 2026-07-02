import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";
import crypto from "crypto";

function checkAuth(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "") ?? "";
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected) return false;
  const a = Buffer.from(token.padEnd(expected.length));
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  return NextResponse.json({ bookings: data ?? [] });
}

export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, status } = await req.json();
  const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
  if (error) return NextResponse.json({ error: "Update failed" }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  const { error } = await supabase.from("bookings").delete().eq("id", id);
  if (error) return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  return NextResponse.json({ success: true });
}
