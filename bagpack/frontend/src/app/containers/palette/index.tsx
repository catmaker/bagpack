"use client";

import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/provider/UserProvider";
import HappyIcon from "@/asset/svg/happy.svg";
import NaturalIcon from "@/asset/svg/natural.svg";
import SadIcon from "@/asset/svg/sad.svg";
import SmileIcon from "@/asset/svg/smile.svg";
import TerribleIcon from "@/asset/svg/terrible.svg";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Circle from "@/components/ui/Circle";
import Pallette from "@/components/ui/Pallette";
import styles from "./index.module.scss";

const PaletteClient = () => {
  const router = useRouter();
  const user = useContext(UserContext);
  console.log(user);
  const paletteColors = [
    {
      id: 1,
      colors: ["#CDB4DB", "#FFC8DD", "#FFAFCC", "#BDE0FE", "#324251"],
    },
    {
      id: 2,
      colors: ["#1D3557", "#457B9D", "#A8DADC", "#A7FF8A", "#E63946"],
    },
    {
      id: 3,
      colors: ["#E4C1F9", "#A9DEF9", "#D0F4DE", "#DFD9A2", "#FF99C8"],
    },
    {
      id: 4,
      colors: ["#E4C1F9", "#A9DEF9", "#D0F4DE", "#DFD9A2", "#FF99C8"],
    },
  ];
  const iconStyle = { width: "25px", height: "25px" };
  // 팔레트 추적 상태
  const [selectedPalette, setSelectedPalette] = useState(-1);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    console.log("selectedPalette:", selectedPalette);
  }, [selectedPalette]);

  const handlePaletteClick = (paletteIndex: number) => {
    setSelectedPalette(paletteIndex);
    console.log(paletteColors[paletteIndex]);
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleSavePalette = async () => {
    if (user && selectedPalette !== -1) {
      setIsSaving(true);
      try {
        // 동적 임포트
        const { addPalette } = await import("@/lib/firebase/firestore");
        await addPalette(user.email, paletteColors[selectedPalette].colors);
        console.log("팔레트 저장 완료");
        alert("언제나 당신의 마음을 표현할 수 있도록 도와줘서 감사합니다.");
        router.push("/home");
      } catch (error) {
        console.error("팔레트 저장 중 오류 발생:", error);
        alert("팔레트 저장에 실패했습니다. 다시 시도해 주세요.");
      } finally {
        setIsSaving(false);
      }
    } else {
      alert("팔레트를 선택해주세요.");
    }
  };

  function getColor(palletteIndex: number, circleIndex: number) {
    return paletteColors[palletteIndex].colors[circleIndex];
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
          {paletteColors.map((palette, paletteIndex) => (
            <Pallette
              key={palette.id}
              className={`${styles.palette} ${paletteIndex === selectedPalette ? styles.selected_palette : ""}`}
              onClick={() => handlePaletteClick(paletteIndex)}
            >
              {palette.colors.map((color) => (
                <Circle key={color} color={color} />
              ))}
            </Pallette>
          ))}
        </div>
        <div className={styles.drawing_box}>
          {paletteColors.map((palette, paletteIndex) => (
            <div
              key={palette.id}
              className={`${styles.palette_container} ${paletteIndex === selectedPalette ? styles.selected_palette : ""}`}
            >
              <div style={{ color: palette.colors[0] }}>
                <HappyIcon style={iconStyle} viewBox="0 0 478.125 478.125" />
              </div>
              <div style={{ color: palette.colors[1] }}>
                <SmileIcon style={iconStyle} viewBox="0 0 478.125 478.125" />
              </div>
              <div style={{ color: palette.colors[2] }}>
                <NaturalIcon style={iconStyle} viewBox="0 0 478.125 478.125" />
              </div>
              <div style={{ color: palette.colors[3] }}>
                <SadIcon style={iconStyle} viewBox="0 0 478.125 478.125" />
              </div>
              <div style={{ color: palette.colors[4] }}>
                <TerribleIcon style={iconStyle} viewBox="0 0 478.125 478.125" />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.button_container}>
          <Button onClick={handleSavePalette} disabled={isSaving}>
            {isSaving ? "저장 중..." : "저장하기"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PaletteClient;
