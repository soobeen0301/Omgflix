export function initializeEventHandlers() {
  document.addEventListener('DOMContentLoaded', function() {
    loadReviews();

    document.getElementById('reviewForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const name = document.getElementById('authorInput').value;
      const review = document.getElementById('reviewInput').value;
      const newReview = { name: name, review: review };
      addReview(newReview);
      document.getElementById('authorInput').value = '';
      document.getElementById('reviewInput').value = '';
    });

    document.getElementById('reviewWrap').addEventListener('click', function(event) {
      if (event.target.classList.contains('editBtn')) {
        const reviewDiv = event.target.parentElement;
        const index = Array.from(reviewDiv.parentElement.children).indexOf(reviewDiv);
        editReview(reviewDiv, index);
      } else if (event.target.classList.contains('deleteBtn')) {
        const reviewDiv = event.target.parentElement;
        const index = Array.from(reviewDiv.parentElement.children).indexOf(reviewDiv);
        deleteReview(reviewDiv, index);
      }
    });
  });
}

// 초기 리뷰 로드
export function loadReviews() {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.forEach(function(review) {
    displayReview(review);
  });
}

// 리뷰 추가
export function addReview(review) {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.push(review);
  localStorage.setItem('reviews', JSON.stringify(reviews));
  displayReview(review);
}

// 리뷰 표시
export function displayReview(review) {
  if (!review || !review.name || !review.review) {
    return;
  }

  const reviewDiv = document.createElement('div');
  reviewDiv.classList.add('review');
  reviewDiv.innerHTML = `
    <label>${review.name}</label>
    <span>${review.review}</span>
    <button class="editBtn">수정</button>
    <button class="deleteBtn">삭제</button>
  `;
  document.getElementById('reviewWrap').appendChild(reviewDiv);
}


// 리뷰 수정
export function editReview(reviewDiv, index) {
  const reviews = JSON.parse(localStorage.getItem('reviews'));
  const newText = prompt('리뷰를 수정하세요:', reviews[index].review);
  if (newText !== null) {
    reviews[index].review = newText;
    localStorage.setItem('reviews', JSON.stringify(reviews));
    reviewDiv.querySelector('span').textContent = newText;
  }
}

// 리뷰 삭제
export function deleteReview(reviewDiv, index) {
  const reviews = JSON.parse(localStorage.getItem('reviews'));
  reviews.splice(index, 1);
  localStorage.setItem('reviews', JSON.stringify(reviews));
  reviewDiv.remove();
}
