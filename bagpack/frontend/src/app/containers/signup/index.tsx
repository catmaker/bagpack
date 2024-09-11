"use client";

import React from "react";
import { useSignUpForm } from "@/hooks/useSignUpForm";
import SignUpFooter from "./SignUpFooter";
import SignUpForm from "./SignUpForm";
import SignUpHeader from "./SignUpHeader";
import styles from "./index.module.scss";

const SignUpClient = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    nickname,
    setNickname,
    passwordVisible,
    togglePasswordVisible,
    registerHandler,
  } = useSignUpForm();

  return (
    <div className={styles.signUpPageContainer}>
      <div className={styles.signUpCard}>
        <SignUpHeader />
        <SignUpForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          passwordVisible={passwordVisible}
          togglePasswordVisible={togglePasswordVisible}
          registerHandler={registerHandler}
          nickname={nickname}
          setNickname={setNickname}
        />
        <SignUpFooter />
      </div>
    </div>
  );
};

export default SignUpClient;
