export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  rating: number;
  releaseYear: number;
}

interface MoviesResponse {
  movies: Movie[];
  page: number;
  totalPages: number;
  totalNo: number;
}

export interface MoviesDetails {
  genres: string[];
  id: number;
  title: string;
  description: string;
  releaseYear: string;
  rating: number;
  duration: number;
  posterUrl: string;
  backdropUrl: string
}
 



const BaseUrl = import.meta.env.VITE_BASE_URL;

console.log(BaseUrl);

export async function getMovies(category: string, page: number): Promise<MoviesResponse> {
  try {
    const response = await fetch(`${BaseUrl}/movie-info/category/${category}?page=${page}`);

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    console.log(data);
    return data; 
  } catch (error) {
    console.error("Error fetching movies: ", error);
    throw error; 
  }
}

export async function getMovieDetails(movieId:number) {
  try{
    const response = await fetch(`${BaseUrl}/movie-info/detail?movieId=${movieId}`)
    
    if(!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

      const data = await response.json();
      return data;

  } catch(error){

    console.error('Error fetching movie details: ', error)
    throw error
  }
  
}