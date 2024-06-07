"use client";
import React, { useEffect, useState } from "react";
import LogoIcon from "@/components/ui/icons/LogoIcon";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import styles from "./IntroClient.module.scss";
import { useRouter } from "next/navigation";
const initialParagraphs = [
  [
    "여행은 우리 삶의 여정에서 가장 소중한 순간들을 만들어내는 시간입니다.",
    "그 순간들을 기록하고 간직하는 것은 우리의 삶을 더욱 풍요롭게 만들어줍니다.",
  ],
  [
    "여행 일기장 웹사이트는 사용자 여러분의 소중한 여행 경험을 안전하고 아름답게 기록할 수 있는 특별한 공간입니다.",
    "사진, 동영상, 오디오 등 다양한 멀티미디어 콘텐츠를 통해 여행의 감동을 생생하게 기록할 수 있습니다.",
  ],
];
const IntroClient = () => {
  const router = useRouter();
  const controls = useAnimation();
  const [showSecondDiv, setShowSecondDiv] = useState(false);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      await controls.start({
        opacity: 1,
        transition: { duration: 3 },
      });
      setShowSecondDiv(true);
      await controls.start({
        opacity: 0,
        transition: { duration: 3 },
      });
      router.push("/home");
    };
    sequence();
  }, [controls, router]);

  return (
    <AnimatePresence>
      {!showSecondDiv && (
        <motion.div
          className={styles.container}
          initial={{ opacity: 0 }}
          animate={controls}
          exit={{ opacity: 0 }}
        >
          <LogoIcon width={700} height={700} />
        </motion.div>
      )}
      {showSecondDiv && (
        <motion.div
          className={styles.container}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Card>
            <Image
              className={styles.logoCut}
              src={"/bagPackIcon/LogoCut.svg"}
              alt="LogoCut"
              width={40}
              height={60}
            />
            <div className={styles.contents}>
              <h1 className={styles.title}>
                BagPack - 당신의 인생 여정을 기록하는 특별한 공간
              </h1>
              <div className={styles.subtitle_box}>
                {initialParagraphs[currentParagraphIndex].map(
                  (sentence, index) => (
                    <p className={styles.subtitle} key={index}>
                      {sentence}
                      <br />
                    </p>
                  )
                )}
              </div>
              <Button
                margin="30px 0 0 0"
                backgroundColor="#F7F1F0"
                className={styles.next_button}
                onClick={() =>
                  setCurrentParagraphIndex((prevIndex) => {
                    return (prevIndex + 1) % initialParagraphs.length;
                  })
                }
              >
                NEXT
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroClient;
