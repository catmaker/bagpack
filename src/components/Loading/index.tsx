"use client";

import React from "react";
import styles from "./index.module.scss";

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.load_man} />
    </div>
  );
};

export default Loading;
