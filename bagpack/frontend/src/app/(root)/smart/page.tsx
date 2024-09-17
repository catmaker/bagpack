import React from "react";
import dynamic from "next/dynamic";
import Header from "@/components/ui/header/Header";

const DynamicSmart = dynamic(() => import("@/app/containers/smart"), {
  loading: () => <p>Loading...</p>,
});

const SmartPage = () => {
  return (
    <>
      <Header />
      <DynamicSmart />
    </>
  );
};

export default SmartPage;
