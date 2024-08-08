import React from "react";
import LoginInput from "@/components/ui/LoginInput";
import styles from "./LoginForm.module.scss";
import Button from "@/components/ui/Button";
//svg
import { Mail, Lock, Eye, EyeSlash } from "../../../../public/svg";
interface Props {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  passwordVisible: boolean;
  togglePasswordVisible: () => void;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
}
const svgColor = "#FE9A8A";
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
        <Mail
          className={styles.icon}
          fill={svgColor}
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
        <Lock
          className={styles.icon}
          fill={svgColor}
          alt="password"
          width={20}
          height={20}
        />
        {passwordVisible ? (
          <Eye
            className={styles.eyeIcon}
            width={23}
            height={23}
            fill={svgColor}
            onClick={togglePasswordVisible}
          />
        ) : (
          <EyeSlash
            className={styles.eyeIcon}
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
        className={styles.loginButton}
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
