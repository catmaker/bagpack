import React from "react";
import Modify from "@/app/containers/schedule/[id]/modify";

interface Props {
  params: {
    id: string;
  };
}

const ModifyPage: React.FC<Props> = ({ params }) => {
  console.log(params);
  return <Modify params={params} />;
};

export default ModifyPage;
