import { NextRequest, NextResponse } from "next/server";
import { signUp, signIn } from "@/lib/firebase/firestore";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const user = await signIn(email, password);

  const response = {
    status: 200,
    data: user,
  };
  return NextResponse.json(response, { status: response.status });
}
