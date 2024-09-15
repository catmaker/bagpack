/* eslint-disable camelcase */
// /* eslint-disable @typescript-eslint/camelcase */

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { text, predicted_category } = body;

  // 여기에서 피드백을 처리하고 AI 모델을 업데이트하는 로직을 구현해야 합니다.
  // 예를 들어, 데이터베이스에 피드백을 저장하거나 AI 모델을 재학습시키는 등의 작업을 수행할 수 있습니다.

  console.log("Received feedback:", { text, predicted_category });

  // 실제 구현에서는 이 부분을 적절히 수정해야 합니다.
  return NextResponse.json({ success: true });
}
