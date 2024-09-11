import { useState, useEffect } from "react";
import { User } from "@/types/user";
import styles from "./WelcomeSection.module.scss";

const motivationalQuotes = [
  "오늘 하루를 열심히 살면 내일에 대한 걱정은 줄어든다.",
  "작은 진전이라도 매일 이루어낸다면, 그것이 곧 성공이다.",
  "당신의 미래는 지금 무엇을 하느냐에 달려있다.",
  "꿈을 믿고 그 꿈을 이루기 위해 노력하라.",
  "실패는 성공으로 가는 과정일 뿐이다.",
];

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
