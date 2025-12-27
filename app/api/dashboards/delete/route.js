import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(req) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({}, { status: 401 });

  const { dashboardId } = await req.json();
  const db = (await clientPromise).db();

  const res = await db.collection("dashboards").deleteOne({
    _id: new ObjectId(dashboardId),
    ownerEmail: session.user.email,
  });

  if (!res.deletedCount)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  return NextResponse.json({ ok: true });
}
