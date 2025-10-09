import React, { useEffect, useRef, useState } from "react";
import type { Movie } from "@/hooks/Movies";
import { fetchMoviesByCategory } from "@/hooks/Movies";
import MovieCard from "@/components/MovieCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MoviesInfo = () => {
  // State for movies data for each category
  const [moviesData, setMoviesData] = useState<Record<string, Movie[]>>({
    top_rated: [],
    popular: [],
    upcoming: [],
    now_playing: []
  });
  
  // State for pagination info for each category
  const [paginationInfo, setPaginationInfo] = useState<Record<string, { page: number; totalPages: number; hasMore: boolean }>>({
    top_rated: { page: 1, totalPages: 520, hasMore: true },
    popular: { page: 1, totalPages: 500, hasMore: true },
    upcoming: { page: 1, totalPages: 50, hasMore: true },
    now_playing: { page: 1, totalPages: 100, hasMore: true }
  });
  
  // Loading states for each category
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({
    top_rated: false,
    popular: false,
    upcoming: false,
    now_playing: false
  });
  
  const sliderRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Define all movie categories
  const categories = [
    { id: "top_rated", name: "Top Rated" },
    { id: "popular", name: "Popular" },
    { id: "upcoming", name: "Upcoming" },
    { id: "now_playing", name: "Now Playing" }
  ];

  const fetchMovies = async (category: string, pageNum: number) => {
    setLoadingStates(prev => ({ ...prev, [category]: true }));
    try {
      // Fetch movies for the specified category and page
      const data = await fetchMoviesByCategory(category, pageNum);
      
      setMoviesData(prev => ({
        ...prev,
        [category]: pageNum === 1 ? data.movies : [...prev[category], ...data.movies]
      }));
      
      setPaginationInfo(prev => ({
        ...prev,
        [category]: {
          page: data.page,
          totalPages: data.totalPages,
          hasMore: data.page < data.totalPages
        }
      }));
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [category]: false }));
    }
  };

  // Load initial movies for all categories on component mount
  useEffect(() => {
    categories.forEach(category => {
      fetchMovies(category.id, 1);
    });
  }, []);

  const handleScroll = (category: string) => {
    const slider = sliderRefs.current[category];
    if (!slider || loadingStates[category]) return;

    const { scrollLeft, scrollWidth, clientWidth } = slider;
    const pagination = paginationInfo[category];
    
    // Load more when we're 90% through the current content and there's more data
    if (scrollLeft + clientWidth >= scrollWidth * 0.9 && pagination.hasMore) {
      fetchMovies(category, pagination.page + 1);
    }
  };

  const scroll = (category: string, direction: "left" | "right") => {
    const slider = sliderRefs.current[category];
    if (!slider) return;

    const scrollAmount = 500; // adjust for sensitivity
    slider.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Ref callback function for slider elements
  const setSliderRef = (category: string) => (el: HTMLDivElement | null) => {
    sliderRefs.current[category] = el;
  };

  return (
    <div className=" max-w-[100%]">
      <h1 className="text-2xl font-bold mb-6 text-white"></h1>
      
      {/* Movie sections for each category */}
      {categories.map((category) => (
        <div key={category.id} className="relative w-full pt-8 pb-4">
          <h2 className="text-xl font-bold mb-3 text-white">{category.name} Movies</h2>

          {/* Left Chevron */}
          <button
            onClick={() => scroll(category.id, "left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full z-10"
          >
            <ChevronLeft className="text-white" size={24} />
          </button>

          {/* Right Chevron */}
          <button
            onClick={() => scroll(category.id, "right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full z-10"
          >
            <ChevronRight className="text-white" size={24} />
          </button>

          {/* Slider */}
          <div
            ref={setSliderRef(category.id)}
            onScroll={() => handleScroll(category.id)}
            className="flex space-x-4 overflow-x-scroll overflow-y-hidden scrollbar-hide scroll-smooth pt-8 pb-4 w-full"
            style={{ scrollSnapType: "x mandatory" } as React.CSSProperties}
          >
            {moviesData[category.id].map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}

            {loadingStates[category.id] && (
              <div className="flex space-x-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="flex-shrink-0 w-[180px] space-y-2">
                    <Skeleton className="h-[270px] w-[180px] rounded-2xl" />
                    <Skeleton className="h-4 w-[160px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoviesInfo;