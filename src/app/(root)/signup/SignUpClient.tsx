"use client";
import React, { useState } from "react";
import Card from "@/components/ui/Card";
import styles from "./SignUpClient.module.scss";
import Button from "@/components/ui/Button";
import LoginInput from "@/components/ui/LoginInput";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";
type saveUserProps = {
  id: string;
  email: string;
  password: string;
};
const SignUpClient = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div>
      <div className={styles.container}>
        <Card height={570}>
          <div className={styles.contents}>
            <div className={styles.login_header}>
              <h1>Register</h1>
              <p>Create your new account</p>
            </div>
            <form className={styles.form}>
              <div className={styles.input_box}>
                <LoginInput
                  type="text"
                  placeholder="ID"
                  className={styles.input}
                  value={id}
                  onChange={(e) => setId(e.target.value)}
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
                  type="text"
                  placeholder="Email"
                  className={styles.input}
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
              <div className={styles.input_box}>
                <LoginInput
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  className={styles.input}
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
              소셜 로그인
            </Link>
            <Link href={"/forgot"} className={styles.forgot}>
              아이디 혹은 비밀번호를 잊으셨나요?
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignUpClient;
