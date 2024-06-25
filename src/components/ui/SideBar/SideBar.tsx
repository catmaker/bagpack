import React from "react";
import styles from "./SideBar.module.scss";

type SideBarProps = {
  children?: React.ReactNode;
  align?: "center";
};

const SideBar = ({ children, align }: SideBarProps) => {
  const centerClassName = align === "center" ? styles.center : "";
  return (
    <aside className={styles.container}>
      <div className={centerClassName}>{children}</div>
    </aside>
  );
};

export default SideBar;
