"use client"
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Search() {

    const [searchText, setSearchText] = useState("");
    const router = useRouter();
    const handleSubmit = (e) => {
        e.preventDefault()
        router.push('/chapters/?search=' + searchText)
    }
    return (
        <form className="searchContainer" onSubmit={handleSubmit}>
          <div className="searchBox">
            <input
              className="searchInput"
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Buscar capítulo"
            />
            <button className="searchButton" type="submit">
              <FaSearch size={20} />
            </button>
          </div>
        </form>
      );
}

export default Search;