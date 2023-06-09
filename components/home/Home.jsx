"use client"
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import charaptertsJson from "../../public/jsons/charapters.json";
import wordJson from "../../public/jsons/world.json";

export default function Home() {
  const [charapters, setCharapters] = useState(charaptertsJson);
  const [worldPlaces, setWorldPlaces] = useState(wordJson);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-6xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center md:justify-start">
            <img
              src="/images/pandora-inicio.jpg"
              alt="Imagen de inicio"
              className="w-full md:max-w-96 h-auto rounded-full md:rounded-none"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl mt-4 font-bold tracking-wide">
              La <span className="text-red-500">caja</span> de{" "}
              <span className="text-red-500">pandora</span> - 2023
            </h1>
            <hr className="border-t-2 border-gray-300 m-2" />
            <p className="text-lg mt-2">
              ¡Bienvenidos a la página web oficial de una emocionante y fresca
              serie literaria! Prepárense para adentrarse en un mundo
              fragmentado por la tragedia y la búsqueda de redención. En esta
              página web, encontrarán los apasionantes capítulos de la serie,
              publicados regularmente. Además, podrán conocer información
              exclusiva sobre los personajes y el mundo en el que se
              desenvuelven. Únanse a nuestra comunidad de lectores y compartan
              sus teorías y emociones en los comentarios. Su apoyo y entusiasmo
              son nuestro motor para seguir escribiendo esta emocionante
              historia.
            </p>
          </div>
        </div>
        {/* sinopsis */}
        <div className="max-w-7xl mx-auto pt-8 pb-2">
          <div
            className="flex flex-col md:flex-row bg-[#141414] text-white w-[100%] 
          rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            <div className="md:w-1/3 p-4">
              <img
                src="/images/caja-pandora-2.jpg"
                alt="Imagen de la sinopsis"
                className="w-full h-auto rounded-lg"
                style={{ padding: "0.75rem" }}
              />
            </div>
            <div className="md:w-2/3 p-6">
              <h2 className="text-2xl font-bold mb-4 text-center">Sinopsis</h2>
              <p>
                En un mundo donde la humanidad vivía en paz e ignorancia de los
                males del odio, la guerra, el hambre y la enfermedad, todo
                cambia cuando Pandora, desobedeciendo a los dioses, libera estos
                males al abrir una caja maldita. La humanidad se sumerge en el
                caos, viviendo aislada y en guerra constante consigo misma y los
                demonios que fueron liberados. En medio de este panorama
                desolador, Pandora, atormentada por su culpa, decide emprender
                un viaje en busca de redención. Recorre los reinos de Tanato,
                Iso y Miria, enfrentándose a los peligros y desafíos que acechan
                en cada territorio. Mientras se adentra en este mundo devastado,
                se encuentra con refugiados desesperados y presencia el
                sufrimiento causado por los males liberados.
              </p>
            </div>
          </div>
        </div>
        {/* personajes */}
        <div className="max-w-7xl mx-auto pt-8 pb-2" id="charapters">
          <h2 className="text-4xl text-center mt-4 font-bold tracking-wide">
            Conoce a los <span className="text-red-500">personajes</span>
          </h2>
          <hr className="border-t-2 border-gray-300 m-2" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
            {charapters.map((charapter) => {
              return (
                <div
                  className="bg-[#141414] rounded-lg shadow-lg hover:scale-105 text-white"
                  key={charapter.id}
                >
                  <img
                    src={charapter.imageUrl}
                    alt={charapter.name}
                    className="w-full h-auto rounded-t-lg"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-4 text-center">
                      {charapter.name}
                    </h2>
                    <p>{charapter.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Mundo */}
        <div className="max-w-7xl mx-auto pt-8 pb-2" id="world">
          <h2 className="text-4xl text-center mt-4 font-bold tracking-wide">
            Conoce al <span className="text-red-500">mundo</span>
          </h2>
          <hr className="border-t-2 border-gray-300 m-2" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
            {worldPlaces.map((worldPlace) => {
              return (
                <div
                  className="bg-[#141414] rounded-lg shadow-lg hover:scale-105 text-white"
                  key={worldPlace.id}
                >
                  <img
                    src={worldPlace.imageUrl}
                    alt={worldPlace.name}
                    className="w-full h-auto rounded-t-lg"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-4 text-center">
                      {worldPlace.name}
                    </h2>
                    <p>{worldPlace.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

