// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "API_KEY_HERE",
  authDomain: "AUTHDOMAIN_HERE",
  projectId: "PROJECTID_HERE",
  storageBucket: "STORAGEBUCKET_HERE",
  messagingSenderId: "MESSAGING_SENDER_ID_HERE",
  appId: "APPID_HERE",
};

// To initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
