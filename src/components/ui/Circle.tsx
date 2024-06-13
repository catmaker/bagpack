import React from "react";
type CircleProps = {
  color: string;
  size?: number;
};
const Circle = ({ color, size = 15 }: CircleProps) => {
  const style = {
    backgroundColor: color,
    width: size,
    height: size,
    borderRadius: size / 2,
  };
  return <div style={style}></div>;
};

export default Circle;
