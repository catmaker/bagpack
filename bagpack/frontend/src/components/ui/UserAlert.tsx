import React, { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/provider/UserProvider";

const UserAlert = () => {
  const router = useRouter();
  const user = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      alert("로그인 후 이용할 수 있는 기능입니다.");
      router.push("/login");
    }
  }, [user, router]);

  return null;
};

export default UserAlert;
