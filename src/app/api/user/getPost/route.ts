import { NextRequest, NextResponse } from "next/server";
import { getPosts } from "@/lib/firebase/firestore";
export async function POST(request: NextRequest) {
  const { email } = await request.json();
  const posts = await getPosts(email);
  if (!posts) {
    return NextResponse.json(
      { message: "포스트를 가져오는데 실패했습니다." },
      { status: 404 },
    );
  }

  return NextResponse.json({ status: 200, data: posts });
}
