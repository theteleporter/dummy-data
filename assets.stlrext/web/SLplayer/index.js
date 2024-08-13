(function() {
"use strict";

// Select elements here
const video = document.getElementById('video');
const videoControls = document.getElementById('video-controls');


const videoWorks = !!document.createElement('video').canPlayType;
if (videoWorks) {
  video.controls = false;
  videoControls.classList.remove('hidden');
}

const playButton = document.getElementById('play');


// togglePlay toggles the playback state of the video.
// If the video playback is paused or ended, the video is played
// otherwise, the video is paused
function togglePlay() {
  if (video.paused || video.ended) {
    video.play();
  } else {
    video.pause();
  }
}

// Add eventlisteners here
playButton.addEventListener('click', togglePlay);

const playbackIcons = document.querySelectorAll('.playback-icons use');

// updatePlayButton updates the playback icon and tooltip
// depending on the playback state
function updatePlayButton() {
  playbackIcons.forEach(icon => icon.classList.toggle('hidden'));
}


video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);

function updatePlayButton() {
  playbackIcons.forEach(icon => icon.classList.toggle('hidden'));
}

const timeElapsed = document.getElementById('time-elapsed');


// formatTime takes a time length in seconds and returns the time in
// minutes and seconds
function formatTime(timeInSeconds) {
  const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

  return {
    minutes: result.substr(3, 2),
    seconds: result.substr(6, 2),
  };
};


video.addEventListener('loadedmetadata', initializeVideo);


// updateTimeElapsed indicates how far through the video
// the current playback is
function updateTimeElapsed() {
  const time = formatTime(Math.round(video.currentTime));
  timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
  timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
}


video.addEventListener('timeupdate', updateTimeElapsed);


const progressBar = document.getElementById('progress-bar');
const seek = document.getElementById('seek');


function initializeVideo() {
  const videoDuration = Math.round(video.duration);
  seek.setAttribute('max', videoDuration);
  progressBar.setAttribute('max', videoDuration);
  const time = formatTime(videoDuration);
  duration.innerText = `${time.minutes}:${time.seconds}`;
  duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
}


// updateProgress indicates how far through the video
// the current playback is by updating the progress bar
function updateProgress() {
  seek.value = Math.floor(video.currentTime);
  progressBar.value = Math.floor(video.currentTime);
}

video.addEventListener('timeupdate', updateProgress);


const seekTooltip = document.getElementById('seek-tooltip');


// updateSeekTooltip uses the position of the mouse on the progress bar to
// roughly work out what point in the video the user will skip to if
// the progress bar is clicked at that point
function updateSeekTooltip(event) {
  const skipTo = Math.round((event.offsetX / event.target.clientWidth) * parseInt(event.target.getAttribute('max'), 10));
  seek.setAttribute('data-seek', skipTo)
  const t = formatTime(skipTo);
  seekTooltip.textContent = `${t.minutes}:${t.seconds}`;
  const rect = video.getBoundingClientRect();
  seekTooltip.style.left = `${event.pageX - rect.left}px`;
}


seek.addEventListener('mousemove', updateSeekTooltip);


// skipAhead jumps to a different point in the video when
// the progress bar is clicked
function skipAhead(event) {
  const skipTo = event.target.dataset.seek ? event.target.dataset.seek : event.target.value;
  video.currentTime = skipTo;
  progressBar.value = skipTo;
  seek.value = skipTo;
}


seek.addEventListener('input', skipAhead);


const volumeButton = document.getElementById('volume-button');
const volumeIcons = document.querySelectorAll('.volume-button use');
const volumeMute = document.querySelector('use[href="#volume-mute"]');
const volumeLow = document.querySelector('use[href="#volume-low"]');
const volumeMedium = document.querySelector('use[href="#volume-medium"]');
const volumeHigh = document.querySelector('use[href="#volume-high"]');
const volume = document.getElementById('volume');



// updateVolume updates the video's volume
// and disables the muted state if active
function updateVolume() {
  if (video.muted) {
    video.muted = false;
  }

  video.volume = volume.value;
}


volume.addEventListener('input', updateVolume);


// updateVolumeIcon updates the volume icon so that it correctly reflects
// the volume of the video
function updateVolumeIcon() {
  volumeIcons.forEach(icon => {
    icon.classList.add('hidden');
  });


  if (video.muted || video.volume === 0) {
    volumeMute.classList.remove('hidden');
  } else if (video.volume > 0 && video.volume <= 0.4) {
    volumeLow.classList.remove('hidden');
  } else if (video.volume > 0.4 && video.volume <= 0.8) {
    volumeMedium.classList.remove('hidden');
  } else {
    volumeHigh.classList.remove('hidden');
  }
}


video.addEventListener('volumechange', updateVolumeIcon);


// toggleMute mutes or unmutes the video when executed
// When the video is unmuted, the volume is returned to the value
// it was set to before the video was muted
function toggleMute() {
  video.muted = !video.muted;

  if (video.muted) {
    volume.setAttribute('data-volume', volume.value);
    volume.value = 0;
  } else {
    volume.value = volume.dataset.volume;
  }
}


volumeButton.addEventListener('click', toggleMute);


video.addEventListener('click', togglePlay);


const playbackAnimation = document.getElementById('playback-animation');


// animatePlayback displays an animation when
// the video is played or paused
function animatePlayback() {
  playbackAnimation.animate([
    {
      opacity: 1,
      transform: "scale(1)",
    },
    {
      opacity: 0,
      transform: "scale(1.3)",
    }], {
    duration: 500,
  });
}


video.addEventListener('click', animatePlayback);


const fullscreenButton = document.getElementById('fullscreen-button');
const videoContainer = document.getElementById('video-container');


// toggleFullScreen toggles the full screen state of the video
// If the browser is currently in fullscreen mode,
// then it should exit and vice versa.
function toggleFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else if (document.webkitFullscreenElement) {
    // Need this to support Safari
    document.webkitExitFullscreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    // Need this to support Safari
    videoContainer.webkitRequestFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }
}
fullscreenButton.onclick = toggleFullScreen;
const fullscreenIcons = fullscreenButton.querySelectorAll('.fullscreen-icons use');


// updateFullscreenButton changes the icon of the full screen button
// and tooltip to reflect the current full screen state of the video
function updateFullscreenButton() {
  fullscreenIcons.forEach(icon => icon.classList.toggle('hidden'));
}


videoContainer.addEventListener('fullscreenchange', updateFullscreenButton);

fullscreenButton.addEventListener('click', updateFullscreenButton);


// hideControls hides the video controls when not in use
// if the video is paused, the controls must remain visible
function hideControls() {
  if (video.paused) {
    return;
  }

  videoControls.classList.add('hide');
}

// showControls displays the video controls
function showControls() {
  videoControls.classList.remove('hide');
}


video.ontouchend = hideControls;
video.ontouchcancel = showControls;
video.ontouchmove = showControls;
video.ontouchstart = showControls;
video.addEventListener('mouseenter', showControls);
video.addEventListener('mouseleave', hideControls);
videoControls.addEventListener('mouseenter', showControls);
videoControls.addEventListener('mouseleave', hideControls);

// keyboardShortcuts executes the relevant functions for
// each supported shortcut key
function keyboardShortcuts(event) {
  const { key } = event;
  switch(key){
    case ' ':
      togglePlay();
      animatePlayback();
      if (video.paused) {
        showControls();
      } else {
        setTimeout(() => {
          hideControls();
        }, 2000);
      }
      break;
    case 'm':
      toggleMute();
      break;
    case 'f':
      toggleFullScreen();
      updateFullscreenButton();
      break;
  }
}
function arrowShortcuts(e) {
  var key_code = e.which || e.keyCode;
  switch (key_code) {
    /**case 37: //left arrow key
          seekBack();
          break;
      case 38: //Up arrow key
          toggleVolume();
          break;
      case 39: //right arrow key
          toggleVolume();
          break;
      case 40: //down arrow key
          seekFront();
          break;**/
      case 27://escape key
          end();
          if (video.play) {
            updatePlayButton();
          }
          break;
  }
}
document.addEventListener('keydown', arrowShortcuts);
document.addEventListener('keyup', keyboardShortcuts);

const subtitleContainer = document.querySelector('.subtitle-audio-container');
const subtitleButton = document.querySelector('.subtitle-audio-button');
function subtitles() {
  subtitleContainer.classList.toggle('d-block');
}
subtitleButton.addEventListener('click', subtitles);

const endButton = document.querySelector('button.stop');

function end(){
if (video.play || video.paused || video.ended){
  video.load();
}
};
endButton.addEventListener('click', end);
endButton.addEventListener('click', showControls);
endButton.addEventListener('click', updatePlayButton);




})();