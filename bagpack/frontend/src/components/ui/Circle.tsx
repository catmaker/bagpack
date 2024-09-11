import React from "react";

type CircleProps = {
  color?: string;
  size?: number;
  children?: React.ReactNode;
  className?: string;
};
const Circle = ({ color, size = 15, children, className }: CircleProps) => {
  const style = {
    backgroundColor: color,
    width: size,
    height: size,
    borderRadius: size / 2,
  };
  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
};

export default Circle;
