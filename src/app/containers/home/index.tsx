"use client";

import React, { useContext } from "react";
import { UserContext } from "@/app/provider/UserProvider";
import Card from "@/components/ui/Card";
import MainSection from "./MainSection";
import UserSection from "./UserSection";
import WelcomeSection from "./WelcomeSection";
import styles from "./index.module.scss";

const HomeClient: React.FC = () => {
  const user = useContext(UserContext);
  if (!user) {
    return null; // 또는 로딩 컴포넌트를 반환
  }
  return (
    <div className={styles.homeContainer}>
      <Card
        width="80%"
        height="100%"
        className={`${styles.homeHeader} ${styles.card}`}
        boxShadow="0px 0px 10px 0px rgba(0, 0, 0, 0.1)"
      >
        <UserSection user={user} />
        <WelcomeSection user={user} />
      </Card>
      <Card
        width="80%"
        height="100%"
        className={`${styles.homeMain} ${styles.card}`}
        boxShadow="0px 0px 10px 0px rgba(0, 0, 0, 0.1)"
      >
        <MainSection user={user} />
      </Card>
    </div>
  );
};

export default HomeClient;
