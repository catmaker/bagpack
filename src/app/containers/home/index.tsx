"use client";
import React, { useEffect, useContext, useState, useRef } from "react";
import { UserContext } from "@/app/provider/UserProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
// component
import SideBar from "@/components/ui/SideBar/SideBar";
import SearchBar from "@/components/ui/SearchBar/SearchBar";
import Circle from "@/components/ui/Circle";
import AlarmIcon from "@/asset/svg/alarm.svg";
import Loading from "@/components/Loading";
// css
import styles from "./index.module.scss";

const HomeClient = () => {
  const router = useRouter();
  const user = useContext(UserContext);
  const hasAlerted = useRef(false); // 알림 표시 여부를 추적
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    if (user) {
      setIsLoading(false); // 사용자 데이터가 준비되면 로딩 상태 해제
    } else {
      setIsLoading(false); // 사용자 데이터가 없으면 바로 로딩 상태 해제
    }
  }, [user]);

  if (isLoading) {
    return <Loading />; // 로딩 중일 때 Loading 컴포넌트 표시
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <motion.div
          initial={{ x: "-100%" }} // 왼쪽에서 시작
          animate={{ x: 0 }} // 오른쪽으로 이동하여 화면에 표시
          transition={{ duration: 0.3 }} // 애니메이션 지속 시간 설정
        >
          <SideBar />
        </motion.div>
        <section className={styles.search_group}>
          <SearchBar
            width="500px"
            height="50px"
            className={styles.search_bar}
            placeholder="Search your mood...."
          >
            <Image
              className={styles.search_icon}
              src={"/bagpackIcon/search.svg"}
              width={18}
              height={18}
              alt="search_icon"
            ></Image>
          </SearchBar>
        </section>
        <section className={styles.userGroup}>
          <div className={styles.clientBox}>
            <Circle className={styles.alarm} color="white" size={38}>
              <AlarmIcon
                width={"16"}
                height={"16"}
                fill={"rgb(255, 119, 119)"}
              />
            </Circle>
            <div className={styles.userInfo}>
              <Circle className={styles.user} color="white" size={38}>
                <Image
                  src={"/bagpackIcon/profile.jpg"}
                  fill
                  alt="userProfile"
                  style={{ borderRadius: "50%" }}
                ></Image>
              </Circle>
              <p>{user?.nickname}</p>
            </div>
          </div>
        </section>
      </header>
    </div>
  );
};

export default HomeClient;
