"use client";

import { useContext, useEffect } from "react";
import UserSection from "@/app/containers/home/UserSection";
import { UserContext } from "@/app/provider/UserProvider";
import Header from "@/components/ui/header/Header";
import useScheduleStore from "@/store/schedule";
import MyPostList from "./MyPostList";
import styles from "./index.module.scss";

const MyPageContainer = () => {
  const { posts, fetchPosts } = useScheduleStore();

  const user = useContext(UserContext);
  useEffect(() => {
    if (user) {
      fetchPosts(user);
    }
  }, [fetchPosts, user]);
  if (!user) {
    return null; // 또는 로딩 컴포넌트를 반환
  }
  return (
    <>
      <Header />
      <div className={styles.mypageContainer}>
        <UserSection user={user} />
        <MyPostList posts={posts} user={user} />
      </div>
    </>
  );
};

export default MyPageContainer;
