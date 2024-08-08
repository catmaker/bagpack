import { FirebaseError, initializeApp } from "firebase/app";
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
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  Auth,
} from "firebase/auth";

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

const db = getFirestore(app);
export default app;
// 모든 유저 가져오기
type User = {
  id: string;
  email: string;
  password: string;
  created_at: string;
  isDone: boolean;
  palette?: string[];
  nickname: string;
};

// 유저 추가하기
export async function signUp(
  email: string,
  password: string,
  nickname: string | undefined,
) {
  if (nickname === undefined) {
    throw new Error("Nickname cannot be undefined");
  }

  const auth = getAuth();
  const db = getFirestore();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    if (user) {
      const userDoc = doc(db, "users", user.uid);
      await setDoc(userDoc, {
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
      `Error: ${firebaseError.code}, Message: ${firebaseError.message}`,
    );
    return null;
  }
}
// 유저 로그인
export async function signIn(email: string, password: string) {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    console.log(userCredential.user);
    return userCredential.user;
  } catch (error) {
    const firebaseError = error as FirebaseError;
    console.error(
      `Error: ${firebaseError.code}, Message: ${firebaseError.message}`,
    );
    return null;
  }
}
// 유저 로그아웃
export async function signOutClient(): Promise<void> {
  let auth: Auth;

  try {
    auth = getAuth();
  } catch (error) {
    console.error("Failed to initialize Firebase Auth:", error);
    throw new Error("Firebase 인증 초기화 실패");
  }

  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error(
        `Firebase sign out error: [${error.code}] ${error.message}`,
      );
      throw new Error(`로그아웃 실패: ${error.message}`);
    } else {
      console.error("Unexpected error during sign out:", error);
      throw new Error("알 수 없는 오류로 로그아웃 실패");
    }
  }
}
// 유저 정보 가져오기
export async function getUser(uid: string): Promise<User> {
  const db = getFirestore();
  const docSnap = await getDoc(doc(db, "users", uid));
  if (docSnap.exists()) {
    return docSnap.data() as User;
  } else {
    throw new Error("No such user!");
  }
}
// 유저 정보 확인
export function getCurrentUser(): Promise<User | null> {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        unsubscribe(); // 여러 번 호출되는거 방지 (한 번만 호출되도록)
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
  const db = getFirestore();
  const userSnapshot = await getDocs(collection(db, "users"));
  userSnapshot.docs.forEach(async (doc) => {
    if (doc.data().email === email) {
      await updateDoc(doc.ref, {
        palette: palette,
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
): Promise<boolean> {
  console.log(email, post, startDate, endDate, mood, title);
  const db = getFirestore();
  try {
    const userSnapshot = await getDocs(collection(db, "users"));
    const updatePromises = userSnapshot.docs.map(async (doc) => {
      if (doc.data().email === email) {
        const existingPosts = doc.data().posts || []; // 기존 포스트 배열을 가져오거나, 없으면 빈 배열 사용
        const newPost = {
          id: Date.now().toString(),
          content: post,
          startDate: startDate, // 인자로 받은 날짜 사용
          endDate: endDate,
          mood: mood,
          title: title,
        }; // 새 포스트 객체 생성
        await updateDoc(doc.ref, {
          posts: [...existingPosts, newPost], // 기존 포스트 배열에 새 포스트 추가
        });
        return true; // 성공적으로 업데이트 되었을 때 true 반환
      }
      return false; // 해당 이메일을 가진 문서가 아닐 경우 false 반환
    });
    const results = await Promise.all(updatePromises); // 모든 업데이트 작업을 병렬로 처리
    return results.includes(true); // 하나라도 업데이트에 성공했다면 true 반환
  } catch (error) {
    console.error("Error adding post: ", error);
    return false; // 예외 발생 시 false 반환
  }
}
type Post = {
  id: string;
  content: string;
  date: string;
  mood: string;
  title: string;
};

// 유저 포스트 가져오기
export async function getPosts(email: string) {
  const db = getFirestore();
  const userSnapshot = await getDocs(collection(db, "users"));
  let posts: Post[] = [];
  userSnapshot.docs.forEach((doc) => {
    if (doc.data().email === email) {
      posts = doc.data().posts;
    }
  });
  return posts;
}

type PostById = {
  id: string;
  email: string;
};
// 유저 포스트 id로 가져오기
export async function getPostById(id: string, email: string) {
  const db = getFirestore();
  const userSnapshot = await getDocs(collection(db, "users"));
  let post: Post | null = null;
  userSnapshot.docs.forEach((doc) => {
    if (doc.data().email === email) {
      const posts = doc.data().posts;
      if (posts) {
        post = posts.find((post: any) => post.id === id) || null;
      }
    }
  });
  return post;
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
) {
  const db = getFirestore();
  try {
    const userSnapshot = await getDocs(collection(db, "users"));
    const updatePromises = userSnapshot.docs.map(async (doc) => {
      if (doc.data().email === email) {
        const existingPosts = doc.data().posts || [];
        const updatedPosts = existingPosts.map((existingPost: any) => {
          if (existingPost.id === id) {
            return {
              id,
              content: post,
              startDate,
              endDate,
              mood,
              title,
            };
          }
          return existingPost;
        });
        await updateDoc(doc.ref, {
          posts: updatedPosts,
        });
        return true;
      }
      return false;
    });
    const results = await Promise.all(updatePromises);
    return results.includes(true);
  } catch (error) {
    console.error("Error updating post: ", error);
    return false;
  }
}

// 유저 포스트 삭제하기
export async function deletePost(email: string, id: string) {
  const db = getFirestore(); // Firebase db 가져오기
  try {
    const userSnapshot = await getDocs(collection(db, "users")); // users 컬렉션의 모든 문서 가져오기
    const updatePromises = userSnapshot.docs.map(async (doc) => {
      // 모든 문서에 대해 반복
      if (doc.data().email === email) {
        // 이메일이 일치하는 문서 찾기
        const existingPosts = doc.data().posts || []; // 해당 문서의 포스트 배열 가져오기
        const updatedPosts = existingPosts.filter(
          // 삭제할 포스트를 제외한 새로운 포스트 배열 생성
          (existingPost: any) => existingPost.id !== id, // id가 일치하지 않는 포스트만 남김
        );
        await updateDoc(doc.ref, {
          // 새로운 포스트 배열로 문서 업데이트
          posts: updatedPosts,
        });
        return true;
      }
      return false;
    });
    const results = await Promise.all(updatePromises); // 모든 업데이트 작업을 병렬로 처리
    return results.includes(true); // 하나라도 업데이트에 성공했다면 true 반환
  } catch (error) {
    console.error("Error deleting post: ", error);
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
  const db = getFirestore();
  try {
    const userSnapshot = await getDocs(collection(db, "users"));
    const updatePromises = userSnapshot.docs.map(async (doc) => {
      if (doc.data().email === email) {
        const existingPosts = doc.data().posts || [];
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
        await updateDoc(doc.ref, {
          posts: updatedPosts,
        });
        return true;
      }
      return false;
    });
    const results = await Promise.all(updatePromises);
    return results.includes(true);
  } catch (error) {
    console.error("Error updating post dates: ", error);
    return false;
  }
}

module.exports = {
  signUp,
  signIn,
  getCurrentUser,
  getUser,
  addPalette,
  addPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  updatePostDates,
  signOutClient,
};
