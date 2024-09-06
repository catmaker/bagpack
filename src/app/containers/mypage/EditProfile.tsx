import React, { useState, FormEvent, useEffect } from "react";
import Image from "next/image";
import { getAuth } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import NicknameForm from "@/app/containers/mypage/NicknameForm";
import PasswordForm from "@/app/containers/mypage/PasswordForm";
import { db, storage } from "@/lib/firebase/firestore";
import { User } from "@/types/user";
import styles from "./EditProfile.module.scss";

const EditProfile = ({ user }: { user: User }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(
    user.profilePictureUrl || null,
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    user.profilePictureUrl || null,
  );

  useEffect(() => {
    if (user.profilePictureUrl) {
      setImageUrl(user.profilePictureUrl);
      setPreviewUrl(user.profilePictureUrl);
    }
  }, [user.profilePictureUrl]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      console.error("파일이 선택되지 않았습니다.");
      return;
    }

    try {
      const auth = getAuth();
      const { currentUser } = auth;
      if (!currentUser) {
        console.error("사용자가 로그인되어 있지 않습니다.");
        return;
      }

      const userId = currentUser.uid;
      const storageRef = ref(storage, `profile_pictures/${userId}`);

      // 파일 업로드
      await uploadBytes(storageRef, selectedFile);

      // 업로드된 파일의 URL 가져오기
      const downloadURL = await getDownloadURL(storageRef);

      // Firestore 사용자 문서 업데이트
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, { profilePictureUrl: downloadURL });

      setImageUrl(downloadURL);
      console.log(
        "프로필 사진이 성공적으로 업데이트되었습니다. 사용자 ID:",
        userId,
      );
    } catch (error) {
      console.error("이미지 업로드 중 오류 발생:", error);
    }
  };

  return (
    <div className={styles.editProfileContainer}>
      <h1 className={styles.editProfileTitle}>Edit Profile</h1>
      <form className={styles.editProfileImage} onSubmit={handleSubmit}>
        <label htmlFor="profileImage">프로필 이미지</label>
        <input
          type="file"
          id="profileImage"
          onChange={handleFileSelect}
          accept="image/*"
        />
        <button type="submit">업로드</button>
      </form>
      {previewUrl && (
        <Image
          src={previewUrl}
          alt="Profile"
          width={100}
          height={100}
          className={styles.profilePreview}
        />
      )}
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
