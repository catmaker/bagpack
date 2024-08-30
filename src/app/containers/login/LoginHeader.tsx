import React from "react";
import styles from "./LoginHeader.module.scss";

const LoginHeader = () => {
  return (
    <div className={styles.loginHeader}>
      <h1>Time InK</h1>
      <p>Login your account</p>
    </div>
  );
};

export default LoginHeader;
