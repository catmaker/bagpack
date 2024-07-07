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
  return new Promise((resolve) => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userData = await getUser(user.uid);
          resolve(userData);
        } catch (error) {
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
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
  date: string,
  mood: string,
): Promise<boolean> {
  console.log(email, post, date);
  const db = getFirestore();
  try {
    const userSnapshot = await getDocs(collection(db, "users"));
    const updatePromises = userSnapshot.docs.map(async (doc) => {
      if (doc.data().email === email) {
        const existingPosts = doc.data().posts || []; // 기존 포스트 배열을 가져오거나, 없으면 빈 배열 사용
        const newPost = {
          id: Date.now().toString(),
          content: post,
          date: date, // 인자로 받은 날짜 사용
          mood: mood,
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

module.exports = {
  signUp,
  signIn,
  getCurrentUser,
  getUser,
  addPalette,
  addPost,
  getPosts,
};
