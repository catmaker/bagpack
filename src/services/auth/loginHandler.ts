import { signIn } from "@/lib/firebase/firestore";
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
    const response = await signIn(email, password);
    if (response) {
      alert("로그인이 완료되었습니다.");
      return true;
    } else {
      alert(
        "로그인에 실패하였습니다. 존재하지 않는 계정이거나 비밀번호가 틀렸습니다.",
      );
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
