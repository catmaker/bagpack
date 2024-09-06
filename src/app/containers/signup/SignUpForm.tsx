import React from "react";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { SignUpFormProps } from "@/types/signUp";
import { ArrowHorizontal, Eye, EyeSlash } from "../../../../public/svg";
import styles from "./SignUpForm.module.scss";

const SignUpForm: React.FC<SignUpFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  passwordVisible,
  togglePasswordVisible,
  registerHandler,
  nickname,
  setNickname,
}) => {
  return (
    <form className={styles.signUpForm} onSubmit={registerHandler}>
      <InputField
        className={styles.formControl}
        id="email"
        type="text"
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
        id="password"
        type={passwordVisible ? "text" : "password"}
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
      </InputField>
      <InputField
        className={styles.formControl}
        id="nickname"
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      >
        <label htmlFor="nickname">
          {"Nickname".split("").map((char, index) => (
            <span
              key={`nickname-${char}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {char}
            </span>
          ))}
        </label>
      </InputField>
      <Button className={styles.submitButton} type="submit">
        <span className={styles.hoverUnderlineAnimation}>회원가입</span>
        <ArrowHorizontal width={30} height={10} />
      </Button>
    </form>
  );
};

export default SignUpForm;
