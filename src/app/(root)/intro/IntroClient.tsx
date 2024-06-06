"use client";
import React, { useEffect } from "react";
import LogoIcon from "@/components/ui/icons/LogoIcon";
import styles from "./LogoIcon.module.scss";
import { useRouter } from "next/navigation";

const IntroClient = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/home");
    }, 3000);
  }, []);

  return (
    <div className={styles.container}>
      <LogoIcon width={700} height={700} />
    </div>
  );
};

export default IntroClient;
