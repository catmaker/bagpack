import React from "react";
import ScheduleDetail from "@/app/containers/schedule/[id]/";
import Header from "@/components/ui/header/Header";
import { getPostById } from "@/utils/axios/fetcher/schedule";

interface Props {
  params: {
    id: string;
  };
}

const ScheduleDetailPage: React.FC<Props> = async ({ params }: Props) => {
  const { id } = params;
  let post;

  try {
    post = await getPostById(id);
  } catch (error) {
    console.error("ScheduleDetailPage Error fetching post", error);
  }

  return (
    <>
      <Header />
      <ScheduleDetail params={params} data={post} />
    </>
  );
};

export default ScheduleDetailPage;
