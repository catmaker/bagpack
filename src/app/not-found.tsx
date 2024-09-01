import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./not-found.module.scss";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <Image src="/bagpackicon/404.png" alt="404" width={300} height={300} />
      <div className={styles.contentContainer}>
        <div className={styles.textContainer}>
          <p className={styles.text}>길을 잘못 드셨네요!</p>
          <p className={styles.text}>다시 처음부터 시작해볼까요?</p>
        </div>
        <div className={styles.linkContainer}>
          <Link href="/">저를 따라오세요!</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
