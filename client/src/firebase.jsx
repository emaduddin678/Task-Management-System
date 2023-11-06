import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuuitCJugL9k8LuVSLjF-T2UqBaqHwlrY",
  authDomain: "task-management-app-9f99e.firebaseapp.com",
  projectId: "task-management-app-9f99e",
  storageBucket: "task-management-app-9f99e.appspot.com",
  messagingSenderId: "417924005640",
  appId: "1:417924005640:web:977aa367f9d636e25a36bd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;