"use client";

import React, { useContext, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { UserContext } from "@/app/provider/UserProvider";
import { signOutClient } from "@/lib/firebase/firestore";
import styles from "./Header.module.scss";

const Header = () => {
  const user = useContext(UserContext);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogout = async () => {
    try {
      await signOutClient();
      deleteCookie("auth-status");
      window.location.href = "/intro";
    } catch (error) {
      console.error("로그아웃 중 오류 발생 :", error);
      alert("로그아웃 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownVisible(false);
    }, 500); // 0.5초 지연 시간
  };

  return (
    <header className={`${styles.header}`}>
      <div className={styles.TopBox}>
        <ul className={styles.navList}>
          <Link href="/intro" className={styles.logoLink}>
            <Image
              src="/bagpackIcon/logoIcon.png"
              width={32}
              height={32}
              alt="logo"
            />
          </Link>
          <li>
            <Link href="/home">HOME</Link>
          </li>
          <li>
            <Link href="/schedule">일정</Link>
          </li>
          <li>
            <Link href="/mypage">마이페이지</Link>
          </li>
          <li className={styles.buttonBox}>
            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className={styles.logoutButton}
              >
                로그아웃
              </button>
            ) : (
              <>
                <Link className={styles.signupLink} href="/signup">
                  회원가입
                </Link>
                <Link className={styles.loginLink} href="/login">
                  로그인
                </Link>
              </>
            )}
          </li>
          <li
            className={styles.menuItemWrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className={styles.menuItem}>메뉴</span>
            {isDropdownVisible && (
              <ul className={styles.dropdownMenu}>
                <li>
                  <Link href="/schedule">일정</Link>
                </li>
                <li>
                  <Link href="/dashboard">대시보드</Link>
                </li>
                <li>
                  <Link href="/setting">설정</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
