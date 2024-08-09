"use client";
import React, { useEffect, useState } from "react";
import Tiptap from "@/components/tiptap/Tiptap";
import { useRouter } from "next/navigation";
type ModifyProps = {
  params: {
    id: string;
  };
  data: Post;
};
type Post = {
  content: string;
  title: string;
};
const Modify = ({ params, data }: ModifyProps) => {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(data);
  const id = params.id;
  useEffect(() => {
    if (data === undefined) {
      alert("해당 게시물이 존재하지 않습니다.");
      router.push("/schedule");
    }
  }, [data, router]);

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
