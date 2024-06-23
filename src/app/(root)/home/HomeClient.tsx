"use client";
import React, { useEffect, useContext } from "react";
import { UserContext } from "@/app/provider/UserProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
// css
import styles from "./HomeClient.module.scss";
// component
import SideBar from "@/components/ui/SideBar/SideBar";
import SearchBar from "@/components/ui/SearchBar/SearchBar";
import Circle from "@/components/ui/Circle";
// svg
import LogoIcon from "@/asset/svg/Logo.svg";
import LogoImage from "@/asset/svg/LogoImg.svg";
import HomeIcon from "@/asset/svg/Home.svg";
import LedgerIcon from "@/asset/svg/Ledger.svg";
import ScheduleIcon from "@/asset/svg/Schedule.svg";
import JournalIcon from "@/asset/svg/Journal.svg";
import SettingIcon from "@/asset/svg/Setting.svg";

const HomeClient = () => {
  const router = useRouter();
  const user = useContext(UserContext);

  useEffect(() => {
    console.log(user);
    if (user && !("palette" in user)) {
      // user가 null이 아니고, palette 필드가 없으면
      router.push("/palette");
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <SideBar align="center">
        <aside>
          <section>
            <div className={styles.logo_container}>
              <div className={styles.logo_image}>
                <LogoImage />
              </div>
              <div className={styles.logo_icon}>
                <LogoIcon />
              </div>
            </div>
            <h3 className={styles.overview_title}>OVERVIEW</h3>
            <ul className={styles.menu_list}>
              <li className={styles.menu_item}>
                <Link href={"/home"}>
                  <HomeIcon />
                  <strong className={styles.menu_text}>Home</strong>
                </Link>
              </li>
              <li className={styles.menu_item}>
                <Link href={"/ledger"}>
                  <LedgerIcon />
                  <strong className={styles.menu_text}>Ledger</strong>
                </Link>
              </li>
              <li className={styles.menu_item}>
                <Link href={"/schedule"}>
                  <ScheduleIcon />
                  <strong className={styles.menu_text}>Schedule</strong>
                </Link>
              </li>
              <li className={styles.menu_item}>
                <Link href={"/journal"}>
                  <JournalIcon />
                  <strong className={styles.menu_text}>Journal</strong>
                </Link>
              </li>
              <li className={styles.menu_item}>
                <Link href={"/setting"}>
                  <SettingIcon />
                  <strong className={styles.menu_text}>Setting</strong>
                </Link>
              </li>
            </ul>
          </section>
        </aside>
      </SideBar>
      <header className={styles.header}>
        <section className={styles.search_group}>
          <SearchBar
            width="680px"
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
        </section>
      </header>
    </div>
  );
};

export default HomeClient;
