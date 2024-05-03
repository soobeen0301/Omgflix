const movieList = document.querySelector('.movie_list');

function displayMovies(data) {
  let temp_html = '';
  data.forEach(movie => {
    const img_url = `https://image.tmdb.org/t/p/w500${movie['backdrop_path']}`;
    temp_html += `
    <div class="movie_card">
      <a href='movieDetail.html?id=${movie['id']}'>
      <img src='${img_url}' alt="">
      <div class="overlay">
        <h3>${movie['title']}</h3>
        <p>${movie['overview']}</p>
        <p>⭐ ${movie['vote_average'].toFixed(1)}</p>
      </div>
      </a>
    </div>`;
  });
  movieList.innerHTML = temp_html;
}

export { displayMovies };
