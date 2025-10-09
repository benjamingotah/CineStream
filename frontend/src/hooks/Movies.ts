export type Movie = {
  id: number;
  posterUrl: string;
  rating: number;
  releaseYear: string;
  title: string;
}

export type MoviesResponse = {
  page: number;
  totalPages: number;
  totalNo?: number;
  movies: Movie[];
}

// Generate more mock movies for pagination
const generateMockMovies = (startId: number, count: number, category: string): Movie[] => {
  const titles = [
    "The Adventure Begins", "Night in Paris", "Ocean's Secret", "Mountain High", 
    "City Lights", "Desert Rose", "Forest Path", "Winter Tale", "Summer Breeze",
    "Autumn Leaves", "Spring Awakening", "Midnight Run", "Sunset Boulevard",
    "Northern Lights", "Southern Comfort", "Eastern Promise", "Western Gold",
    "Island Dreams", "Valley of Shadows", "Peak Performance", "Deep Blue Sea",
    "Red Horizon", "Green Mile", "Blue Velvet", "Yellow Brick Road", "Purple Rain",
    "Black Swan", "White Christmas", "Silver Linings", "Golden Gate", "Crystal Lake",
    "Emerald City", "Ruby Tuesday", "Diamond Sky", "Platinum Blonde", "Copper Canyon"
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: startId + i,
    posterUrl: `https://image.tmdb.org/t/p/original/${category}_${i}.jpg`,
    rating: parseFloat((7 + Math.random() * 2).toFixed(1)),
    releaseYear: `${2000 + Math.floor(Math.random() * 24)}`,
    title: `${titles[i % titles.length]} ${Math.floor(Math.random() * 100)}`
  }));
};

// Mock API simulation that matches the endpoint structure
const topRatedMovies: Record<number, MoviesResponse> = {
  1: {
    page: 1,
    totalPages: 520,
    totalNo: 10389,
    movies: [
      {
        id: 278,
        posterUrl: "https://image.tmdb.org/t/p/original/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
        rating: 8.712,
        releaseYear: "1994",
        title: "The Shawshank Redemption"
      },
      {
        id: 238,
        posterUrl: "https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        rating: 8.686,
        releaseYear: "1972",
        title: "The Godfather"
      },
      {
        id: 240,
        posterUrl: "https://image.tmdb.org/t/p/original/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg",
        rating: 8.571,
        releaseYear: "1974",
        title: "The Godfather Part II"
      },
      {
        id: 424,
        posterUrl: "https://image.tmdb.org/t/p/original/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
        rating: 8.566,
        releaseYear: "1993",
        title: "Schindler's List"
      },
      {
        id: 389,
        posterUrl: "https://image.tmdb.org/t/p/original/ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg",
        rating: 8.549,
        releaseYear: "1957",
        title: "12 Angry Men"
      },
      {
        id: 129,
        posterUrl: "https://image.tmdb.org/t/p/original/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
        rating: 8.535,
        releaseYear: "2001",
        title: "千と千尋の神隠し"
      },
      {
        id: 155,
        posterUrl: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        rating: 8.523,
        releaseYear: "2008",
        title: "The Dark Knight"
      },
      {
        id: 19404,
        posterUrl: "https://image.tmdb.org/t/p/original/2CAL2433ZeIihfX1Hb2139CX0pW.jpg",
        rating: 8.5,
        releaseYear: "1995",
        title: "दिलवाले दुल्हनिया ले जायेंगे"
      },
      {
        id: 497,
        posterUrl: "https://image.tmdb.org/t/p/original/o0lO84GI7qrG6XFvtsPOSV7CTNa.jpg",
        rating: 8.503,
        releaseYear: "1999",
        title: "The Green Mile"
      },
      {
        id: 496243,
        posterUrl: "https://image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        rating: 8.498,
        releaseYear: "2019",
        title: "기생충"
      },
      {
        id: 122,
        posterUrl: "https://image.tmdb.org/t/p/original/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
        rating: 8.489,
        releaseYear: "2003",
        title: "The Lord of the Rings: The Return of the King"
      },
      {
        id: 680,
        posterUrl: "https://image.tmdb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg",
        rating: 8.487,
        releaseYear: "1994",
        title: "Pulp Fiction"
      },
      {
        id: 372058,
        posterUrl: "https://image.tmdb.org/t/p/original/q719jXXEzOoYaps6babgKnONONX.jpg",
        rating: 8.479,
        releaseYear: "2016",
        title: "君の名は。"
      },
      {
        id: 429,
        posterUrl: "https://image.tmdb.org/t/p/original/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg",
        rating: 8.465,
        releaseYear: "1966",
        title: "Il buono, il brutto, il cattivo"
      },
      {
        id: 13,
        posterUrl: "https://image.tmdb.org/t/p/original/9wlYJy01XgvIhdf651FgyJkau07.jpg",
        rating: 8.465,
        releaseYear: "1994",
        title: "Forrest Gump"
      },
      {
        id: 157336,
        posterUrl: "https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        rating: 8.461,
        releaseYear: "2014",
        title: "Interstellar"
      },
      {
        id: 769,
        posterUrl: "https://image.tmdb.org/t/p/original/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
        rating: 8.5,
        releaseYear: "1990",
        title: "GoodFellas"
      },
      {
        id: 346,
        posterUrl: "https://image.tmdb.org/t/p/original/lOMGc8bnSwQhS4XyE1S99uH8NXf.jpg",
        rating: 8.452,
        releaseYear: "1954",
        title: "七人の侍"
      },
      {
        id: 12477,
        posterUrl: "https://image.tmdb.org/t/p/original/k9tv1rXZbOhH7eiCk378x61kNQ1.jpg",
        rating: 8.448,
        releaseYear: "1988",
        title: "火垂るの墓"
      },
      {
        id: 637,
        posterUrl: "https://image.tmdb.org/t/p/original/mfnkSeeVOBVheuyn2lo4tfmOPQb.jpg",
        rating: 8.441,
        releaseYear: "1997",
        title: "La vita è bella"
      }
    ]
  },
  2: {
    page: 2,
    totalPages: 520,
    totalNo: 10389,
    movies: generateMockMovies(1000, 20, "top_rated")
  },
  3: {
    page: 3,
    totalPages: 520,
    totalNo: 10389,
    movies: generateMockMovies(2000, 20, "top_rated")
  }
};

const popularMovies: Record<number, MoviesResponse> = {
  1: {
    page: 1,
    totalPages: 500,
    totalNo: 10000,
    movies: [
      {
        id: 603,
        posterUrl: "https://image.tmdb.org/t/p/original/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        rating: 8.7,
        releaseYear: "1999",
        title: "The Matrix"
      },
      {
        id: 857,
        posterUrl: "https://image.tmdb.org/t/p/original/2lBOQK06tTMPJVvqexJi6JtXk22.jpg",
        rating: 8.2,
        releaseYear: "1995",
        title: "Toy Story"
      },
      {
        id: 299536,
        posterUrl: "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
        rating: 8.4,
        releaseYear: "2018",
        title: "Avengers: Infinity War"
      },
      {
        id: 120,
        posterUrl: "https://image.tmdb.org/t/p/original/vqy3o2G6znB5HDi9y4EdxM9k2mE.jpg",
        rating: 8.5,
        releaseYear: "1994",
        title: "The Lion King"
      },
      {
        id: 122,
        posterUrl: "https://image.tmdb.org/t/p/original/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
        rating: 8.6,
        releaseYear: "2003",
        title: "The Lord of the Rings: The Return of the King"
      },
      {
        id: 155,
        posterUrl: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        rating: 8.8,
        releaseYear: "2008",
        title: "The Dark Knight"
      },
      {
        id: 299534,
        posterUrl: "https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        rating: 8.4,
        releaseYear: "2019",
        title: "Avengers: Endgame"
      },
      {
        id: 121,
        posterUrl: "https://image.tmdb.org/t/p/original/56zTpe2xvaA4alU51sRWPoKPYZy.jpg",
        rating: 8.4,
        releaseYear: "2001",
        title: "The Lord of the Rings: The Fellowship of the Ring"
      },
      {
        id: 185,
        posterUrl: "https://image.tmdb.org/t/p/original/4GwIt6YGt09ZhEXB69h9j2urM5K.jpg",
        rating: 8.5,
        releaseYear: "1995",
        title: "Casino"
      },
      {
        id: 284,
        posterUrl: "https://image.tmdb.org/t/p/original/sZvIhet79avBbpxnx6Br3PDMJ6d.jpg",
        rating: 8.5,
        releaseYear: "1994",
        title: "The Lion King"
      },
      {
        id: 680,
        posterUrl: "https://image.tmdb.org/t/p/original/fIE3lOOnm0qZYagZpLvLY8ppzP0.jpg",
        rating: 8.6,
        releaseYear: "1994",
        title: "Pulp Fiction"
      },
      {
        id: 550,
        posterUrl: "https://image.tmdb.org/t/p/original/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
        rating: 8.4,
        releaseYear: "1999",
        title: "Fight Club"
      },
      {
        id: 278,
        posterUrl: "https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        rating: 8.7,
        releaseYear: "1994",
        title: "The Shawshank Redemption"
      },
      {
        id: 238,
        posterUrl: "https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        rating: 8.7,
        releaseYear: "1972",
        title: "The Godfather"
      },
      {
        id: 372058,
        posterUrl: "https://image.tmdb.org/t/p/original/q719jXXEzOoYaps6babgKnONONX.jpg",
        rating: 8.5,
        releaseYear: "2016",
        title: "Your Name"
      },
      {
        id: 424,
        posterUrl: "https://image.tmdb.org/t/p/original/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
        rating: 8.9,
        releaseYear: "1993",
        title: "Schindler's List"
      },
      {
        id: 129,
        posterUrl: "https://image.tmdb.org/t/p/original/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
        rating: 8.5,
        releaseYear: "2001",
        title: "Spirited Away"
      },
      {
        id: 496243,
        posterUrl: "https://image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        rating: 8.5,
        releaseYear: "2019",
        title: "Parasite"
      },
      {
        id: 637,
        posterUrl: "https://image.tmdb.org/t/p/original/mfnkSeeVOBVheuyn2lo4tfmOPQb.jpg",
        rating: 8.5,
        releaseYear: "1997",
        title: "Life Is Beautiful"
      },
      {
        id: 769,
        posterUrl: "https://image.tmdb.org/t/p/original/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
        rating: 8.5,
        releaseYear: "1990",
        title: "Goodfellas"
      }
    ]
  },
  2: {
    page: 2,
    totalPages: 500,
    totalNo: 10000,
    movies: generateMockMovies(3000, 20, "popular")
  },
  3: {
    page: 3,
    totalPages: 500,
    totalNo: 10000,
    movies: generateMockMovies(4000, 20, "popular")
  }
};

const upcomingMovies: Record<number, MoviesResponse> = {
  1: {
    page: 1,
    totalPages: 50,
    totalNo: 1000,
    movies: [
      {
        id: 999999,
        posterUrl: "https://image.tmdb.org/t/p/original/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg",
        rating: 0,
        releaseYear: "2024",
        title: "Avatar: The Way of Water"
      },
      {
        id: 888888,
        posterUrl: "https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        rating: 0,
        releaseYear: "2024",
        title: "The Marvels"
      },
      {
        id: 777777,
        posterUrl: "https://image.tmdb.org/t/p/original/5YZbUmjbMa3ClvSWTkAci8apqyG.jpg",
        rating: 0,
        releaseYear: "2024",
        title: "Aquaman and the Lost Kingdom"
      },
      {
        id: 666666,
        posterUrl: "https://image.tmdb.org/t/p/original/fOy2Jurz9k6RnJnMUMRDAgBwru2.jpg",
        rating: 0,
        releaseYear: "2024",
        title: "Fast X"
      },
      {
        id: 555555,
        posterUrl: "https://image.tmdb.org/t/p/original/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg",
        rating: 0,
        releaseYear: "2024",
        title: "Spider-Man: Across the Spider-Verse"
      },
      {
        id: 444444,
        posterUrl: "https://image.tmdb.org/t/p/original/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
        rating: 0,
        releaseYear: "2024",
        title: "Guardians of the Galaxy Vol. 3"
      },
      {
        id: 333333,
        posterUrl: "https://image.tmdb.org/t/p/original/kHlX3oqdD4VGaLpB8O78M25KfdS.jpg",
        rating: 0,
        releaseYear: "2024",
        title: "John Wick: Chapter 4"
      },
      {
        id: 222222,
        posterUrl: "https://image.tmdb.org/t/p/original/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
        rating: 0,
        releaseYear: "2024",
        title: "Indiana Jones and the Dial of Destiny"
      },
      {
        id: 111111,
        posterUrl: "https://image.tmdb.org/t/p/original/628Dep6AxEtDxjZoGP78TsOxYbK.jpg",
        rating: 0,
        releaseYear: "2024",
        title: "The Flash"
      },
      {
        id: 999998,
        posterUrl: "https://image.tmdb.org/t/p/original/94xxmIWIY4Xa1TE9rM6f4gV2S7t.jpg",
        rating: 0,
        releaseYear: "2024",
        title: "Transformers: Rise of the Beasts"
      },
      {
        id: 888887,
        posterUrl: "https://image.tmdb.org/t/p/original/5xUjr1FG78eiBvhSm3cGTi6iD9z.jpg",
        rating: 0,
        releaseYear: "2024",
        title: "Mission: Impossible - Dead Reckoning Part One"
      },
      {
        id: 777776,
        posterUrl: "https://image.tmdb.org/t/p/original/5YZbUmjbMa3ClvSWTkAci8apqyG.jpg",
        rating: 0,
        releaseYear: "2024",
        title: "Oppenheimer"
      },
      {
        id: 666665,
        posterUrl: "https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        rating: 0,
        releaseYear: "2024",
        title: "Barbie"
      },
      {
        id: 555554,
        posterUrl: "https://image.tmdb.org/t/p/original/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg",
        rating: 0,
        releaseYear: "2024",
        title: "Dune: Part Two"
      },
      {
        id: 444443,
        posterUrl: "https://image.tmdb.org/t/p/original/fOy2Jurz9k6RnJnMUMRDAgBwru2.jpg",
        rating: 0,
        releaseYear: "2024",
        title: "The Hunger Games: The Ballad of Songbirds & Snakes"
      },
      {
        id: 333332,
        posterUrl: "https://image.tmdb.org/t/p/original/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
        rating: 0,
        releaseYear: "2024",
        title: "Wonka"
      },
      {
        id: 222221,
        posterUrl: "https://image.tmdb.org/t/p/original/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
        rating: 0,
        releaseYear: "2024",
        title: "Expend4bles"
      },
      {
        id: 111110,
        posterUrl: "https://image.tmdb.org/t/p/original/628Dep6AxEtDxjZoGP78TsOxYbK.jpg",
        rating: 0,
        releaseYear: "2024",
        title: "Scream VI"
      },
      {
        id: 999997,
        posterUrl: "https://image.tmdb.org/t/p/original/94xxmIWIY4Xa1TE9rM6f4gV2S7t.jpg",
        rating: 0,
        releaseYear: "2024",
        title: "Insidious: The Red Door"
      },
      {
        id: 888886,
        posterUrl: "https://image.tmdb.org/t/p/original/5xUjr1FG78eiBvhSm3cGTi6iD9z.jpg",
        rating: 0,
        releaseYear: "2024",
        title: "Evil Dead Rise"
      }
    ]
  },
  2: {
    page: 2,
    totalPages: 50,
    totalNo: 1000,
    movies: generateMockMovies(5000, 20, "upcoming")
  },
  3: {
    page: 3,
    totalPages: 50,
    totalNo: 1000,
    movies: generateMockMovies(6000, 20, "upcoming")
  }
};

const nowPlayingMovies: Record<number, MoviesResponse> = {
  1: {
    page: 1,
    totalPages: 100,
    totalNo: 2000,
    movies: [
      {
        id: 999991,
        posterUrl: "https://image.tmdb.org/t/p/original/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg",
        rating: 7.8,
        releaseYear: "2023",
        title: "Spider-Man: Across the Spider-Verse"
      },
      {
        id: 888881,
        posterUrl: "https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        rating: 7.9,
        releaseYear: "2023",
        title: "Guardians of the Galaxy Vol. 3"
      },
      {
        id: 777771,
        posterUrl: "https://image.tmdb.org/t/p/original/5YZbUmjbMa3ClvSWTkAci8apqyG.jpg",
        rating: 8.1,
        releaseYear: "2023",
        title: "Fast X"
      },
      {
        id: 666661,
        posterUrl: "https://image.tmdb.org/t/p/original/fOy2Jurz9k6RnJnMUMRDAgBwru2.jpg",
        rating: 7.5,
        releaseYear: "2023",
        title: "Indiana Jones and the Dial of Destiny"
      },
      {
        id: 555551,
        posterUrl: "https://image.tmdb.org/t/p/original/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg",
        rating: 7.7,
        releaseYear: "2023",
        title: "The Little Mermaid"
      },
      {
        id: 444441,
        posterUrl: "https://image.tmdb.org/t/p/original/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
        rating: 8.2,
        releaseYear: "2023",
        title: "John Wick: Chapter 4"
      },
      {
        id: 333331,
        posterUrl: "https://image.tmdb.org/t/p/original/kHlX3oqdD4VGaLpB8O78M25KfdS.jpg",
        rating: 7.6,
        releaseYear: "2023",
        title: "Oppenheimer"
      },
      {
        id: 222221,
        posterUrl: "https://image.tmdb.org/t/p/original/5xUjr1FG78eiBvhSm3cGTi6iD9z.jpg",
        rating: 7.9,
        releaseYear: "2023",
        title: "Barbie"
      },
      {
        id: 111111,
        posterUrl: "https://image.tmdb.org/t/p/original/628Dep6AxEtDxjZoGP78TsOxYbK.jpg",
        rating: 7.4,
        releaseYear: "2023",
        title: "Mission: Impossible - Dead Reckoning Part One"
      },
      {
        id: 999990,
        posterUrl: "https://image.tmdb.org/t/p/original/94xxmIWIY4Xa1TE9rM6f4gV2S7t.jpg",
        rating: 7.3,
        releaseYear: "2023",
        title: "The Flash"
      },
      {
        id: 888880,
        posterUrl: "https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        rating: 7.8,
        releaseYear: "2023",
        title: "Transformers: Rise of the Beasts"
      },
      {
        id: 777770,
        posterUrl: "https://image.tmdb.org/t/p/original/5YZbUmjbMa3ClvSWTkAci8apqyG.jpg",
        rating: 8.0,
        releaseYear: "2023",
        title: "Elemental"
      },
      {
        id: 666660,
        posterUrl: "https://image.tmdb.org/t/p/original/fOy2Jurz9k6RnJnMUMRDAgBwru2.jpg",
        rating: 7.2,
        releaseYear: "2023",
        title: "Spider-Man: No Way Home"
      },
      {
        id: 555550,
        posterUrl: "https://image.tmdb.org/t/p/original/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg",
        rating: 7.9,
        releaseYear: "2023",
        title: "Black Panther: Wakanda Forever"
      },
      {
        id: 444440,
        posterUrl: "https://image.tmdb.org/t/p/original/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
        rating: 7.6,
        releaseYear: "2023",
        title: "Top Gun: Maverick"
      },
      {
        id: 333330,
        posterUrl: "https://image.tmdb.org/t/p/original/kHlX3oqdD4VGaLpB8O78M25KfdS.jpg",
        rating: 8.1,
        releaseYear: "2023",
        title: "Avatar: The Way of Water"
      },
      {
        id: 222220,
        posterUrl: "https://image.tmdb.org/t/p/original/5xUjr1FG78eiBvhSm3cGTi6iD9z.jpg",
        rating: 7.4,
        releaseYear: "2023",
        title: "Ant-Man and the Wasp: Quantumania"
      },
      {
        id: 111110,
        posterUrl: "https://image.tmdb.org/t/p/original/628Dep6AxEtDxjZoGP78TsOxYbK.jpg",
        rating: 7.7,
        releaseYear: "2023",
        title: "Shazam! Fury of the Gods"
      },
      {
        id: 999989,
        posterUrl: "https://image.tmdb.org/t/p/original/94xxmIWIY4Xa1TE9rM6f4gV2S7t.jpg",
        rating: 7.5,
        releaseYear: "2023",
        title: "Creed III"
      },
      {
        id: 888879,
        posterUrl: "https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        rating: 7.8,
        releaseYear: "2023",
        title: "John Wick: Chapter 4"
      }
    ]
  },
  2: {
    page: 2,
    totalPages: 100,
    totalNo: 2000,
    movies: generateMockMovies(7000, 20, "now_playing")
  },
  3: {
    page: 3,
    totalPages: 100,
    totalNo: 2000,
    movies: generateMockMovies(8000, 20, "now_playing")
  }
};

// Function to simulate API call with endpoint structure
export const fetchMoviesByCategory = async (category: string, page: number = 1): Promise<MoviesResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real implementation, this would be:
  // const response = await fetch(`/movie-info/category/${category}?page=${page}`);
  // return await response.json();
  
  // For mock data, we'll return the appropriate category data
  switch (category) {
    case "top_rated":
      return Promise.resolve(topRatedMovies[page] || { page, totalPages: 520, totalNo: 10389, movies: [] });
    case "popular":
      return Promise.resolve(popularMovies[page] || { page, totalPages: 500, totalNo: 10000, movies: [] });
    case "upcoming":
      return Promise.resolve(upcomingMovies[page] || { page, totalPages: 50, totalNo: 1000, movies: [] });
    case "now_playing":
      return Promise.resolve(nowPlayingMovies[page] || { page, totalPages: 100, totalNo: 2000, movies: [] });
    default:
      return Promise.resolve(topRatedMovies[page] || { page, totalPages: 520, totalNo: 10389, movies: [] });
  }
};