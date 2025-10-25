import type { Movie } from "@/hooks/Movies"
import SearchMovieCard from "@/components/SearchMoviecard"

const SearchItems = ({ movie }: { movie: Movie }) => {
  return (
    <div className="p-2 bg-[#0A1D37] cursor-pointer ">
      <SearchMovieCard key={movie.id} movie={movie} />
    </div>
  )
}

export default SearchItems
