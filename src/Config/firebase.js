import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAv4EFdM4u6tx6has8GjXLvaYBCYTt-zhI",
  authDomain: "psicomaradei.firebaseapp.com",
  projectId: "psicomaradei",
  storageBucket: "psicomaradei.appspot.com",
  messagingSenderId: "905820878627",
  appId: "1:905820878627:web:6ff317829706c4cc3d7e96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});


