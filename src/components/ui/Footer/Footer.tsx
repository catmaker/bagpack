import React from "react";
import styles from "./Footer.module.scss";
import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <h2>TimeInK</h2>
        <p>여행 기록을 통해 소중한 추억을 남기세요.</p>
      </div>
      <div className={styles.footerLinks}>
        <a href="#about">회사 소개</a>
        <a href="#privacy">개인정보 보호정책</a>
        <a href="#terms">이용 약관</a>
        <a href="#contact">고객 지원</a>
      </div>
      <div className={styles.footerSocials}>
        <a href={"https://github.com/catmaker"} target="_blank">
          <Image
            src={"/bagpackIcon/github.png"}
            width={40}
            height={40}
            alt="github_icon"
          ></Image>
        </a>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2024 TimeInK. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
