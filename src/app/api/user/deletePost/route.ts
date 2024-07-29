import { NextRequest, NextResponse } from "next/server";
import { deletePost } from "@/lib/firebase/firestore";

export async function POST(request: NextRequest) {
  const { email, id } = await request.json();
  const deletedPost = await deletePost(email, id);
  if (!deletedPost) {
    return NextResponse.json(
      { message: "포스트를 삭제하는데 실패했습니다." },
      { status: 404 },
    );
  }

  return NextResponse.json({ status: 200, data: deletedPost });
}
