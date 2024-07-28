"use client";
import React, { useEffect, useState } from "react";
import LogoIcon from "@/components/ui/icons/LogoIcon";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import styles from "./IntroClient.module.scss";
import { redirect, useRouter } from "next/navigation";
import Header from "@/components/ui/header/Header";
import Banner from "@/components/ui/banner/Banner";
const IntroClient = () => {
  const slides = [
    {
      title: "Welcome to Our TimeInK",
      subtitle: "We are glad to have you here!",
      imageUrl: "/bagpackIcon/banner.jpg",
    },
    {
      title: "Our Services",
      subtitle: "We offer a variety of services to help you.",
      imageUrl: "/bagpackIcon/banner2.jpg",
    },
  ];
  return (
    <motion.div>
      <Header />
      <div className={styles.imageBox}>
        <Banner slides={slides} />
      </div>
      <article className={styles.articleIntro}>
        <section>
          <h2>기능 소개</h2>
          <p>
            여행의 모든 순간을 기록하세요! 우리의 플랫폼에서 일정 관리와 여행
            일지를 한 곳에서 간편하게 작성할 수 있습니다.
          </p>
        </section>

        <section>
          <h3>일정 관리</h3>
          <p>
            여행 준비부터 회고까지! 간편한 일정 관리로 계획을 세우고, 중요한
            일정을 놓치지 마세요.
          </p>
        </section>

        <section>
          <h3>여행 기록</h3>
          <p>
            소중한 기억들을 기록하세요. 사진과 함께 여행 중의 특별한 순간들을
            남길 수 있습니다.
          </p>
        </section>

        <section>
          <h3>공유 기능</h3>
          <p>
            친구와 가족과 여행 이야기를 공유하세요! 함께 여행 계획을 세우고
            추억을 나누는 즐거움을 경험해 보세요.
          </p>
        </section>
      </article>
    </motion.div>
  );
};

export default IntroClient;
