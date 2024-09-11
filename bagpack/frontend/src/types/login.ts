import React from "react";

export type LoginFormProps = {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  passwordVisible: boolean;
  togglePasswordVisible: () => void;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
};
