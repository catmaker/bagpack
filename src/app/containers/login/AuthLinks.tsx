import React from "react";
import Link from "next/link";
import styles from "./AuthLinks.module.scss";

const AuthLinks = () => {
  return (
    <div className={styles.loginMenu}>
      <Link href="/signup" className={styles.signup}>
        회원가입
      </Link>
      <Link href="/forgot" className={styles.forgot}>
        비밀번호 찾기
      </Link>
    </div>
  );
};

export default AuthLinks;
