const musicDir = 'music/';  // Diretório da pasta music
let playlist = [
    { name: 'Lil Tecca - Ransom ( Legendado)', file: 'Lil Tecca - Ransom ( Legendado).mp3', duration: '3:45', image: 'img/lil.png' },
    { name: '24kGoldn - Mood (Lyrics) ft. Iann Dior', file: '24kGoldn - Mood (Lyrics) ft. Iann Dior.mp3', duration: '4:20', image: 'img/mood2.png' },
    { name: 'End of the World', file: 'End of the World.mp3', duration: '5:15', image: 'img/endphonk.png' },
    { name: 'Fannypack - Hey Mami', file: 'Fannypack - Hey Mami.mp3', duration: '2:50', image: 'img/fannypack.png' },
    { name: 'Just A Lil Bit', file: 'Just A Lil Bit.mp3', duration: '3:10', image: 'img/50centavos.png' },
    { name: 'MIZGF.C Mashup - Write This Down x Dead Wrong', file: 'MIZGF.C Mashup - Write This Down x Dead Wrong.mp3', duration: '4:05', image: 'img/mashup.png' },
    { name: 'Oliver Tree - Life Goes On [Music Video]', file: 'Oliver Tree - Life Goes On [Music Video].mp3', duration: '3:35', image: 'img/live.png' },
    { name: 'Pain', file: 'Pain.mp3', duration: '4:00', image: 'img/dor.png' },
    { name: 'Post Malone, Swae Lee - Sunflower (Spider-Man_ Into the Spider-Verse) (Official Video)', file: 'Post Malone, Swae Lee - Sunflower (Spider-Man_ Into the Spider-Verse) (Official Video).mp3', duration: '3:20', image: 'img/miranha.png' },
    { name: 'Abbot ft.Somynem.grin -HYLANDER-', file: 'Abbot ft.Somynem.grin -HYLANDER-.mp3', duration: '4:30', image: 'img/homelander.png' }
];



let currentTrackIndex = 0;
let isPlaying = false;
let audio = new Audio();

const playlistElement = document.getElementById('playlist');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const currentTrackElement = document.getElementById('current-track');
const progressBar = document.getElementById('progress-bar');
const currentTimeElement = document.getElementById('current-time');

// Carregar a lista de reprodução
function loadPlaylist() {
    playlist.forEach((track, index) => {
        let trackElement = document.createElement('div');
        trackElement.classList.add('flex', 'justify-between');
        trackElement.innerHTML = `<span>${track.name}</span><span class="text-muted">${track.duration}</span>`;
        trackElement.addEventListener('click', () => {
            playTrack(index);
        });
        playlistElement.appendChild(trackElement);
    });
}

function playTrack(index) {
    currentTrackIndex = index;
    audio.src = musicDir + playlist[index].file;
    audio.play();
    isPlaying = true;
    playButton.innerHTML = '<span class="material-icons">pause</span>';
    currentTrackElement.innerText = `Tocando: ${playlist[index].name}`;
    
    // Atualiza a imagem do álbum
    document.querySelector('img').src = playlist[index].image;
}


// Controles de reprodução
playButton.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playButton.innerHTML = '<span class="material-icons">play_arrow</span>';
    } else {
        audio.play();
        playButton.innerHTML = '<span class="material-icons">pause</span>';
    }
    isPlaying = !isPlaying;
});

prevButton.addEventListener('click', () => {
    if (currentTrackIndex > 0) {
        playTrack(currentTrackIndex - 1);
    }
});

nextButton.addEventListener('click', () => {
    if (currentTrackIndex < playlist.length - 1) {
        playTrack(currentTrackIndex + 1);
    }
});

// Atualizar barra de progresso e tempo atual
audio.addEventListener('timeupdate', () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    let minutes = Math.floor(audio.currentTime / 60);
    let seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
    currentTimeElement.innerText = `${minutes}:${seconds}`;
});

progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

loadPlaylist();