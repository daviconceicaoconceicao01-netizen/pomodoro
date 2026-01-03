
let tempo = 1500; // 25 minutos
let intervalo = null

const tempoEl = document.getElementById("tempo");
const statusEl = document.getElementById("status");
const botoesTempo = document.querySelectorAll(".tempo-btn");
const alarme = document.getElementById("alarme");
let audioLiberado = false;

function atualizarTempo() {
    let min = Math.floor(tempo / 60);
    let seg = tempo % 60;

    tempoEl.textContent =
        `${min < 10 ? "0" + min : min}:${seg < 10 ? "0" + seg : seg}`;

}

document.getElementById("start").onclick = () => {
    if (intervalo) return;

    statusEl.textContent = "hora de focar!!"

    if (!audioLiberado) {
        alarme.muted = true;
        alarme.play().then(() => {
            alarme.pause();
            alarme.currentTime = 0;
            alarme.muted = false
            audioLiberado = true;
        }).catch(() => { });
    }

    intervalo = setInterval(() => {

        if (tempo > 0) {
            tempo--;
            atualizarTempo();
        } else {
            clearInterval(intervalo);
            intervalo = null;

            statusEl.textContent = " tempo finalizado ⏰";
            alarme.currentTime = 0;
            alarme.play();

        }
    }, 1000);

};

document.getElementById("reset").onclick = () => {
    clearInterval(intervalo);
    intervalo = null;
    tempo = 1500;
    atualizarTempo();
    statusEl.textContent = "hora de focar";
};
document.getElementById("pause").onclick = () => {
    if (!intervalo) return;
    clearInterval(intervalo);
    intervalo = null;
    statusEl.textContent = "pausado";
}

botoesTempo.forEach(botao => {
    botao.onclick = () => {
        clearInterval(intervalo);
        intervalo = null;

        tempo = Number(botao.dataset.tempo);
        atualizarTempo();
        statusEl.textContent = "Hora de focar";
    };
});

atualizarTempo();