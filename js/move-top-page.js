const topButton = document.getElementById('topButton');

export const moveTop = () => {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      topButton.style.display = 'block';
    } else {
      topButton.style.display = 'none';
    }
  });
  topButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};