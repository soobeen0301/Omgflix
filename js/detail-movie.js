export function displayMovies(data) {
  const temp_html = '';
  console.log(data);
  const backdrop_path = `https://image.tmdb.org/t/p/w500${data.backdrop_path}`;
  const poster_path = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  const title = data.title;
  const tagline = data.tagline;
  const overview = data.overview;
  const genres = data.genres[0].name;
  const vote_average = data.vote_average.toFixed(1);
  const release_date = data.release_date;
  const runtime = data.runtime;
}
