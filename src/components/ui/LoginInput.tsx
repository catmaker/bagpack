import React from "react";

type LoginInputProps = {
  type: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const LoginInput = ({
  type,
  placeholder,
  className,
  value,
  onChange,
}: LoginInputProps) => (
  <input
    type={type}
    placeholder={placeholder}
    className={className}
    value={value}
    onChange={onChange}
  />
);

export default LoginInput;
