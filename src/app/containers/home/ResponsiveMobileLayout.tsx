// components/ResponsiveHomeLayout.tsx
import React from "react";
import Card from "@/components/ui/Card";
import { ResponsiveMobileLayoutProps } from "@/types/home";
import styles from "./index.module.scss";

const ResponsiveMobileLayout: React.FC<ResponsiveMobileLayoutProps> = ({
  isMobile,
  userSection,
  welcomeSection,
  mainSection,
}) => {
  if (isMobile) {
    return (
      <div className={styles.homeContainer}>
        {userSection}
        {welcomeSection}
        {mainSection}
      </div>
    );
  }

  return (
    <div className={styles.homeContainer}>
      <Card
        width="80%"
        height="100%"
        className={`${styles.homeHeader} ${styles.card}`}
        boxShadow="0px 0px 10px 0px rgba(0, 0, 0, 0.1)"
      >
        {userSection}
        {welcomeSection}
      </Card>
      <Card
        width="80%"
        height="100%"
        className={`${styles.homeMain} ${styles.card}`}
        boxShadow="0px 0px 10px 0px rgba(0, 0, 0, 0.1)"
      >
        {mainSection}
      </Card>
    </div>
  );
};

export default ResponsiveMobileLayout;
