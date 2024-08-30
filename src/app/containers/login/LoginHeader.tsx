import React from "react";
import styles from "./LoginHeader.module.scss";

const LoginHeader = () => {
  return (
    <header className={styles.loginHeaderContainer}>
      <h1 className={styles.appTitle}>Time InK</h1>
      <p className={styles.loginPrompt}>Login your account</p>
    </header>
  );
};

export default LoginHeader;
