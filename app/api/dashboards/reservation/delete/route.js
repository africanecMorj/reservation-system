import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(req) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({}, { status: 401 });

  const { dashboardId, rangeId } = await req.json();
  const db = (await clientPromise).db();

  const dashboard = await db.collection("dashboards").findOne({
    _id: new ObjectId(dashboardId),
    ownerEmail: session.user.email,
  });

  if (!dashboard)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await db.collection("dashboards").updateOne(
    { _id: dashboard._id },
    { $pull: { ranges: { _id: new ObjectId(rangeId) } } }
  );

  return NextResponse.json({ ok: true });
}
