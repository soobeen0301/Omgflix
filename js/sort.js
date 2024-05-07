const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTJhN2E1OWNlMDU5YTBkOWUxMDA5N2Y1NDgwM2U4MiIsInN1YiI6IjY2MjY0MjI3ZTI5NWI0MDE4NzliZDRmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jFZYYy_OiC0tGJIuwP-IkQSBRyU4Qo47ujN22aGzXQ8'
  }
};

const movieDataList = []; // 영화 데이터를 저장할 배열

// 영화 카드를 생성하여 화면에 표시하는 함수
function displayMovies(results) {
  const movieList = document.getElementById('movieLists');
  let temp_html = '';
  results.forEach(movie => {
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
  movieList.innerHTML = `<div class="movie_list">${temp_html}</div>`;
}

async function fetchMovies(url) {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    displayMovies(data['results']);
    // 새로 받은 데이터로 movieDataList 업데이트
    movieDataList.length = 0; // 배열 비우기
    data.results.forEach(movie => {
      movieDataList.push(movie);
    });
  } catch (error) {
    console.error('Failed to fetch movies:', error);
  }
}

// 버튼 활성화/비활성화 함수
function toggleButton(buttonId) {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    if (button.id === buttonId) {
      button.disabled = true; // 클릭된 버튼 비활성화
    } else {
      button.disabled = false; // 다른 버튼은 활성화
    }
  });
}

document.getElementById('popularityButton').addEventListener('click', event => {
  fetchMovies('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1');
});

document.getElementById('latestButton').addEventListener('click', event => {
  fetchMovies('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1');
});

document.getElementById('ratingButton').addEventListener('click', async () => {
  await fetchMovies('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1');
});
