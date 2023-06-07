"use client";
import React, { useEffect, useState } from "react";
import FormCreateChapter from "@/components/form-create-chapter/Form";
import { auth } from "../../firebase/config";
import { firebaseApp } from "../../firebase/config";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import Link from "next/link";

function Page() {
  const [user, setUser] = useState(null);
  const [admins, setAdmins] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(firebaseApp);
      const querySnapshot = await getDocs(collection(db, "admin"));
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setAdmins(docs);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const isAdmin = () => {
    return admins?.find((admin) => {
      return admin.email === user?.email;
    });
  };

  if (!user || !isAdmin()) {
    return(
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-xl text-red-500 mb-4">
        No tiene los permisos necesarios para acceder a esta funcionalidad.
      </p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <Link href="/">
          Volver al inicio
        </Link>
      </button>
    </div>
    )
  }

  return (
    <div>
      <FormCreateChapter />
    </div>
  );
}

export default Page;
