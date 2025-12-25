import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password, name } = await req.json();

  const client = await clientPromise;
  const db = client.db();

  const exists = await db.collection("users").findOne({ email });
  if (exists) {
    return NextResponse.json({ error: "User exists" }, { status: 400 });
  }

  const hash = await bcrypt.hash(password, 10);

  await db.collection("users").insertOne({
    email,
    password: hash,
    name,
    role: "user",
    emailVerified: null,
    createdAt: new Date(),
    data:[]
  });

  return NextResponse.json({ ok: true });
}
