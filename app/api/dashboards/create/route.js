import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, invitedUsers = [] } = await req.json();

  if (!name || typeof name !== "string") {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }

  const invalidEmail = invitedUsers.some(
    (email) => typeof email !== "string" || !email.includes("@")
  );

  if (invalidEmail) {
    return NextResponse.json({ error: "Invalid invitedUsers" }, { status: 400 });
  }

  const dashboard = {
    _id: new ObjectId(),
    name,
    invitedUsers,
    ownerEmail: session.user.email,
    ranges: [],
    createdAt: new Date(),
  };

  const client = await clientPromise;
  const db = client.db();

  await db.collection("dashboards").insertOne(dashboard);

  return NextResponse.json({ ok: true, dashboard });
}
