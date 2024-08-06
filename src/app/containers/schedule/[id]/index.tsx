"use client";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "@/app/provider/UserProvider";
import Link from "next/link";
import SideBar from "@/components/ui/SideBar/SideBar";
import styles from "@/app/containers/schedule/[id]/index.module.scss";
import { format } from "date-fns";
type ScheduleDetailParams = {
  params: {
    id: string;
  };
};
type Post = {
  id: string;
  content: string;
  mood: string;
  title: string;
  startDate: string;
  endDate: string;
};
const ScheduleDetail = ({ params }: ScheduleDetailParams) => {
  const { id } = params;
  const [post, setPost] = useState<Post>();
  const user = useContext(UserContext);
  const email = user?.email;
  useEffect(() => {
    if (!user) return;
    console.log(user);
    const postData = async () => {
      try {
        const data = { email, id };
        const res = await fetch(`/api/user/getPostById`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          const data = await res.json();
          console.log(data.data);
          setPost(data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    postData();
  }, [user, email, id]);

  const deletePost = async () => {
    try {
      const data = { email, id };
      const res = await fetch(`/api/user/deletePost`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        console.log("삭제 성공");
      }
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
        <button onClick={deletePost}>삭제</button>
      </div>
    </div>
  );
};

export default ScheduleDetail;
