import React from "react";

export type InputWithIconProps = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
  rightIcon?: React.ReactNode;
};
