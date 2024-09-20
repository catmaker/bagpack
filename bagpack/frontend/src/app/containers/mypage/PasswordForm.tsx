import React from "react";
import Swal from "sweetalert2";
import { signOutClient, sendPasswordReset } from "@/lib/firebase/auth";
import styles from "./PasswordForm.module.scss";

interface PasswordFormProps {
  userEmail: string;
}

const PasswordForm: React.FC<PasswordFormProps> = ({ userEmail }) => {
  const handlePasswordChange = async () => {
    const result = await Swal.fire({
      title: "비밀번호 재설정",
      text: "비밀번호 재설정 이메일을 보내시겠습니까? 이메일 전송 후 로그아웃 됩니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "예, 보내주세요",
      cancelButtonText: "아니오",
    });

    if (result.isConfirmed) {
      try {
        await sendPasswordReset(userEmail);
        await Swal.fire(
          "전송 완료!",
          "비밀번호 재설정 이메일이 성공적으로 전송되었습니다.",
          "success",
        );
        await signOutClient();
        window.location.href = "/intro";
      } catch (error) {
        console.error("비밀번호 재설정 중 오류 발생:", error);
        Swal.fire(
          "오류",
          `비밀번호 재설정 중 오류가 발생했습니다. 상세 내용: ${(error as Error).message}`,
          "error",
        );
      }
    }
  };

  return (
    <form className={styles.passwordForm}>
      <div className={styles.formItem}>
        <label htmlFor="password">Password</label>
        <button
          className={styles.formButton}
          type="button"
          onClick={handlePasswordChange}
        >
          비밀번호 재설정
        </button>
      </div>
    </form>
  );
};

export default PasswordForm;
