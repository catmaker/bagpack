import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export async function signUp(
  email: string,
  password: string,
  nickname: string | undefined,
) {
  if (nickname === undefined) {
    throw new Error("닉네임이 정의되지 않았습니다");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const { user } = userCredential;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        email: user.email,
        created_at: Timestamp.now(),
        isDone: false,
        nickname,
      });
    }
    return user;
  } catch (error) {
    const firebaseError = error as FirebaseError;
    console.error(
      `오류: ${firebaseError.code}, 메시지: ${firebaseError.message}`,
    );
    return null;
  }
}

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    const firebaseError = error as FirebaseError;
    console.error(
      `오류: ${firebaseError.code}, 메시지: ${firebaseError.message}`,
    );
    return null;
  }
}

export async function signOutClient(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(`로그아웃 실패: ${error.message}`);
    } else {
      throw new Error("알 수 없는 오류로 로그아웃 실패");
    }
  }
}

export async function sendPasswordReset(email: string): Promise<boolean> {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    console.error("비밀번호 재설정 이메일 전송 중 오류 발생: ", error);
    return false;
  }
}
