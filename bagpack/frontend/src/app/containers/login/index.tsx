"use client";

import React from "react";
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
      <div className={styles.loginCard}>
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
    </div>
  );
};

export default Login;
