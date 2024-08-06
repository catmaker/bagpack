"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/provider/UserProvider";
import Tiptap from "@/components/tiptap/Tiptap";
type ModifyProps = {
  params: {
    id: string;
  };
};
type Post = {
  content: string;
  title: string;
};
const Modify = ({ params }: ModifyProps) => {
  const [post, setPost] = useState<Post | null>(null);
  const user = useContext(UserContext);
  const id = params.id;
  console.log(params);
  useEffect(() => {
    if (!user) return;
    getPostById(id, user.email).then((data) => {
      console.log(data);
      if (data.success) {
        // 성공 시, post 상태를 data.data로 업데이트
        setPost(data.data);
      }
    });
  }, [user, id]);

  const getPostById = async (postId: string, email: string) => {
    try {
      console.log(postId, email);
      const response = await fetch("/api/user/getPostById", {
        method: "POST",
        body: JSON.stringify({ id, email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      // 여기서 setPost를 호출하지 않고, 대신 반환값을 통해 상태를 업데이트합니다.
      return { success: true, data: data.data }; // data.data를 반환하도록 수정
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      };
    }
  };
  console.log(post?.content);
  console.log(id);

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      {post?.content ? (
        <Tiptap contents={post?.content} title={post.title} id={id} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Modify;
