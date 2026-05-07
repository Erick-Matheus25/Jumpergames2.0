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

let v = 0;
let d = 0;
let e = 0;

function abrirJogo(jogo) {

  const area = document.getElementById("areaJogo");

  if (!area) {
    console.warn("Elemento #areaJogo não encontrado.");
    return;
  }

  if (jogo === "jokenpo") {

    area.innerHTML = `
      <h2 style="color:white;">Jokenpô</h2>

      <div id="opcoesJokenpo"
           style="
             display:flex;
             gap:20px;
             justify-content:center;
             margin-top:20px;
             flex-wrap:wrap;
           ">

        <img src="${imagens.Pedra}" 
             data-escolha="Pedra"
             class="img-btn"
             width="100"
             alt="Pedra">

        <img src="${imagens.Papel}" 
             data-escolha="Papel"
             class="img-btn"
             width="100"
             alt="Papel">

        <img src="${imagens.Tesoura}" 
             data-escolha="Tesoura"
             class="img-btn"
             width="100"
             alt="Tesoura">

      </div>

      <div id="resultado"
           style="
             margin-top:20px;
             color:yellow;
             font-size:28px;
             font-weight:bold;
           ">
      </div>

      <div id="escolhas"
           style="
             margin-top:20px;
             color:white;
             font-size:20px;
           ">
      </div>

      <p id="placar"
         style="
           margin-top:20px;
           color:white;
           font-size:22px;
           font-weight:bold;
         ">

        Vitórias: 0 | Derrotas: 0 | Empates: 0

      </p>
    `;

    const imgs = area.querySelectorAll(".img-btn");

    imgs.forEach(img => {

      img.style.cursor = "pointer";
      img.style.transition = "0.2s";

      img.addEventListener("mouseover", () => {
        img.style.transform = "scale(1.1)";
      });

      img.addEventListener("mouseout", () => {
        img.style.transform = "scale(1)";
      });

      img.addEventListener("click", () => {
        jogar(img.dataset.escolha);
      });

    });

  }

  
  else if (jogo === "dados") {

    area.innerHTML = `
      <h2 style="color:white;">Batalha de Dados</h2>

      <div style="
        display:flex;
        justify-content:center;
        gap:60px;
        margin-top:30px;
        flex-wrap:wrap;
      ">

        <div style="text-align:center;">

          <p style="
            color:white;
            font-size:22px;
          ">
            Você
          </p>

          <img id="imgDado1"
               src="./dadojumper.png"
               width="140"
               style="
                 cursor:pointer;
                 transition:0.3s;
               ">
        </div>

        <div style="text-align:center;">

          <p style="
            color:white;
            font-size:22px;
          ">
            PC
          </p>

          <img id="imgDado2"
               src="./dadojumper.png"
               width="140">

        </div>

      </div>

      <button id="btnRolarDados"
              style="
                margin-top:30px;
                padding:12px 25px;
                font-size:20px;
                border:none;
                border-radius:10px;
                cursor:pointer;
              ">

        🎲 Lançar Dados

      </button>

      <p id="resultadoDados"
         style="
           margin-top:25px;
           color:yellow;
           font-size:28px;
           font-weight:bold;
         ">
      </p>

       <p id="placar"
         style="
           margin-top:20px;
           color:white;
           font-size:22px;
           font-weight:bold;
         ">

        Vitórias: 0 | Derrotas: 0 | Empates: 0

      </p>
    
    `;
    

    const btn = document.getElementById("btnRolarDados");
    const dado = document.getElementById("imgDado1");

    btn.addEventListener("click", rolarDados);

    dado.addEventListener("mouseover", () => {
      dado.style.transform = "scale(1.1) rotate(10deg)";
    });

    dado.addEventListener("mouseout", () => {
      dado.style.transform = "scale(1) rotate(0deg)";
    });

    dado.addEventListener("click", rolarDados);

  }

  
  else if (jogo === "moeda") {

    area.innerHTML = `
      <h2 style="color:white;">Cara ou Coroa</h2>

      <div style="
        display:flex;
        justify-content:center;
        gap:50px;
        margin-top:30px;
        flex-wrap:wrap;
      ">

        <img id="imgCara"
             src="./carajumper.png"
             width="140"
             style="
               cursor:pointer;
               transition:0.3s;
             ">

        <img id="imgCoroa"
             src="./coroajumper.png"
             width="140"
             style="
               cursor:pointer;
               transition:0.3s;
             ">

      </div>

      <div style="
        margin-top:30px;
        text-align:center;
      ">

        <img id="resultadoImagemMoeda"
             src="./carajumper.png"
             width="170"
             style="
               transition:0.4s;
             ">

      </div>

      <p id="resultadoMoeda"
         style="
           color:yellow;
           font-size:28px;
           font-weight:bold;
           margin-top:20px;
         ">
      </p>
    `;

    const cara = document.getElementById("imgCara");
    const coroa = document.getElementById("imgCoroa");

    cara.addEventListener("click", () => jogarMoeda("Cara"));
    coroa.addEventListener("click", () => jogarMoeda("Coroa"));

    [cara, coroa].forEach(img => {

      img.addEventListener("mouseover", () => {
        img.style.transform = "scale(1.1)";
      });

      img.addEventListener("mouseout", () => {
        img.style.transform = "scale(1)";
      });

    });

  }
}


function jogar(escolha) {

  const pc = opcoes[Math.floor(Math.random() * opcoes.length)];

  let res = "";

  if (escolha === pc) {

    res = "😐 Empate!";
    e++;

  }
  else if (
    (escolha === "Pedra" && pc === "Tesoura") ||
    (escolha === "Papel" && pc === "Pedra") ||
    (escolha === "Tesoura" && pc === "Papel")
  ) {

    res = "🔥 Você venceu!";
    v++;

  }
  else {

    res = "❌ Você perdeu!";
    d++;
  }

  const resultadoEl = document.getElementById("resultado");
  const escolhasEl = document.getElementById("escolhas");
  const placarEl = document.getElementById("placar");

  resultadoEl.innerHTML = res;

  escolhasEl.innerHTML = `
    <div style="
      display:flex;
      justify-content:center;
      gap:60px;
      flex-wrap:wrap;
    ">

      <div style="text-align:center;">

        <p style="color:white;">Você</p>

        <img src="${imagens[escolha]}"
             width="120">

        <p style="
          color:white;
          font-size:22px;
        ">
          ${escolha}
        </p>

      </div>

      <div style="text-align:center;">

        <p style="color:white;">PC</p>

        <img src="${imagens[pc]}"
             width="120">

        <p style="
          color:white;
          font-size:22px;
        ">
          ${pc}
        </p>

      </div>

    </div>
  `;

  placarEl.innerText =
    `Vitórias: ${v} | Derrotas: ${d} | Empates: ${e}`;
}


function rolarDados() {

  const d1 = Math.floor(Math.random() * 6) + 1;
  const d2 = Math.floor(Math.random() * 6) + 1;

  document.getElementById("imgDado1").src =
    imagensDados[d1];

  document.getElementById("imgDado2").src =
    imagensDados[d2];

  let res = "";

  if (d1 > d2) {

    res = "🔥 Você venceu!";

  }
  else if (d2 > d1) {

    res = "❌ Você perdeu!";

  }
  else {

    res = "😐 Empate!";
  }

  document.getElementById("resultadoDados").innerText = res;
}


function jogarMoeda(escolha) {

  const sorteio =
    Math.random() < 0.5 ? "Cara" : "Coroa";

  const res =
    sorteio === escolha
      ? "🔥 Acertou!"
      : "❌ Errou!";

  document.getElementById("resultadoImagemMoeda").src =
    imagensMoeda[sorteio];

  document.getElementById("resultadoMoeda").innerText =
    `Deu ${sorteio} - ${res}`;
}