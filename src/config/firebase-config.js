import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBFQzAjygE-L2fnOBJIt96wITThuDrZs7Q",
  authDomain: "rezzident-bc32f.firebaseapp.com",
  projectId: "rezzident-bc32f",
  storageBucket: "rezzident-bc32f.appspot.com",
  messagingSenderId: "476405407677",
  appId: "1:476405407677:web:8d375d7da9fafa3e977cd4"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
