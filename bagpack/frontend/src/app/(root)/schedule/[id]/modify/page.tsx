import React from "react";
import Modify from "@/app/containers/schedule/[id]/modify";
import Header from "@/components/ui/header/Header";
import { getPostById } from "@/utils/axios/fetcher/schedule";

interface Props {
  params: {
    id: string;
  };
}

const ModifyPage: React.FC<Props> = async ({ params }: Props) => {
  const { id } = params;
  let post;

  try {
    post = await getPostById(id);
  } catch (error) {
    console.error("ModifyPage Error fetching post:", error);
  }
  return (
    <>
      <Header />
      <Modify params={params} data={post} />
    </>
  );
};

export default ModifyPage;
