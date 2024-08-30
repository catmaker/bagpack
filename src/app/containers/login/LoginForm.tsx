import React from "react";
import Button from "@/components/ui/Button";
import LoginInput from "@/components/ui/LoginInput";
import { Mail, Lock, Eye, EyeSlash } from "../../../../public/svg";
import styles from "./LoginForm.module.scss";

interface LoginFormProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  passwordVisible: boolean;
  togglePasswordVisible: () => void;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
}

const svgColor = "#FE9A8A";

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  passwordVisible,
  togglePasswordVisible,
  handleLogin,
}) => {
  return (
    <form className={styles.loginForm} onSubmit={handleLogin}>
      <div className={styles.inputContainer}>
        <LoginInput
          type="text"
          placeholder="Email"
          className={styles.inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Mail
          className={styles.inputIcon}
          fill={svgColor}
          alt="email icon"
          width={20}
          height={20}
        />
      </div>
      <div className={styles.inputContainer}>
        <LoginInput
          type={passwordVisible ? "text" : "password"}
          placeholder="Password"
          className={styles.inputField}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Lock
          className={styles.inputIcon}
          fill={svgColor}
          alt="password icon"
          width={20}
          height={20}
        />
        {passwordVisible ? (
          <Eye
            className={styles.passwordToggleIcon}
            width={23}
            height={23}
            fill={svgColor}
            onClick={togglePasswordVisible}
          />
        ) : (
          <EyeSlash
            className={styles.passwordToggleIcon}
            width={23}
            height={23}
            fill={svgColor}
            onClick={togglePasswordVisible}
          />
        )}
      </div>

      <Button
        width={370}
        backgroundColor="#F7F1F0"
        className={styles.submitButton}
        height={50}
        borderRadius={15}
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      >
        로그인
      </Button>
    </form>
  );
};

export default LoginForm;
