/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { firebaseApp } from "../../../firebase/config";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const Chapter = ({ params }) => {
  const [chapter, setChapter] = useState(null);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const db = getFirestore(firebaseApp);
        const docRef = doc(db, "chapters", params.id);
        const docSnap = await getDoc(docRef);
        setChapter(docSnap.data());
      } catch (error) {
        console.log("Error retrieving chapter:", error);
      }
    };

    fetchChapter();
  }, [params.id]);

  if (!chapter) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center mb-4 gap-4">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <img src={chapter.urlImage} alt="Chapter Image" className="w-full" />
        </div>
        <div className="rounded-lg border border-gray-300 p-4 md:w-2/3">
          <h1 className="text-3xl font-bold mb-2 text-center">
            {chapter.title}
          </h1>
          <hr className="border-t-2 border-gray-300 mb-4" />
          <p className="text-lg">{chapter.description}</p>
        </div>
      </div>
      {chapter.urlDoc && (
        <div className="mt-4">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <object
              data={chapter.urlDoc}
              className="border-none custom-object my-6"
              type="text/html"
              style={{ overflow: "hidden" }}
              height={1000}
            >
              <p>El navegador no admite la visualización de este contenido.</p>
            </object>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chapter;
