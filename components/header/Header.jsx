"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose, AiOutlineMail } from "react-icons/ai";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";
import { firebaseApp } from "../../firebase/config";
import { getFirestore, getDocs, collection } from "firebase/firestore";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [admins, setAdmins] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log("Error al cerrar sesión:", error);
      });
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      // Inicia sesión con Google
      await signInWithPopup(auth, provider);
      Swal.fire({
        icon: "success",
        title: "¡Sesión iniciada correctamente!",
        text: "Bienvenido",
      });
    } catch (error) {
      console.error("Error al iniciar sesión", error);
    }
  };

  const handleNav = () => {
    setNav(!nav);
  };

  const isAdmin = () => {
    return admins?.find((admin) => {
      return admin.email === user.email;
    });
  };

  return (
    <div
      className={`fixed w-full h-20 z-[100] ${
        isScrolled && "shadow-xl bg-[#141414]"
      }`}
    >
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
        <Link href="/">
          <Image
            src="/images/logo_ova_png.png"
            alt="/"
            width="85"
            height="50"
          />
        </Link>
        <div>
          <ul className="hidden md:flex">
            <Link href="/">
              <li className="ml-10 text-sm uppercase hover:border-b">
                {" "}
                Inicio{" "}
              </li>
            </Link>
            <Link href="/chapters">
              <li className="ml-10 text-sm uppercase hover:border-b">
                {" "}
                Capitulos{" "}
              </li>
            </Link>
            {user && isAdmin() && (
              <Link href="/create-chapter">
                <li className="ml-10 text-sm uppercase hover:border-b">
                  Crear capitulo{" "}
                </li>
              </Link>
            )}
            {user ? (
              <Link href="/profile">
              <li className="ml-10 text-sm uppercase hover:border-b">
                Perfil{" "}
              </li>
            </Link>
            ) : (
              <li>
              </li>
            )}
            {user ? (
              <li className="ml-10 text-sm uppercase hover:border-b">
                <button onClick={handleLogout}>Cerrar sesión</button>
              </li>
            ) : (
              <li className="ml-10 text-sm uppercase hover:border-b">
                <button onClick={handleLogin}>Iniciar sesión</button>
              </li>
            )}
          </ul>
          <div onClick={handleNav} className="md:hidden cursor-pointer p-5">
            <AiOutlineMenu size={25} />
          </div>
        </div>
      </div>

      <div
        className={
          nav ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/70" : ""
        }
      >
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen  bg-[#141414] text-white p-10 ease-in duration-500"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
          }
        >
          <div>
            <div className="flex w-full items-center justify-between">
              <Link href="/">
                <Image
                  src="/images/logo_ova_png.png"
                  alt="/"
                  width="47"
                  height="25"
                />
              </Link>
              <div
                onClick={handleNav}
                className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer"
              >
                <AiOutlineClose />
              </div>
            </div>
            <div className="border-b border-gray-300 my-4">
              <p className="w-[85%] md:w-[90%] py-4">
                La caja de pandora - 2023
              </p>
            </div>
          </div>
          <div className="py-4 flex flex-col">
            <ul className="uppercase">
              <Link href="/">
                <li onClick={() => setNav(false)} className="py-4 text-sm">
                  {" "}
                  Inicio{" "}
                </li>
              </Link>
              <Link href="/chapters">
                <li onClick={() => setNav(false)} className="py-4 text-sm">
                  {" "}
                  Capitulos{" "}
                </li>
              </Link>
              {user && isAdmin() && (
                <Link href="/create-chapter">
                  <li onClick={() => setNav(false)} className="py-4 text-sm">
                    {" "}
                    Crear capitulo{" "}
                  </li>
                </Link>
              )}
              {user ? (
                <Link href="/profile">
                <li className="py-4 text-sm">
                {" "}
                    Perfil{" "}
                </li>
                </Link>
              ) : (
                <li>
                </li>
              )}
              {user ? (
                <li className="py-4 text-sm">
                  <button onClick={handleLogout}>Cerrar sesión</button>
                </li>
              ) : (
                <li className="py-4 text-sm">
                  <button onClick={handleLogin}>Iniciar sesión</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
