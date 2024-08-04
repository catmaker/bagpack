import React from "react";
import LoginInput from "@/components/ui/LoginInput";
import styles from "./LoginForm.module.scss";
import Image from "next/image";
import Button from "@/components/ui/Button";

interface Props {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  passwordVisible: boolean;
  togglePasswordVisible: () => void;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm: React.FC<Props> = ({
  email,
  setEmail,
  password,
  setPassword,
  passwordVisible,
  togglePasswordVisible,
  handleLogin,
}) => {
  return (
    <form className={styles.form} onSubmit={handleLogin}>
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
  );
};

export default LoginForm;
