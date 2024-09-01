"use client";

import React, { useContext } from "react";
import { UserContext } from "@/app/provider/UserProvider";
import Header from "./Header";
import styles from "./index.module.scss";

const HomeClient: React.FC = () => {
  const user = useContext(UserContext);
  if (!user) {
    return null; // 또는 로딩 컴포넌트를 반환
  }

  return (
    <div className={styles.homeContainer}>
      <Header user={user} />
      {/* 홈 페이지의 나머지 내용 */}
    </div>
  );
};

export default HomeClient;
