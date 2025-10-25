import type { Movie } from "@/hooks/Movies"
import { Star } from "lucide-react"
import {  useLocation,Link } from "react-router-dom"

const MovieCard = ({ movie }: { movie: Movie }) => {
const location = useLocation()
  
  // Check current link before routing the the movie details
  const isInDashboard = location.pathname.startsWith("/movie-app")
  const movieLink = isInDashboard
    ? `/movie-app/movie/${movie.id}`
    : `/movie/${movie.id}`


  return (
    <Link to={movieLink}>
    <div className="flex-shrink-0 w-[160px] md:w-[190px] scroll-snap-align-start mb-5 ">
      <img
        src={movie.posterUrl}
        alt={movie.title}
        loading="lazy"
        className="rounded-2xl w-full h-[270px] object-cover"
      />
      <div className="m-2">
      <h3 className="text-sm font-semibold text-white mt-2 truncate">{movie.title}</h3>
      <p className="text-gray-400 text-xs">{movie.releaseYear}</p>
      <p className="text-yellow-400 flex gap-3"><Star size={'20'}/> <span>{movie.rating}</span></p>
      </div>
    </div>
    </Link>
  )
}

export default MovieCard
