import React from "react";
import LoginInput from "@/components/ui/LoginInput";
import { InputWithIconProps } from "@/types/ui";
import styles from "./InputWithIcon.module.scss";

const InputWithIcon: React.FC<InputWithIconProps> = ({
  type,
  placeholder,
  value,
  onChange,
  icon,
  rightIcon,
}) => (
  <div className={styles.inputContainer}>
    <LoginInput
      type={type}
      placeholder={placeholder}
      className={styles.inputField}
      value={value}
      onChange={onChange}
    />
    {icon}
    {rightIcon}
  </div>
);

export default InputWithIcon;
