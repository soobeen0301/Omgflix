const mask = document.querySelector('.mask');
const html = document.querySelector('html');

export const loading = () => {
  html.style.overflow = 'hidden'; //로딩 중 스크롤 방지
  window.addEventListener('load', function () {
    //아래 setTimeout은 로딩되는 과정을 임의로 생성하기 위해 사용. 실제 적용 시에는 삭제 후 적용해야함.
    setTimeout(function () {
      mask.style.opacity = '0'; //서서히 사라지는 효과
      html.style.overflow = 'auto'; //스크롤 방지 해제
      mask.style.display = 'none';
    }, 1000);
  });
};
