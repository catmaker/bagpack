import React from "react";

type ButtonProps = {
  children: React.ReactNode;
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
  onClick?: () => void;
  display?: string;
};

const Button = ({
  children,
  width,
  height,
  borderRadius = 5,
  padding = "10px 20px",
  margin,
  border = "none",
  boxShadow,
  cursor = "pointer",
  className,
  backgroundColor = "#FFFFFF",
  display = "flex",
  onClick,
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      style={{
        width,
        height,
        borderRadius,
        padding,
        backgroundColor,
        color: "black",
        border,
        boxShadow,
        cursor,
        margin,
        display,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </button>
  );
};

export default Button;
