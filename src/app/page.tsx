import React from "react";
import "./reset.css";
import "./globals.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase/firebaseDB";
import Intro from "./(root)/intro/page";
const page = async () => {
  return <Intro />;
};

export default page;
