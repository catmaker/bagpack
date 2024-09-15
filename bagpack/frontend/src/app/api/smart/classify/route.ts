import { NextRequest, NextResponse } from "next/server";
import { classify } from "@/utils/axios/fetcher/smart";

export async function POST(req: NextRequest) {
  try {
    const { title } = await req.json();
    const res = await classify(title);
    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "render 서버 오류" }, { status: 500 });
  }
}
