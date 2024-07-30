"use client";
import React, { useState } from "react";
import Card from "@/components/ui/Card";
import styles from "./LoginClient.module.scss";
import Button from "@/components/ui/Button";
import LoginInput from "@/components/ui/LoginInput";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/firebase/firestore";
import { emailRegex, passwordRegex } from "@/utils/regexPatterns";

const LoginClient = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisible = () => {
    setPasswordVisible((prev) => !prev);
  };

  const loginHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!emailRegex.test(email)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }
    if (!passwordRegex.test(password)) {
      alert("비밀번호는 최소 8자리 이상, 문자 및 숫자를 포함해야 합니다.");
      return;
    }
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
      <Card width={500} height={550} className={styles.card}>
        <div className={styles.contents}>
          <div className={styles.loginHeader}>
            <h1>Time InK</h1>
            <p>Login your account</p>
          </div>
          <form className={styles.form} onSubmit={loginHandler}>
            <div className={styles.inputBox}>
              <LoginInput
                type="text"
                placeholder="Email"
                className={styles.inputField}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Image
                className={styles.icon}
                src={"/bagpackIcon/mail.svg"}
                alt="email"
                width={20}
                height={20}
              />
            </div>
            <div className={styles.inputBox}>
              <LoginInput
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                className={styles.inputField}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Image
                className={styles.icon}
                src={"/bagpackIcon/lock.svg"}
                alt="password"
                width={20}
                height={20}
              />
              <Image
                className={styles.eyeIcon}
                src={
                  passwordVisible
                    ? "/bagpackIcon/eye-slash.svg"
                    : "/bagpackIcon/eye.svg"
                }
                alt="toggle password visibility"
                width={23}
                height={23}
                onClick={togglePasswordVisible}
              />
            </div>

            <Button
              width={370}
              backgroundColor="#F7F1F0"
              className={styles.loginButton}
            >
              로그인
            </Button>
          </form>
          <div className={styles.loginMenu}>
            <Link href={"/signup"} className={styles.signup}>
              회원가입
            </Link>
            <Link href={"/forgot"} className={styles.forgot}>
              비밀번호 찾기
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginClient;
