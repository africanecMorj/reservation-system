import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { data } = body;

  if (!data || typeof data !== "object") {
    return NextResponse.json(
      { error: "Invalid data object" },
      { status: 400 }
    );
  }

  const client = await clientPromise;
  const db = client.db();

  await db.collection("users").updateOne(
    { email: session.user.email },
    {
      $push: {
        data: {
            $each: {
                data
            }
        },
     },
    }
  );

  return NextResponse.json({ ok: true });
}
