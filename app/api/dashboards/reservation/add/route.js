import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({}, { status: 401 });

  const { dashboardId, from, to } = await req.json();

  const db = (await clientPromise).db();
  const dashboard = await db.collection("dashboards").findOne({
    _id: new ObjectId(dashboardId),
  });

  if (!dashboard)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  const email = session.user.email;
  const isOwner = dashboard.ownerEmail === email;
  const isInvited = dashboard.invitedUsers.includes(email);

  if (!isOwner && !isInvited)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const newFrom = new Date(from);
  const newTo = new Date(to);

  const overlap = dashboard.ranges?.some(r =>
    newFrom <= r.to && newTo >= r.from
  );

  if (overlap && !isOwner) {
    return NextResponse.json(
      { error: "Range occupied" },
      { status: 403 }
    );
  }

  const range = {
    _id: new ObjectId(),
    from: newFrom,
    to: newTo,
    createdBy: email,
  };

  await db.collection("dashboards").updateOne(
    { _id: dashboard._id },
    { $push: { ranges: range } }
  );

  return NextResponse.json({ ok: true, range });
}
