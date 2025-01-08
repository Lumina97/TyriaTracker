import { useState } from "react";
import { getTradingPostItemNames } from "../../Utils/API";
import { TTPItem } from "../../Utils/types";
import { getItemColor } from "./TPItemListingComponent";

const SearchBar = ({
  setTpItems,
}: {
  setTpItems: React.Dispatch<React.SetStateAction<TTPItem[]>>;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<TTPItem[]>([]);

  const handleSearch = async (query: string) => {
    if (query.length > 0) {
      const results = await getTradingPostItemNames(query);
      if (results) {
        setSearchResults(results);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="mb-4 w-1/3">
      <div className="relative">
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleSearch(e.target.value);
          }}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {searchResults.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
            <div className="py-1">
              {searchResults.map((result) => (
                <button
                  key={result.id}
                  className={`block w-full text-left px-4 py-2 ${getItemColor(result)} hover:bg-gray-600 focus:outline-none flex items-center`}
                  onClick={() => {
                    setTpItems([result]);
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                >
                  <img
                    src={result.icon}
                    alt={result.name}
                    className="w-6 h-6 mr-2"
                  />
                  {result.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
