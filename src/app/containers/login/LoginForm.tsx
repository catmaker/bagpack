import React from "react";
import Button from "@/components/ui/Button";
import InputWithIcon from "@/components/ui/InputWithIcon";
import { LoginFormProps } from "@/types/login";
import { Mail, Lock, Eye, EyeSlash } from "../../../../public/svg";
import styles from "./LoginForm.module.scss";

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
      <InputWithIcon
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={
          <Mail
            className={styles.inputIcon}
            fill={svgColor}
            alt="email icon"
            width={20}
            height={20}
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
            className={styles.inputIcon}
            fill={svgColor}
            alt="password icon"
            width={20}
            height={20}
          />
        }
        rightIcon={
          passwordVisible ? (
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
          )
        }
      />

      <Button
        width={370}
        backgroundColor="#F7F1F0"
        className={styles.submitButton}
        height={50}
        borderRadius={15}
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        type="submit"
      >
        로그인
      </Button>
    </form>
  );
};

export default LoginForm;
