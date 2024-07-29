"use client";
import React from "react";
import LogoIcon from "@/components/ui/icons/LogoIcon";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./IntroClient.module.scss";
import Header from "@/components/ui/header/Header";
import Banner from "@/components/ui/banner/Banner";
import Link from "next/link";
import Footer from "@/components/ui/Footer/Footer";
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
        <section className={styles.firstSection}>
          <Image
            src={"/bagpackIcon/introNote.svg"}
            width={250}
            height={250}
            alt="note"
          />
          <div className={styles.firstSectionInfo}>
            <h1 className={styles.sectionTitle}>
              TimeInK에 오신 것을 환영합니다.
            </h1>
            <p className={styles.sectionContent}>
              여행의 모든 순간을 기록하세요! 우리의 플랫폼에서 일정 관리와 여행
              일지를 한 곳에서 간편하게 작성할 수 있습니다.
            </p>
          </div>
        </section>
        <section className={styles.secondSection}>
          <h2 className={styles.sectionTitle}>왜 TimeInK를 사용해야 할까요?</h2>
          <div className={styles.sectionContentFlex}>
            <div className={styles.sectionContentBox}>
              <div className={styles.content}>
                <div>
                  <Image
                    src={"/bagpackIcon/schedule.png"}
                    width={20}
                    height={20}
                    alt="schedule"
                  />
                  <span>효율적인 일정 관리</span> <br />
                </div>
                <span className={styles.description}>
                  여행 준비 과정에서 다양한 일정을 체계적으로 관리할 수
                  있습니다.
                </span>
              </div>
              <div className={styles.content}>
                <div>
                  <Image
                    src={"/bagpackIcon/record.png"}
                    width={20}
                    height={20}
                    alt="record"
                  />
                  <span>소중한 기억 기록하기</span> <br />
                </div>
                <span>
                  여행 중의 특별한 순간들을 사진과 함께 기록할 수 있습니다.
                  일지를 작성하면서 소중한 추억을 남길 수 있어, 나중에 다시
                  돌아보며 여행의 감동을 느낄 수 있습니다.
                </span>
              </div>
            </div>
            <Image
              src={"/bagpackIcon/world.gif"}
              width={444}
              height={444}
              style={{ objectFit: "contain" }}
              alt=""
            />
            <div className={styles.sectionContentBox}>
              <div className={styles.content}>
                <div>
                  <Image
                    src={"/bagpackIcon/interface.png"}
                    width={20}
                    height={20}
                    style={{ objectFit: "contain" }}
                    alt="interface"
                  />
                  <span>사용자 친화적인 인터페이스</span>
                  <br />
                </div>
                <span>
                  직관적이고 깔끔한 디자인으로 누구나 쉽게 사용할 수 있습니다.
                  복잡한 설정 없이 간편하게 여행 계획을 세우고 일지를 작성할 수
                  있습니다.
                </span>
              </div>
              <div className={styles.content}>
                <div>
                  <Image
                    src={"/bagpackIcon/function.png"}
                    width={20}
                    height={20}
                    alt="function"
                  />
                  <span> 다양한 기능 제공 </span>
                  <br />
                </div>
                <span>
                  일정 관리뿐만 아니라, 여행 팁, 장소 추천, 예산 관리 등의
                  다양한 기능을 통해 여행 준비를 더욱 풍성하게 만들어 줍니다.
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.thirdSection}>
          <h3 className={styles.thirdTitle}>
            <p> 여행의 순간을 기록하고, 기억의 발자취를 남기는 공간,</p>
            <p> TimeInk에서 당신의 이야기를 만들어보세요.</p>
          </h3>
          <div className={styles.thirdContent}>
            <p>
              TimeInk는 여행의 모든 순간을 소중히 여기는 플랫폼입니다. 어디서든
              쉽게 접근할 수 있는 이 앱은 여행 일정을 관리하고 특별한 순간들을
              기록하여 추억을 한곳에 모아줍니다. TimeInk와 함께라면, 당신의
              여행은 더욱 특별해질 것입니다.
            </p>
          </div>
          <div className={styles.buttonBox}>
            <button>
              <Link href={"/signup"}>Sign up for TimeInK</Link>
            </button>
            <button>
              <Link href={"/login"}>Login for TimeInK</Link>
            </button>
          </div>
          <Image
            src={"/bagpackIcon/vacations.gif"}
            alt="travel"
            width={618}
            height={618}
            className={styles.vacationsImg}
          />
        </section>
        <div>
          <p className={styles.notion}>
            Please ensure strict adherence to personal information protection
            and copyright compliance, and use a strong password for secure
            login. <br /> We hope you safely record and share your precious
            travel memories. Thank you!
          </p>
        </div>
      </article>
      <Footer />
    </motion.div>
  );
};

export default IntroClient;
