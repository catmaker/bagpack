import { NextRequest, NextResponse } from "next/server";
import { getUsers } from "@/lib/firebase/firestore";

export async function GET(request: NextRequest) {
  const fetchedUsers = await getUsers();
  const response = {
    data: fetchedUsers,
  };
  return NextResponse.json(response, { status: 200 });
}
