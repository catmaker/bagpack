"use client";
import React, { useEffect, useState } from "react";
import { UserContext } from "@/app/provider/UserProvider";
import { useContext } from "react";
import Card from "@/components/ui/Card";
import Pallette from "@/components/ui/Pallette";
import Circle from "@/components/ui/Circle";
import styles from "./PalletteClient.module.scss";
import Button from "@/components/ui/Button";
// icon
import TerribleIcon from "@/asset/svg/terrible.svg";
import HappyIcon from "@/asset/svg/happy.svg";
import NaturalIcon from "@/asset/svg/natural.svg";
import SmileIcon from "@/asset/svg/smile.svg";
import SadIcon from "@/asset/svg/sad.svg";
const PaletteClient = () => {
  const user = useContext(UserContext);
  const paletteColors = [
    ["#CDB4DB", "#FFC8DD", "#FFAFCC", "#BDE0FE", "#324251"],
    ["#1D3557", "#457B9D", "#A8DADC", "#A7FF8A", "#E63946"],
    ["#0081A7", "#00AFB9", "#EEEA75", "#FED9B7", "#F07167"],
    ["#E4C1F9", "#A9DEF9", "#D0F4DE", "#DFD9A2", "#FF99C8"],
  ];
  const iconStyle = { width: "25px", height: "25px" };
  // 팔레트 추적 상태
  const [selectedPalette, setSelectedPalette] = useState(-1);
  const handlePaletteClick = (paletteIndex: number) => {
    setSelectedPalette(paletteIndex);
  };
  useEffect(() => {
    console.log(user);
  }, [user]);
  function getColor(palletteIndex: number, circleIndex: number) {
    return paletteColors[palletteIndex][circleIndex];
  }
  return (
    <div className={styles.container}>
      <Card className="card">
        <h1 className={styles.h1}>나만의 마음의 팔레트</h1>
        <p className={styles.p}>
          이모지에 특별한 색을 입혀 당신의 감정을 더욱 생동감 있게 전달해보세요.
        </p>
        <p className={styles.p}>
          감정의 색을 선택하고 마음을 표현하는 새로운 방법을 경험하세요.
        </p>
        <div className={styles.color_palette}>
          {paletteColors.map((colors, paletteIndex) => (
            <Pallette
              key={paletteIndex}
              className={`${styles.palette} ${paletteIndex === selectedPalette ? styles.selected_palette : ""}`}
              onClick={() => handlePaletteClick(paletteIndex)}
            >
              {colors.map((color, circleIndex) => (
                <Circle key={circleIndex} color={color} />
              ))}
            </Pallette>
          ))}
        </div>
        <div className={styles.drawing_box}>
          {paletteColors.map((colors, paletteIndex) => (
            <div
              key={paletteIndex}
              className={`${styles.palette_container} ${paletteIndex === selectedPalette ? styles.selected_palette : ""}`}
            >
              <div style={{ color: colors[0] }}>
                <HappyIcon style={iconStyle} viewBox="0 0 478.125 478.125" />
              </div>
              <div style={{ color: colors[1] }}>
                <SmileIcon style={iconStyle} viewBox="0 0 478.125 478.125" />
              </div>
              <div style={{ color: colors[2] }}>
                <NaturalIcon style={iconStyle} viewBox="0 0 478.125 478.125" />
              </div>
              <div style={{ color: colors[3] }}>
                <SadIcon style={iconStyle} viewBox="0 0 478.125 478.125" />
              </div>
              <div style={{ color: colors[4] }}>
                <TerribleIcon style={iconStyle} viewBox="0 0 478.125 478.125" />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.button_container}>
          <Button>저장하기</Button>
        </div>
      </Card>
    </div>
  );
};

export default PaletteClient;
