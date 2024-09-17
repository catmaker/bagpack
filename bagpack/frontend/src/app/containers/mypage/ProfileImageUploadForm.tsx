import React, { useState, useRef } from "react";
import Image from "next/image";
import { getAuth } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase/firebaseConfig";
import styles from "./ProfileImageUploadForm.module.scss";

interface ProfileImageUploadProps {
  initialImageUrl: string | null;
  onImageUpdate: (newImageUrl: string) => void;
}

const ProfileImageUploadForm: React.FC<ProfileImageUploadProps> = ({
  initialImageUrl,
  onImageUpdate,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert("파일 크기는 5MB를 초과할 수 없습니다.");
        e.target.value = "";
        return;
      }
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      setSelectedFile(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(storageRef);

      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, { profilePictureUrl: downloadURL });

      onImageUpdate(downloadURL);
      console.log(
        "프로필 사진이 성공적으로 업데이트되었습니다. 사용자 ID:",
        userId,
      );
      alert("프로필 사진이 성공적으로 업데이트되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error("이미지 업로드 중 오류 발생:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <form className={styles.profileImageUpload} onSubmit={handleSubmit}>
      <div
        role="button"
        tabIndex={0}
        className={styles.profileImageContainer}
        onClick={handleImageClick}
      >
        {previewUrl ? (
          <div className={styles.imageWrapper}>
            <Image
              src={previewUrl}
              alt="Profile"
              width={250}
              height={250}
              className={styles.profilePreview}
            />
            <div className={styles.imageOverlay}>
              <span>Upload Image</span>
            </div>
          </div>
        ) : (
          <div className={styles.placeholderImage}>Click to upload image</div>
        )}
      </div>
      <input
        type="file"
        id="profileImage"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/jpeg, image/png, image/gif"
        style={{ display: "none" }}
      />
      <button type="submit" className={styles.formButton}>
        저장하기
      </button>
    </form>
  );
};

export default ProfileImageUploadForm;
