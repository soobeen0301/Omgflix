// 이벤트 핸들러 초기화
export const initializeEventHandlers = () =>{
  document.addEventListener('DOMContentLoaded', () => {
    loadReviews();

    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
      reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // input내용을 받아오기
        const nameInput = document.getElementById('authorInput');
        const reviewInput = document.getElementById('reviewInput');
        const passwordInput = document.getElementById('passwordInput');
        const name = nameInput.value.trim();
        const review = reviewInput.value.trim();
        const password = passwordInput.value.trim();
         // addReview 리뷰 생성 전달 
        if (name && review && password) {
          addReview(name, review, password);
          nameInput.value = '';
          reviewInput.value = '';
          passwordInput.value = '';
        } else {
          alert('닉네임, 리뷰, 패스워드를 모두 입력해주세요!');
        }
      });
    }
// 클릭 이벤트
    const reviewWrap = document.getElementById('reviewWrap');
    if (reviewWrap) {
      reviewWrap.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('editBtn')) {
          const reviewDiv = target.closest('.review');
          const index = parseInt(reviewDiv.getAttribute('data-index'), 10);
          editReview(reviewDiv, index);
        } else if (target.classList.contains('deleteBtn')) {
          const reviewDiv = target.closest('.review');
          const index = parseInt(reviewDiv.getAttribute('data-index'), 10);
          deleteReview(reviewDiv, index);
        }
      });
    }
  });
}

// 페이지 로드 시 특정 영화의 리뷰만 로드
const loadReviews = () => {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  const movieId = getQueryStringValue('id');
  // 해당 영화 ID에 맞는 리뷰만 필터링
  const filteredReviews = reviews.filter(review => review.movieId === movieId);
  console.log(filteredReviews)
  filteredReviews.forEach((review, index) => {
    displayReview(review, index);
  });
}


// 리뷰 생성
const addReview = (name, review, password) => {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  const newIndex = reviews.length;
  const movieId = getQueryStringValue('id');
  // 리뷰 객체에 영화 ID 추가
  const reviewObj = { name, review, password, movieId };
  console.log(reviewObj)
  reviews.push(reviewObj);
  localStorage.setItem('reviews', JSON.stringify(reviews));
  displayReview(reviewObj, newIndex);
}

// 리뷰 생성하고 HTML로 표현
const displayReview = (review, index) => {
  if (!review || !review.name || !review.review) {
    return;
  }
  const reviewWrap = document.getElementById('reviewWrap');
  const reviewDiv = document.createElement('div');
  reviewDiv.classList.add('review');
  reviewDiv.setAttribute('data-index', index);
  reviewDiv.innerHTML = `
    <label>${review.name}</label>
    <span>${review.review}</span>
    <button class="editBtn">수정</button>
    <button class="deleteBtn">삭제</button>`;
  reviewWrap.appendChild(reviewDiv);
}

// 리뷰 수정
const editReview = (reviewDiv, index) => {
  const reviews = JSON.parse(localStorage.getItem('reviews'));
  const movieId = getQueryStringValue('id');
  if (!reviews || index < 0 || index >= reviews.length || reviews[index].movieId !== movieId) {
    console.error('유효하지 않은 인덱스이거나 영화 ID가 일치하지 않습니다.');
    return;
  }
  const newPassword = prompt('패스워드를 입력하세요:');
  const newText = prompt('리뷰를 수정하세요:', reviews[index].review).trim();
  if (newText && newPassword && verifyPassword(index, newPassword)) {
    reviews[index].review = newText;
    localStorage.setItem('reviews', JSON.stringify(reviews));
    reviewDiv.querySelector('span').textContent = newText;
  } else {
    alert('올바른 패스워드를 입력하세요 또는 내용을 입력하세요!');
  }
}

// 리뷰 삭제
const deleteReview = (reviewDiv, index) => {
  const reviews = JSON.parse(localStorage.getItem('reviews'));
  const movieId = getQueryStringValue('id');
  console.log(reviews)
  console.log(movieId)
  if (reviews && index >= 0 && index < reviews.length && reviews[index].movieId === movieId) {
    const password = prompt('패스워드를 입력하세요:');
    if (password && verifyPassword(index, password)) {
      reviews.splice(index, 1);
      localStorage.setItem('reviews', JSON.stringify(reviews));
      reviewDiv.remove();
    } else {
      alert('올바른 패스워드를 입력하세요!');
    }
  } else {
    console.error('삭제할 리뷰가 없거나 영화 ID가 일치하지 않습니다.');
  }
}

// 패스워드 확인
const verifyPassword = (index, password) => {
  const reviews = JSON.parse(localStorage.getItem('reviews'));
  if (reviews && index >= 0 && index < reviews.length) {
    return reviews[index].password === password;
  }
  return false;
}

// URL에서 쿼리 스트링을 파싱하여 특정 키의 값을 반환하는 함수
const getQueryStringValue = (key) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
}