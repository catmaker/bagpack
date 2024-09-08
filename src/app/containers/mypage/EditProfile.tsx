import React from "react";
import NicknameForm from "@/app/containers/mypage/NicknameForm";
import PasswordForm from "@/app/containers/mypage/PasswordForm";
import ProfileImageUploadForm from "@/app/containers/mypage/ProfileImageUploadForm";
import { User } from "@/types/user";
import styles from "./EditProfile.module.scss";

const EditProfile = ({ user }: { user: User }) => {
  const handleImageUpdate = (newImageUrl: string) => {
    // 필요한 경우 여기서 상위 컴포넌트의 상태를 업데이트하거나 다른 작업을 수행할 수 있습니다.
    console.log("New profile image URL:", newImageUrl);
  };

  return (
    <div className={styles.editProfileContainer}>
      <h1 className={styles.editProfileTitle}>Edit Profile</h1>
      <ProfileImageUploadForm
        initialImageUrl={user.profilePictureUrl}
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
