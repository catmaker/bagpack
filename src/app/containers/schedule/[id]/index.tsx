"use client";

import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import styles from "@/app/containers/schedule/[id]/index.module.scss";
import { UserContext } from "@/app/provider/UserProvider";
import Card from "@/components/ui/Card";
import { Post, ScheduleDetailProps } from "@/types/schedule";
import { deletePost } from "@/utils/axios/fetcher/schedule";

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
  const [isMobile, setIsMobile] = useState(false);
  console.log(user);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const handleDeletePost = async () => {
    try {
      await deletePost(email, id);
      alert("게시물이 삭제되었습니다.");
      router.push("/schedule");
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) {
      console.error("Invalid date:", dateStr);
      return dateStr; // Invalid date string 그대로 반환
    }
    return format(date, "yyyy-MM-dd HH:mm");
  };
  if (isMobile) {
    return (
      <div className={styles.container}>
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
            <p
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: post?.content || "" }}
            />
            <div className={styles.button_wrapper}>
              <Link href={`/schedule/${id}/modify`} className={styles.button}>
                수정
              </Link>
              <button
                className={`${styles.button} ${styles.delete_button}`}
                type="button"
                onClick={handleDeletePost}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <Card
      width="80%"
      height="100%"
      boxShadow="0px 0px 10px 0px rgba(0, 0, 0, 0.1)"
      className={styles.card}
    >
      <div className={styles.container}>
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
            <p
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: post?.content || "" }}
            />
            <div className={styles.button_wrapper}>
              <Link href={`/schedule/${id}/modify`} className={styles.button}>
                수정
              </Link>
              <button
                className={`${styles.button} ${styles.delete_button}`}
                type="button"
                onClick={handleDeletePost}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ScheduleDetail;
