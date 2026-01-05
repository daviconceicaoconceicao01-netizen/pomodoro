let tempo = 0; // 25 minutos
let intervalo = null;
let audioLiberado = false;

const btnMais5 = document.getElementById("mais5");
const btnPararAlarme = document.getElementById("pararAlarme");
const tempoEl = document.getElementById("tempo");
const statusEl = document.getElementById("status");
const alarme = document.getElementById("alarme");
const inputTempo = document.getElementById("tempoPersonalizado");
const btnDefinir = document.getElementById("definirTempo");
const inputMusica = document.getElementById("musica");

const btnStart = document.getElementById("start");
const btnPause = document.getElementById("pause");
const btnReset = document.getElementById("reset");


function atualizarTempo() {
    let min = Math.floor(tempo / 60);
    let seg = tempo % 60;

    tempoEl.textContent =
        `${min < 10 ? "0" + min : min}:${seg < 10 ? "0" + seg : seg}`;

}

btnStart.onclick = () => {

    if (tempo <= 0) {
        alert("Defina um tempo!!!!");
        return;
    }

    if (intervalo) return;

    alarme.pause();
    alarme.currentTime = 0

    statusEl.textContent = "hora de focar!!"

    if (!audioLiberado && alarme.src) {
        alarme.muted = true;
        alarme.play().then(() => {
            alarme.pause();
            alarme.currentTime = 0;
            alarme.muted = false;
            audioLiberado = true;
        }).catch(() => {});
    }
    intervalo = setInterval(() => {
        tempo--;
        atualizarTempo();


        if (tempo <= 0) {
            clearInterval(intervalo);
            intervalo = null;


            statusEl.textContent = " tempo finalizado ⏰";
          
            if (alarme.src){
                alarme.currentTime = 0
                alarme.play();
            }
        }
    }, 1000);

};

btnReset.onclick = () => {
    clearInterval(intervalo);
    intervalo = null;
    tempo = 0;
    atualizarTempo();
    statusEl.textContent = "Defina o tempo";
};

btnPause.onclick = () => {
    if (!intervalo) return;
    clearInterval(intervalo);
    intervalo = null;
    statusEl.textContent = "pausado";
}

btnReset.onclick = () => {
    clearInterval(intervalo);
    intervalo = null;
    atualizarTempo();
    statusEl.textContent = "Defina o tempo";
};

btnMais5.addEventListener("click", () => {
    if (tempo <= 0) return
    tempo += 300;
    atualizarTempo();
});

btnDefinir.addEventListener("click", () => {
    const minutos = Number(inputTempo.value);

    if (minutos > 0) {
        tempo = minutos * 60;
        atualizarTempo();
        statusEl.textContent = "Pronto para Iniciar";
    }
});

inputMusica.addEventListener("change", () => {
    const arquivo = inputMusica.files[0];
    if (arquivo) {
        alarme.src = URL.createObjectURL(arquivo);
    }
});

btnPararAlarme.addEventListener("click", () => {
    alarme.pause();
    alarme.currentTime = 0;
});

atualizarTempo();