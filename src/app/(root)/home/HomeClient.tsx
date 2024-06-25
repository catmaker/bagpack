"use client";
import React, { useEffect, useContext } from "react";
import { UserContext } from "@/app/provider/UserProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";
// css
import styles from "./HomeClient.module.scss";
// component
import SideBar from "@/components/ui/SideBar/SideBar";
import SearchBar from "@/components/ui/SearchBar/SearchBar";
import Circle from "@/components/ui/Circle";

const HomeClient = () => {
  const router = useRouter();
  const user = useContext(UserContext);
  useEffect(() => {
    console.log(user);
    console.log(user?.nickname);
    if (user && !("palette" in user)) {
      // user가 null이 아니고, palette 필드가 없으면
      router.push("/palette");
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <SideBar />
        <section className={styles.search_group}>
          <SearchBar
            width="850px"
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
          <Circle className={styles.alarm} color="white" size={50}>
            <Image
              src={"/bagPackIcon/alarm.svg"}
              width={15}
              height={15}
              alt="alarm_icon"
            ></Image>
          </Circle>
          <Circle className={styles.user} color="white" size={50}>
            <Image
              src={"/bagPackIcon/userIcon.svg"}
              width={18}
              height={18}
              alt="user_icon"
            ></Image>
          </Circle>
          <div className={styles.username}>{user?.nickname}</div>
        </section>
      </header>
    </div>
  );
};

export default HomeClient;
