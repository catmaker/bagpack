"use client";
import React, { useEffect, useContext } from "react";
import { UserContext } from "@/app/provider/UserProvider";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
const HomeClient = () => {
  const router = useRouter();
  const user = useContext(UserContext);

  useEffect(() => {
    console.log(user);
  }, [user]);
  if (user?.isDone === false) {
    router.push("/palette");
  }
  return <Card>H</Card>;
};

export default HomeClient;
