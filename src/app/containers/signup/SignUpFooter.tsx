import Link from "next/link";
import styles from "./SignUpFooter.module.scss";

const SignUpFooter = () => {
  return (
    <div className={styles.signUpFooter}>
      <Link href="/login" className={styles.loginLink}>
        로그인
      </Link>
      <Link href="/forgot" className={styles.forgotPasswordLink}>
        비밀번호찾기
      </Link>
    </div>
  );
};

export default SignUpFooter;
