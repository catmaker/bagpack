import React from "react";
import Link from "next/link";
import styles from "./AuthLinks.module.scss";

const AuthLinks = () => {
  return (
    <nav className={styles.authLinksContainer}>
      <Link href="/signup" className={styles.signupLink}>
        회원가입
      </Link>
      <Link href="/forgot" className={styles.passwordResetLink}>
        비밀번호 찾기
      </Link>
    </nav>
  );
};

export default AuthLinks;
