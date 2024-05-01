const movieList = document.querySelector('.movie_list');

export function displayMovies(data) {
  let temp_html = '';
  data.forEach((movie) => {
    const img_url = `https://image.tmdb.org/t/p/w500${movie['backdrop_path']}`;
    temp_html += `
    <div class="movie_card" onclick="alert('영화 id: ${movie['id']}')">
      <img src='${img_url}' alt="">
      <div class="overlay">
        <h3>${movie['title']}</h3>
        <p>${movie['overview']}</p>
        <p>⭐ ${movie['vote_average'].toFixed(1)}</p>
      </div>
    </div>`;
  });
  movieList.innerHTML = temp_html;
}
