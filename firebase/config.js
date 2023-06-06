import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import { AuthProvider, useAuth } from 'react-firebase-hooks/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCOHq-dHzJa5rsKdEJ8vv9ZkV4EWVpNUGI",
  authDomain: "pandora-database-a4b19.firebaseapp.com",
  projectId: "pandora-database-a4b19",
  storageBucket: "pandora-database-a4b19.appspot.com",
  messagingSenderId: "679993627531",
  appId: "1:679993627531:web:45b33724dffc61ba9cd58e"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
export const auth = getAuth();

export async function uploadFile(file) {
    const storageRef = ref(storage, file.name);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
}
