import React from "react";
type ButtonProps = {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  padding?: number | string;
  border?: string;
  boxShadow?: string;
  cursor?: string;
  margin?: number | string;
  className?: string;
  backgroundColor?: string;
};
const Button = ({
  children = "Button",
  width = 100,
  height = 50,
  borderRadius = 15,
  padding,
  margin,
  border = "none",
  boxShadow = "0px 4px 4px rgba(0, 0, 0, 0.25)",
  cursor = "pointer",
  className,
  backgroundColor = "#FFFFFF",
}: ButtonProps) => {
  return (
    <button
      className={className}
      style={{
        width: width,
        height: height,
        borderRadius: borderRadius,
        padding: padding,
        backgroundColor: backgroundColor,
        color: "black",
        border: border,
        boxShadow: boxShadow,
        cursor: cursor,
        margin: margin,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
