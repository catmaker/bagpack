import { firebaseDB } from "./firebaseDB";
import { getFirestore } from "firebase/firestore";

const firestore = getFirestore(firebaseDB);

export default firestore;
