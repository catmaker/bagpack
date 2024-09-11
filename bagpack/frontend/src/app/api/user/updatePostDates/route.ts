import { NextRequest, NextResponse } from "next/server";
import { updatePostDates } from "@/lib/firebase/firestore";

export async function POST(request: NextRequest) {
  try {
    const { id, email, startDate, endDate } = await request.json();
    if (!email || !startDate || !endDate) {
      return NextResponse.json(
        { message: "입력 데이터가 유효하지 않습니다." },
        { status: 400 },
      );
    }
    const updatedPost = await updatePostDates(email, id, startDate, endDate);
    console.log(`updatedPost: ${id}, ${email}, ${startDate}, ${endDate}`);
    if (!updatedPost) {
      return NextResponse.json(
        { message: "포스트를 수정하는데 실패했습니다." },
        { status: 404 },
      );
    }
    return NextResponse.json({ status: 200, data: updatedPost });
  } catch (error) {
    console.error("포스트 업데이트 중 오류 발생:", error);
    return NextResponse.json(
      { message: "서버 오류로 인해 포스트를 수정할 수 없습니다." },
      { status: 500 },
    );
  }
}
