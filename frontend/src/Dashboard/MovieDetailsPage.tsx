import {motion} from "framer-motion"
import { useParams } from "react-router-dom"
import { getMovieDetails } from "@/hooks/Movies"
import type { MoviesDetails } from "@/hooks/Movies"

import { CirclePlay, LoaderCircle, Star } from "lucide-react"
import { useEffect, useState } from "react"



const MovieDetailsPage = () => {

const {id} = useParams<{id:string}>()
const [details, setMovieDetails] = useState<MoviesDetails | undefined>(undefined)
const [error, setError] = useState<string | null>(null)


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

  if (error) {
    return <div className="min-h-screen w-full flex items-center justify-center text-white">{error}</div>
  }

  if (!details) {
    return <div className="min-h-screen w-full flex items-center justify-center text-white"> <LoaderCircle className="aminate-spin"/>Loading...</div>
  }

  return (
    <motion.div className="min-h-screen w-full" 
     initial={{ opacity: 0, y: -20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.6 }}>

      {/* Movie details */}
      <div
  className="relative bg-cover bg-center w-full min-h-[620px] "
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
</div>

      
    </motion.div>
  )
}

export default MovieDetailsPage
