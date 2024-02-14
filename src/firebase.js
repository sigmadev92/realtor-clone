// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmCJDplzcvkc6G9Lhi7JP6NK-sKRjZcsk",
  authDomain: "realtor-clone-project-bc4f2.firebaseapp.com",
  projectId: "realtor-clone-project-bc4f2",
  storageBucket: "realtor-clone-project-bc4f2.appspot.com",
  messagingSenderId: "1041250862401",
  appId: "1:1041250862401:web:213932df58311d6ca50dc0"
};

// Initialize Firebase
  initializeApp(firebaseConfig);
  export const db = getFirestore();