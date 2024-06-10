import { NextRequest, NextResponse } from "next/server";
import { saveUser } from "@/lib/firebase/firestore";

export async function POST(request: NextRequest) {
  const body = await request.body.json();
  const { id, email, password } = body;
  await saveUser({ id, email, password });
  return NextResponse.json(
    { message: "User saved successfully" },
    { status: 200 },
  );
}
