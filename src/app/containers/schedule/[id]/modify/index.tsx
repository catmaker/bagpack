"use client";
import React, { useEffect, useState } from "react";
import Tiptap from "@/components/tiptap/Tiptap";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
type ModifyProps = {
  params: {
    id: string;
  };
  data: Post;
};
type Post = {
  content: string;
  title: string;
  startDate: string;
  endDate: string;
};
const Modify = ({ params, data }: ModifyProps) => {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const id = params.id;
  console.log("data: ", data);
  useEffect(() => {
    if (data === undefined) {
      alert("해당 게시물이 존재하지 않습니다.");
      router.push("/schedule");
    } else {
      setPost(data);
    }
  }, [data, router]);

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      {post?.content ? (
        <Tiptap
          contents={post?.content}
          contentStartDate={post?.startDate}
          contentEndDate={post?.endDate}
          title={post.title}
          id={id}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Modify;
