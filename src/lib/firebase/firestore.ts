import { FirebaseError, initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updatePassword,
  Auth,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  setDoc,
  getDoc,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { User } from "@/types/user";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
export default app;

// 유저 추가하기
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

// 유저 로그인
export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    console.log("로그인된 사용자:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    const firebaseError = error as FirebaseError;
    console.error(
      `오류: ${firebaseError.code}, 메시지: ${firebaseError.message}`,
    );
    return null;
  }
}

// 유저 로그아웃
export async function signOutClient(): Promise<void> {
  try {
    await signOut(auth);
    console.log("사용자가 성공적으로 로그아웃되었습니다");
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error(`Firebase 로그아웃 오류: [${error.code}] ${error.message}`);
      throw new Error(`로그아웃 실패: ${error.message}`);
    } else {
      console.error("로그아웃 중 예상치 못한 오류 발생:", error);
      throw new Error("알 수 없는 오류로 로그아웃 실패");
    }
  }
}

// 유저 정보 가져오기
export async function getUser(uid: string): Promise<User> {
  const userDocRef = doc(db, "users", uid);
  const userDocSnap = await getDoc(userDocRef);
  if (userDocSnap.exists()) {
    return userDocSnap.data() as User;
  }
  throw new Error("해당 사용자가 존재하지 않습니다!");
}

// 유저 정보 확인
export function getCurrentUser(): Promise<User | null> {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        unsubscribe(); // 여러 번 호출되는 것을 방지 (한 번만 호출되도록)
        if (user) {
          try {
            const userData = await getUser(user.uid);
            resolve(userData);
          } catch (error) {
            reject(error);
          }
        } else {
          resolve(null);
        }
      },
      reject,
    );
  });
}

// 팔레트 색상 저장하기
export async function addPalette(email: string, palette: string[]) {
  const usersCollectionRef = collection(db, "users");
  const userSnapshot = await getDocs(usersCollectionRef);
  userSnapshot.docs.forEach(async (userDoc) => {
    if (userDoc.data().email === email) {
      await updateDoc(userDoc.ref, {
        palette,
        isDone: true,
      });
    }
  });
}

// 유저 포스트 추가하기
export async function addPost(
  email: string,
  post: string,
  startDate: string,
  endDate: string,
  mood: string,
  title: string,
  priority: string,
): Promise<boolean> {
  console.log(
    "포스트 추가 정보:",
    email,
    post,
    startDate,
    endDate,
    mood,
    title,
    priority,
  );
  try {
    const usersCollectionRef = collection(db, "users");
    const userSnapshot = await getDocs(usersCollectionRef);
    const updatePromises = userSnapshot.docs.map(async (userDoc) => {
      if (userDoc.data().email === email) {
        const existingPosts = userDoc.data().posts || [];
        const newPost = {
          id: Date.now().toString(),
          content: post,
          startDate,
          endDate,
          mood,
          title,
          priority,
        };
        await updateDoc(userDoc.ref, {
          posts: [...existingPosts, newPost],
        });
        return true;
      }
      return false;
    });
    const results = await Promise.all(updatePromises);
    return results.includes(true);
  } catch (error) {
    console.error("포스트 추가 중 오류 발생: ", error);
    return false;
  }
}

type Post = {
  id: string;
  content: string;
  date: string;
  mood: string;
  title: string;
  priority: string;
};

// 유저 포스트 가져오기
export async function getPosts(email: string) {
  const usersCollectionRef = collection(db, "users");
  const userSnapshot = await getDocs(usersCollectionRef);
  let posts: Post[] = [];
  userSnapshot.docs.forEach((userDoc) => {
    const { email: userEmail, posts: userPosts } = userDoc.data();
    if (userEmail === email) {
      posts = userPosts;
    }
  });
  return posts;
}

type PostById = {
  id: string;
  email: string;
};

// 유저 포스트 id로 가져오기
export async function getPostById(id: string) {
  const usersCollectionRef = collection(db, "users");
  const userSnapshot = await getDocs(usersCollectionRef);
  let foundPost: Post | null = null;
  userSnapshot.docs.forEach((userDoc) => {
    const { posts } = userDoc.data();
    if (posts) {
      const matchingPost = posts.find((postItem: any) => postItem.id === id);
      if (matchingPost) {
        foundPost = matchingPost;
      }
    }
  });
  return foundPost;
}

// 유저 포스트 수정하기
export async function updatePost(
  email: string,
  post: string,
  startDate: string,
  endDate: string,
  mood: string,
  title: string,
  id: string,
  priority: string,
) {
  try {
    const usersCollectionRef = collection(db, "users");
    const userSnapshot = await getDocs(usersCollectionRef);
    const updatePromises = userSnapshot.docs.map(async (userDoc) => {
      if (userDoc.data().email === email) {
        const existingPosts = userDoc.data().posts || [];
        const updatedPosts = existingPosts.map((existingPost: any) => {
          if (existingPost.id === id) {
            return {
              id,
              content: post,
              startDate,
              endDate,
              mood,
              title,
              priority,
            };
          }
          return existingPost;
        });
        await updateDoc(userDoc.ref, {
          posts: updatedPosts,
        });
        return true;
      }
      return false;
    });
    const results = await Promise.all(updatePromises);
    return results.includes(true);
  } catch (error) {
    console.error("포스트 수정 중 오류 발생: ", error);
    return false;
  }
}

// 유저 포스트 삭제하기
export async function deletePost(email: string, id: string) {
  try {
    const usersCollectionRef = collection(db, "users");
    const userSnapshot = await getDocs(usersCollectionRef);
    const updatePromises = userSnapshot.docs.map(async (userDoc) => {
      if (userDoc.data().email === email) {
        const existingPosts = userDoc.data().posts || [];
        const updatedPosts = existingPosts.filter(
          (existingPost: any) => existingPost.id !== id,
        );
        await updateDoc(userDoc.ref, {
          posts: updatedPosts,
        });
        return true;
      }
      return false;
    });
    const results = await Promise.all(updatePromises);
    return results.includes(true);
  } catch (error) {
    console.error("포스트 삭제 중 오류 발생: ", error);
    return false;
  }
}

// 유저 포스트 날짜 수정하기
export async function updatePostDates(
  email: string,
  id: string,
  startDate: string,
  endDate: string,
): Promise<boolean> {
  try {
    const usersCollectionRef = collection(db, "users");
    const userSnapshot = await getDocs(usersCollectionRef);
    const updatePromises = userSnapshot.docs.map(async (userDoc) => {
      if (userDoc.data().email === email) {
        const existingPosts = userDoc.data().posts || [];
        const updatedPosts = existingPosts.map((existingPost: any) => {
          if (existingPost.id === id) {
            return {
              ...existingPost,
              startDate,
              endDate,
            };
          }
          return existingPost;
        });
        await updateDoc(userDoc.ref, {
          posts: updatedPosts,
        });
        return true;
      }
      return false;
    });
    const results = await Promise.all(updatePromises);
    return results.includes(true);
  } catch (error) {
    console.error("포스트 날짜 수정 중 오류 발생: ", error);
    return false;
  }
}

// 유저 닉네임 수정하기
export async function updateUserNickname(email: string, nickname: string) {
  try {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error("해당 이메일을 가진 사용자를 찾을 수 없습니다:", email);
      return false;
    }

    const userDoc = querySnapshot.docs[0];
    await updateDoc(userDoc.ref, { nickname });

    console.log("닉네임이 성공적으로 업데이트되었습니다. 이메일:", email);
    return true;
  } catch (error) {
    console.error("사용자 닉네임 수정 중 오류 발생: ", error);
    return false;
  }
}

// 유저 비밀번호 수정하기
export async function sendPasswordReset(email: string): Promise<boolean> {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("비밀번호 재설정 이메일이 성공적으로 전송되었습니다.");
    return true;
  } catch (error) {
    console.error("비밀번호 재설정 이메일 전송 중 오류 발생: ", error);
    return false;
  }
}
