import React from "react";
import Image from "next/image";
import styles from "./index.module.scss";
import Link from "next/link";
const CallToActionSection = () => {
  return (
    <div>
      <section className={styles.thirdSection}>
        <h3 className={styles.thirdTitle}>
          <p> 여행의 순간을 기록하고, 기억의 발자취를 남기는 공간,</p>
          <p> TimeInk에서 당신의 이야기를 만들어보세요.</p>
        </h3>
        <div className={styles.thirdContent}>
          <p>
            TimeInk는 여행의 모든 순간을 소중히 여기는 플랫폼입니다. 어디서든
            쉽게 접근할 수 있는 이 앱은 여행 일정을 관리하고 특별한 순간들을
            기록하여 추억을 한곳에 모아줍니다. TimeInk와 함께라면, 당신의 여행은
            더욱 특별해질 것입니다.
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
    </div>
  );
};

export default CallToActionSection;
