"use client";
import React, { useContext } from "react";
import { UserContext } from "@/app/provider/UserProvider";
import { signOutClient } from "@/lib/firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const user = useContext(UserContext);
  console.log(user);
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOutClient();
      router.push("/intro");
    } catch (error) {
      console.error("로그아웃 중 오류 발생 :", error);
      alert("로그아웃 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };
  return (
    <div>
      <ul>
        <li>
          <Link href={`/intro`}>HOME</Link>
        </li>
        <li>
          <Link href={`/calendar`}></Link>일정
        </li>
        <li>
          <Link href={`/mypage`}>마이페이지</Link>
        </li>
        <li>
          {user ? (
            <button onClick={handleLogout}>로그아웃</button>
          ) : (
            <Link href={`/login`}>로그인</Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Header;
