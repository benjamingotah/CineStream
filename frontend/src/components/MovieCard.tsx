import type { Movie } from "@/hooks/Movies"

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="flex-shrink-0 w-[180px] scroll-snap-align-start">
      <img
        src={movie.posterUrl}
        alt={movie.title}
        loading="lazy"
        className="rounded-2xl w-full h-[270px] object-cover"
      />
      <h3 className="text-sm font-semibold text-white mt-2 truncate">{movie.title}</h3>
      <p className="text-gray-400 text-xs">{movie.releaseYear}</p>
      <p className="text-yellow-400 text-xs">⭐ {movie.rating}</p>
    </div>
  )
}

export default MovieCard
