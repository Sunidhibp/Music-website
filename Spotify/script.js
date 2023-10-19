
let navbar = document.querySelector('.navbar');
document.querySelector('#menu').onclick = () =>{
    navbar.classList.toggle('active');
}
window.onscroll = () =>{
    navbar.classList.remove('active');
}
$(document).ready(function(){
    $('.button').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        var filter = $(this).attr('data-filter')
        if(filter == 'all'){
            $('.library .image').show(400);
        }
        else{
            $('.library .image').not('.' +filter).hide(200);
            $('.library .image').filter('.' +filter).show(200);
        }
    });
    $('.library').magnificPopup({
        delegate:'a',
        type:'image',
        library:{
            enabled:true,
        }
    });
});

/* player */

let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'https://i.scdn.co/image/ab67616d0000b273eceaf0c574ae5003bea98621',
        name : 'Money',
        artist : 'Lisa',
        music : 'music/money.mp3'
    },
    {
        img : 'https://i.guim.co.uk/img/media/b770505dfc99d0d5becb98b249ec2131e35b9039/0_0_3475_2085/master/3475.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=a8de03c161a67580746bf8ccac987b3a',
        name : 'Hymn fo the Weekend',
        artist : 'Coldplay',
        music : 'music/Hymn for the Weekend.mp3'
    },
    {
        img : 'https://hiphopkit.com/uploads/2022/09/BTS-Run-Bts-artwork.webp',
        name : 'Run',
        artist : 'BTS',
        music : 'music/Run BTS.mp3'
    },
    {
        img : 'https://www.dochords.com/wp-content/uploads/2022/03/Imagine-Dragons.jpg',
        name : 'Bones',
        artist : 'Imagine Dragons',
        music : 'music/Bones.mp3'
    },
    {
        img : 'https://assets.pikiran-rakyat.com/crop/0x0:0x0/750x500/photo/2021/04/21/3788962936.png',
        name : 'Hurts so good',
        artist : 'Astrid',
        music : 'music/Hurts So Good.mp3'
    },
    {
        img : 'https://www.dochords.com/wp-content/uploads/2022/03/Imagine-Dragons.jpg',
        name : 'Bones',
        artist : 'Imagine Dragons',
        music : 'music/Bones.mp3'
    },
    {
        img : 'https://i.scdn.co/image/ab67616d0000b27314bb1d200c3c9ac17879a190',
        name : 'Name of Love(slowed)',
        artist : 'Martin Garrix & Bebe Rexha',
        music : 'music/name of love.mp3'
    },
    {
        img : 'https://i.scdn.co/image/ab67616d0000b27314bb1d200c3c9ac17879a190',
        name : 'Shinunoga E-Wa',
        artist : 'Fujii kaze',
        music : 'https://open.spotify.com/track/0o9zmvc5f3EFApU52PPIyW?si=309c40445f1f4f2e'
    }
];

loadTrack(track_index);
function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
/* end */