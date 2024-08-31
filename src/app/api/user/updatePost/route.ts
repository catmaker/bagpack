import { NextRequest, NextResponse } from "next/server";
import { updatePost } from "@/lib/firebase/firestore";

export async function POST(request: NextRequest) {
  try {
    const { email, post, startDate, endDate, mood, title, id } =
      await request.json();
    // 입력 데이터 검증 로직 추가 (예시)
    if (!email || !post || !startDate || !endDate || !mood || !title || !id) {
      return NextResponse.json(
        { message: "입력 데이터가 유효하지 않습니다." },
        { status: 400 },
      );
    }
    const updatedPost = await updatePost(
      email,
      post,
      startDate,
      endDate,
      mood,
      title,
      id,
    );
    console.log(
      `updatedPost: ${email}, ${post}, ${startDate}, ${endDate}, ${mood}, ${title}, ${id}`,
    );
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
