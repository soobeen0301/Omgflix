document.addEventListener('DOMContentLoaded', function() {
  // 초기 리뷰 로드
  loadReviews();

  // 리뷰 작성 버튼 이벤트 처리
  document.querySelector('.inputReview button').addEventListener('click', function(event) {
    event.preventDefault(); // 폼 기본 제출 방지

    // 입력 필드에서 닉네임과 리뷰 가져오기
    const name = document.querySelector('.inputReview input').value;
    const review = document.querySelector('.inputReview textarea').value;

    // 새로운 리뷰 생성
    const newReview = { name: name, review: review };
    addReview(newReview);

    // 입력 필드 초기화
    document.querySelector('.inputReview input').value = '';
    document.querySelector('.inputReview textarea').value = '';
  });

  // 리뷰 수정 및 삭제 버튼 이벤트 처리
  document.querySelectorAll('.review button').forEach((btn, index) => {
    btn.addEventListener('click', function() {
      const review = this.parentElement;
      if (this.textContent === '수정') {
        editReview(review, index);
      } else if (this.textContent === '삭제') {
        deleteReview(review, index);
      }
    });
  });
});

// 초기 리뷰 로드
function loadReviews() {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.forEach(function(review) {
    displayReview(review);
  });
}

// 리뷰 추가
function addReview(review) {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.push(review);
  localStorage.setItem('reviews', JSON.stringify(reviews));
  displayReview(review);
}

// 리뷰 표시
function displayReview(review) {
  const reviewDiv = document.createElement('div');
  reviewDiv.classList.add('review');
  reviewDiv.innerHTML = `
    <label>${review.name}</label>
    <span>${review.review}</span>
    <button class="editBtn">수정</button>
    <button class="deleteBtn">삭제</button>
  `;
  document.querySelector('.reviewWrap').appendChild(reviewDiv);

  // 리뷰 수정 및 삭제 버튼 이벤트 처리
  reviewDiv.querySelectorAll('button').forEach((btn, index) => {
    btn.addEventListener('click', function() {
      if (btn.textContent === '수정') {
        editReview(reviewDiv, index);
      } else if (btn.textContent === '삭제') {
        deleteReview(reviewDiv, index);
      }
    });
  });
}

// 리뷰 수정
function editReview(reviewDiv, index) {
  const reviews = JSON.parse(localStorage.getItem('reviews'));
  const newText = prompt('리뷰를 수정하세요:', reviews[index].review);
  if (newText !== null) {
    reviews[index].review = newText;
    localStorage.setItem('reviews', JSON.stringify(reviews));
    reviewDiv.querySelector('span').textContent = newText;
  }
}

// 리뷰 삭제
function deleteReview(reviewDiv, index) {
  const reviews = JSON.parse(localStorage.getItem('reviews'));
  reviews.splice(index, 1);
  localStorage.setItem('reviews', JSON.stringify(reviews));
  reviewDiv.remove();
}
