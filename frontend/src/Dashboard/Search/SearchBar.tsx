import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { CircleArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useIsMobileOrTablet } from "@/hooks/use-mobile";
import { searchMovies, type Movie } from "@/hooks/Movies";
import SearchItems from "./SearchItems";


const SearchBar = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [pageNum, setPageNum] = useState(1);
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

 

  const fetchSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setError(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await searchMovies(query, pageNum);
      setResults(data.movies);
    } catch (err) {
      setError("Failed to search movies");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [pageNum]);

   const handlepagination = (()=>{
    if (results != null){
      setPageNum(pageNum => pageNum + 1)
    }
    
  })

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
  };

  // const clearSearch = () => {
  //   setSearchQuery("");
  //   setResults([]);
  //   setError(null);
  //   if (searchInputRef.current) {
  //     searchInputRef.current.focus();
  //   }
  // };

  return (
    <div className="flex justify-between items-center w-full">
      {isMobileOrTablet ? (
        <motion.div
          initial={{ width: "2rem" }}
          animate={isSearchFocused ? { width: "80%" } : { width: "3rem" }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex-1 max-w-md"
        >
          <form onSubmit={handleSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-4 h-4" />
            <Input
              ref={searchInputRef}
              className="bg-white rounded-2xl p-2 max-w-[85%] md:min-w-100 pl-10 text-[#0A1D37]"
              type="search"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            {isLoading && (
              <div className="w-full absolute top-full left-0 z-10 bg-[#0A1D37] border-2 border-blue-950 mt-6 rounded-2xl shadow-lg max-h-110 scroll-smooth  overflow-y-auto">
                {[...Array(6)].map(() => (
                <div className=" w-full max-w-sm rounded-md border  border-blue-300 p-4">
                  <div className="flex animate-pulse space-x-4">
                    <div className="size-10 rounded-full bg-gray-200"></div>
                    <div className="flex-1 space-y-6 py-1">
                      <div className="h-2 rounded bg-gray-200"></div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                          <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                        </div>
                        <div className="h-2 rounded bg-gray-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
                                
                ))}
              </div>
            )}
            {error && (
              <div className="absolute top-full left-0 z-10 bg-white border rounded-b-2xl shadow-lg p-2 text-red-500">
                {error}
              </div>
            )}

            {/* Show the search items */}

            {results.length > 0 && (
              <div className="w-full absolute top-full left-0 z-10 border-2 bg-[#0A1D37] border-blue-950 mt-10 rounded-2xl shadow-lg max-h-110 scroll-smooth  overflow-y-auto">
                {results.map((movie) => (
                  <SearchItems key={movie.id} movie={movie} />
                ))}

                <div className="flex justify-center p-5">
                 <button onClick={handlepagination} className="flex bg-blue-950 p-2 rounded-2xl hover:scale-105"> <CircleArrowRight className=" animate-pulse mr-1"/>Load more..</button>
                </div>
              </div>
            )}
          </form>
        </motion.div>
      ) : (
        <div className="flex-1 max-w-md">
          <form onSubmit={handleSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-4 h-4" />
            <Input
              ref={searchInputRef}
              className="bg-white rounded-2xl p-2 min-w-40 md:min-w-100 pl-10 text-[#0A1D37]"
              type="search"
              placeholder="Search movies, shows..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {isLoading && (
             <div className="w-[600px] absolute top-full left-0 z-10 bg-[#0A1D37] border-2 border-blue-950 mt-6 rounded-2xl shadow-lg max-h-110 scroll-smooth  overflow-y-auto">
                {[...Array(6)].map(() => (
                <div className=" w-full max-w-sm rounded-md border  border-blue-300 p-4">
                  <div className="flex animate-pulse space-x-4">
                    <div className="size-10 rounded-full bg-gray-200"></div>
                    <div className="flex-1 space-y-6 py-1">
                      <div className="h-2 rounded bg-gray-200"></div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                          <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                        </div>
                        <div className="h-2 rounded bg-gray-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
                                
                ))}
              </div>
            )}
            {error && (
              <div className="absolute top-full left-0 z-10 bg-white border rounded-b-2xl shadow-lg p-2 text-red-500">
                {error}
              </div>
            )}
            {results.length > 0 && (
              <div className="w-[600px] absolute top-full left-0 z-10 border-2 bg-[#0A1D37] border-blue-950 mt-6 rounded-2xl shadow-lg max-h-110 scroll-smooth  overflow-y-auto">
                {results.map((movie) => (
                  <SearchItems key={movie.id} movie={movie} />
                ))}

                <div className="flex justify-center p-5">
                 <button onClick={handlepagination} className="flex bg-blue-950 p-2 rounded-2xl hover:scale-105"><CircleArrowRight className=" animate-pulse mr-1"/>Load more..</button>
                </div>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
