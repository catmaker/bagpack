import React from "react";

type PalletteProps = {
  children?: React.ReactNode;
  className?: string;
  color?: string; // 색상
  width?: number; // 크기
  height?: number; // 크기
  border?: string; // 테두리
  borderRadius?: number; // 테두리 둥글기
  boxShadow?: string; // 그림자
};

const Pallette = ({
  children,
  className,
  color,
  width = 140,
  height = 30,
  border = "1px solid #C3C3C3",
  borderRadius = 15,
  boxShadow = "1px 3px 3px 1px rgba(0, 0, 0, 0.25)",
}: PalletteProps) => {
  const style = {
    backgroundColor: color,
    width: width,
    height: height,
    border: border,
    borderRadius: borderRadius,
    boxShadow: boxShadow,
  };

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

export default Pallette;
