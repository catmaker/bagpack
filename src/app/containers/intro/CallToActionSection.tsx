import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./CallToActionSection.module.scss";

const CallToActionSection = () => {
  return (
    <section className={styles.callToActionSection}>
      <h3 className={styles.mainTitle}>
        <p>여행의 순간을 기록하고, 기억의 발자취를 남기는 공간,</p>
        <p>TimeInk에서 당신의 이야기를 만들어보세요.</p>
      </h3>
      <div className={styles.description}>
        <p>
          TimeInk는 여행의 모든 순간을 소중히 여기는 플랫폼입니다. 어디서든 쉽게
          접근할 수 있는 이 앱은 여행 일정을 관리하고 특별한 순간들을 기록하여
          추억을 한곳에 모아줍니다. TimeInk와 함께라면, 당신의 여행은 더욱
          특별해질 것입니다.
        </p>
      </div>
      <div className={styles.ctaButtonContainer}>
        <Link href="/signup" className={styles.ctaButton}>
          TimeInk 회원가입
        </Link>
        <Link href="/login" className={styles.ctaButton}>
          TimeInk 로그인
        </Link>
      </div>
      <Image
        src="/bagpackIcon/vacations.gif"
        alt="여행 가방 아이콘"
        width={500}
        height={500}
        className={styles.illustrationImage}
      />
    </section>
  );
};

export default CallToActionSection;
