"use client";
import React, { useEffect, useState } from "react";
import FormCreateChapter from "@/components/form-create-chapter/Form";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useRouter } from "next/navigation";

function Page() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return <p>No se ha iniciado seción.</p>;
  }

  return (
    <div>
      <FormCreateChapter />
    </div>
  );
}

export default Page;
