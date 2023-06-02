"use client";
import Image from 'next/image'
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc} from 'firebase/firestore'
import { firebaseApp } from '../firebase/config'
import { useEffect, useState } from 'react';
import ChapterCard from '@/components/chapterCard/Card';


export default function Home() {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(firebaseApp);
      const querySnapshot = await getDocs(collection(db, 'chapters'));
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setChapters(docs);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="w-full sm:w-auto md:w-auto lg:w-auto xl:max-w-2xl">
            <ChapterCard chapter={chapter} />
          </div>
        ))}
      </div>
    </div>
  );
}