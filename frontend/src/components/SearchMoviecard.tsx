import type { Movie } from "@/hooks/Movies"
import { Star } from "lucide-react"
import {  useLocation,Link } from "react-router-dom"

const SearchMovieCard = ({ movie }: { movie: Movie }) => {
const location = useLocation()
  
  // Check current link before routing the the movie details
  const isInDashboard = location.pathname.startsWith("/movie-app")
  const movieLink = isInDashboard
    ? `/movie-app/movie/${movie.id}`
    : `/movie/${movie.id}`


  return (
    <Link to={movieLink}>
    <div className="flex-shrink-0 flex w-full gap-5  scroll-snap-align-start mb-5 hover:bg-gray-800 rounded-2xl mt-2">
      <img
        src={movie.posterUrl}
        alt={movie.title}
        loading="lazy"
        className="rounded-2xl w-20 h-20 object-cover"
      />
      <div className=" flex flex-col gap-2">
      <h3 className="text-sm font-semibold text-white mt-2">{movie.title}</h3>
      <div className="flex text-gray-400 text-xs gap-3">
        <h2>{'Year Released:'}</h2>
      <p className="text-gray-400 text-xs ">{movie.releaseYear}</p>
      </div>
      <p className="text-yellow-400 flex gap-3"><Star size={'17'}/> <span className="text-[14px]">{movie.rating}</span></p>
      </div>
    </div>
    </Link>
  )
}

export default SearchMovieCard
