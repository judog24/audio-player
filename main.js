let playerContainer = document.getElementById('player-container')
let playerAudio = document.getElementById('player-audio')
let duration

let playerBtnRewind = document.getElementById('player-btn-rewind')
let playerBtnPlay = document.getElementById('player-btn-play')
let playerBtnForward = document.getElementById('player-btn-forward')
let playerBtnVolume = document.getElementById('player-btn-volume')

let playerTimeline = document.getElementById('player-timeline')
let playerTimelineProgress = document.getElementById('player-timeline-progress')
let playerTimelinePlayhead = document.getElementById('player-timeline-playhead')

let playerTimelineHover = document.getElementById('player-timeline-hover')
let playerTrackDuration = document.getElementById('player-track-duration')
let playerTitleContainer = document.getElementById('player-title-container')
let playerTitle = document.getElementById('player-title')

let playerVolumeContainer = document.getElementById('player-volume-container')
let playerVolumeSlider = document.getElementById('player-volume-slider')
let playerVolumeLevel = document.getElementById('player-volume-level')

let currentlyScrollingTitle = false;

function playOrPauseAudio () {
  if (playerAudio.paused) {
    playerAudio.play()
    playerBtnPlay.className = 'player-btn pause'
  } else {
    playerAudio.pause()
    playerBtnPlay.className = 'player-btn play'
  }

  playerTitle.innerHTML = 'Giant Bombcast 442: Hair Products and Turkey Bacon'

  if (isScrollingTitle(playerTitle)) {
    startOrStopTitleScrolling()
  }
}

function updateTimeDuration () {
  let playPercent = (playerAudio.currentTime / playerAudio.duration) * 100
  playerTimelineProgress.style.width = playPercent + '%'
  let currentTime = Math.floor(playerAudio.currentTime).toString()
  duration = Math.floor(playerAudio.duration).toString()
  playerTrackDuration.innerHTML = formatTime(currentTime) + ' / ' + formatTime(duration)
}

function formatTime (seconds) {
  let hours = Math.floor(seconds / 3600)
  let minutes = Math.floor((seconds - (hours * 3600)) / 60)
  seconds = Math.floor(seconds - (hours * 3600) - (minutes * 60))

  if (minutes < 10) minutes = '0' + minutes
  if (seconds < 10) seconds = '0' + seconds

  return hours + ':' + minutes + ':' + seconds
}

function isScrollingTitle (title) {
  return (playerTitleContainer.offsetWidth < playerTitle.offsetWidth)
}

function startOrStopTitleScrolling () {
  playerTitle.style.paddingLeft = '0%'

  if (isScrollingTitle (playerTitle)) {
    playerTitle.style.paddingLeft = '100%'
    playerTitle.style.animation = 'scroll-title 15s linear 0s infinite'
    playerTitleContainer.className = 'scroll'
    currentlyScrollingTitle = true
  } else {
    playerTitleContainer.className = 'notransition'
    currentlyScrollingTitle = false
  }
}

function clickStartOrStopTitleScroll () {
  playerTitle.style.paddingLeft = '0%'

  if (isScrollingTitle (playerTitle)) {
    if (currentlyScrollingTitle) {
      playerTitleContainer.className = 'notransition'
      currentlyScrollingTitle = false
    } else {
      playerTitleContainer.className = 'scroll'
      currentlyScrollingTitle = true
    }
  }
}

let onPlayhead = false

function onAudioPlayerTimelineMouseDown (e) {
  onPlayhead = true
  window.addEventListener('mousemove', movePlayhead, true)
  playerAudio.removeEventListener('timeupdate', updateTimeDuration, false)
}

let onVolumeSlider = false

function onAudioPlayerVolumeSliderMouseDown (e) {
  onVolumeSlider = true
  window.addEventListener('mousemove', moveVolumeSlider, true)
}

function onAudioPlayerMouseUp (e) {
  if (onPlayhead === true) {
    //movePlayhead(e)
    window.removeEventListener('mousemove', movePlayhead, true)
    playerAudio.currentTime = playerAudio.duration * clickAudioPercent(e)
    playerAudio.addEventListener('timeupdate', updateTimeDuration, false)
  }

  if (onVolumeSlider === true) {
    moveVolumeSlider(e)
    window.removeEventListener('mousemove', moveVolumeSlider, true)
  }

  onPlayhead = false
  onVolumeSlider = false
}

function movePlayhead (e) {
  let playheadPosition = e.pageX / playerTimeline.offsetWidth
  playerTimelineProgress.style.width = playheadPosition * 100 + '%'
}

function moveVolumeSlider (e) {
  let sliderPosition = e.pageX - playerVolumeSlider.offsetLeft

  if(sliderPosition > 0 && sliderPosition < 100) {
    playerVolumeLevel.style.width = sliderPosition + '%'
    playerAudio.volume = sliderPosition / 100

    //(sliderPosition > 50) ? playerBtnVolume.className = 'player-btn volume-up' : playerBtnVolume.className = 'player-btn volume-down'
    if (sliderPosition > 50) {
      playerBtnVolume.className = 'player-btn right volume-up'
    } else if (sliderPosition < 50  && sliderPosition > 10) {
      playerBtnVolume.className = 'player-btn right volume-down'
    } else if (sliderPosition < 10) {
      playerBtnVolume.className = 'player-btn right volume-mute'
    }

  } else if (sliderPosition > 100) {
    playerVolumeLevel.style.width = '100%'
    playerAudio.volume = 1
    playerBtnVolume.className = 'player-btn right volume-up'
  } else if (sliderPosition < 0) {
    playerVolumeLevel.style.width = '0%'
    playerAudio.volume = 0
    playerBtnVolume.className = 'player-btn right volume-mute'
  }

  preMutedVolume = playerAudio.volume
}

function displayTimeHover (e) {
  let selectedTime = playerAudio.duration * (e.pageX / playerTimeline.offsetWidth)
  let cursorTimelinePosition = e.pageX / playerTimeline.offsetWidth * 100

  playerTimelineHover.innerHTML = formatTime(selectedTime - 2)

  if (cursorTimelinePosition <= 98 && cursorTimelinePosition > 0) {
    playerTimelineHover.style.left = cursorTimelinePosition - 2 + '%'
  }

  if (cursorTimelinePosition > 98) playerTimelineHover.style.left = '95%'
  if (cursorTimelinePosition < 3) playerTimelineHover.style.left = '0%'
}

let preMutedVolume = 1
let muted = false

function muteAudio () {
  if (muted === false) {
    playerAudio.volume = 0
    playerBtnVolume.className = 'player-btn right volume-off'
    muted = true
  } else {
    playerAudio.volume = preMutedVolume

    if (preMutedVolume > 0.5) {
      playerBtnVolume.className = 'player-btn right volume-up'
    } else if (preMutedVolume < 0.5 && preMutedVolume > 0.1) {
      playerBtnVolume.className = 'player-btn right volume-down'
    } else {
      playerBtnVolume.className = 'player-btn right volume-mute'
    }

    muted = false
  }
}

function clickAudioPercent (e) {
  return (e.pageX - playerTimelinePlayhead.offsetWidth) / playerTimeline.offsetWidth
}

function rewind10 () {
  (playerAudio.currentTime < 10)
    ? playerAudio.currentTime = 0
    : playerAudio.currentTime -= 10
}

function forward10 () {
  (playerAudio.currentTime < (playerAudio.duration - 10))
    ? playerAudio.currentTime += 10
    : playerAudio.currentTime = playerAudio.duration
}

playerBtnRewind.addEventListener('click', rewind10, false)
playerBtnPlay.addEventListener('click', playOrPauseAudio, false)
playerBtnForward.addEventListener('click', forward10, false)
playerAudio.addEventListener('timeupdate', updateTimeDuration, false)
playerTimeline.addEventListener('mousemove', displayTimeHover, false)
//playerTimelinePlayhead.addEventListener('timeupdate', headClick, false)
playerTimeline.addEventListener('mousedown', onAudioPlayerTimelineMouseDown, false)
window.addEventListener('mouseup', onAudioPlayerMouseUp, false)
playerVolumeSlider.addEventListener('mousedown', onAudioPlayerVolumeSliderMouseDown, false)
playerBtnVolume.addEventListener('click', muteAudio, false)
window.addEventListener('resize', startOrStopTitleScrolling, false)
playerTitle.addEventListener('click', clickStartOrStopTitleScroll, false)
