// 이벤트 핸들러 초기화
export const initializeEventHandlers = () => {
  document.addEventListener('DOMContentLoaded', () => {
    loadReviews();
    initializeReviewForm();
    initializeReviewActions();
  });
};

// 리뷰 폼 초기화
const initializeReviewForm = () => {
  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', handleSubmitReviewForm);
  }
};

// 리뷰 폼 제출 처리
const handleSubmitReviewForm = event => {
  event.preventDefault();
  const nameInput = document.getElementById('authorInput');
  const reviewInput = document.getElementById('reviewInput');
  const passwordInput = document.getElementById('passwordInput');
  const name = nameInput.value.trim();
  const review = reviewInput.value.trim();
  const password = passwordInput.value.trim()

  

  if (name && review && password) {
    addReview(name, review, password);
    nameInput.value = '';
    reviewInput.value = '';
    passwordInput.value = '';
  } else {
    alert('닉네임, 리뷰, 패스워드를 모두 입력해주세요!');
  }
};

// 리뷰 작업(수정, 삭제) 이벤트 초기화
const initializeReviewActions = () => {
  const reviewWrap = document.getElementById('reviewWrap');
  if (reviewWrap) {
    reviewWrap.addEventListener('click', handleReviewActions);
  }
};

// 리뷰 작업(수정, 삭제) 처리
const handleReviewActions = event => {
  const target = event.target;
  if (target.classList.contains('editBtn')) {
    const reviewDiv = target.closest('.review');
    editReview(reviewDiv);
  } else if (target.classList.contains('deleteBtn')) {
    const reviewDiv = target.closest('.review');
    deleteReview(reviewDiv);
  }
};

// 페이지 로드 시 특정 영화의 리뷰만 로드
const loadReviews = () => {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  const movieId = getQueryStringValue('id');
  const filteredReviews = reviews.filter(review => review.movieId === movieId);
  console.log(filteredReviews);
  filteredReviews.forEach(displayReview);
};

// 리뷰 생성
const addReview = (name, review, password) => {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  const movieId = getQueryStringValue('id');
  const reviewObj = { id: Date.now(), name, review, password, movieId };
  console.log(reviewObj);
  reviews.push(reviewObj);
  localStorage.setItem('reviews', JSON.stringify(reviews));
  displayReview(reviewObj);
  document.getElementById('reviewForm').style.display = 'none';
};

// 리뷰 생성하고 HTML로 표현
const displayReview = review => {
  if (!review || !review.name || !review.review) {
    return;
  }
  const reviewWrap = document.getElementById('reviewWrap');
  const reviewDiv = document.createElement('div');
  reviewDiv.classList.add('review');
  reviewDiv.setAttribute('data-id', review.id);
  reviewDiv.innerHTML = `
  <label>${review.name}</label>
  <span>${review.review}</span>
  <button class="editBtn">수정</button>
  <button class="deleteBtn">삭제</button>
  `;
  reviewWrap.appendChild(reviewDiv);
};

// 리뷰 수정
const editReview = reviewDiv => {
  const reviewId = parseInt(reviewDiv.getAttribute('data-id'), 10);
  const reviews = JSON.parse(localStorage.getItem('reviews'));
  const reviewIndex = reviews.findIndex(review => review.id === reviewId);
  const movieId = getQueryStringValue('id');

  // 리뷰 ID 또는 영화 ID가 유효하지 않은 경우
  if (reviewIndex === -1 || reviews[reviewIndex].movieId !== movieId) {
    console.error('유효하지 않은 리뷰 ID이거나 영화 ID가 일치하지 않습니다.');
    return;
  }
  // 패스워드 입력 받기
  const newPassword = prompt('패스워드를 입력하세요:');
  // 패스워드 인증
  if (verifyPassword(reviewIndex, newPassword)) {
    // 패스워드 인증 후 리뷰 수정
    const newText = prompt('리뷰를 수정하세요:', reviews[reviewIndex].review).trim();
    if (newText) {
      reviews[reviewIndex].review = newText;
      localStorage.setItem('reviews', JSON.stringify(reviews));
      reviewDiv.querySelector('span').textContent = newText;
    } else {
      alert('리뷰 내용을 입력하세요!');
    }
  } else {
    alert('올바른 패스워드를 입력하세요!');
  }
};

// 리뷰 삭제
const deleteReview = reviewDiv => {
  const reviewId = parseInt(reviewDiv.getAttribute('data-id'), 10);
  const reviews = JSON.parse(localStorage.getItem('reviews'));
  const reviewIndex = reviews.findIndex(review => review.id === reviewId);
  if (reviewIndex !== -1) {
    const password = prompt('패스워드를 입력하세요:');
    if (password && verifyPassword(reviewIndex, password)) {
      reviews.splice(reviewIndex, 1);
      localStorage.setItem('reviews', JSON.stringify(reviews));
      reviewDiv.remove();
    } else {
      alert('올바른 패스워드를 입력하세요!');
    }
  } else {
    console.error('삭제할 리뷰가 없습니다.');
  }
};

// 패스워드 확인
const verifyPassword = (index, password) => {
  const reviews = JSON.parse(localStorage.getItem('reviews'));
  if (reviews && index >= 0 && index < reviews.length) {
    return reviews[index].password === password;
  }
  return false;
};

// URL에서 쿼리 스트링을 파싱하여 특정 키의 값을 반환하는 함수
const getQueryStringValue = key => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
};
