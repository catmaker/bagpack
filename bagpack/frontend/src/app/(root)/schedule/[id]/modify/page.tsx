import React from "react";
import Modify from "@/app/containers/schedule/[id]/modify";
import Header from "@/components/ui/header/Header";

interface Props {
  params: {
    id: string;
  };
}

const ModifyPage: React.FC<Props> = async ({ params }: Props) => {
  return (
    <>
      <Header />
      <Modify id={params.id} />
    </>
  );
};

export default ModifyPage;
