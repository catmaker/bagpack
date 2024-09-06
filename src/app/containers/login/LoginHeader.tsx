import React from "react";
import styles from "./LoginHeader.module.scss";

const LoginHeader = () => {
  return (
    <header className={styles.loginHeaderContainer}>
      <h1 className={styles.appTitle}>
        <span>T</span>
        <span>i</span>
        <span>m</span>
        <span>e</span> <span>I</span>
        <span>n</span>
        <span>K</span>
      </h1>
      <p className={styles.loginPrompt}>Login your account</p>
    </header>
  );
};

export default LoginHeader;
