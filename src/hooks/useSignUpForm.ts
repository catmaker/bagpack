import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/utils/axios/fetcher/signup";
import { emailRegex, passwordRegex } from "@/utils/regexPatterns";

export const useSignUpForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisible = () => {
    setPasswordVisible((prev) => !prev);
  };

  const registerHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!emailRegex.test(email)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }
    if (!passwordRegex.test(password)) {
      alert("비밀번호는 최소 8자리 이상, 문자 및 숫자를 포함해야 합니다.");
      return;
    }
    if (nickname.length < 2 || nickname.length > 10) {
      alert("닉네임은 2자리 이상 10자리 이하이어야 합니다.");
      return;
    }
    try {
      await signUp(email, password, nickname);
      alert("회원가입이 완료되었습니다.");
      router.push("/login");
    } catch (error) {
      console.error("회원가입 중 에러 발생:", error);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    nickname,
    setNickname,
    passwordVisible,
    togglePasswordVisible,
    registerHandler,
  };
};
