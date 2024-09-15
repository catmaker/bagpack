import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("Middleware 실행됨: ", request.nextUrl.pathname);

  // auth-status 쿠키 확인
  const authStatus = request.cookies.get("auth-status");
  console.log("인증 상태 쿠키: ", authStatus ? "존재" : "없음");

  // 보호된 경로 목록
  const protectedPaths = [
    "/home",
    "/schedule",
    "/mypage",
    "/schedule/:id",
    "/schedule/:id/modify",
    "/smart",
    "/dashboard",
    "/todo",
  ];
  console.log("보호된 경로 목록: ", protectedPaths);

  // 현재 경로가 보호된 경로인지 확인
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );
  console.log("현재 경로가 보호됨: ", isProtectedPath);

  if (!authStatus && isProtectedPath) {
    console.log(
      "인증되지 않은 사용자가 보호된 경로에 접근 시도. 로그인 페이지로 리다이렉트",
    );
    // 사용자가 인증되지 않았고 보호된 경로에 접근하려고 하면 로그인 페이지로 리다이렉트
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (authStatus && request.nextUrl.pathname === "/login") {
    console.log(
      "인증된 사용자가 로그인 페이지에 접근 시도. 홈페이지로 리다이렉트",
    );
    // 이미 인증된 사용자가 로그인 페이지에 접근하려고 하면 홈페이지로 리다이렉트
    return NextResponse.redirect(new URL("/home", request.url));
  }

  console.log("미들웨어 검사 통과. 요청을 그대로 진행");
  // 그 외의 경우 요청을 그대로 진행
  return NextResponse.next();
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: [
    "/home",
    "/schedule",
    "/mypage",
    "/login",
    "/schedule/:id",
    "/schedule/:id/modify",
    "/smart",
    "/dashboard",
    "/todo",
  ],
};

console.log("미들웨어 설정 완료. 매칭 경로: ", config.matcher);
