import { movieDataList } from './main.js';
import { fetchMovies } from './api.js';

const movieLists = document.querySelector('#movieLists');
const numbers = document.querySelector('#numbers');
const numberBtn = numbers.querySelectorAll('a');

// 정적 pagenation 구현
export const pagenation = () => {
  numberBtn.forEach((item) => {
    item.addEventListener('click', async (event) => {
      event.preventDefault();
      // 페이지 버튼의 활성화를 위한 코드
      for (const nb of numberBtn) {
        nb.classList.remove('active');
      }
      event.target.classList.add('active');
      
      movieLists.replaceChildren(); // 기존 movieCard 삭제
      movieDataList.length = 0; // 페이지 단위로 검색 가능하게 할려고
      await fetchMovies(item.textContent);
    });
  });
};
