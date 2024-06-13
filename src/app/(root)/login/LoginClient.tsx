"use client";
import React, { useState } from "react";
import Card from "@/components/ui/Card";
import styles from "./LoginClient.module.scss";
import Button from "@/components/ui/Button";
import LoginInput from "@/components/ui/LoginInput";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "firebase/auth";
import { signIn } from "@/lib/firebase/firestore";
const LoginClient = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };
  const loginHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await signIn(email, password);
      if (response) {
        console.log("로그인 성공", response);
        alert("로그인이 완료되었습니다.");
        router.push("/home");
      } else {
        console.log("로그인 실패");
        alert(
          `로그인에 실패하였습니다.
존재하지 않는 계정이거나 비밀번호가 틀렸습니다.`,
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.contents}>
          <div className={styles.login_header}>
            <h1>Login</h1>
            <p>Login to your account</p>
          </div>
          <form className={styles.form} onSubmit={loginHandler}>
            <div className={styles.input_box}>
              <LoginInput
                type="text"
                placeholder="Email"
                className={styles.email_input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Image
                className={styles.icon}
                src={"/bagpackIcon/user.svg"}
                alt="email"
                width={20}
                height={20}
              />
            </div>
            <div className={styles.input_box}>
              <LoginInput
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                className={styles.email_input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Image
                className={styles.icon}
                src={"/bagpackIcon/lock.svg"}
                alt="email"
                width={20}
                height={20}
              />
              <Image
                className={styles.eye_icon}
                src={
                  passwordVisible
                    ? "/bagpackIcon/eye-slash.svg"
                    : "/bagpackIcon/eye.svg"
                }
                alt="password_hide"
                width={23}
                height={23}
                onClick={togglePasswordVisible}
              />
            </div>

            <Button backgroundColor="#F7F1F0" className={styles.login_button}>
              로그인
            </Button>
          </form>
          <Link href={"/"} className={styles.sns_login}>
            소셜로그인
          </Link>
          <Link href={"/forgot"} className={styles.forgot}>
            아이디 혹은 비밀번호를 잊으셨나요?
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginClient;
