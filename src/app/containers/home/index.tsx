"use client";

import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/provider/UserProvider";
import Loading from "@/components/Loading";
import Header from "./Header";
import styles from "./index.module.scss";

const HomeClient: React.FC = () => {
  const router = useRouter();
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    if (user !== null) {
      setIsLoading(false);
    } else {
      router.push("/login");
    }
  }, [user, router]);

  if (isLoading) {
    return <Loading />; // 로딩 중일 때 Loading 컴포넌트 표시
  }

  return (
    user && (
      <div className={styles.homeContainer}>
        <Header user={user} />
      </div>
    )
  );
};

export default HomeClient;
