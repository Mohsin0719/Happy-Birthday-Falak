let poppedCount = 0;

// Canvas Particles Effect
const canvas = document.getElementById('magicCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `hsl(${Math.random() * 60 + 300}, 100%, 75%)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 60; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Navigation & Audio Control
function startExperience() {
    const audio = document.getElementById('bgMusic');
    if (audio) {
        audio.play().catch(e => console.log("Autoplay issue prevented: ", e));
    }
    nextScreen(2);
}

function nextScreen(screenNum) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(`screen${screenNum}`);
    if (target) {
        target.classList.add('active');
    }
}

// Interactive Escape Button
function moveBtn() {
    const btn = document.getElementById('noBtn');
    const x = Math.random() * 160 - 80;
    const y = Math.random() * 160 - 80;
    btn.style.transform = `translate(${x}px, ${y}px)`;
}

// Balloon Game Logic
function startBalloonGame() {
    nextScreen(5);
    const stage = document.getElementById('balloonStage');
    
    let interval = setInterval(() => {
        if (poppedCount >= 5) {
            clearInterval(interval);
            return;
        }

        const balloon = document.createElement('div');
        balloon.className = 'pop-balloon';
        balloon.style.left = Math.random() * (window.innerWidth - 60) + 'px';
        balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 80%, 65%)`;

        balloon.onclick = function() {
            poppedCount++;
            this.remove();
            if (poppedCount >= 5) {
                document.getElementById('finalBtn').classList.remove('hidden');
            }
        };

        stage.appendChild(balloon);

        setTimeout(() => {
            if (balloon.parentNode) balloon.remove();
        }, 4000);

    }, 800);
}

function finishCelebration() {
    alert("✨ Your wish has been sent into the stars! Happy Birthday Falak! 🎉💖");
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});
