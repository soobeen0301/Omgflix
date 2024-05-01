const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTJhN2E1OWNlMDU5YTBkOWUxMDA5N2Y1NDgwM2U4MiIsInN1YiI6IjY2MjY0MjI3ZTI5NWI0MDE4NzliZDRmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jFZYYy_OiC0tGJIuwP-IkQSBRyU4Qo47ujN22aGzXQ8',
  },
};

const movieList = document.querySelector('.movie_list');
const serachForm = document.getElementById('serach_form');
const searchInput = document.getElementById('serach_input');
const movieCardArr = document.getElementsByClassName('movie_card');

async function fetchMovies() {
  try {
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
      options
    );
    const data = await response.json();
    displayMovies(data['results']);
  } catch (error) {
    console.error('Failed to fetch movies:', error);
  }
}

function displayMovies(data) {
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

fetchMovies();

// 검색 기능
function serachBtn() {
  const searchInputValue = searchInput.value;

  if (!searchInputValue) {
    alert('영화 제목을 입력하세요!');
  } else {
    // 전체 영화 제목을 담을 배열
    let movieTitleArr = [];
    for (let i = 0; i < movieCardArr.length; i++) {
      movieTitleArr[i] =
        movieCardArr[i].getElementsByTagName('h3')[0].textContent;
      movieCardArr[i].style = 'display:none';
    }
    // 키워드가 들어간 영화 제목을 담을 배열
    const searchInputLower = searchInputValue.toLowerCase();
    let filterMovieTitle = movieTitleArr.filter((v) =>
      v.toLowerCase().includes(searchInputLower)
    );

    movieTitleArr.forEach((v, i) => {
      for (let j = 0; j < filterMovieTitle.length; j++) {
        if (v === filterMovieTitle[j]) {
          movieCardArr[i].style = 'display:block';
        }
      }
    });
  }
}

// 새로고침 방지
function onSubmit(event) {
  event.preventDefault(); // 브라우저의 기본 동작을 제어
}
serachForm.addEventListener('submit', onSubmit);
