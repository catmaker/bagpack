"use client";

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/provider/UserProvider";
import { loginHandler } from "@/services/auth/loginHandler";

export const useLoginForm = () => {
  const user = useContext(UserContext);
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisible = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (process.env.NODE_ENV === "development") {
      console.log("로그인 시도");
    }

    const isLoggedIn = await loginHandler({ email, password });
    if (process.env.NODE_ENV === "development") {
      console.log("로그인 결과:", isLoggedIn);
    }
    if (isLoggedIn) {
      if (process.env.NODE_ENV === "development") {
        console.log("홈으로 리다이렉트");
        console.log("현재 사용자 상태:", user);
      }
    } else {
      console.log("로그인 실패: useLoginForm");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    passwordVisible,
    togglePasswordVisible,
    handleLogin,
  };
};
