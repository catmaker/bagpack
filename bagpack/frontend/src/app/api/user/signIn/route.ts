import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/lib/firebase/auth";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const user = await signIn(email, password);
  if (!user) {
    return NextResponse.json(
      { message: "이메일 혹은 비밀번호가 일치하지 않습니다." },
      { status: 404 },
    );
  }

  return NextResponse.json({ status: 200, data: user });
}
