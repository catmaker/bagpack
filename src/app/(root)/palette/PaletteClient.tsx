"use client";
import React, { useEffect } from "react";
import { UserContext } from "@/app/provider/UserProvider";
import { useContext } from "react";
import Card from "@/components/ui/Card";
import Pallette from "@/components/ui/Pallette";
import Circle from "@/components/ui/Circle";
import styles from "./PalletteClient.module.scss";
import TerribleSvg from "@/components/ui/icons/moods/TerribleSvg";
const PaletteClient = () => {
  const user = useContext(UserContext);
  const palletteColors = [
    ["#CDB4DB", "#FFC8DD", "#FFAFCC", "#BDE0FE", "#A2D2FF"],
    ["#1D3557", "#457B9D", "#A8DADC", "#A7FF8A", "#E63946"],
    ["#0081A7", "#00AFB9", "#EEEA75", "#FED9B7", "#F07167"],
    ["#E4C1F9", "#A9DEF9", "#D0F4DE", "#DFD9A2", "#FF99C8"],
  ];
  useEffect(() => {
    console.log(user);
  }, [user]);
  function getColor(palletteIndex: number, circleIndex: number) {
    return palletteColors[palletteIndex][circleIndex];
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
        <div className={styles.color_pallette}>
          {palletteColors.map((colors, palletteIndex) => (
            <Pallette key={palletteIndex} className={styles.pallette}>
              {colors.map((color, circleIndex) => (
                <Circle key={circleIndex} color={color} />
              ))}
            </Pallette>
          ))}
        </div>
        <div className={styles.icon}>
          <TerribleSvg color="red" size="40px"></TerribleSvg>
        </div>
      </Card>
    </div>
  );
};

export default PaletteClient;
