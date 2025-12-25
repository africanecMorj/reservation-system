import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({}, { status: 401 });

  const { password } = await req.json();

  const hash = await bcrypt.hash(password, 10);
  const client = await clientPromise;
  const db = client.db();

  await db.collection("users").updateOne(
    { email: session.user.email },
    { $set: { password: hash } }
  );

  return NextResponse.json({ ok: true });
}
