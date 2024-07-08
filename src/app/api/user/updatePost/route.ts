import { NextRequest, NextResponse } from "next/server";
import { updatePost } from "@/lib/firebase/firestore";
export async function POST(request: NextRequest) {
  const { email, id, post, date, mood, title } = await request.json();
  const updatedPost = await updatePost(email, id, post, date, title, mood);
  if (!updatedPost) {
    return NextResponse.json(
      { message: "포스트를 수정하는데 실패했습니다." },
      { status: 404 },
    );
  }

  return NextResponse.json({ status: 200, data: updatedPost });
}
