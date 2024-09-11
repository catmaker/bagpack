import React from "react";
import ScheduleDetail from "@/app/containers/schedule/[id]/";
import Header from "@/components/ui/header/Header";

interface Props {
  params: {
    id: string;
  };
}

const ScheduleDetailPage: React.FC<Props> = ({ params }: Props) => {
  return (
    <>
      <Header />
      <ScheduleDetail id={params.id} />
    </>
  );
};

export default ScheduleDetailPage;
