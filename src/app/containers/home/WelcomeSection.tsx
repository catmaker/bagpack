import { useState, useEffect } from "react";
import { motivationalQuotes } from "@/data/motivation";
import { User } from "@/types/user";
import styles from "./WelcomeSection.module.scss";

const WelcomeSection = ({ user }: { user: User }) => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const randomQuote =
      motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className={styles.welcomeSectionContainer}>
      <h1 className={styles.welcomeSectionTitle}>
        <span className={styles.welcomeSectionTitleText}>
          안녕하세요! &nbsp;
          {user.nickname} 님👋
          <br />
          TimeInk에 오신 것을 환영합니다.
        </span>
        <div className={styles.welcomeSectionMotivation}>
          <h2 className={styles.welcomeSectionQuoteTitle}>
            오늘의 동기부여 한 줄 😊
          </h2>
          <p className={styles.welcomeSectionQuote}>{quote}</p>
        </div>
      </h1>
    </div>
  );
};

export default WelcomeSection;
