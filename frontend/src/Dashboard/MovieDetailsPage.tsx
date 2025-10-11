import {motion} from "framer-motion"
import { useParams } from "react-router-dom"
import { getMovieDetails } from "@/hooks/Movies"
import type { MoviesDetails } from "@/hooks/Movies"
import MovieCard from "@/components/MovieCard"
import { CirclePlay, LoaderCircle, Star } from "lucide-react"
import { useEffect, useState } from "react"
import type { Movie } from "@/hooks/Movies"
import { getSimilarMovies } from "@/hooks/Movies"
import { Skeleton } from "@/components/ui/skeleton"



const MovieDetailsPage = () => {

const {id} = useParams<{id:string}>()
const [details, setMovieDetails] = useState<MoviesDetails | undefined>(undefined)
const [error, setError] = useState<string | null>(null)
const[loading, setLoading] = useState<boolean>(true)
const [similar, setSimilar] = useState<Movie[]>([])


// movie details
useEffect(() => {
  const fetchDetails = async () => {
    try {
      if (!id || isNaN(Number(id))) {
        throw new Error('Invalid movie ID')
      }
      
      const data = await getMovieDetails(Number(id))
      setMovieDetails(data)
      setError(null)
    } catch (error) {
      console.error(error)
      setError('Failed to load movie details')
    }
  }

  if (id) fetchDetails()
}, [id])

// get similar movies
useEffect(()=>{
  const fetchSimilarMovies = async ()=>{
    try{
      setLoading(true)
      const data = await getSimilarMovies(Number(id))
      setSimilar(data.movies || [])
    }catch(error){
     console.error("Error fetching similar movies...", error)
    }finally{
      setLoading(false)
    }
    }
    if(id) fetchSimilarMovies()
},[id])

  if (error) {
    return <div className="min-h-full w-full flex items-center justify-center text-white">{error}</div>
  }

  if (!details) {
    return <div className="min-h-screen w-full flex items-center justify-center text-white"> <LoaderCircle className="animate-spin"/>Loading...</div>
  }

  return (
    <motion.div className="min-h-screen w-full bg-[#030d1b]" 
          initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }} >

      {/* Movie details */}
      <div
  className="relative bg-cover bg-center w-full min-h-[600px] "
  style={{ backgroundImage: `url(${details.backdropUrl})`, }}
> 
  <div className="absolute inset-0 flex items-center gap-4 flex-col md:flex-row
                  bg-gradient-to-r from-black/90 via-black/50 to-black/90 
                  backdrop-blur-[2px]">
    <div className="ml-4">
      <img className="h-110 w-100 rounded-2xl hidden md:block" src={details.posterUrl} alt={details.title}  loading="lazy"
      />
    </div>

    <div className="h-full w-full ">
      {/* Title */}
      <h6 className="text-white text-3xl md:text-4xl font-bold md:mt-10 p-5">{details.title}</h6>

      {/* Genre */}
      {details.genres && details.genres.map((genre) => (
        <button className="text-white px-3 md:px-5 bg-orange-500 rounded-2xl m-3 p-0.5 " key={genre}>
          {genre}
        </button>
      ))}

      {/* Play button */}

      <div className="flex  items-center flex-col justify-center mt-10 md:flex md:mr-50">
        <CirclePlay className="hover:scale-120 transition duration-100 animate-bounce" size={'50'} color={'oklch(70.5% 0.213 47.604)'}/> <span className="text-white mt-2 ">Watch Movie</span>
      </div>
      
      {/* Rating , Release year, Duration */}

      <div className="flex flex-row gap-10 mt-8 p-4 md:mt-5 text-gray-200">
        <p className="text-white flex gap-2"><Star size={'20'} color="oklch(70.5% 0.213 47.604)"/>{details.rating}</p> |

        <p className="text-gray-200 flex"><span className="hidden md:block">Year:  </span> {details.releaseYear}</p> |
        <p className="text-gray-200 flex"><span className="hidden md:block">Duration: </span> {details.duration} mins</p>
      </div>

      {/* Description */}
      <p className="text-gray-200 md:mt-2 text-[13px]  md:mr-4 m-2">{details.description}</p>


     
    </div>
  </div>

  </div >
  {/* Similar movies */}
  
  <div><h6 className="text-white mt-10 text-2xl p-4">Watch Similar Movies</h6></div>
  <div className="grid grid-cols-2 ml-3 mt-5 p-1 md:grid-cols-4 md:p-5 scroll-auto snap-y">
   {similar.map(movie => (
  <MovieCard key={movie.id} movie={movie} />
))}

{loading && (
              <div className="flex space-x-4">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="flex-shrink-0 w-[180px] space-y-2">
                    <Skeleton className="h-[270px] w-[180px] rounded-2xl" />
                    <Skeleton className="h-4 w-[160px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                ))}
              </div>
            )}
</div>

      
    </motion.div>
  )
}

export default MovieDetailsPage
