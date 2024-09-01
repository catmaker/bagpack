import { FirebaseError, initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  Auth,
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
// 모든 유저 가져오기

// 유저 추가하기
export async function signUp(
  email: string,
  password: string,
  nickname: string | undefined,
) {
  if (nickname === undefined) {
    throw new Error("Nickname cannot be undefined");
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
      `Error: ${firebaseError.code}, Message: ${firebaseError.message}`,
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
  const userDocRef = doc(db, "users", uid);
  const userDocSnap = await getDoc(userDocRef);
  if (userDocSnap.exists()) {
    return userDocSnap.data() as User;
  }
  throw new Error("No such user!");
}
// 유저 정보 확인
export function getCurrentUser(): Promise<User | null> {
  return new Promise((resolve, reject) => {
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
  console.log(email, post, startDate, endDate, mood, title, priority);
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
    console.error("Error adding post: ", error);
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
  let foundPost: Post | null = null; // 'post'를 'foundPost'로 변경
  userSnapshot.docs.forEach((userDoc) => {
    const { posts } = userDoc.data();
    if (posts) {
      const matchingPost = posts.find((postItem: any) => postItem.id === id); // 'post'를 'postItem'으로 변경
      if (matchingPost) {
        foundPost = matchingPost; // 'post'를 'foundPost'로 변경
      }
    }
  });
  return foundPost; // 'post'를 'foundPost'로 변경
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
    console.error("Error updating post: ", error);
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
    console.error("Error updating post dates: ", error);
    return false;
  }
}
