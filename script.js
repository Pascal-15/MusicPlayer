const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');
const songCover = document.getElementById('cover');
const songTitle = document.getElementById('song-title');
const volumeSlider = document.getElementById('slider');
const progressBar = document.getElementById('song-time');

//Song list
const MusicList = [
    {
        path: 'assets/sounds/track_1.mp3',
        cover: 'assets/img/cover_track1.png',
        name: 'Track 1'
    },
    {
        path: 'assets/sounds/track_2.mp3',
        cover: 'assets/img/cover_track2.png',
        name: 'Track 2'
    },
    {
        path: 'assets/sounds/track_3.wav',
        cover: 'assets/img/cover_track3.png',
        name: 'Track 3'
    }
]

let isPlaying = false;
let MusicListIndex = 0;
let song = new Audio('assets/sounds/track_1.mp3');
song.volume = volumeSlider.value / 100;


//Functions
function playSong() {
    if (isPlaying != true) {
        isPlaying = true;
        playButton.classList.replace('fa-play', 'fa-pause');
        song.play();
    }
    else {
        pauseSong();
    }
}
function pauseSong()  {
    song.pause();
    isPlaying = false;
    playButton.classList.replace('fa-pause', 'fa-play');
}
function nextSong() {
    pauseSong();
    if (MusicListIndex < MusicList.length - 1) {
        MusicListIndex ++;
    }
    else {
        MusicListIndex = 0;
    }
    update();
    playSong();
    console.log('Index: ' + MusicListIndex);
    console.log('Length: ' + MusicList.length);
}
function previousSong() {
    pauseSong();
    if (MusicListIndex > 0) {
        MusicListIndex --;
    }
    else {
        MusicListIndex = MusicList.length - 1;
    }
    update();
    playSong();
    console.log('Index: ' + MusicListIndex);
    console.log('Length: ' + MusicList.length);
}
function update() {
    songCover.src = MusicList[MusicListIndex].cover;
    songTitle.textContent = MusicList[MusicListIndex].name;
    song.src = MusicList[MusicListIndex].path;

    console.log(songCover.src);
    console.log(song.src);
}

function changeVolume() {
    song.volume = volumeSlider.value / 100;
    console.log(song.length);

}

function updateBar() {
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
}

function changeSongTime(x) {
    const width = progressBar.clientWidth;
    console.log('Width: ' + width);
    const click = x.offsetX;
    console.log('Click: ' + click);
    song.currentTime = (click / width) * song.duration;
}


//Event handler
playButton.addEventListener('click', playSong);
nextButton.addEventListener('click', nextSong);
previousButton.addEventListener('click', previousSong);
volumeSlider.addEventListener('input', changeVolume);
song.addEventListener('ended', pauseSong);
song.addEventListener('timeupdate', updateBar)
progressBar.addEventListener('click', changeSongTime);


update();