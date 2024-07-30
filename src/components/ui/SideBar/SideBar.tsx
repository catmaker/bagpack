import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./SideBar.module.scss";

// svg
import HomeIcon from "@/asset/svg/home.svg";
import SettingIcon from "@/asset/svg/setting.svg";
import ScheduleIcon from "@/asset/svg/schedule.svg";
const SideBar = () => {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState("home");

  useEffect(() => {
    // 현재 경로에 따라 activeMenu 설정
    if (pathname === "/home") {
      setActiveMenu("home");
    } else if (pathname === "/schedule") {
      setActiveMenu("schedule");
    }
  }, [pathname]); // pathname이 변경될 때마다 실행

  return (
    <div className={styles.aside}>
      <aside>
        <section className={styles.sectionWrapper}>
          <Link href={"/"} className={styles.logoContainer}>
            <Image
              src={"/bagpackIcon/logoIcon.png"}
              width={50}
              height={50}
              alt="logoIcon"
            />
            <h1>Time InK</h1>
          </Link>
          <ul className={styles.menuList}>
            <li className={activeMenu === "home" ? styles.active : ""}>
              <Link href={"/home"}>
                <div>
                  <HomeIcon
                    fill={activeMenu === "home" ? "white" : "#ABB5BA"}
                    width={"24"}
                    height={"24"}
                  />
                  <p className={activeMenu === "home" ? styles.activeText : ""}>
                    HOME
                  </p>
                </div>
              </Link>
            </li>
            <li className={activeMenu === "schedule" ? styles.active : ""}>
              <Link href={"/schedule"}>
                <div>
                  <ScheduleIcon
                    fill={activeMenu === "schedule" ? "white" : "#ABB5BA"}
                    width={"24"}
                    height={"24"}
                  />
                  <p
                    className={
                      activeMenu === "schedule" ? styles.activeText : ""
                    }
                  >
                    SCHEDULE
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </section>
      </aside>
    </div>
  );
};

export default SideBar;
