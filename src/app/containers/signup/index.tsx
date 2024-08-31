"use client";

import React from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import InputWithIcon from "@/components/ui/InputWithIcon";
import { useSignUpForm } from "@/hooks/useSignUpForm";
import SignUpFooter from "./SignUpFooter";
import SignUpHeader from "./SignUpHeader";
import { Mail, Lock, Eye, EyeSlash, User } from "../../../../public/svg";
import styles from "./index.module.scss";

const svgColor = "#FE9A8A";

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
    <div className={styles.container}>
      <Card width={500} height={550} className={styles.card}>
        <div className={styles.contents}>
          <SignUpHeader />
          <form className={styles.form} onSubmit={registerHandler}>
            <InputWithIcon
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={
                <Mail
                  className={styles.icon}
                  alt="email"
                  width={20}
                  height={20}
                  fill={svgColor}
                />
              }
            />
            <InputWithIcon
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={
                <Lock
                  className={styles.icon}
                  alt="password"
                  width={20}
                  height={20}
                  fill={svgColor}
                />
              }
              rightIcon={
                passwordVisible ? (
                  <Eye
                    width={23}
                    height={23}
                    alt="toggle password visibility"
                    className={styles.eyeIcon}
                    onClick={togglePasswordVisible}
                    fill={svgColor}
                  />
                ) : (
                  <EyeSlash
                    width={23}
                    height={23}
                    alt="toggle password visibility"
                    className={styles.eyeIcon}
                    onClick={togglePasswordVisible}
                    fill={svgColor}
                  />
                )
              }
            />
            <InputWithIcon
              type="text"
              placeholder="Nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              icon={
                <User
                  className={styles.icon}
                  alt="nickname"
                  width={20}
                  height={20}
                  fill={svgColor}
                />
              }
            />
            <Button
              width={370}
              backgroundColor="#F7F1F0"
              className={styles.signUp}
              borderRadius={15}
              height={50}
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
            >
              회원가입
            </Button>
          </form>
          <SignUpFooter />
        </div>
      </Card>
    </div>
  );
};

export default SignUpClient;
