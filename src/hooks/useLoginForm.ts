import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginHandler } from "@/services/auth/loginHandler";

export const useLoginForm = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisible = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const isLoggedIn = await loginHandler({ email, password });
    if (isLoggedIn) {
      router.push("/home");
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
