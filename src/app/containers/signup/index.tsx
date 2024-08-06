"use client";
import React, { useState } from "react";
import Card from "@/components/ui/Card";
import styles from "./index.module.scss";
import Button from "@/components/ui/Button";
import LoginInput from "@/components/ui/LoginInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { emailRegex, passwordRegex } from "@/utils/regexPatterns";
import { Mail, Lock, Eye, EyeSlash, User } from "../../../../public/svg";
const SignUpClient = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const svgColor = "#FE9A8A";
  const togglePasswordVisible = () => {
    setPasswordVisible((prev) => !prev);
  };

  const registerHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!emailRegex.test(email)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }
    if (!passwordRegex.test(password)) {
      alert("비밀번호는 최소 8자리 이상, 문자 및 숫자를 포함해야 합니다.");
      return;
    }
    if (nickname.length < 2) {
      alert("닉네임은 2자리 이상이어야 합니다.");
      return;
    }
    if (nickname.length > 10) {
      alert("닉네임은 10자리 이하이어야 합니다.");
      return;
    }
    try {
      const response = await fetch("/api/user/signUp", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          nickname,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        alert("이미 존재하는 이메일입니다.");
        throw new Error("signUp return 데이터가 비어있습니다.");
      }

      const data = await response.json();
      console.log(data);
      alert("회원가입이 완료되었습니다.");
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <Card width={500} height={550} className={styles.card}>
          <div className={styles.contents}>
            <div className={styles.loginHeader}>
              <h1>Time InK</h1>
              <p>Create your new account</p>
            </div>
            <form className={styles.form} onSubmit={registerHandler}>
              <div className={styles.inputBox}>
                <LoginInput
                  type="text"
                  placeholder="Email"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail
                  className={styles.icon}
                  alt="email"
                  width={20}
                  height={20}
                  fill={svgColor}
                />
              </div>
              <div className={styles.inputBox}>
                <LoginInput
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  className={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock
                  className={styles.icon}
                  alt="password"
                  width={20}
                  height={20}
                  fill={svgColor}
                />
                {passwordVisible ? (
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
                )}
              </div>
              <div className={styles.inputBox}>
                <LoginInput
                  type="text"
                  placeholder="Nickname"
                  className={styles.input}
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
                <User
                  className={styles.icon}
                  alt="nickname"
                  width={20}
                  height={20}
                  fill={svgColor}
                />
              </div>
              <Button
                width={370}
                backgroundColor="#F7F1F0"
                className={styles.signUp}
              >
                회원가입
              </Button>
            </form>
            <div className={styles.signUpMenu}>
              <Link href={"/login"} className={styles.login}>
                로그인
              </Link>
              <Link href={"/forgot"} className={styles.forgot}>
                비밀번호찾기
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignUpClient;
