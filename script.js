// Aap jo bhi naam rakhna chahein yahan change kar dein:
const personName = "Falak";

// Automatic Name Replacement
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("display-name-1").innerText = personName;
    document.getElementById("display-name-2").innerText = personName;
    document.getElementById("display-name-3").innerText = personName;
    document.getElementById("display-name-4").innerText = personName;
    createBalloons();
});

function nextScreen(screenNum) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(`screen${screenNum}`).classList.add('active');
}

// "No" Button dodge function
function moveBtn() {
    const btn = document.getElementById("noBtn");
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    btn.style.position = "fixed";
    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;
}

// Balloons Game Logic
let popped = 0;
function createBalloons() {
    const container = document.getElementById("balloonContainer");
    const colors = ['#ff4b2b', '#ff79c6', '#8be9fd', '#bd93f9', '#f1fa8c'];
    
    for (let i = 0; i < 6; i++) {
        let balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.backgroundColor = colors[i % colors.length];
        balloon.onclick = function () {
            this.style.visibility = "hidden";
            popped++;
            if (popped === 6) {
                document.getElementById("finalBtn").classList.remove("hidden");
            }
        };
        container.appendChild(balloon);
    }
}
