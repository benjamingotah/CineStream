import { useEffect, useRef, useState, useCallback, } from "react";
import { motion } from "framer-motion";
import {  Search } from "lucide-react";
// import { Input } from "@/components/ui/input";
import { useIsMobileOrTablet } from "@/hooks/use-mobile";
import { searchMovies, type Movie } from "@/hooks/Movies";
import SearchItems from "./SearchItems";
import SearchMovieCard from "@/components/SearchMoviecard";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  // const [pageNum, setPageNum] = useState(1);
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate()
 

  const fetchSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setError(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await searchMovies(query, 1);
      setResults(data.movies);
    } catch (err) {
      setError("Failed to search movies");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
    
  }, []);

  //  const handlepagination = (()=>{
  //   if (results != null){
  //     setPageNum(pageNum => pageNum + 1)
  //   }
    
  // })

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchSearch(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, fetchSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSearch(searchQuery);
    setSearchQuery("")
  };


  return (
    <div className="flex justify-between items-center w-full">
      {isMobileOrTablet ? (
        <motion.div
          initial={{ width: "2rem" }}
          animate={isSearchFocused ? { width: "80%" } : { width: "3rem" }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex-1 max-w-md"
        >
          <form onSubmit={handleSubmit} className="relative w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-4 h-4" />
                  <input
                    ref={searchInputRef}
                    className="bg-[#ffffff] rounded-2xl p-2 pl-10 text-[#0A1D37] w-full"
                    type="search"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  />
                </div>
                
                {/* Search Results Dropdown */}
                {isSearchFocused && (
                  <div className="absolute w-[300px] top-full  z-50 bg-[#0A1D37] border-2 border-blue-950 mt-4 rounded-2xl shadow-lg max-h-96 overflow-y-auto">
                    {isLoading && (
                      <div className="p-4 text-center text-gray-400">
                        Searching...
                      </div>
                    )}
                    {error && (
                      <div className="p-4 text-center text-red-400">
                        {error}
                      </div>
                    )}
                    {!isLoading && !error && results.length === 0 && searchQuery && (
                      <div className="p-4 text-center text-gray-400">
                        No results found
                      </div>
                    )}

                    {results.map((movie) => (
                      <div key={movie.id} className="p-2  cursor-pointer" onClick={()=>{
                        setIsSearchFocused(false)
                        setSearchQuery('')
                      }}>
                        <SearchMovieCard movie={movie} />
                        
                      </div>
                    ))}
                    {/* <div className="flex justify-center p-5">
                 <button onClick={handlepagination} className="flex bg-blue-950 p-2 rounded-2xl hover:scale-105"><CircleArrowRight className=" animate-pulse mr-1"/>Load more..</button>
                </div> */}
                  </div>
                )}
              </form>
        </motion.div>
      ) : (<motion.div
          initial={{ width: "2rem" }}
          animate={isSearchFocused ? { width: "80%" } : { width: "3rem" }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex-1 max-w-md"
        >
          <form onSubmit={handleSubmit} className="relative w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-4 h-4" />
                  <input
                    ref={searchInputRef}
                    className="bg-white rounded-2xl p-2 pl-10 text-[#0A1D37] w-full"
                    type="search"
                    placeholder="Search movies, shows..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  />
                </div>
                
                {/* Search Results Dropdown */}
                {isSearchFocused && (
                  <div className="absolute w-[500px] top-full  z-50 bg-[#0A1D37] border-2 border-blue-950 mt-4 rounded-2xl shadow-lg max-h-96 overflow-y-auto">
                    {isLoading && (
                      <div className="p-4 text-center text-gray-400">
                        Searching...
                      </div>
                    )}
                    {error && (
                      <div className="p-4 text-center text-red-400">
                        {error}
                      </div>
                    )}
                    {!isLoading && !error && results.length === 0 && searchQuery && (
                      <div className="p-4 text-center text-gray-400">
                        No results found
                      </div>
                    )}

                    {results.map((movie) => (
                      <div key={movie.id} className="p-2 cursor-pointer" onClick={() => {
                        navigate(`/movie-app/movie/${movie.id}`)
                        setIsSearchFocused(false)
                        setSearchQuery("")
                      }}>
                        <SearchItems movie={movie} />
                      </div>
                    ))}
                  </div>
                )}
              </form>
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;
