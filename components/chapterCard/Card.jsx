/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useState } from 'react';
import { Akaya_Kanadaka } from 'next/font/google';
 

const ChapterCard = ({ chapter }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const cardClassName = `max-w-xl rounded-lg overflow-hidden shadow-lg m-4 cursor-pointer ${
    isHovered ? 'hover:scale-105' : ''
  }`;

  return (
    <Link
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      href={{
        pathname: '/chapter/' + chapter.id,
      }}
    >
      <div className={cardClassName}>
        <img className="w-full" src={chapter.urlImage} alt="Chapter" />
        <div className="px-6 py-4">
          <div className="font-bold text-lg mb-2"><b>{chapter.title}</b></div>
          <p className="text-gray-200 text-base">{chapter.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ChapterCard;