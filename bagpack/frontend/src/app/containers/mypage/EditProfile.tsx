import React from "react";
import NicknameForm from "@/app/containers/mypage/NicknameForm";
import PasswordForm from "@/app/containers/mypage/PasswordForm";
import ProfileImageUploadForm from "@/app/containers/mypage/ProfileImageUploadForm";
import { User } from "@/types/user";
import styles from "./EditProfile.module.scss";

const EditProfile = ({ user }: { user: User }) => {
  const handleImageUpdate = (newImageUrl: string) => {
    console.log("New profile image URL:", newImageUrl);
  };

  return (
    <div className={styles.editProfileContainer}>
      <h1 className={styles.editProfileTitle}>Edit Profile</h1>
      <ProfileImageUploadForm
        initialImageUrl={
          user.profilePictureUrl === undefined
            ? "/bagpackIcon/user.png"
            : user.profilePictureUrl
        }
        onImageUpdate={handleImageUpdate}
      />
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
