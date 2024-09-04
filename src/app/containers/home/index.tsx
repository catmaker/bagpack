"use client";

import React, { useContext } from "react";
import { UserContext } from "@/app/provider/UserProvider";
import Header from "@/components/ui/header/Header";
import MainSection from "./MainSection";
import UserSection from "./UserSection";
import styles from "./index.module.scss";

const HomeClient: React.FC = () => {
  const user = useContext(UserContext);
  if (!user) {
    return null; // 또는 로딩 컴포넌트를 반환
  }
  return (
    <>
      <Header />
      <div className={styles.homeContainer}>
        <UserSection user={user} />
        <MainSection user={user} />
      </div>
    </>
  );
};

export default HomeClient;
