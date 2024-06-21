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
    if (user && !("palette" in user)) {
      // user가 null이 아니고, palette 필드가 없으면
      router.push("/palette");
    }
  }, [user]);

  return <Card>H</Card>;
};

export default HomeClient;
