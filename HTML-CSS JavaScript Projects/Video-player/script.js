const container = document.querySelector(".container"),
  mainVideo = container.querySelector("video"),
  videoTimeline = container.querySelector(".video-timeline"),
  progressBar = container.querySelector(".progress-bar"),
  volumeBtn = container.querySelector(".volume i"),
  volumeSlider = container.querySelector(".left input");
(currentVidTime = container.querySelector(".current-time")),
  (videoDuration = container.querySelector(".video-duration")),
  (skipBackward = container.querySelector(".skip-backward i")),
  (skipForward = container.querySelector(".skip-forward i")),
  (playPauseBtn = container.querySelector(".play-pause i")),
  (speedBtn = container.querySelector(".playback-speed span")),
  (speedOptions = container.querySelector(".speed-options")),
  (pipBtn = container.querySelector(".pic-in-pic span")),
  (fullScreenBtn = container.querySelector(".fullscreen i"));
let timer;

const hideControls = () => {
  if (mainVideo.paused) return;
  timer = setTimeout(() => {
    container.classList.remove("show-controls");
  }, 3000);
};
hideControls();

container.addEventListener("mousemove", () => {
  container.classList.add("show-controls");
  clearTimeout(timer);
  hideControls();
});

const formatTime = (time) => {
  let seconds = Math.floor(time % 60),
    minutes = Math.floor(time / 60) % 60,
    hours = Math.floor(time / 3600);

  seconds = seconds < 10 ? `0${seconds}` : seconds;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  hours = hours < 10 ? `0${hours}` : hours;

  if (hours == 0) {
    return `${minutes}:${seconds}`;
  }
  return `${hours}:${minutes}:${seconds}`;
};

videoTimeline.addEventListener("mousemove", (e) => {
  let timelineWidth = videoTimeline.clientWidth;
  let offsetX = e.offsetX;
  let percent = Math.floor((offsetX / timelineWidth) * mainVideo.duration);
  const progressTime = videoTimeline.querySelector("span");
  offsetX =
    offsetX < 20
      ? 20
      : offsetX > timelineWidth - 20
      ? timelineWidth - 20
      : offsetX;
  progressTime.style.left = `${offsetX}px`;
  progressTime.innerText = formatTime(percent);
});

videoTimeline.addEventListener("click", (e) => {
  let timelineWidth = videoTimeline.clientWidth;
  mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
});

mainVideo.addEventListener("timeupdate", (e) => {
  let { currentTime, duration } = e.target;
  let percent = (currentTime / duration) * 100;
  progressBar.style.width = `${percent}%`;
  currentVidTime.innerText = formatTime(currentTime);
});

mainVideo.addEventListener("loadeddata", () => {
  videoDuration.innerText = formatTime(mainVideo.duration);
});

const draggableProgressBar = (e) => {
  let timelineWidth = videoTimeline.clientWidth;
  progressBar.style.width = `${e.offsetX}px`;
  mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
  currentVidTime.innerText = formatTime(mainVideo.currentTime);
};

volumeBtn.addEventListener("click", () => {
  if (!volumeBtn.classList.contains("fa-volume-high")) {
    mainVideo.volume = 0.5;
    volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
  } else {
    mainVideo.volume = 0.0;
    volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
  }
  volumeSlider.value = mainVideo.volume;
});

volumeSlider.addEventListener("input", (e) => {
  mainVideo.volume = e.target.value;
  if (e.target.value == 0) {
    return volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
  }
  volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
});

speedOptions.querySelectorAll("li").forEach((option) => {
  option.addEventListener("click", () => {
    mainVideo.playbackRate = option.dataset.speed;
    speedOptions.querySelector(".active").classList.remove("active");
    option.classList.add("active");
  });
});

let speedChangeTimer;

const handleSpeedChange = (direction) => {
  if (direction === "forward") {
    mainVideo.playbackRate = 2;
  } else if (direction === "backward") {
    mainVideo.playbackRate = 1;
  }
};

container.addEventListener("mousedown", (e) => {
  const clickStartPosition = e.clientX;

  if (clickStartPosition > container.clientWidth / 2) {
    handleSpeedChange("forward");
  } else {
    handleSpeedChange("backward");
  }

  speedChangeTimer = setInterval(() => {
    if (clickStartPosition > container.clientWidth / 2) {
      handleSpeedChange("forward");
    } else {
      handleSpeedChange("backward");
    }
  }, 200);
});

container.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

container.addEventListener("mouseup", () => {
  clearInterval(speedChangeTimer);
});

document.addEventListener("click", (e) => {
  if (
    e.target.tagName !== "SPAN" ||
    e.target.className !== "material-symbols-rounded"
  ) {
    speedOptions.classList.remove("show");
  }
});

fullScreenBtn.addEventListener("click", () => {
  container.classList.toggle("fullscreen");
  if (document.fullscreenElement) {
    fullScreenBtn.classList.replace("fa-compress", "fa-expand");
    return document.exitFullscreen();
  }
  fullScreenBtn.classList.replace("fa-expand", "fa-compress");
  container.requestFullscreen();
});

// GESTURES CODE ................................................

document.addEventListener("DOMContentLoaded", function () {
  const video = document.querySelector("video");
  const progressArea = document.querySelector(".progress-area");
  const progressBar = document.querySelector(".progress-bar");

  let isSeeking = false;
  let seekDirection = 1;
  let skipInterval = 5;

  function updateProgressBar() {
    const percentage = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percentage}%`;
  }

  function handleSeeking() {
    video.currentTime += seekDirection * skipInterval;
    updateProgressBar();
  }

  let lastClickTime = 0;

  document.addEventListener("click", function (e) {
    const currentTime = new Date().getTime();
    const timeSinceLastClick = currentTime - lastClickTime;

    if (timeSinceLastClick < 300) {
      const clickPosition =
        e.clientX - progressArea.getBoundingClientRect().left;

      if (clickPosition < progressArea.offsetWidth * 0.2) {
        video.currentTime -= skipInterval * 2;
      } else if (clickPosition > progressArea.offsetWidth * 0.8) {
        video.currentTime += skipInterval * 2;
      } else {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      }

      updateProgressBar();
    }

    lastClickTime = currentTime;
  });

  let seekingInterval;

  document.addEventListener("mousedown", function (e) {
    const clickPosition = e.clientX - progressArea.getBoundingClientRect().left;

    if (clickPosition < progressArea.offsetWidth * 0.5) {
      isSeeking = true;
      seekDirection = -1;

      seekingInterval = setInterval(handleSeeking, 500);
    }
  });

  document.addEventListener("mousedown", function (e) {
    const clickPosition = e.clientX - progressArea.getBoundingClientRect().left;

    if (clickPosition > progressArea.offsetWidth * 0.5) {
      isSeeking = true;
      seekDirection = 2;

      seekingInterval = setInterval(handleSeeking, 5000);
    }
  });

  document.addEventListener("mouseup", function () {
    if (isSeeking) {
      isSeeking = false;
      clearInterval(seekingInterval);
    }
  });
});

// CONTROL BUTTON Code ....................................................

speedBtn.addEventListener("click", () => speedOptions.classList.toggle("show"));
pipBtn.addEventListener("click", () => mainVideo.requestPictureInPicture());
skipBackward.addEventListener("click", () => (mainVideo.currentTime -= 5));
skipForward.addEventListener("click", () => (mainVideo.currentTime += 5));
mainVideo.addEventListener("play", () =>
  playPauseBtn.classList.replace("fa-play", "fa-pause")
);
mainVideo.addEventListener("pause", () =>
  playPauseBtn.classList.replace("fa-pause", "fa-play")
);
playPauseBtn.addEventListener("click", () =>
  mainVideo.paused ? mainVideo.play() : mainVideo.pause()
);
videoTimeline.addEventListener("mousedown", () =>
  videoTimeline.addEventListener("mousemove", draggableProgressBar)
);
document.addEventListener("mouseup", () =>
  videoTimeline.removeEventListener("mousemove", draggableProgressBar)
);
