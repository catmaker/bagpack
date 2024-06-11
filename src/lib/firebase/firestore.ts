import { FirebaseError, initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  setDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 모든 유저 가져오기
type User = {
  id: string;
  email: string;
  password: string;
  created_at: string;
};
export async function getUsers() {
  const querySnapshot = await getDocs(collection(db, "users"));

  if (querySnapshot.empty) {
    console.log("No users found");
    return [];
  }

  const fetchedUsers: User[] = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());

    const user = {
      id: doc.id,
      email: doc.data().email,
      password: doc.data().password,
      created_at: doc.data().created_at.toDate(),
    };
    fetchedUsers.push(user);
  });
  return fetchedUsers;
}

// 유저 추가하기

export async function signUp(email: string, password: string) {
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
        password: password,
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
    return userCredential.user;
  } catch (error) {
    const firebaseError = error as FirebaseError;
    console.error(
      `Error: ${firebaseError.code}, Message: ${firebaseError.message}`,
    );
    return null;
  }
}

module.exports = { getUsers, signUp, signIn };
