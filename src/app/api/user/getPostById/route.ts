import { NextRequest, NextResponse } from "next/server";
import { getPostById } from "@/lib/firebase/firestore";
export async function POST(request: NextRequest) {
  const { id } = await request.json();
  console.log("getPostById api 요청:", id);
  const post = await getPostById(id);
  if (!post) {
    return NextResponse.json(
      { message: "포스트를 가져오는데 실패했습니다." },
      { status: 404 },
    );
  }

  return NextResponse.json({ status: 200, data: post });
}
