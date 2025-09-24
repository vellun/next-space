import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwOd7PX6An7WhgskfnMRlKqSpfW2vLkLw",
  authDomain: "supernova-38f76.firebaseapp.com",
  projectId: "supernova-38f76",
  storageBucket: "supernova-38f76.firebasestorage.app",
  messagingSenderId: "438802594447",
  appId: "1:438802594447:web:184a466e54c73f43e4cefa",
};

const app = initializeApp(firebaseConfig);
initializeFirestore(app, 
  {localCache: 
    persistentLocalCache({tabManager: persistentMultipleTabManager()})
  });
const db = getFirestore(app);
export { db };
