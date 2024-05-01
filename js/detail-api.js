import { displayMovies } from './detail-movie.js';

// URL 을 통으로 가져옴
const url = new URL(document.location.href);
// search 부분(?id=id값) 만 생성자에 넣기
const urlSearchParamsObject = new URLSearchParams(url.search);
// get 으로 id 값을 반환
const id = urlSearchParamsObject.get('id');

// TMDB API 정보
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTJhN2E1OWNlMDU5YTBkOWUxMDA5N2Y1NDgwM2U4MiIsInN1YiI6IjY2MjY0MjI3ZTI5NWI0MDE4NzliZDRmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jFZYYy_OiC0tGJIuwP-IkQSBRyU4Qo47ujN22aGzXQ8'
  }
};

export async function fetchMovies() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      options
    );
    const data = await response.json();
    displayMovies(data);
  } catch (error) {
    console.error('Failed to fetch movies:', error);
  }
}
