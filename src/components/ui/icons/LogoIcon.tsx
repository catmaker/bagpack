import React from "react";
import Image from "next/image";

type LogoIconProps = {
  width?: number;
  height?: number;
};

const LogoIcon = ({ width, height }: LogoIconProps) => {
  return (
    <div style={{ width, height }}>
      <Image
        src="/bagPackIcon/Logo.svg"
        alt="Logo"
        width={width}
        height={height}
      />
    </div>
  );
};

export default LogoIcon;
