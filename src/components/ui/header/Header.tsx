"use client";

import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { UserContext } from "@/app/provider/UserProvider";
import { signOutClient } from "@/lib/firebase/firestore";
import { Logo } from "../../../../public/svg/index";
import styles from "./Header.module.scss";

const Header = () => {
  const user = useContext(UserContext);
  console.log(user);
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOutClient();
      deleteCookie("auth-status");
      router.push("/intro");
      window.location.reload();
    } catch (error) {
      console.error("로그아웃 중 오류 발생 :", error);
      alert("로그아웃 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };
  return (
    <header className={styles.header}>
      <div className={styles.leftBox}>
        <Link href="/intro" className={styles.logoLink}>
          <Logo width={140} height={40} className={styles.logo} />
        </Link>
        <ul className={styles.navList}>
          <li>
            <Link href="/home">HOME</Link>
          </li>
          <li>
            <Link href="/schedule">일정</Link>
          </li>
          <li>
            <Link href="/mypage">마이페이지</Link>
          </li>
        </ul>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className={styles.logoutButton}
              >
                로그아웃
              </button>
            ) : (
              <div className={styles.buttonBox}>
                <Link className={styles.signupLink} href="/signup">
                  회원가입
                </Link>
                <Link href="/login" className={styles.loginButton}>
                  로그인
                </Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
