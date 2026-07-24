// Pausar vídeo no hover (opcional, para interatividade)
const video = document.querySelector('video');
const section = document.querySelector('.video-section');
section.addEventListener('mouseenter', () => {
    video.playbackRate = 0.5; // Reduz velocidade no hover
});
section.addEventListener('mouseleave', () => {
    video.playbackRate = 1; // Velocidade normal
});

// JavaScript para gerar estrelas piscando e cadentes com variações aleatórias
const starContainer = document.getElementById('starContainer');
const numTwinklingStars = 100; // Número de estrelas piscando
const numShootingStars = 5; // Número inicial de cadentes (mais serão geradas periodicamente)
const twinkleDurationMin = 1; // Duração mínima do piscar (segundos)
const twinkleDurationMax = 5; // Máxima para variação
// Cores possíveis para estrelas (branco, azul claro, amarelo)
const starColors = ['#fff', '#a8d0e6', '#ffd700'];
// Função para criar uma estrela piscando
function createTwinklingStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    // Variações aleatórias para realismo
    const top = Math.random() * 100 + '%'; // Posição Y aleatória
    const left = Math.random() * 100 + '%'; // Posição X aleatória
    const size = (Math.random() * 3 + 1) + 'px'; // Tamanho 1-4px (pequenas = distantes)
    const duration = Math.random() * (twinkleDurationMax - twinkleDurationMin) + twinkleDurationMin + 's'; // Velocidade de piscar
    const delay = Math.random() * 2 + 's'; // Delay inicial
    const color = starColors[Math.floor(Math.random() * starColors.length)]; // Cor aleatória
    // Aplica estilos inline
    star.style.top = top;
    star.style.left = left;
    star.style.width = size;
    star.style.height = size;
    star.style.animationDuration = duration;
    star.style.animationDelay = delay;
    star.style.backgroundColor = color;
    // Adiciona ao container
    starContainer.appendChild(star);
    console.log('Estrela piscando criada:', top, left, duration); // Debug no console (F12)
    // Não remove (estrelas piscam infinitamente na posição fixa)
}
// Função para criar uma estrela cadente
function createShootingStar() {
    const shootingStar = document.createElement('div');
    shootingStar.classList.add('shooting-star');
    // Variações para cadentes
    const duration = (Math.random() * 3 + 2) + 's'; // Duração 2-5s (rápida)
    const delay = Math.random() * 5 + 's'; // Delay aleatório (até 5s para esporádico)
    const size = (Math.random() * 2 + 2) + 'px'; // Tamanho 2-4px
    const color = starColors[Math.floor(Math.random() * starColors.length)];
    // Aplica estilos
    shootingStar.style.width = size;
    shootingStar.style.height = size;
    shootingStar.style.animationDuration = duration;
    shootingStar.style.animationDelay = delay;
    shootingStar.style.backgroundColor = color;
    // Adiciona ao container
    starContainer.appendChild(shootingStar);
    console.log('Estrela cadente criada:', duration); // Debug
    // Remove após animação (não loopa, para esporadicidade)
    setTimeout(() => {
        if (shootingStar.parentNode) {
            shootingStar.remove();
        }
    }, (parseFloat(duration) + parseFloat(delay)) * 1000 + 1000);
}
// Gera estrelas piscando iniciais (para visibilidade imediata)
for (let i = 0; i < numTwinklingStars; i++) {
    setTimeout(() => createTwinklingStar(), i * 50); // Espaçamento de 50ms
}
// Gera estrelas cadentes iniciais
for (let i = 0; i < numShootingStars; i++) {
    setTimeout(() => createShootingStar(), i * 3000); // Espaçamento de 3s
}
// Mantém o efeito: Adiciona novas cadentes a cada 10-20s para fluxo contínuo
setInterval(() => {
    createShootingStar();
}, Math.random() * 10000 + 10000); // Aleatório entre 10-20s
// Opcional: Adiciona mais estrelas piscando se necessário (para densidade)
setInterval(() => {
    if (starContainer.querySelectorAll('.star').length < numTwinklingStars / 2) {
        createTwinklingStar();
    }
}, 5000); // Verifica a cada 5s

// JavaScript para controlar o áudio
const audio = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const volumeSlider = document.getElementById('volumeSlider');
const progressSlider = document.getElementById('progressSlider');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
// Configurar volume inicial (50%)
audio.volume = 0.3;
// Event listener para botão play/pause
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = '⏸ Pause';
        playBtn.classList.add('playing');
    } else {
        audio.pause();
        playBtn.textContent = '▶ Play';
        playBtn.classList.remove('playing');
    }
});
// Controle de volume via slider
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value; // Atualiza volume (0.0 a 1.0)
    // Opcional: Mute se volume = 0
    if (e.target.value == 0) {
        audio.muted = true;
    } else {
        audio.muted = false;
    }
});
// Atualizar barra de progresso e tempos
audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
    progressSlider.max = audio.duration;
});
audio.addEventListener('timeupdate', () => {
    const current = audio.currentTime;
    progressSlider.value = current;
    currentTimeEl.textContent = formatTime(current);
});
// Arrastar barra de progresso
progressSlider.addEventListener('input', (e) => {
    audio.currentTime = e.target.value;
});
// Função para formatar tempo (MM:SS)
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}
// Opcional: Parar áudio ao acabar (se não loop)
audio.addEventListener('ended', () => {
    playBtn.textContent = '▶ Play';
    playBtn.classList.remove('playing');
    progressSlider.value = 0;
    currentTimeEl.textContent = '0:00';
});
// Debug: Log no console
console.log('Player áudio configurado. Volume inicial: 50%');