import styles from "./SignUpHeader.module.scss";

const SignUpHeader = () => {
  return (
    <div className={styles.signUpHeaderContainer}>
      <h1 className={styles.appTitle}>
        <span>T</span>
        <span>i</span>
        <span>m</span>
        <span>e</span> <span>I</span>
        <span>n</span>
        <span>K</span>
      </h1>
      <p className={styles.signUpPrompt}>Create your new account</p>
    </div>
  );
};

export default SignUpHeader;
