import React from "react";
import styles from "./DisclaimerSection.module.scss";

const DisclaimerSection = () => {
  return (
    <div>
      <div>
        <p className={styles.notion}>
          Please ensure strict adherence to personal information protection and
          copyright compliance, and use a strong password for secure login.{" "}
          <br /> We hope you safely record and share your precious travel
          memories. Thank you!
        </p>
      </div>
    </div>
  );
};

export default DisclaimerSection;
