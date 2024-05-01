export function initializeEventHandlers() {
  document.addEventListener('DOMContentLoaded', function() {
    loadReviews();

    document.getElementById('reviewForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const nameInput = document.getElementById('authorInput');
      const reviewInput = document.getElementById('reviewInput');
      const name = nameInput.value;
      const review = reviewInput.value;
      if (name && review) {
        addReview({ name, review });
        nameInput.value = '';
        reviewInput.value = '';
      } else {
        alert('닉네임과 리뷰를 작성해주세요!');
      }
    });

    document.getElementById('reviewWrap').addEventListener('click', function(event) {
      const target = event.target;
      if (target.classList.contains('editBtn')) {
        const reviewDiv = target.parentElement;
        const index = Array.from(reviewDiv.parentElement.children).indexOf(reviewDiv);
        editReview(reviewDiv, index);
      } else if (target.classList.contains('deleteBtn')) {
        const reviewDiv = target.parentElement;
        const index = Array.from(reviewDiv.parentElement.children).indexOf(reviewDiv);
        deleteReview(reviewDiv, index);
      }
    });
  });
}

function loadReviews() {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.forEach(displayReview);
}

function addReview(review) {
  let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.push(review);
  localStorage.setItem('reviews', JSON.stringify(reviews));
  displayReview(review);
}

function displayReview(review) {
  if (!review || !review.name || !review.review) {
    return;
  }

  const reviewWrap = document.getElementById('reviewWrap');
  const reviewDiv = document.createElement('div');
  reviewDiv.classList.add('review');
  reviewDiv.innerHTML = `
    <label>${review.name}</label>
    <span>${review.review}</span>
    <button class="editBtn">수정</button>
    <button class="deleteBtn">삭제</button>
  `;
  reviewWrap.appendChild(reviewDiv);
}

function editReview(reviewDiv, index) {
  const reviews = JSON.parse(localStorage.getItem('reviews'));
  const newText = prompt('리뷰를 수정하세요:', reviews[index].review);
  if (newText !== null) {
    reviews[index].review = newText;
    localStorage.setItem('reviews', JSON.stringify(reviews));
    reviewDiv.querySelector('span').textContent = newText;
  }
}

function deleteReview(reviewDiv, index) {
  const reviews = JSON.parse(localStorage.getItem('reviews'));
  reviews.splice(index, 1);
  localStorage.setItem('reviews', JSON.stringify(reviews));
  reviewDiv.remove();
}
