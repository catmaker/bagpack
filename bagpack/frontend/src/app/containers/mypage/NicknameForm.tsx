import React, { useState, useCallback } from "react";
import { NicknameFormProps } from "@/types/mypage";
import { updateUserNickname } from "@/utils/axios/fetcher/mypage";
import { nicknameRegex } from "@/utils/regexPatterns";
import Save from "../../../../public/svg/save.svg";
import styles from "./NicknameForm.module.scss";

const NicknameForm: React.FC<NicknameFormProps> = ({
  userEmail,
  initialNickname,
}) => {
  const [nickname, setNickname] = useState(initialNickname);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (nickname.length < 2) {
        alert("닉네임은 2자 이상으로 입력해주세요.");
        return;
      }
      if (nickname.length > 10) {
        alert("닉네임은 10자 이하로 입력해주세요.");
        return;
      }
      if (!nicknameRegex.test(nickname)) {
        alert("영문, 숫자, 완성된 한글만 사용 가능합니다.");
        return;
      }

      try {
        const updatedUser = await updateUserNickname(userEmail, nickname);
        if (updatedUser) {
          setNickname(updatedUser.nickname);
          alert("유저 닉네임이 성공적으로 수정되었습니다.");
          window.location.reload();
        } else {
          throw new Error("업데이트된 사용자 정보를 받지 못했습니다.");
        }
      } catch (error) {
        console.error("유저 닉네임 수정 중 오류 발생:", error);
        alert(
          `유저 닉네임 수정 중 오류가 발생했습니다. 상세 내용: ${(error as Error).message}`,
        );
      }
    },
    [nickname, userEmail],
  );

  return (
    <form onSubmit={handleSubmit} className={styles.nicknameForm}>
      <div className={styles.formItem}>
        <label htmlFor="nickname">Nickname</label>
        <input
          className={styles.formInput}
          type="text"
          id="nickname"
          placeholder={initialNickname}
          value={nickname}
          onChange={handleNicknameChange}
        />
      </div>
      <button
        className={styles.formButton}
        type="button"
        onClick={handleSubmit}
      >
        저장하기
      </button>
    </form>
  );
};

export default NicknameForm;
