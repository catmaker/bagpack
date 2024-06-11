import { NextRequest, NextResponse } from "next/server";
import { signUp } from "@/lib/firebase/firestore";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const user = await signUp(email, password);

  if (!user) {
    return NextResponse.json(
      { message: "데이터가 비어있습니다." },
      { status: 404 },
    );
  }

  return NextResponse.json({ status: 200, data: user });
}
