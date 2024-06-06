import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase/firebaseDB";
import Intro from "./(root)/intro/page";
import "./reset.css";
const page = async () => {
  const querySnapshot = await getDocs(collection(db, "user"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} =>`, doc.data()); // 직접 객체를 전달
    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`); // JSON.stringify를 사용하여 객체를 문자열로 변환
  });
  return <Intro />;
};

export default page;
