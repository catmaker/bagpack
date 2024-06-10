import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";

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

module.exports = { getUsers };

// 유저 추가하기
type saveUserProps = {
  id: string;
  email: string;
  password: string;
};
export async function saveUser({ id, email, password }: saveUserProps) {
  await addDoc(collection(db, "users"), {
    id,
    email,
    password,
    created_at: new Date(),
  });
}

module.exports = { saveUser };
