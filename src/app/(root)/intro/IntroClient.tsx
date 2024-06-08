"use client";
import React, { useEffect, useState } from "react";
import LogoIcon from "@/components/ui/icons/LogoIcon";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import styles from "./IntroClient.module.scss";
import { redirect, useRouter } from "next/navigation";
const initialParagraphs = [
  [
    "여행은 우리 삶의 여정에서 가장 소중한 순간들을 만들어내는 시간입니다.",
    "그 순간들을 기록하고 간직하는 것은 우리의 삶을 더욱 풍요롭게 만들어줍니다.",
  ],
  [
    "저희 BagPack 웹사이트는 여행 중 느낀 감정과 경험을 자유롭게 표현할 수 있는 공간입니다.",
    "여러분의 이야기를 공유하고 다른 이들과 소통하며, 새로운 여행의 동기부여를 찾을 수 있습니다. ",
    "함께 여행하는 동료들과의 추억을 공유하고, 새로운 여행 계획을 세우는 데도 도움이 될 것입니다.",
  ],
  [
    "여행의 추억을 만들고 기록해보세요.",
    "로그인하거나 간편하게 회원가입하세요.",
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
                  ),
                )}
              </div>
              {currentParagraphIndex === initialParagraphs.length - 1 ? (
                <div className={styles.signup_box}>
                  <Button
                    margin="30px 0 0 0"
                    backgroundColor="#F7F1F0"
                    className={styles.login_button}
                    onClick={() => {
                      router.push("/login");
                    }}
                  >
                    로그인
                  </Button>
                  <Button
                    margin="30px 0 0 0"
                    backgroundColor="#F7F1F0"
                    className={styles.signup_button}
                    onClick={() => {
                      router.push("/signup");
                    }}
                  >
                    회원가입
                  </Button>
                </div>
              ) : (
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
              )}
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroClient;
