/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { firebaseApp } from "../../../firebase/config";
import { auth } from "../../../firebase/config";
import Swal from "sweetalert2";
import { BsHeartFill } from "react-icons/bs";
import { VscCheckAll, VscFlame } from "react-icons/vsc";
import {
  doc,
  getDoc,
  getFirestore,
  getDocs,
  collection,
  addDoc,
  query,
  where,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import Head from "next/head";

const Chapter = ({ params }) => {
  const [user, setUser] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [likes, setLikes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [reads, setReads] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const hasUserLikedChapter = () => {
    if (user) return likes.some((read) => read.email === user.email);
  };
  const hasUserFavoritedChapter = () => {
    if (user)
      return favorites.some((favorite) => favorite.email === user.email);
  };
  const hasUserReadedChapter = () => {
    if (user) return reads.some((read) => read.email === user.email);
  };
  const [editingComment, setEditingComment] = useState({
    id: "",
    comment: "",
    usuario_name: "",
    usuario_email: "",
  });
  const [isEditing, setIsEditing] = useState(null);

  const handleEditComment = (comment) => {
    setEditingComment(comment);
    setIsEditing(comment);
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setIsEditing(null);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitComment = async () => {
    if (user) {
      try {
        const db = getFirestore(firebaseApp);
        const commentsRef = collection(db, "chapters", params.id, "comments");
        await addDoc(commentsRef, {
          usuario_name: user.displayName,
          comment: comment,
          usuario_email: user.email,
        });
        fetchCommits();
      } catch (error) {
        console.log("Error al agregar el comentario:", error);
      }
    } else {
      Swal.fire({
        icon: "info",
        title: "Debes iniciar sesión para poder comentar en los capítulos.",
        text: "",
      });
    }
    setComment(""); // Reiniciar el campo de comentario después de enviarlo
  };

  const fetchLikes = async () => {
    try {
      const db = getFirestore(firebaseApp);
      const likesCollectionRef = collection(
        doc(db, "chapters", params.id),
        "likes"
      );
      const querySnapshot = await getDocs(likesCollectionRef);
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLikes(docs);
    } catch (error) {
      console.log("Error al obtener los likes:", error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const db = getFirestore(firebaseApp);
      const favoritesCollectionRef = collection(
        doc(db, "chapters", params.id),
        "favorites"
      );
      const querySnapshot = await getDocs(favoritesCollectionRef);
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setFavorites(docs);
    } catch (error) {
      console.log("Error al obtener los favoritos:", error);
    }
  };

  const fetchReads = async () => {
    try {
      const db = getFirestore(firebaseApp);
      const readsCollectionRef = collection(
        doc(db, "chapters", params.id),
        "reads"
      );
      const querySnapshot = await getDocs(readsCollectionRef);
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setReads(docs);
    } catch (error) {
      console.log("Error al obtener los likes:", error);
    }
  };

  const fetchCommits = async () => {
    try {
      const db = getFirestore(firebaseApp);
      const commentsCollectionRef = collection(
        doc(db, "chapters", params.id),
        "comments"
      );
      const querySnapshot = await getDocs(commentsCollectionRef);
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setComments(docs);
    } catch (error) {
      console.log("Error al obtener los comentarios:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

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

  const handleLike = async () => {
    if (user) {
      if (hasUserLikedChapter()) {
        try {
          const db = getFirestore(firebaseApp);
          const likesQuery = query(
            collection(db, "chapters", params.id, "likes"),
            where("email", "==", user.email)
          );
          const likesSnapshot = await getDocs(likesQuery);
          likesSnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
          });
          fetchLikes();
        } catch (error) {
          console.log("Error al eliminar el like:", error);
        }
        return;
      }
      try {
        const db = getFirestore(firebaseApp);
        const likesRef = collection(db, "chapters", params.id, "likes");
        await addDoc(likesRef, { email: user.email });
        fetchLikes();
      } catch (error) {
        console.log("Error al agregar el like:", error);
      }
    } else {
      Swal.fire({
        icon: "info",
        title:
          "Debes iniciar sesión para poder darle me gusta a los capítulos.",
        text: "",
      });
    }
  };

  const handleFavorite = async () => {
    if (user) {
      if (hasUserFavoritedChapter()) {
        try {
          const db = getFirestore(firebaseApp);
          const favoritesQuery = query(
            collection(db, "chapters", params.id, "favorites"),
            where("email", "==", user.email)
          );
          const favoritesSnapshot = await getDocs(favoritesQuery);
          favoritesSnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
          });
          //eliminando en tabla user_favorite
          const userFavoritesQuery = query(
            collection(db, "user_favorites"),
            where("user_email", "==", user.email)
          );
          const userFavoritesSnapshot = await getDocs(userFavoritesQuery);
          userFavoritesSnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
          });
          fetchFavorites();
        } catch (error) {
          console.log("Error al eliminar el favorito:", error);
        }
        return;
      }
      try {
        const db = getFirestore(firebaseApp);
        const favoritesRef = collection(db, "chapters", params.id, "favorites");
        await addDoc(favoritesRef, { email: user.email });
        await addDoc(collection(db, "user_favorites"), {
          chapter_id: params.id,
          user_email: user.email,
        });
        fetchFavorites();
      } catch (error) {
        console.log("Error al agregar el favorito:", error);
      }
    } else {
      Swal.fire({
        icon: "info",
        title:
          "Debes iniciar sesión para poder agregar capítulos a tu lista de favoritos.",
        text: "",
      });
    }
  };

  const handleReads = async () => {
    if (user) {
      if (hasUserReadedChapter()) {
        try {
          const db = getFirestore(firebaseApp);
          const readsQuery = query(
            collection(db, "chapters", params.id, "reads"),
            where("email", "==", user.email)
          );
          const readsSnapshot = await getDocs(readsQuery);
          readsSnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
          });
          //eliminando en tabla user_read
          const userReadsQuery = query(
            collection(db, "user_reads"),
            where("user_email", "==", user.email)
          );
          const userReadsSnapshot = await getDocs(userReadsQuery);
          userReadsSnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
          });
          fetchReads();
        } catch (error) {
          console.log("Error al eliminar el leído:", error);
        }
        return;
      }
      try {
        const db = getFirestore(firebaseApp);
        const readRef = collection(db, "chapters", params.id, "reads");
        await addDoc(readRef, { email: user.email });
        await addDoc(collection(db, "user_reads"), {
          chapter_id: params.id,
          user_email: user.email,
        });
        fetchReads();
      } catch (error) {
        console.log("Error al agregar el leído:", error);
      }
    } else {
      Swal.fire({
        icon: "info",
        title:
          "Debes iniciar sesión para poder agregar capítulos a tu lista de leídos.",
        text: "",
      });
    }
  };

  const handleSaveEdit = async () => {
    try {
      const db = getFirestore(firebaseApp);
      const commentRef = doc(
        db,
        "chapters",
        params.id,
        "comments",
        editingComment.id
      );
      await updateDoc(commentRef, { comment: editingComment.comment });
      setIsEditing(null);
      fetchCommits();
    } catch (error) {
      console.log("Error al editar el comentario:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const db = getFirestore(firebaseApp);
      const commentRef = doc(db, "chapters", params.id, "comments", commentId);
      await deleteDoc(commentRef);
      fetchCommits();
    } catch (error) {
      console.log("Error al eliminar el comentario:", error);
    }
  };

  useEffect(() => {
    fetchLikes(); // Obtener los likes al cargar el capítulo inicialmente
    fetchFavorites(); // Obtener los favoritos al cargar el capítulo inicialmente
    fetchCommits(); // Obtener los comentarios al cargar el capítulo inicialmente
    fetchReads();
  }, []);

  if (!chapter) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Leer capitulo | La caja de Pandora</title>
      </Head>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-center justify-center p-2">
            <div className="flex items-center">
              <button
                className={`p-2 rounded-lg hover:scale-110 ${
                  hasUserLikedChapter() ? "text-red-500" : ""
                }`}
                onClick={handleLike}
              >
                <BsHeartFill
                  className={`${
                    hasUserLikedChapter() ? "text-red-500" : "text-white"
                  } text-2xl`}
                />
              </button>
              <div className="text-lg font-bold">Likes: {likes.length}</div>
            </div>
            <div className="flex items-center">
              <button
                className={`p-2 rounded-lg hover:scale-110 ${
                  hasUserReadedChapter() ? "text-red-500" : ""
                }`}
                onClick={handleReads}
              >
                <VscCheckAll
                  className={`${
                    hasUserReadedChapter() ? "text-blue-500" : "text-white"
                  } text-2xl`}
                />
              </button>
              <div
                className={`text-lg font-bold ${
                  hasUserReadedChapter() ? "text-blue-500" : ""
                }`}
              >
                Marcar como leído
              </div>
            </div>
            <div className="flex items-center">
              <button
                className={`p-2 rounded-lg hover:scale-110 ${
                  hasUserFavoritedChapter() ? "text-red-500" : ""
                }`}
                onClick={handleFavorite}
              >
                <VscFlame
                  className={`${
                    hasUserFavoritedChapter() ? "text-red-500" : "text-white"
                  } text-2xl`}
                />
              </button>
              <div
                className={`text-lg font-bold ${
                  hasUserFavoritedChapter() ? "text-red-500" : ""
                }`}
              >
                Marcar como favoritos
              </div>
            </div>
          </div>
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
          <div className="mt-4 flex items-center justify-center">
            <input
              type="text"
              placeholder="Escribe un comentario..."
              className="border border-gray-300 px-4 py-2 rounded-lg text-black"
              style={{
                width: "80%",
                backgroundColor: "#F3F4F6",
              }}
              value={comment}
              onChange={handleCommentChange}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2"
              onClick={handleSubmitComment}
            >
              Enviar
            </button>
          </div>
          <h2 className="text-4xl text-center mt-4 font-bold tracking-wide p-4">
            <span className="text-red-500">Comentarios</span>
          </h2>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex flex-row items-start mb-4 pt-2"
            >
              <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-gray-800 text-lg font-bold">
                  {comment.usuario_name.charAt(0)}
                </span>
              </div>
              <div className="max-w-md">
                <p className="text-gray-100 font-bold flex items-center">
                  <span className="mr-2">{comment.usuario_name}</span>
                </p>
                <p className="text-gray-500 break-words max-h-48 overflow-y-auto">
                  {comment.comment}
                </p>
                {user && comment.usuario_email === user.email && (
                  <div className="mt-2">
                    {/* Opciones para editar y eliminar comentarios */}
                    <button
                      onClick={() => handleEditComment(comment)}
                      className="text-blue-500 mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-500"
                    >
                      Eliminar
                    </button>
                  </div>
                )}
                {isEditing && isEditing.id === comment.id ? (
                  <div className="flex items-center text-black">
                    <textarea
                      defaultValue={
                        editingComment ? editingComment.comment : ""
                      }
                      onChange={(e) =>
                        setEditingComment({
                          ...editingComment,
                          comment: e.target.value,
                        })
                      }
                      className="mr-2 w-full"
                    ></textarea>
                    <button
                      onClick={handleSaveEdit}
                      className="text-blue-500 mr-2"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="text-gray-500"
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chapter;
