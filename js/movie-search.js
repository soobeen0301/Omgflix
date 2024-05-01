const searchInput = document.getElementById('serach_input');
const movieCardArr = document.getElementsByClassName('movie_card');
const serachForm = document.getElementById('serach_form');
const searchBtn = document.getElementById('search_btn');

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

// 버튼 클릭시 serachBtn 함수 실행
// form 태그로 HTML 을 작성해서 엔터키도 같이 작동함.
export const searchButton = () => {
  searchBtn.addEventListener('click', () => {
    serachBtn();
  });
};

// 새로고침 방지
export function onSubmit() {
  serachForm.addEventListener('submit', (event) => {
    event.preventDefault(); // 브라우저의 기본 동작을 제어
  });
}
