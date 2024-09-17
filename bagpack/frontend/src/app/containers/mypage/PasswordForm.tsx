import React from "react";
import { signOutClient, sendPasswordReset } from "@/lib/firebase/auth";
import styles from "./PasswordForm.module.scss";

interface PasswordFormProps {
  userEmail: string;
}

const PasswordForm: React.FC<PasswordFormProps> = ({ userEmail }) => {
  const handlePasswordChange = () => {
    const confirmed = window.confirm(
      "비밀번호 재설정 이메일을 보내시겠습니까? 이메일 전송 후 로그아웃 됩니다.",
    );
    if (confirmed) {
      sendPasswordReset(userEmail)
        .then(() => {
          alert("비밀번호 재설정 이메일이 성공적으로 전송되었습니다.");
          signOutClient();
          window.location.href = "/intro";
        })
        .catch((error) => {
          console.error("비밀번호 재설정 중 오류 발생:", error);
          alert(
            `비밀번호 재설정 중 오류가 발생했습니다. 상세 내용: ${(error as Error).message}`,
          );
        });
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
