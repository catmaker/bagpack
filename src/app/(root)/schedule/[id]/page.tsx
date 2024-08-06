import React from "react";
import ScheduleDetail from "@/app/containers/schedule/[id]/";
interface Props {
  params: {
    id: string;
  };
}

const ScheduleDetailPage: React.FC<Props> = ({ params }: Props) => {
  return <ScheduleDetail params={params} />;
};

export default ScheduleDetailPage;
