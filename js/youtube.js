// 상수 및 HTML 엘리먼트
const YOUTUBE_API_KEY = 'AIzaSyCfYXcmkdUOkpLnkQRV-fXXnIjMlZNBVsA';
const EXPIRATION_DATE = 7 * 24 * 60 * 60 * 1000; // one week
const THUMBNAILS_PER_PAGE = 8;
const TMDB_ACCESS_TOKEN = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTJhN2E1OWNlMDU5YTBkOWUxMDA5N2Y1NDgwM2U4MiIsInN1YiI6IjY2MjY0MjI3ZTI5NWI0MDE4NzliZDRmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jFZYYy_OiC0tGJIuwP-IkQSBRyU4Qo47ujN22aGzXQ8'
  }
};
const $videoList = document.querySelector('.videoList');
const $youtubePlayer__container = document.querySelector('#youtubePlayer__container');

// Youtube IFrame Player API 불러오기 및 정보를 저장할 객체인 youtubePlayer 초기화
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
const youtubePlayer = {
  player: null,
  intervalId: null
};

// 메인 코드
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && youtubePlayer.player) closePlayer();
});
$youtubePlayer__container.addEventListener('click', () => closePlayer());
init();

//---이하는 모두 함수---
async function init() {
  const id = new URLSearchParams(location.search).get('id');
  if (!id) return;
  try {
    const movieVideos = await fetchMovieVideos(id);
    createThumbnailElements(movieVideos);
  } catch (error) {
    console.error(error);
  }
}

// TMDB 영화 id값을 매개변수로 받아 해당 영화 관련 영상 목록 반환
async function fetchMovieVideos(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
    TMDB_ACCESS_TOKEN
  );
  if (res.status === 404) throw new Error('영화를 찾을 수 없습니다.');
  const { results } = await res.json();
  return results.filter(video => video.site === 'YouTube');
}

// Youtube 영상 id값을 매개변수로 받아 영상 정보 반환
async function fetchYoutubeVideos(id) {
  const res = await fetch(
    `
      https://content-youtube.googleapis.com/youtube/v3/videos?id=${id}&part=id,snippet&key=${YOUTUBE_API_KEY}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    }
  );
  const { items } = await res.json();
  if (!items[0]) return undefined;
  return {
    id: items[0].id,
    title: items[0].snippet.title,
    url: items[0].snippet.thumbnails.standard.url
  };
}

// TMDB 관련 영상 목록을 매개변수로 받아 각각 fetchYoutubeVideos() 수행하여 Youtube 영상 정보 목록 반환
async function getThumbnails(movieVideos) {
  if (movieVideos.length === 0) throw new Error('비디오가 없습니다.');
  const requests = movieVideos.map(video => fetchYoutubeVideos(video.key));
  console.log(requests);
  const responses = await Promise.all(requests);
  return responses.filter(x => x);
}

// Youtube Player가 준비되면 영상을 재생
function onPlayerReady(event) {
  const playerOptions = getPlayerOptions();

  if (validatePlayerOptions(playerOptions)) {
    const { data } = JSON.parse(playerOptions);
    const { volume, isMuted } = data;
    event.target.setVolume(volume);
    if (isMuted) event.target.mute();
    else event.target.unMute();
  } else {
    event.target.setVolume(0);
    event.target.mute();
    updatePlayerOptions();
  }

  event.target.playVideo();
  startVolumeObserver();
}

// Youtube 영상 id 값을 받아 Youtube Player 세팅
function startPlayer(id) {
  resetPlayer();
  const width = Math.min(document.documentElement.clientWidth, 1200);
  youtubePlayer.player = new YT.Player('youtubePlayer', {
    height: (width * 0.9 * 9) / 16,
    width: width * 0.9,
    videoId: id,
    events: {
      onReady: onPlayerReady
    }
  });
  $youtubePlayer__container.classList.remove('hide');
}

// Youtube Player 종료
function closePlayer() {
  $youtubePlayer__container.classList.add('hide');
  resetPlayer();
}

// Youtube Player와 관련된 VolumeObserver 및 youtubePlayer 객체 초기화
function resetPlayer() {
  stopVolumeObserver();
  if (youtubePlayer.player) {
    youtubePlayer.player.stopVideo();
    youtubePlayer.player.destroy();
    youtubePlayer.player = null;
  }
}

// LocalStorage에서 playerOptions 정보 가져오기
function getPlayerOptions() {
  return localStorage.getItem('youtube-iframe-player-options');
}

// LocalStorage에서 받아 온 playerOptions 정보를 매개변수로 받아서 유효성 확인
function validatePlayerOptions(playerOptions) {
  if (!playerOptions) return false;
  try {
    const { expiration, data } = JSON.parse(playerOptions);
    const { volume } = data;
    if (expiration < new Date().getTime() || volume < 0 || volume > 100) {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
}

// mete LocalStorage의 playerOptions 업데이트
function updatePlayerOptions(isMuted = true, volume = 0) {
  const currentDate = new Date().getTime();
  const newOptions = {
    data: {
      volume,
      isMuted
    },
    expiration: currentDate + EXPIRATION_DATE,
    creation: currentDate
  };
  localStorage.setItem('youtube-iframe-player-options', JSON.stringify(newOptions));
}

// Youtube Player의 volume과 isMuted를 저장하기 위해 setInterval로 확인
function startVolumeObserver() {
  youtubePlayer.intervalId = setInterval(() => {
    const isMute = youtubePlayer.player.isMuted();
    const volume = youtubePlayer.player.getVolume();

    updatePlayerOptions(isMute, volume);
  }, 500);
}

// VolumeObserver setInterval 삭제
function stopVolumeObserver() {
  if (youtubePlayer.intervalId) {
    clearInterval(youtubePlayer.intervalId);
    youtubePlayer.intervalId = null;
  }
}

// Youtube 영상 정보를 매개변수로 받아 HTML 요소로 생성하여 반환
function createThumbnailItem(video) {
  const newItem = document.createElement('li');
  const newBtn = document.createElement('button');
  const newTitle = document.createElement('p');
  const newImg = document.createElement('img');
  const newPlayIcon = document.createElement('span');

  newItem.classList.add('videoList__video');
  newTitle.classList.add('videoThumbnail__title');
  newTitle.innerText = video.title;
  newImg.src = video.url;
  newImg.alt = video.title;
  newImg.onerror = e => {
    e.target.src = 'https://placehold.co/640x480?text=No+Image';
  };
  newPlayIcon.classList.add('playIcon');
  newBtn.classList.add('videoThumbnail');
  newBtn.addEventListener('click', () => startPlayer(video.id));
  newBtn.appendChild(newImg);
  newBtn.appendChild(newPlayIcon);
  newItem.appendChild(newBtn);
  newItem.appendChild(newTitle);
  return newItem;
}

// Youtube 영상 정보 목록을 받아 각각 createThumbnailItem(thumbnail)를 실행하고 $videoList 마지막 요소로 추가
function appendThumbnailItems(thumbnails) {
  thumbnails.forEach(thumbnail => {
    const newItem = createThumbnailItem(thumbnail);
    $videoList.appendChild(newItem);
  });
}

// TMDB 관련 영상 목록을 받아 getThumbnails를 호출하고 개별 영상 요소와 더보기 버튼을 생성
async function createThumbnailElements(movieVideos) {
  try {
    const thumbnails = await getThumbnails(movieVideos); // api 사용
    $videoList.innerHTML = '';
    if (thumbnails.length > THUMBNAILS_PER_PAGE) {
      let page = 1;
      const maxPage = Math.ceil(thumbnails.length / THUMBNAILS_PER_PAGE);

      appendThumbnailItems(thumbnails.slice(0, THUMBNAILS_PER_PAGE));

      const moreBtn = document.createElement('button');
      moreBtn.classList.add('videos__moreBtn');
      moreBtn.innerHTML = `더 보기 ${page} / ${maxPage}<span class='arrowDownIcon'></span>`;
      moreBtn.addEventListener('click', e => {
        const slicedThumbnails = thumbnails.slice(
          page * THUMBNAILS_PER_PAGE,
          Math.min((page + 1) * THUMBNAILS_PER_PAGE, thumbnails.length)
        );
        appendThumbnailItems(slicedThumbnails);
        page += 1;
        e.currentTarget.innerHTML = `더 보기 ${page} / ${maxPage}<span class='arrowDownIcon'></span>`;
        if (page >= maxPage) e.currentTarget.remove();
      });

      $videoList.parentNode.appendChild(moreBtn);
    } else {
      appendThumbnailItems(thumbnails);
    }

    $youtubePlayer__container.addEventListener('click', closePlayer);
  } catch (error) {
    console.error(error);
  }
}
