"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";
import { Post, ModifyProps } from "@/types/schedule";
import { getPostById } from "@/utils/axios/fetcher/schedule";
import styles from "./index.module.scss";

// Tiptap 컴포넌트를 동적으로 임포트
const DynamicTiptap = dynamic(() => import("@/components/tiptap/Tiptap"), {
  loading: () => <Loading />,
});

const Modify = ({ id }: ModifyProps) => {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) return <Loading />;

  return (
    <div className={styles.container}>
      {post?.content ? (
        <DynamicTiptap
          contents={post.content}
          contentStartDate={post.startDate}
          contentEndDate={post.endDate}
          title={post.title}
          id={id}
        />
      ) : null}
    </div>
  );
};

export default Modify;
