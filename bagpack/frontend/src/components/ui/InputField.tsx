import React, { ReactNode } from "react";

type LoginInputProps = {
  type: string;
  id: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  className?: string;
};

const LoginInput: React.FC<LoginInputProps> = ({
  type,
  id,
  value,
  onChange,
  children,
  className,
}) => (
  <div className={className}>
    <input id={id} type={type} value={value} onChange={onChange} required />
    {children}
  </div>
);

export default LoginInput;
