import { NextRequest, NextResponse } from "next/server";
import { updateUserNickname } from "@/lib/firebase/firestore";

export async function POST(request: NextRequest) {
  try {
    const { email, nickname } = await request.json();
    if (!email || !nickname) {
      return NextResponse.json(
        { message: "입력 데이터가 유효하지 않습니다." },
        { status: 400 },
      );
    }
    const updatedUser = await updateUserNickname(email, nickname);
    if (!updatedUser) {
      return NextResponse.json(
        { message: "유저 닉네임을 수정하는데 실패했습니다." },
        { status: 404 },
      );
    }
    return NextResponse.json({ status: 200, data: updatedUser });
  } catch (error) {
    console.error("유저 닉네임 수정 중 오류 발생:", error);
    return NextResponse.json(
      { message: "서버 오류로 인해 유저 닉네임을 수정할 수 없습니다." },
      { status: 500 },
    );
  }
}
