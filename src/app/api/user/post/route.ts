import { NextRequest, NextResponse } from "next/server";
import { addPost } from "@/lib/firebase/firestore";
export async function POST(request: NextRequest) {
  const { email, post, date, mood, title } = await request.json();
  const savePost = await addPost(email, post, date, mood, title);
  if (!savePost) {
    return NextResponse.json(
      { message: "포스트 저장에 실패했습니다." },
      { status: 404 },
    );
  }

  return NextResponse.json({ status: 200, data: savePost });
}
