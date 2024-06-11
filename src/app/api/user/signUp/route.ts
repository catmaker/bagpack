import { NextRequest, NextResponse } from "next/server";
import { signUp } from "@/lib/firebase/firestore";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const user = await signUp(email, password);

  const response = {
    status: 200,
    data: user,
  };
  return NextResponse.json(response, { status: response.status });
}
