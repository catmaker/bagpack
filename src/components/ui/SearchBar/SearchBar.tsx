import React from "react";
// css
import styles from "./SearchBar.module.scss";

type SearchBarProps = {
  children?: React.ReactNode;
  width?: string;
  height?: string;
  className?: string;
  placeholder?: string;
};
const SearchBar = ({
  children,
  width,
  height,
  className,
  placeholder,
}: SearchBarProps) => {
  return (
    <div className={className}>
      <input
        className={styles.search}
        style={{ width, height }}
        placeholder={placeholder}
      />
      {children}
    </div>
  );
};

export default SearchBar;
