
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"



const firebaseConfig = {
  apiKey: "AIzaSyCdnvGhd3l0JBvtr8gZsuItWFJtui6VJoQ",
  authDomain: "one-note-edb17.firebaseapp.com",
  projectId: "one-note-edb17",
  storageBucket: "one-note-edb17.appspot.com",
  messagingSenderId: "427019409393",
  appId: "1:427019409393:web:0ede185baa4699af0d1650"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const notesCollection = collection (db, "notes")