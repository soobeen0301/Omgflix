const detailVisual = document.querySelector('#visual');
const detailTitle = document.getElementsByTagName('h2');
const detailTagline = document.getElementsByClassName('tagline');
const detailDate = document.querySelector('.date');
const detailGenre = document.querySelector('.genre');
const detailCountry = document.querySelector('.country');
const detailTime = document.querySelector('.time');
const detaivote = document.querySelector('.vote');

export function displayMovies(data) {
  console.log(data);
  const backdrop_path = `https://image.tmdb.org/t/p/w500${data.backdrop_path}`;
  const poster_path = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  const title = data.title;
  const tagline = data.overview;
  const genres = data.genres[0].name;
  const vote_average = data.vote_average.toFixed(1);
  const spoken_languages = data.spoken_languages[0].english_name;
  const release_date = data.release_date;
  const runtime = data.runtime;

  detailVisual.style.background = `linear-gradient(0deg, rgb(0 0 0), rgb(0 0 0 / 60%)), url(${backdrop_path}) center no-repeat`;
  detailVisual.style.backgroundSize = 'cover';
  detailTitle[0].innerText = title;
  detailTagline[0].textContent = tagline;
  detailDate.innerText = release_date;
  detailGenre.innerText = genres;
  detailCountry.innerText = spoken_languages;
  detailTime.innerText = runtime;
  detaivote.innerText = vote_average;

  console.log(data);
}
