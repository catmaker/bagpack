"use client";
import React, { useEffect, useContext, useState, useRef } from "react";
import { UserContext } from "@/app/provider/UserProvider";
import { useRouter } from "next/navigation";
// component
import Loading from "@/components/Loading";
import Header from "./Header";
// css
import styles from "./index.module.scss";

const HomeClient: React.FC = () => {
  const router = useRouter();
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  console.log(user);

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
      <div className={styles.container}>
        <Header user={user} />
      </div>
    )
  );
};

export default HomeClient;
