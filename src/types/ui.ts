import React from "react";

export type InputWithIconProps = {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  placeholder?: string;
};
