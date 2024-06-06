import React from "react";
type ButtonProps = {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  padding?: number;
  border?: string;
  boxShadow?: string;
  cursor?: string;
};
const Button = ({
  children = "Button",
  width = 100,
  height = 50,
  borderRadius = 15,
  padding,
  border = "none",
  boxShadow = "0px 4px 4px rgba(0, 0, 0, 0.25)",
  cursor = "pointer",
}: ButtonProps) => {
  return (
    <button
      style={{
        width: width,
        height: height,
        borderRadius: borderRadius,
        padding: padding,
        backgroundColor: "#F7F1F0",
        color: "black",
        border: border,
        boxShadow: boxShadow,
        cursor: cursor,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
