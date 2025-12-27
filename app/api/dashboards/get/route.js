import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { dashboardId } = await req.json();

  const db = (await clientPromise).db();
  const dashboard = await db.collection("dashboards").findOne({
    _id: new ObjectId(dashboardId),
    $or: [
      { ownerEmail: session.user.email },
      { invitedUsers: session.user.email },
    ],
  });

  if (!dashboard) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ dashboard });
}
