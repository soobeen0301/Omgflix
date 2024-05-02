export function initializeEventHandlers() {
  document.addEventListener('DOMContentLoaded', function() {
    loadReviews();

    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
      reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nameInput = document.getElementById('authorInput');
        const reviewInput = document.getElementById('reviewInput');
        const name = nameInput.value.trim();
        const review = reviewInput.value.trim();
        if (name && review) {
          addReview({ name, review });
          nameInput.value = '';
          reviewInput.value = '';
        } else {
          alert('닉네임과 리뷰를 작성해주세요!');
        }
      });
    }

    const reviewWrap = document.getElementById('reviewWrap');
    if (reviewWrap) {
      reviewWrap.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('editBtn') || target.classList.contains('deleteBtn')) {
          const reviewDiv = target.closest('.review');
          const index = parseInt(reviewDiv.getAttribute('data-index'), 10);
          if (target.classList.contains('editBtn')) {
            editReview(reviewDiv, index);
          } else if (target.classList.contains('deleteBtn')) {
            deleteReview(reviewDiv, index);
          }
        }
      });
    }
  });
}

// 페이지 로드
function loadReviews() {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.forEach((review, index) => {
    displayReview(review, index);
  });
}

// 리뷰 생성
function addReview(review) {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  const newIndex = reviews.length;
  reviews.push(review);
  localStorage.setItem('reviews', JSON.stringify(reviews));
  displayReview(review, newIndex);
}

// 리뷰 생성하고 HTML로 표현
function displayReview(review, index) {
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
function editReview(reviewDiv, index) {
  console.log(index)
  const reviews = JSON.parse(localStorage.getItem('reviews'));
  if (!reviews || index < 0 || index >= reviews.length) {
    console.error('유효하지 않은 인덱스입니다.');
    return;
  }
  const newText = prompt('리뷰를 수정하세요:', reviews[index].review).trim();
  if (newText) {
    reviews[index].review = newText;
    localStorage.setItem('reviews', JSON.stringify(reviews));
    
    reviewDiv.querySelector('span').textContent = newText;
  }
}

// 리뷰 삭제
function deleteReview(reviewDiv, index) {
  const reviews = JSON.parse(localStorage.getItem('reviews'));
  if (reviews && index >= 0 && index < reviews.length) {
    reviews.splice(index, 1);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    reviewDiv.remove();
  } else {
    console.error('삭제할 리뷰가 없습니다.');
  }
}