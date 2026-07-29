import { NextRequest, NextResponse } from "next/server";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || "",
  key: process.env.PUSHER_KEY || "",
  secret: process.env.PUSHER_SECRET || "",
  cluster: process.env.PUSHER_CLUSTER || "ap1",
  useTLS: true,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    await pusher.trigger("patient-channel", "patient-update", body);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Pusher trigger error", error);
    return NextResponse.json({ error: "Failed to publish update" }, { status: 500 });
  }
}
