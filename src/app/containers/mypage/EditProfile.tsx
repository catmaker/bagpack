import React from "react";
import NicknameForm from "@/app/containers/mypage/NicknameForm";
import PasswordForm from "@/app/containers/mypage/PasswordForm";
import { User } from "@/types/user";
import styles from "./EditProfile.module.scss";

const EditProfile = ({ user }: { user: User }) => {
  console.log("EditProfile 렌더링", { user });

  return (
    <div className={styles.editProfileContainer}>
      <h1 className={styles.editProfileTitle}>Edit Profile</h1>
      <div className={styles.editProfileFormItem}>
        <label htmlFor="email" title="이메일은 변경이 불가능합니다.">
          Email ⚠️
        </label>
        <input
          className={styles.editProfileFormInput}
          type="text"
          id="email"
          placeholder={user.email}
          disabled
        />
        <p>이메일은 변경이 불가능합니다.</p>
      </div>
      <NicknameForm userEmail={user.email} initialNickname={user.nickname} />
      <PasswordForm userEmail={user.email} />
    </div>
  );
};

export default EditProfile;
