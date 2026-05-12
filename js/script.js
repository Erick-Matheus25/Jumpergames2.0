const opcoes = ['Pedra', 'Papel', 'Tesoura'];

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

// placares separados
let vJokenpo = 0, dJokenpo = 0, eJokenpo = 0;
let vDados = 0, dDados = 0, eDados = 0;
let vMoeda = 0, dMoeda = 0;

function abrirJogo(jogo) {
  const area = document.getElementById("areaJogo");
  if (!area) return;

  if (jogo === "jokenpo") {
    area.innerHTML = `
      <h2>Jokenpô</h2>
      <div id="opcoesJokenpo" style="display:flex;gap:20px;justify-content:center;margin-top:20px;flex-wrap:wrap;">
        <img src="${imagens.Pedra}" data-escolha="Pedra" class="img-btn" width="100" alt="Pedra">
        <img src="${imagens.Papel}" data-escolha="Papel" class="img-btn" width="100" alt="Papel">
        <img src="${imagens.Tesoura}" data-escolha="Tesoura" class="img-btn" width="100" alt="Tesoura">
      </div>
      <div id="resultado"></div>
      <div id="escolhas"></div>
      <p id="placar">Vitórias: 0 | Derrotas: 0 | Empates: 0</p>
    `;
    area.querySelectorAll(".img-btn").forEach(img => {
      img.style.cursor = "pointer";
      img.addEventListener("click", () => jogar(img.dataset.escolha));
    });
  }

  else if (jogo === "dados") {
    area.innerHTML = `
      <h2>Batalha de Dados</h2>
      <div style="display:flex;justify-content:center;gap:60px;margin-top:30px;flex-wrap:wrap;">
        <div style="text-align:center;">
          <p>Você</p>
          <img id="imgDado1" src="./dadojumper.png" width="140" style="cursor:pointer;transition:0.3s;">
        </div>
        <div style="text-align:center;">
          <p>PC</p>
          <img id="imgDado2" src="./dadojumper.png" width="140">
        </div>
      </div>
      <button id="btnRolarDados">🎲 Lançar Dados</button>
      <p id="resultadoDados"></p>
      <p id="placar">Vitórias: 0 | Derrotas: 0 | Empates: 0</p>
    `;
    document.getElementById("btnRolarDados").addEventListener("click", rolarDados);
    document.getElementById("imgDado1").addEventListener("click", rolarDados);
  }

  else if (jogo === "moeda") {
    area.innerHTML = `
      <h2>Cara ou Coroa</h2>
      <div style="display:flex;justify-content:center;gap:50px;margin-top:30px;flex-wrap:wrap;">
        <img id="imgCara" src="./carajumper.png" width="140" style="cursor:pointer;transition:0.3s;">
        <img id="imgCoroa" src="./coroajumper.png" width="140" style="cursor:pointer;transition:0.3s;">
      </div>
      <div style="margin-top:30px;text-align:center;">
        <img id="resultadoImagemMoeda" src="./carajumper.png" width="170">
      </div>
      <p id="resultadoMoeda"></p>
      <p id="placar">Vitórias: 0 | Derrotas: 0</p>
    `;
    document.getElementById("imgCara").addEventListener("click", () => jogarMoeda("Cara"));
    document.getElementById("imgCoroa").addEventListener("click", () => jogarMoeda("Coroa"));
  }
}

function jogar(escolha) {
  const pc = opcoes[Math.floor(Math.random() * opcoes.length)];
  let res = "", classe = "";
  if (escolha === pc) { res = "⚖️ Empate! A batalha continua..."; eJokenpo++; classe = "empate"; }
  else if ((escolha==="Pedra"&&pc==="Tesoura")||(escolha==="Papel"&&pc==="Pedra")||(escolha==="Tesoura"&&pc==="Papel")) {
    res = "🚀 Vitória épica!"; vJokenpo++; classe = "vitoria";
  } else { res = "💀 Derrota... mas não desista!"; dJokenpo++; classe = "derrota"; }
  const resultadoEl = document.getElementById("resultado");
  resultadoEl.innerText = res;
  resultadoEl.className = classe;
  document.getElementById("placar").innerText = `Vitórias: ${vJokenpo} | Derrotas: ${dJokenpo} | Empates: ${eJokenpo}`;
}

function rolarDados() {
  const d1 = Math.floor(Math.random() * 6) + 1;
  const d2 = Math.floor(Math.random() * 6) + 1;
  document.getElementById("imgDado1").src = imagensDados[d1];
  document.getElementById("imgDado2").src = imagensDados[d2];
  let res = "", classe = "";
  if (d1 > d2) { res = "🔥 Você dominou a rodada!"; vDados++; classe = "vitoria"; }
  else if (d2 > d1) { res = "❌ PC levou essa..."; dDados++; classe = "derrota"; }
  else { res = "😐 Empate! Dados equilibrados."; eDados++; classe = "empate"; }
  const resultadoEl = document.getElementById("resultadoDados");
  resultadoEl.innerText = res;
  resultadoEl.className = classe;
  document.getElementById("placar").innerText = `Vitórias: ${vDados} | Derrotas: ${dDados} | Empates: ${eDados}`;
}

function jogarMoeda(escolha) {
  const sorteio = Math.random() < 0.5 ? "Cara" : "Coroa";
  let res = "", classe = "";
  if (sorteio === escolha) { res = "🔥 Acertou na sorte!"; vMoeda++; classe = "vitoria"; }
  else { res = "❌ Não foi dessa vez..."; dMoeda++; classe = "derrota"; }
  document.getElementById("resultadoImagemMoeda").src = imagensMoeda[sorteio];
  const resultadoEl = document.getElementById("resultadoMoeda");
  resultadoEl.innerText = `Deu ${sorteio} - ${res}`;
  resultadoEl.className = classe;
  document.getElementById("placar").innerText = `Vitórias: ${vMoeda} | Derrotas: ${dMoeda}`;
}
