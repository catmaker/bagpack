import { emailRegex, passwordRegex } from "@/utils/regexPatterns";

// Props 인터페이스 정의
interface Props {
  email: string;
  password: string;
}

export const loginHandler = async ({ email, password }: Props) => {
  // 이메일 형식 검사
  if (!emailRegex.test(email)) {
    alert("이메일 형식이 올바르지 않습니다.");
    return false;
  }

  // 비밀번호 형식 검사
  if (!passwordRegex.test(password)) {
    alert("비밀번호는 최소 8자리 이상, 문자 및 숫자를 포함해야 합니다.");
    return false;
  }

  try {
    // 동적 임포트
    const [{ setCookie }, { signIn }] = await Promise.all([
      import("cookies-next"),
      import("@/lib/firebase/auth"),
    ]);

    const response = await signIn(email, password);
    if (response) {
      // 로그인 성공 시 쿠키 설정
      setCookie("auth-status", "true", {
        maxAge: 60 * 60 * 24 * 7, // 7일 유효
        path: "/",
        secure: process.env.NODE_ENV === "production", // HTTPS에서만 전송 (프로덕션 환경)
        sameSite: "strict", // CSRF 방지
      });
      console.log("로그인 성공 쿠키 설정 완료");
      alert("로그인이 완료되었습니다.");
      window.location.href = "/home";
      return true;
    }
    alert(
      "로그인에 실패하였습니다. 존재하지 않는 계정이거나 비밀번호가 틀렸습니다.",
    );
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
