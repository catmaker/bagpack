import React from "react";

type CardProps = {
  width?: number | string;
  height?: number | string;
  children?: React.ReactNode;
  borderRadius?: number;
  padding?: number;
  boxShadow?: string;
  border?: string;
  backgroundColor?: string;
};

const Card = ({
  width = 864,
  height = 508,
  borderRadius = 30,
  children,
  padding = 28,
  boxShadow = "1px 4px 4px 5px rgba(0, 0, 0, 0.25)",
  border = "none",
  backgroundColor = "white",
}: CardProps) => {
  return (
    <div
      style={{
        width: width,
        height: height,
        borderRadius: borderRadius,
        padding: padding,
        boxShadow: boxShadow,
        border: border,
        backgroundColor: backgroundColor,
      }}
    >
      {children}
    </div>
  );
};

export default Card;
