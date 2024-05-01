import { movieDataList } from './main.js';
import { displayMovies } from './card-append.js';

// TMDB API 정보
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTJhN2E1OWNlMDU5YTBkOWUxMDA5N2Y1NDgwM2U4MiIsInN1YiI6IjY2MjY0MjI3ZTI5NWI0MDE4NzliZDRmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jFZYYy_OiC0tGJIuwP-IkQSBRyU4Qo47ujN22aGzXQ8',
  },
};

export async function fetchMovies(pageNum) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageNum}`,
      options
    );
    const data = await response.json();
    displayMovies(data['results']);
    data.results.forEach((movie) => {
      movieDataList.push(movie);
    });
  } catch (error) {
    console.error('Failed to fetch movies:', error);
  }
}
