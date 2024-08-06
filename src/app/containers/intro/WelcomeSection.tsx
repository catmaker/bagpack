import React from "react";
import styles from "./index.module.scss";
import { Note } from "../../../../public/svg";
const WelcomeSection = () => {
  return (
    <div>
      <section className={styles.firstSection}>
        <Note width={250} height={250} />
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
    </div>
  );
};

export default WelcomeSection;
