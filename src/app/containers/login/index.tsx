"use client";

import React from "react";
import Card from "@/components/ui/Card";
import { useLoginForm } from "@/hooks/useLoginForm";
import AuthLinks from "./AuthLinks";
import LoginForm from "./LoginForm";
import LoginHeader from "./LoginHeader";
import styles from "./index.module.scss";

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    passwordVisible,
    togglePasswordVisible,
    handleLogin,
  } = useLoginForm();

  return (
    <div className={styles.loginPageContainer}>
      <Card width={500} height={550} className={styles.loginCard}>
        <div className={styles.loginCardContent}>
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
