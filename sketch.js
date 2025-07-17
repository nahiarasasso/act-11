let song;
let fft;
let playButton, stopButton, volumeUp, volumeDown;
let playing = false;

function preload() {
  song = loadSound('assets/Morat_-_El_Embrujo_CeeNaija.com_.mp3');
}

function setup() {
  let canvas = createCanvas(500, 260);
  canvas.parent('musicBox');

  playButton = select('#playButton');
  playButton.mousePressed(togglePlay);

  stopButton = select('#stopButton');
  stopButton.mousePressed(stopSong);

  volumeUp = select('#volumeUp');
  volumeUp.mousePressed(increaseVolume);

  volumeDown = select('#volumeDown');
  volumeDown.mousePressed(decreaseVolume);

  fft = new p5.FFT();
  fft.setInput(song);
}

function draw() {
  background(30, 50, 40);
  let spectrum = fft.analyze();

  noStroke();
  for (let i = 0; i < spectrum.length; i += 20) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = map(spectrum[i], 0, 255, 0, height);
    fill(random(100,255), random(100,255), random(100,255), 220);
    rect(x, height - h, width / spectrum.length * 20, h, 8);
  }
}

function togglePlay() {
  if (playing) {
    song.pause();
    playButton.html('▶');
  } else {
    song.loop();
    playButton.html('⏸');
  }
  playing = !playing;
}

function stopSong() {
  song.stop();
  playButton.html('▶');
  playing = false;
}

function increaseVolume() {
  let v = song.getVolume();
  song.setVolume(constrain(v + 0.1, 0, 1));
}

function decreaseVolume() {
  let v = song.getVolume();
  song.setVolume(constrain(v - 0.1, 0, 1));
}



let isPlaying = false;
let volume = 70;

const musicBox = document.getElementById('musicBox');
const playButton = document.getElementById('playButton');
const stopButton = document.getElementById('stopButton');
const volumeUp = document.getElementById('volumeUp');
const volumeDown = document.getElementById('volumeDown');
const volumeFill = document.getElementById('volumeFill');
const message = document.getElementById('message');

function updateVolumeDisplay() {
    volumeFill.style.width = volume + '%';
}

function showMessage(text) {
    message.textContent = text;
    message.classList.add('show');
    setTimeout(() => {
        message.classList.remove('show');
    }, 2000);
}

playButton.addEventListener('click', () => {
    if (!isPlaying) {
        isPlaying = true;
        musicBox.classList.add('playing');
        playButton.textContent = '⏸️';
        showMessage('¡Reproduciendo música hermosa! 🎵');
    } else {
        isPlaying = false;
        musicBox.classList.remove('playing');
        playButton.textContent = '▶️';
        showMessage('Música pausada 🎭');
    }
});

stopButton.addEventListener('click', () => {
    isPlaying = false;
    musicBox.classList.remove('playing');
    playButton.textContent = '▶️';
    showMessage('Música detenida ⏹️');
});

volumeUp.addEventListener('click', () => {
    if (volume < 100) {
        volume += 10;
        updateVolumeDisplay();
        showMessage('Volumen subido! 🔊');
    } else {
        showMessage('¡Volumen al máximo! 🎉');
    }
});

volumeDown.addEventListener('click', () => {
    if (volume > 0) {
        volume -= 10;
        updateVolumeDisplay();
        showMessage('Volumen bajado 🔉');
    } else {
        showMessage('Volumen al mínimo 🤫');
    }
});

// Inicializar
updateVolumeDisplay();

// Efecto de partículas cute
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.fontSize = '12px';
    sparkle.style.color = '#ffb6c1';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.textContent = '✨';
    
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = Math.random() * window.innerHeight + 'px';
    
    document.body.appendChild(sparkle);
    
    sparkle.animate([
        { transform: 'translateY(0px) scale(1)', opacity: 1 },
        { transform: 'translateY(-100px) scale(0)', opacity: 0 }
    ], {
        duration: 2000,
        easing: 'ease-out'
    });
    
    setTimeout(() => {
        sparkle.remove();
    }, 2000);
}

// Crear brillos periódicamente
setInterval(createSparkle, 3000);