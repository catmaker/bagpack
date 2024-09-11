import React from "react";

export type SignUpFormProps = {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  passwordVisible: boolean;
  togglePasswordVisible: () => void;
  registerHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  nickname: string;
  setNickname: (nickname: string) => void;
};
