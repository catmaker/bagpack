import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
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
      Swal.fire({
        title: "이메일 형식이 올바르지 않습니다.",
        icon: "error",
      });
      return;
    }
    if (!passwordRegex.test(password)) {
      Swal.fire({
        title: "비밀번호는 최소 8자리 이상, 문자 및 숫자를 포함해야 합니다.",
        icon: "error",
      });
      return;
    }
    if (nickname.length < 2 || nickname.length > 10) {
      Swal.fire({
        title: "닉네임은 2자리 이상 10자리 이하이어야 합니다.",
        icon: "error",
      });
      return;
    }
    try {
      await signUp(email, password, nickname);
      Swal.fire({
        title: "회원가입이 완료되었습니다.",
        icon: "success",
      });
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

// 이 훅은 회원가입 폼을 관리합니다.
// 회원가입 폼은 이메일, 비밀번호, 닉네임, 비밀번호 표시 여부를 관리합니다.
// 회원가입 폼은 비밀번호 표시 여부를 토글합니다.
// 회원가입 폼은 회원가입을 처리합니다.
