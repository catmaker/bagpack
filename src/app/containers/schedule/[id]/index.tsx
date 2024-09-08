"use client";

import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import styles from "@/app/containers/schedule/[id]/index.module.scss";
import { UserContext } from "@/app/provider/UserProvider";
import Card from "@/components/ui/Card";
import { Post } from "@/types/schedule";
import { deletePost, getPostById } from "@/utils/axios/fetcher/schedule";

interface ScheduleDetailProps {
  id: string;
}

const ScheduleDetail = ({ id }: ScheduleDetailProps): React.JSX.Element => {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const user = useContext(UserContext);
  const email = user?.email;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPostById(id);
        setPost(fetchedPost);
      } catch (error) {
        console.error("Error fetching post:", error);
        alert("게시물을 불러오는데 실패했습니다.");
        router.push("/schedule");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, router]);

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
      alert("게시물 삭제에 실패했습니다.");
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) {
      console.error("Invalid date:", dateStr);
      return dateStr;
    }
    return format(date, "yyyy-MM-dd HH:mm");
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!post) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  const renderContent = () => (
    <div className={styles.content}>
      <h1>{post.title}</h1>
      {post.startDate === post.endDate ? (
        <p>{formatDate(post.startDate || "")}</p>
      ) : (
        <>
          <p>{formatDate(post.startDate || "")}</p>
          <p>{formatDate(post.endDate || "")}</p>
        </>
      )}
      <p
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content || "" }}
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
  );

  if (isMobile) {
    return (
      <div className={styles.container}>
        <div className={styles.content_wrapper}>{renderContent()}</div>
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
        <div className={styles.content_wrapper}>{renderContent()}</div>
      </div>
    </Card>
  );
};

export default ScheduleDetail;
