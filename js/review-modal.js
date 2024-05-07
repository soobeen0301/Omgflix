const authorInput = document.getElementById('authorInput');
const passwordInput = document.getElementById('passwordInput');
const reviewInput = document.getElementById('reviewInput');
const html = document.querySelector('html');

export function openModal() {
  document.getElementById('popOpen').addEventListener('click', function () {
    document.querySelector('.popWrap').style.display = 'flex';
  });
}

export function closeModal() {
  document.getElementById('popClose').addEventListener('click', function () {
    document.querySelector('.popWrap').style.display = 'none';
    authorInput.value = '';
    passwordInput.value = '';
    reviewInput.value = '';
  });
}
