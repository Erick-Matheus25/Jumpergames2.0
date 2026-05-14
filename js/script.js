let vidas = 3;

const opcoes = ["Pedra", "Papel", "Tesoura"];

const imagens = {
  Pedra: "./pedrajumper.png",
  Papel: "./papeljumper.png",
  Tesoura: "./tesourajumper.png"
};

const imagensDados = {
  1: "./dadojumper.png",
  2: "./dadojumper.png",
  3: "./dadojumper.png",
  4: "./dadojumper.png",
  5: "./dadojumper.png",
  6: "./dadojumper.png"
};

const imagensMoeda = {
  Cara: "./carajumper.png",
  Coroa: "./coroajumper.png"
};

const coracaoCheio = "./coracao-cheio.png";
const coracaoMorrendo = "./coracao-morrendo.gif";
const coracaoMorto = "./coracao-morto.png";

let vJokenpo = 0;
let dJokenpo = 0;
let eJokenpo = 0;

let vDados = 0;
let dDados = 0;
let eDados = 0;

let vMoeda = 0;
let dMoeda = 0;

function abrirJogo(jogo) {

  const area = document.getElementById("areaJogo");

  if (!area) return;

  vidas = 3;

  if (jogo === "jokenpo") {

    area.innerHTML = `
      <h2>Jokenpô</h2>

      <div id="vidasBox">
        <img class="vida" src="${coracaoCheio}">
        <img class="vida" src="${coracaoCheio}">
        <img class="vida" src="${coracaoCheio}">
      </div>

      <div id="opcoesJokenpo"
      style="display:flex;gap:20px;justify-content:center;margin-top:20px;flex-wrap:wrap;">

        <img
          src="${imagens.Pedra}"
          data-escolha="Pedra"
          class="img-btn"
          width="100">

        <img
          src="${imagens.Papel}"
          data-escolha="Papel"
          class="img-btn"
          width="100">

        <img
          src="${imagens.Tesoura}"
          data-escolha="Tesoura"
          class="img-btn"
          width="100">

      </div>

      <div id="resultado"></div>

      <p id="placar">
        Vitórias: ${vJokenpo} |
        Derrotas: ${dJokenpo} |
        Empates: ${eJokenpo}
      </p>
    `;

    document.querySelectorAll(".img-btn").forEach(botao => {

      botao.addEventListener("click", () => {

        jogar(botao.dataset.escolha);

      });

    });

  }

  else if (jogo === "dados") {

    area.innerHTML = `
      <h2>Batalha de Dados</h2>

      <div id="vidasBox">
        <img class="vida" src="${coracaoCheio}">
        <img class="vida" src="${coracaoCheio}">
        <img class="vida" src="${coracaoCheio}">
      </div>

      <div style="display:flex;justify-content:center;gap:60px;margin-top:30px;flex-wrap:wrap;">

        <div>
          <p>Você</p>

          <img
            id="imgDado1"
            src="./dadojumper.png"
            width="140">
        </div>

        <div>
          <p>PC</p>

          <img
            id="imgDado2"
            src="./dadojumper.png"
            width="140">
        </div>

      </div>

      <button id="btnRolarDados">
        🎲 Lançar Dados
      </button>

      <p id="resultadoDados"></p>

      <p id="placar">
        Vitórias: ${vDados} |
        Derrotas: ${dDados} |
        Empates: ${eDados}
      </p>
    `;

    document
      .getElementById("btnRolarDados")
      .addEventListener("click", rolarDados);

  }

  else if (jogo === "moeda") {

    area.innerHTML = `
      <h2>Cara ou Coroa</h2>

      <div id="vidasBox">
        <img class="vida" src="${coracaoCheio}">
        <img class="vida" src="${coracaoCheio}">
        <img class="vida" src="${coracaoCheio}">
      </div>

      <div style="display:flex;justify-content:center;gap:50px;margin-top:30px;flex-wrap:wrap;">

        <img
          id="imgCara"
          src="./carajumper.png"
          width="140">

        <img
          id="imgCoroa"
          src="./coroajumper.png"
          width="140">

      </div>

      <div style="margin-top:20px;">

        <img
          id="resultadoImagemMoeda"
          src="./carajumper.png"
          width="170">

      </div>

      <p id="resultadoMoeda"></p>

      <p id="placar">
        Vitórias: ${vMoeda} |
        Derrotas: ${dMoeda}
      </p>
    `;

    document
      .getElementById("imgCara")
      .addEventListener("click", () => jogarMoeda("Cara"));

    document
      .getElementById("imgCoroa")
      .addEventListener("click", () => jogarMoeda("Coroa"));

  }

}

function jogar(escolha) {

  const pc = opcoes[Math.floor(Math.random() * opcoes.length)];

  let res = "";
  let classe = "";

  if (escolha === pc) {

    res = "⚖️ Empate!";
    eJokenpo++;
    classe = "empate";

  }

  else if (

    (escolha === "Pedra" && pc === "Tesoura") ||
    (escolha === "Papel" && pc === "Pedra") ||
    (escolha === "Tesoura" && pc === "Papel")

  ) {

    res = "🚀 Vitória!";
    vJokenpo++;
    classe = "vitoria";

    victory();

  }

  else {

    res = "💀 Derrota!";
    dJokenpo++;
    perderVida();
    classe = "derrota";

  }

  document.getElementById("resultado").innerText = res;

  document.getElementById("resultado").className = classe;

  document.getElementById("placar").innerText =
    `Vitórias: ${vJokenpo} | Derrotas: ${dJokenpo} | Empates: ${eJokenpo}`;

}

function rolarDados() {

  const d1 = Math.floor(Math.random() * 6) + 1;
  const d2 = Math.floor(Math.random() * 6) + 1;

  document.getElementById("imgDado1").src = imagensDados[d1];
  document.getElementById("imgDado2").src = imagensDados[d2];

  let res = "";
  let classe = "";

  if (d1 > d2) {

    res = "🔥 Você venceu!";
    vDados++;
    classe = "vitoria";

    victory();

  }

  else if (d2 > d1) {

    res = "❌ PC venceu!";
    dDados++;
    perderVida();
    classe = "derrota";

  }

  else {

    res = "😐 Empate!";
    eDados++;
    classe = "empate";

  }

  document.getElementById("resultadoDados").innerText = res;

  document.getElementById("resultadoDados").className = classe;

  document.getElementById("placar").innerText =
    `Vitórias: ${vDados} | Derrotas: ${dDados} | Empates: ${eDados}`;

}

function jogarMoeda(escolha) {

  const sorteio =
    Math.random() < 0.5 ? "Cara" : "Coroa";

  let res = "";
  let classe = "";

  if (sorteio === escolha) {

    res = "🔥 Acertou!";
    vMoeda++;
    classe = "vitoria";

    victory();

  }

  else {

    res = "❌ Errou!";
    dMoeda++;
    perderVida();
    classe = "derrota";

  }

  document.getElementById("resultadoImagemMoeda").src =
    imagensMoeda[sorteio];

  document.getElementById("resultadoMoeda").innerText =
    `Deu ${sorteio} - ${res}`;

  document.getElementById("resultadoMoeda").className = classe;

  document.getElementById("placar").innerText =
    `Vitórias: ${vMoeda} | Derrotas: ${dMoeda}`;

}

function resetarVidas() {

  vidas = 3;

  const coracoes =
    document.querySelectorAll(".vida");

  coracoes.forEach(coracao => {

    coracao.src = coracaoCheio;

  });

}

function perderVida() {

  const coracoes =
    document.querySelectorAll(".vida");

  vidas--;

  if (vidas < 0) return;

  const coracaoAtual =
    coracoes[vidas];

  if (!coracaoAtual) return;

  document.body.classList.add("tela-tremendo");

  setTimeout(() => {

    document.body.classList.remove("tela-tremendo");

  }, 300);

  coracaoAtual.src =
    coracaoMorrendo;

  setTimeout(() => {

    coracaoAtual.src =
      coracaoMorto;

  }, 1000);

  if (vidas <= 0) {

    setTimeout(() => {

      gameOver();

    }, 1400);

  }

}

function gameOver() {

  const tela =
    document.getElementById("gameOverTela");

  if (!tela) return;

  tela.classList.add("ativo");

  setTimeout(() => {

    tela.classList.remove("ativo");

    resetarVidas();

  }, 3000);

}

function victory() {

  const tela =
    document.getElementById("victoryTela");

  if (!tela) return;

  tela.classList.add("ativo");

  setTimeout(() => {

    tela.classList.remove("ativo");

  }, 3000);

}