"use client";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseApp } from "@/firebase/config";
import { useEffect, useState } from "react";
import ChapterCard from "@/components/chapterCard/Card";
import { useSearchParams } from 'next/navigation'

export default function ChaptersComponent() {
  const [chapters, setChapters] = useState([]);
  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(firebaseApp);
      const querySnapshot = await getDocs(collection(db, 'chapters'));
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
  
      if (search) {
        // Filtrar los capítulos por el valor de "search"
        const filteredChapters = docs.filter((chapter) =>
          chapter.title.toLowerCase().includes(search.toLowerCase())
        );
        setChapters(filteredChapters);
      } else {
        // Si no hay valor en "search", mostrar todos los capítulos
        setChapters(docs);
      }
    };
  
    fetchData();
  }, [search]);

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4">
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            className="w-full bg-[#141414] mb-4 rounded-lg shadow-lg hover:scale-105 sm:w-auto md:w-auto lg:w-auto xl:max-w-2xl"
          >
            <ChapterCard chapter={chapter} />
          </div>
        ))}
      </div>
    </div>
  );
}
