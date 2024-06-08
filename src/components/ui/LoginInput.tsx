import React from "react";

type LoginInputProps = {
  type: string;
  placeholder?: string;
  className?: string;
};

const LoginInput = ({ type, placeholder, className }: LoginInputProps) => (
  <input type={type} placeholder={placeholder} className={className} />
);

export default LoginInput;
