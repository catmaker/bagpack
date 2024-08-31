"use client";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "@/app/provider/UserProvider";
import Link from "next/link";
import SideBar from "@/components/ui/SideBar/SideBar";
import styles from "@/app/containers/schedule/[id]/index.module.scss";
import { format } from "date-fns";
import { deletePost } from "@/utils/axios/fetcher/schedule";
import { useRouter } from "next/navigation";
import { Post, ScheduleDetailProps } from "@/types/schedule";

const ScheduleDetail = ({ params, data }: ScheduleDetailProps) => {
  const router = useRouter();
  const { id } = params;
  const [post, setPost] = useState<Post>(data);
  const user = useContext(UserContext);
  const email = user?.email;
  useEffect(() => {
    if (data === undefined) {
      alert("해당 게시물이 존재하지 않습니다.");
      router.push("/schedule");
    }
  }, [data, router]);
  const handleDeletePost = async () => {
    try {
      await deletePost(email, id);
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      console.error("Invalid date:", dateStr);
      return dateStr; // Invalid date string 그대로 반환
    }
    return format(date, "yyyy-MM-dd HH:mm");
  };

  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.content_wrapper}>
        <div className={styles.content}>
          <h1>{post?.title}</h1>
          {post?.startDate === post?.endDate ? (
            <p>{formatDate(post?.startDate || "")}</p>
          ) : (
            <>
              <p>{formatDate(post?.startDate || "")}</p>
              <p>{formatDate(post?.endDate || "")}</p>
            </>
          )}
          <div dangerouslySetInnerHTML={{ __html: post?.content || "" }}></div>
          <Link href={`/schedule/${id}/modify`}>
            <button>수정</button>
          </Link>
          <button onClick={handleDeletePost}>삭제</button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetail;
