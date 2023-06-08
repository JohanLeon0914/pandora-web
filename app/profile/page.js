/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/config";
import { firebaseApp } from "../../firebase/config";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";

const ProfileTab = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const [favorites, setFavorites] = useState([]);
  const [reads, setReads] = useState([]);
  const [favoritesChapters, setFavoriteChapters] = useState(null);
  const [readsChapters, setReadChapters] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showReads, setShowReads] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.email) {
        const db = getFirestore(firebaseApp);
        const querySnapshot = await getDocs(
          query(
            collection(db, "user_favorites"),
            where("user_email", "==", user.email)
          )
        );
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setFavorites(docs);
      }
    };

    fetchData();
  }, [user?.email]);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.email) {
        const db = getFirestore(firebaseApp);
        const querySnapshot = await getDocs(
          query(
            collection(db, "user_reads"),
            where("user_email", "==", user.email)
          )
        );
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setReads(docs);
      }
    };

    fetchData();
  }, [user?.email]);

  useEffect(() => {
    const fetchChapters = async () => {
      if (favorites.length > 0) {
        const favoriteChapterIds = favorites.map(
          (favorite) => favorite.chapter_id
        );
        const db = getFirestore(firebaseApp);
        const querySnapshot = await getDocs(collection(db, "chapters"));
        const chapters = [];
        querySnapshot.forEach((doc) => {
          chapters.push({ ...doc.data(), id: doc.id });
        });
        const favoriteChapters = chapters.filter((chapter) =>
          favoriteChapterIds.includes(chapter.id)
        );
        setFavoriteChapters(favoriteChapters);
      }

      if (reads.length > 0) {
        const readChapterIds = reads.map((read) => read.chapter_id);
        const db = getFirestore(firebaseApp);
        const querySnapshot = await getDocs(collection(db, "chapters"));
        const chapters = [];
        querySnapshot.forEach((doc) => {
          chapters.push({ ...doc.data(), id: doc.id });
        });
        const readChapters = chapters.filter((chapter) =>
          readChapterIds.includes(chapter.id)
        );
        setReadChapters(readChapters);
      }
    };

    fetchChapters();
  }, [favorites, favorites.length, reads, reads.length]);

  const handleViewFavorites = () => {
    if (showReads) {
      setShowReads(false);
    }
    setShowFavorites(true);
  };

  const handleViewReads = () => {
    if (showFavorites) {
      setShowFavorites(false);
    }
    setShowReads(true);
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!user) {
    return <p>No se ha iniciado seción.</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="bg-[#141414] rounded-lg p-8 m-2">
          <img
            src={user.photoURL ? user.photoURL : ""}
            alt="Foto de perfil"
            className="w-24 h-24 rounded-full mb-4 mx-auto"
          />
          <h2 className="text-xl text-white font-bold text-center">
            {user.displayName}
          </h2>
          <p className="text-gray-500 text-center">{user.email}</p>
          <hr className="my-4 border-gray-300" />

          <div className="flex justify-between items-center mt-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-blue-600"
              onClick={handleViewReads}
              disabled={!readsChapters}
            >
              Ver leídos
            </button>
            <span className="text-gray-500 font-bold">
              Capítulos leídos: {reads.length}
            </span>
          </div>

          <div className="flex justify-between items-center mt-2">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-blue-600"
              onClick={handleViewFavorites}
              disabled={!favoritesChapters}
            >
              Ver favoritos
            </button>
            <span className="text-gray-500 font-bold">
              Capítulos favoritos: {favorites.length}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {showFavorites ? "Favoritos" : showReads ? "Leídos" : ""}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {showFavorites &&
            (favoritesChapters.length > 0 ? (
              favoritesChapters.map((chapter) => (
                <Link
                  href={{
                    pathname: "/chapter/" + chapter.id,
                  }}
                  key={chapter.id}
                  className="bg-[#141414] rounded-lg shadow-lg hover:scale-105 text-white p-4 m-6"
                >
                  <h3 className="text-xl font-bold">{chapter.title}</h3>
                  <img
                    src={chapter.urlImage}
                    alt="Imagen del capítulo"
                    className="w-full h-auto mt-4"
                  />
                </Link>
              ))
            ) : (
              <p className="text-gray-500">
                Aún no has agregado capítulos a tu lista de favoritos
              </p>
            ))}

          {showReads &&
            (readsChapters.length > 0 ? (
              readsChapters.map((read) => (
                <Link
                  href={{
                    pathname: "/chapter/" + read.id,
                  }}
                  key={read.id}
                  className="bg-[#141414] rounded-lg shadow-lg hover:scale-105 text-white p-4 m-6"
                >
                  <h3 className="text-xl font-bold">{read.title}</h3>
                  <img
                    src={read.urlImage}
                    alt="Imagen del capítulo"
                    className="w-full h-auto mt-4"
                  />
                </Link>
              ))
            ) : (
              <p className="text-gray-500 text-center">
                Aún no has agregado capítulos a tu lista de Leídos
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
