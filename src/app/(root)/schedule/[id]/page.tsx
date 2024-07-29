"use client";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "@/app/provider/UserProvider";
import Link from "next/link";
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
          console.log(data);
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

  return (
    <div>
      <h1>{post?.title}</h1>
      <p>{post?.content}</p>
      <Link href={`/schedule/${id}/modify`}>
        <button>수정</button>
      </Link>
      <button onClick={deletePost}>삭제</button>
    </div>
  );
};

export default ScheduleDetail;
