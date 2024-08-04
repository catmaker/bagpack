"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Card from "@/components/ui/Card";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import AuthLinks from "./AuthLinks";

import styles from "./index.module.scss";

import { loginHandler } from "@/services/auth/loginHandler";

const Login = () => {
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

  return (
    <div className={styles.container}>
      <Card width={500} height={550} className={styles.card}>
        <div className={styles.contents}>
          <LoginHeader />
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            passwordVisible={passwordVisible}
            togglePasswordVisible={togglePasswordVisible}
            handleLogin={handleLogin}
          />
          <AuthLinks />
        </div>
      </Card>
    </div>
  );
};

export default Login;
