import React from "react";
import Link from "next/link";
// css
import styles from "./SideBar.module.scss";

// svg
import LogoIcon from "@/asset/svg/logo.svg";
import LogoImage from "@/asset/svg/logoImg.svg";
import HomeIcon from "@/asset/svg/home.svg";
import LedgerIcon from "@/asset/svg/ledger.svg";
import ScheduleIcon from "@/asset/svg/schedule.svg";
import JournalIcon from "@/asset/svg/journal.svg";
import SettingIcon from "@/asset/svg/setting.svg";

const SideBar = () => {
  return (
    <div className={styles.aside}>
      <aside>
        <section className={styles.section_wrapper}>
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
    </div>
  );
};

export default SideBar;
