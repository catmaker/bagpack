import React from "react";
import styles from "./LoginHeader.module.scss";

const LoginHeader = () => (
  <header className={styles.loginHeaderContainer}>
    <h1 className={styles.appTitle}>
      {"TimeInK".split("").map((char, index) => (
        <span key={index}>{char}</span>
      ))}
    </h1>
    <p className={styles.loginPrompt}>Login your account</p>
  </header>
);

export default LoginHeader;
