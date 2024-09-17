import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading"; // 로딩 컴포넌트가 있다고 가정합니다.

const DynamicSchedule = dynamic(() => import("@/app/containers/schedule"), {
  loading: () => <Loading />,
});

const SchedulePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <DynamicSchedule />
    </Suspense>
  );
};

export default SchedulePage;