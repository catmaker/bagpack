import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "./firebaseConfig";
import type { User } from "@/types/user";
import type { Post } from "@/types/schedule";
export async function getUser(uid: string): Promise<User> {
  const userDocRef = doc(db, "users", uid);
  const userDocSnap = await getDoc(userDocRef);
  if (userDocSnap.exists()) {
    return {
      id: uid,
      profilePictureUrl: userDocSnap.data().profilePictureUrl,
      ...userDocSnap.data(),
    } as User;
  }
  throw new Error("해당 사용자가 존재하지 않습니다!");
}

export function getCurrentUser(): Promise<User | null> {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        unsubscribe();
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

export async function addPost(
  email: string,
  post: string,
  startDate: string,
  endDate: string,
  mood: string,
  title: string,
  priority: string,
): Promise<boolean> {
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

    return true;
  } catch (error) {
    console.error("사용자 닉네임 수정 중 오류 발생: ", error);
    return false;
  }
}
