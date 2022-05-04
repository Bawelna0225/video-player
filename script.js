const video_player = document.querySelector("#video_player"),
  mainVideo = video_player.querySelector("#main-video"),
  progressAreaTime = video_player.querySelector(".progressAreaTime"),
  controls = video_player.querySelector(".controls"),
  progressArea = video_player.querySelector(".progress-area"),
  progress_Bar = video_player.querySelector(".progress-bar"),
  fast_rewind = video_player.querySelector(".fast-rewind"),
  play_pause = video_player.querySelector(".play_pause"),
  fast_forward = video_player.querySelector(".fast-forward"),
  volume = video_player.querySelector(".volume"),
  volume_range = video_player.querySelector(".volume_range"),
  current = video_player.querySelector(".current"),
  totalDuration = video_player.querySelector(".duration"),
  fullscreen = video_player.querySelector(".fullscreen"),
  tracks = video_player.querySelectorAll("track");

// Play video function
function playVideo() {
  play_pause.innerHTML = "pause";
  play_pause.title = "pause";
  video_player.classList.add("paused");
  mainVideo.play();
}

// Pause video function
function pauseVideo() {
  play_pause.innerHTML = "play_arrow";
  play_pause.title = "play";
  video_player.classList.remove("paused");
  mainVideo.pause();
}

play_pause.addEventListener("click", () => {
  const isVideoPaused = video_player.classList.contains("paused");
  isVideoPaused ? pauseVideo() : playVideo();
});

mainVideo.addEventListener("play", () => {
  playVideo();
});

mainVideo.addEventListener("pause", () => {
  pauseVideo();
});

// fast_rewind video function
fast_rewind.addEventListener("click", () => {
  mainVideo.currentTime -= 10;
});

// fast_forward video function
fast_forward.addEventListener("click", () => {
  mainVideo.currentTime += 10;
});

// Load video duration
mainVideo.addEventListener("loadeddata", (e) => {
  let videoDuration = e.target.duration;
  let totalMin = Math.floor(videoDuration / 60);
  let totalSec = Math.floor(videoDuration % 60);

  // if seconds are less then 10 then add 0 at the begning
  totalSec < 10 ? (totalSec = "0" + totalSec) : totalSec;
  totalDuration.innerHTML = `${totalMin} : ${totalSec}`;
});

// Current video duration
mainVideo.addEventListener("timeupdate", (e) => {
  let currentVideoTime = e.target.currentTime;
  let currentMin = Math.floor(currentVideoTime / 60);
  let currentSec = Math.floor(currentVideoTime % 60);
  // if seconds are less then 10 then add 0 at the begning
  currentSec < 10 ? (currentSec = "0" + currentSec) : currentSec;
  current.innerHTML = `${currentMin} : ${currentSec}`;

  let videoDuration = e.target.duration;
  // progressBar width change
  let progressWidth = (currentVideoTime / videoDuration) * 100 + 0.5;
  progress_Bar.style.width = `${progressWidth}%`;
});

// let's update playing video current time on according to the progress bar width

progressArea.addEventListener("click", (e) => {
  let videoDuration = mainVideo.duration;
  let progressWidthval = progressArea.clientWidth + 2;
  let ClickOffsetX = e.offsetX;
  mainVideo.currentTime = (ClickOffsetX / progressWidthval) * videoDuration;
});

// change volume
function changeVolume() {
  mainVideo.volume = volume_range.value / 100;
  if (volume_range.value == 0) {
    volume.innerHTML = "volume_off";
  } else if (volume_range.value < 40) {
    volume.innerHTML = "volume_down";
  } else {
    volume.innerHTML = "volume_up";
  }
}

function muteVolume() {
  if (volume_range.value == 0) {
    volume_range.value = 80;
    mainVideo.volume = 0.8;
    volume.innerHTML = "volume_up";
  } else {
    volume_range.value = 0;
    mainVideo.volume = 0;
    volume.innerHTML = "volume_off";
  }
}

volume_range.addEventListener("change", () => {
  changeVolume();
});

volume.addEventListener("click", () => {
  muteVolume();
});

// Update progress area time and display block on mouse move
progressArea.addEventListener("mousemove", (e) => {
  let progressWidthval = progressArea.clientWidth + 2;
  let x = e.offsetX;
  let videoDuration = mainVideo.duration;
  let progressTime = Math.floor((x / progressWidthval) * videoDuration);
  let currentMin = Math.floor(progressTime / 60);
  let currentSec = Math.floor(progressTime % 60);
  progressAreaTime.style.setProperty("--x", `${x}px`);
  progressAreaTime.style.display = "block";
  // if seconds are less then 10 then add 0 at the begning
  currentSec < 10 ? (currentSec = "0" + currentSec) : currentSec;
  progressAreaTime.innerHTML = `${currentMin} : ${currentSec}`;
});

progressArea.addEventListener("mouseleave", () => {
  progressAreaTime.style.display = "none";
});


mainVideo.addEventListener("ended", () => {
  if (auto_play.classList.contains("active")) {
    playVideo();
  } else {
    play_pause.innerHTML = "replay";
    play_pause.title = "Replay";
  }
});


// Full screen function

fullscreen.addEventListener("click", () => {
  if (!video_player.classList.contains("openFullScreen")) {
    video_player.classList.add("openFullScreen");
    fullscreen.innerHTML = "fullscreen_exit";
    video_player.requestFullscreen();
  } else {
    video_player.classList.remove("openFullScreen");
    fullscreen.innerHTML = "fullscreen";
    document.exitFullscreen();
  }
});


let track = mainVideo.textTracks;

function removeActiveClasses(e) {
  e.forEach((event) => {
    event.classList.remove("active");
  });
}

mainVideo.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

// Mouse move controls
video_player.addEventListener("mouseenter", () => {
  controls.classList.add("active");

});

video_player.addEventListener("mouseleave", () => {
  if(video_player.classList.contains("paused")) {
    controls.classList.remove("active");
  }
});




// mobile touch controls
video_player.addEventListener(
  "touchstart",
  () => {
    controls.classList.add("active");
    setTimeout(() => {
      controls.classList.remove("active");
    }, 8000);
  },
  { passive: true }
);

video_player.addEventListener(
  "touchmove",
  () => {
    if (video_player.classList.contains("paused")) {
      controls.classList.remove("active");
      if (tracks.length != 0) {
      }
    } else {
      controls.classList.add("active");
    }
  },
  { passive: true }
);






const expandBtn = document.querySelector('.expand-btn'),
expandContent = document.querySelector('.expand-content'),
expandIcon = document.querySelector('.expand-btn .material-icons'),
searchBtn = document.querySelector('.searchbtn'),
searchBar = document.querySelector('.searchbar'),
comments = document.querySelectorAll('.comment')


expandBtn.onclick = () => {
  expandContent.classList.toggle('active')
  expandIcon.innerText = "expand_less"
  expandContent.classList.contains('active') 
  ? expandIcon.innerText = "expand_less" 
  : expandIcon.innerText = "expand_more"
}


document.querySelector('.quantity').innerHTML = comments.length



const menuButton = document.querySelector('.menu'),
menuContent = document.querySelector('.menu-content'),
themesBtn = document.querySelector('.themes-btn'),
themesBox = document.querySelector('.themes-box'),
menuItems = document.querySelector('.menu-items'),
backBtn = document.querySelector('.back-btn')

menuButton.onclick = () => {
  menuButton.classList.toggle('active')
  menuContent.classList.toggle('active')
  menuContent.style.overflow = 'hidden'
}

themesBtn.onclick = () => {
  themesBox.classList.add('active')
  menuItems.classList.remove('active')
  const themesHeight = themesBox.offsetHeight
  menuContent.style.height = `${themesHeight}px`
}

backBtn.onclick = () => {
  themesBox.classList.remove('active')
  menuItems.classList.add('active')
  menuContent.style.height = '220px'
  
}

const backgrounds = `[
  {
    "id": "light",
    "name": "Dark-Background",
    "colors": {
      "navbar": "rgba(232, 232, 232, 0.95)",
      "primary": "#fff",
      "secondary": "#f5f5f5",
      "third": "#e7e7e7",
      "text": "#333"
    }
  },
  {
    "id": "dark",
    "name": "Dark-Background",
    "colors": {
      "navbar": "rgba(20, 20, 20, 0.95)",
      "primary": "#333",
      "secondary": "#222",
      "third": "#111",
      "text": "#ddd"
    }
  }
]`
const accentColors = `[
  {
    "id": "orange",
    "name": "Orange",
    "color": "#ffa600"
  },
  {
    "id": "blue",
    "name": "Blue",
    "color": "#0055ff"
  },
  {
    "id": "red",
    "name": "Red",
    "color": "#dc2222"
  },
  {
    "id": "green",
    "name": "Green",
    "color": "#38e415"
  },
  {
    "id": "purple",
    "name": "Purple",
    "color": "#9b1ac2"
  }
]` 

const root = document.documentElement
const parsedBackgrounds = JSON.parse(backgrounds)
const parsedAccentColors = JSON.parse(accentColors)


root.style.setProperty('--navbar-color', localStorage.getItem('navbar-color'))
root.style.setProperty('--primary-color', localStorage.getItem('primary'))        
root.style.setProperty('--secondary-color', localStorage.getItem('secondary'))
root.style.setProperty('--third-color', localStorage.getItem('third'))
root.style.setProperty('--text-color', localStorage.getItem('text'))
root.style.setProperty('--accent-color', localStorage.getItem('accent-color'))

const setBackground = (color) => {
  parsedBackgrounds.filter((parsedBackground) => {
    const {id, name, colors: {navbar, primary, secondary, third, text}} = parsedBackground
    if(id === color){

      root.style.setProperty('--navbar-color', navbar)
      root.style.setProperty('--primary-color', primary)                     
      root.style.setProperty('--secondary-color', secondary)
      root.style.setProperty('--third-color', third)
      root.style.setProperty('--text-color', text)

      localStorage.setItem('navbar-color', navbar)
      localStorage.setItem('primary', primary)                   
      localStorage.setItem('secondary', secondary)
      localStorage.setItem('third', third)
      localStorage.setItem('text', text)

      return currentBackground
    }
  })
}

const setAccentColor = (accent) => {
  parsedAccentColors.filter((parsedAccentColor) => {
    const {id, name, color} = parsedAccentColor
    if(id === accent){

      root.style.setProperty('--accent-color', color)

      localStorage.setItem('accent-color', color)
    }
  })
}




const placeDivsRandomnly = () => {
  const backgroundDivs = [...document.getElementsByClassName('div')],
  winWidth = window.innerWidth,
  winHeight = window.innerHeight

  const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min  
  }
  backgroundDivs.forEach(div => {
      randomTop = getRandomNumber(0, winHeight)
      randomLeft = getRandomNumber(0, winWidth)

      div.style.top = randomTop + 'px'
      div.style.left = randomLeft + 'px'
  })
}
let resize
placeDivsRandomnly()
window.onresize = () => {
  clearTimeout(resize)
  // placeDivsRandomnly()
  resize = setTimeout(placeDivsRandomnly, 300)
}



  
