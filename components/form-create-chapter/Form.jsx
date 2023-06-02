"use client";
import { useState } from "react";
import { uploadFile, firebaseApp } from '../../firebase/config'
import {getFirestore, collection, addDoc} from 'firebase/firestore'
const db = getFirestore(firebaseApp)

const FormCreateChapter = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [doc, setDoc] = useState(null);
  const [urlImage, setUrlImage] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDocChange = (e) => {
    const file = e.target.files[0];
    setDoc(file);
  };

  const handleurlImageChange = (e) => {
    setUrlImage(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const docUrl = await uploadFile(doc);
        const chapter = {
            title: title,
            description: description,
            urlDoc: docUrl,
            urlImage: urlImage
        }
        await addDoc(collection(db, "chapters"), {
            ...chapter
        })
      } catch (error) {
        console.log(error);
      }
    setTitle("");
    setDescription("");
    setDoc(null);
    setUrlImage("");
  };

  return (
    <div className="flex flex-col items-center h-screen text-black">
    <h1 className="text-2xl font-semibold mb-4">Create chapter form</h1>
    <div className="flex justify-center">
      <form className="w-96" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 font-semibold text-gray-700">
            Títle
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2 font-semibold text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={description}
            onChange={handleDescriptionChange}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="doc" className="block mb-2 font-semibold text-gray-700">
            Document
          </label>
          <input
            type="file"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            onChange={handleDocChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="urlImage" className="block mb-2 font-semibold text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            id="urlImage"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={urlImage}
            onChange={handleurlImageChange}
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default FormCreateChapter;
