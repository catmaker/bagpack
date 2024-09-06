import React from "react";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { LoginFormProps } from "@/types/login";
import { ArrowHorizontal, Eye, EyeSlash } from "../../../../public/svg";
import styles from "./LoginForm.module.scss";

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
      <InputField
        className={styles.formControl}
        type="text"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      >
        <label htmlFor="email">
          {"Username".split("").map((char, index) => (
            <span
              key={`email-${char}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {char}
            </span>
          ))}
        </label>
      </InputField>
      <InputField
        className={styles.formControl}
        type={passwordVisible ? "text" : "password"}
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      >
        <label htmlFor="password">
          {"Password".split("").map((char, index) => (
            <span
              key={`password-${char}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {char}
            </span>
          ))}
        </label>
        {passwordVisible ? (
          <Eye
            className={styles.passwordToggleIcon}
            width={23}
            height={23}
            onClick={togglePasswordVisible}
          />
        ) : (
          <EyeSlash
            className={styles.passwordToggleIcon}
            width={23}
            height={23}
            onClick={togglePasswordVisible}
          />
        )}
      </InputField>

      <Button className={styles.submitButton} type="submit">
        <span className={styles.hoverUnderlineAnimation}>로그인</span>
        <ArrowHorizontal width={30} height={10} />
      </Button>
    </form>
  );
};

export default LoginForm;
