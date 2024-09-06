// containers/home/index.tsx

"use client";

import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "@/app/provider/UserProvider";
import MainSection from "./MainSection";
import ResponsiveMobileLayout from "./ResponsiveMobileLayout";
import UserSection from "./UserSection";
import WelcomeSection from "./WelcomeSection";

const HomeClient: React.FC = () => {
  const user = useContext(UserContext);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!user) {
    return null; // 또는 로딩 컴포넌트를 반환
  }

  return (
    <ResponsiveMobileLayout
      isMobile={isMobile}
      userSection={<UserSection user={user} />}
      welcomeSection={<WelcomeSection user={user} />}
      mainSection={<MainSection user={user} />}
    />
  );
};

export default HomeClient;
