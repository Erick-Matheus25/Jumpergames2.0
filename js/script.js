/* =========================
   VARIAVEIS
========================= */

let vidas = 3;

let luzLigada = false;

/* =========================
   COFRE
========================= */

let totalMoedas = 0;

let moedas10 = 0;
let moedas25 = 0;
let moedas50 = 0;
let moedas1 = 0;

/* =========================
   IMAGENS
========================= */

const coracaoCheio =
  "./coracaoCheio.png";

const coracaoMorto =
  "./coracaoMorto.png";

/* =========================
   ABRIR JOGOS
========================= */

function abrirJogo(jogo){

  const area =
    document.getElementById(
      "areaJogo"
    );

  vidas = 3;

  /* =========================
     JOKENPO
  ========================= */

  if(jogo === "jokenpo"){

    area.innerHTML = `

      <h2>🎮 Jokenpô</h2>

      <div id="vidasBox">

        ${mostrarVidas()}

      </div>

      <div class="opcoes">

        <img
          src="./pedrajumper.png"
          class="img-btn"
          onclick="jogarJokenpo('Pedra')">

        <img
          src="./papeljumper.png"
          class="img-btn"
          onclick="jogarJokenpo('Papel')">

        <img
          src="./tesourajumper.png"
          class="img-btn"
          onclick="jogarJokenpo('Tesoura')">

      </div>

      <div id="resultado"></div>

    `;

  }

  /* =========================
     DADOS
  ========================= */

  else if(jogo === "dados"){

    area.innerHTML = `

      <h2>🎲 Batalha de Dados</h2>

      <div id="vidasBox">

        ${mostrarVidas()}

      </div>

      <button onclick="jogarDado()">

        🎲 ROLAR DADO

      </button>

      <br><br>

      <img
        id="imgDado"
        class="dado-img"
        src="./dadojumper.png">

      <div id="resultadoDados"></div>

    `;

  }

  /* =========================
     MOEDA
  ========================= */

  else if(jogo === "moeda"){

    area.innerHTML = `

      <h2>🪙 Cara ou Coroa</h2>

      <div id="vidasBox">

        ${mostrarVidas()}

      </div>

      <div class="moeda-opcoes">

        <img
          src="./carajumper.png"
          class="moeda-btn"
          onclick="jogarMoeda('Cara')">

        <img
          src="./coroajumper.png"
          class="moeda-btn"
          onclick="jogarMoeda('Coroa')">

      </div>

      <br>

      <img
        id="moedaCentral"
        class="moeda-central"
        src="./carajumper.png">

      <div id="resultadoMoeda"></div>

    `;

  }

  /* =========================
     INTERRUPTOR
  ========================= */

  else if(jogo === "interruptor"){

    area.innerHTML = `

      <h2>💡 Controle de Luz</h2>

      <div class="cenario-luz">

        <img
          id="cenarioBg"
          class="cenario-bg"
          src="./quartoescuro.png">

        <div class="tomada-box">

          <img
            id="tomada"
            class="tomada-img"
            src="./tomadadesligada.png"
            onclick="alternarLuz()">

        </div>

      </div>

    `;

  }

  /* =========================
     COFRE DIGITAL
  ========================= */

  else if(jogo === "cofre"){

    carregarCofre();

    area.innerHTML = `

      <h2>🏦 Cofrinho Digital</h2>

      <div class="cofre-box">

        <img
          class="caldeirao"
          src="./caldeirão.png">

        <div id="coins"></div>

      </div>

      <div class="total-box">

        <h3>

          Saldo Total

        </h3>

        <div class="total">

          R$
          <span id="valorTotal">

            ${formatarValor(totalMoedas)}

          </span>

        </div>

      </div>

      <div class="contador-moedas">

        <div class="contador-card">

          🪙 10¢:
          <span id="m10">

            ${moedas10}

          </span>

        </div>

        <div class="contador-card">

          🪙 25¢:
          <span id="m25">

            ${moedas25}

          </span>

        </div>

        <div class="contador-card">

          🪙 50¢:
          <span id="m50">

            ${moedas50}

          </span>

        </div>

        <div class="contador-card">

          💰 R$1:
          <span id="m1">

            ${moedas1}

          </span>

        </div>

      </div>

      <div class="moedas">

        <button
          onclick="adicionarMoeda(0.10)">

          + R$0,10

        </button>

        <button
          onclick="adicionarMoeda(0.25)">

          + R$0,25

        </button>

        <button
          onclick="adicionarMoeda(0.50)">

          + R$0,50

        </button>

        <button
          onclick="adicionarMoeda(1)">

          + R$1,00

        </button>

      </div>

      <div class="acoes-cofre">

        <button
          onclick="sacarValor()">

          💸 Sacar

        </button>

        <button
          onclick="esvaziarCofre()">

          🗑️ Esvaziar

        </button>

      </div>

    `;

  }

}

/* =========================
   VIDAS
========================= */

function mostrarVidas(){

  return `

    <img
      class="vida"
      src="${coracaoCheio}">

    <img
      class="vida"
      src="${coracaoCheio}">

    <img
      class="vida"
      src="${coracaoCheio}">

  `;

}

function atualizarVidas(){

  const coracoes =
    document.querySelectorAll(
      ".vida"
    );

  coracoes.forEach((c,i)=>{

    if(i < vidas){

      c.src = coracaoCheio;

    }

    else{

      c.src = coracaoMorto;

    }

  });

}

function perderVida(){

  vidas--;

  atualizarVidas();

  if(vidas <= 0){

    mostrarGameOver();

    vidas = 3;

    setTimeout(()=>{

      atualizarVidas();

    },100);

  }

}

/* =========================
   JOKENPO
========================= */

function jogarJokenpo(escolha){

  const opcoes = [
    "Pedra",
    "Papel",
    "Tesoura"
  ];

  const pc =
    opcoes[
      Math.floor(Math.random()*3)
    ];

  let resultado = "";

  if(escolha === pc){

    resultado =
      "⚖️ EMPATE";

  }

  else if(

    (escolha === "Pedra" &&
    pc === "Tesoura") ||

    (escolha === "Papel" &&
    pc === "Pedra") ||

    (escolha === "Tesoura" &&
    pc === "Papel")

  ){

    resultado =
      "🎉 VOCÊ GANHOU";

    mostrarVictory();

  }

  else{

    resultado =
      "❌ VOCÊ PERDEU";

    perderVida();

  }

  document.getElementById(
    "resultado"
  ).innerHTML = `

    ${resultado}

    <br><br>

    Você:
    ${escolha}

    <br>

    PC:
    ${pc}

  `;

}

/* =========================
   DADO
========================= */

function jogarDado(){

  const img =
    document.getElementById(
      "imgDado"
    );

  img.classList.add(
    "girando"
  );

  setTimeout(()=>{

    img.classList.remove(
      "girando"
    );

    const numero =
      Math.floor(
        Math.random()*6
      ) + 1;

    if(numero >= 4){

      document.getElementById(
        "resultadoDados"
      ).innerHTML = `

        <span class="vitoria">

          🎉 Você tirou ${numero}

        </span>

      `;

      mostrarVictory();

    }

    else{

      document.getElementById(
        "resultadoDados"
      ).innerHTML = `

        <span class="derrota">

          ❌ Você tirou ${numero}

        </span>

      `;

      perderVida();

    }

  },1000);

}

/* =========================
   MOEDA
========================= */

function jogarMoeda(escolha){

  const moeda =
    document.getElementById(
      "moedaCentral"
    );

  moeda.classList.add(
    "girando-moeda"
  );

  setTimeout(()=>{

    const resultado =
      Math.random() < 0.5
      ? "Cara"
      : "Coroa";

    moeda.src =

      resultado === "Cara"

      ? "./carajumper.png"

      : "./coroajumper.png";

    moeda.classList.remove(
      "girando-moeda"
    );

    if(escolha === resultado){

      document.getElementById(
        "resultadoMoeda"
      ).innerHTML = `

        <span class="vitoria">

          🎉 ACERTOU

        </span>

      `;

      mostrarVictory();

    }

    else{

      document.getElementById(
        "resultadoMoeda"
      ).innerHTML = `

        <span class="derrota">

          ❌ ERROU

        </span>

      `;

      perderVida();

    }

  },1000);

}

/* =========================
   INTERRUPTOR
========================= */

function alternarLuz(){

  const tomada =
    document.getElementById(
      "tomada"
    );

  const cenario =
    document.getElementById(
      "cenarioBg"
    );

  luzLigada = !luzLigada;

  tomada.src = luzLigada
    ? "./tomadaligada.png"
    : "./tomadadesligada.png";

  cenario.src = luzLigada
    ? "./quarto-claro.png"
    : "./quartoescuro.png";

}

/* =========================
   COFRE
========================= */

function adicionarMoeda(valor){

  totalMoedas += valor;

  if(valor === 0.10){

    moedas10++;

  }

  else if(valor === 0.25){

    moedas25++;

  }

  else if(valor === 0.50){

    moedas50++;

  }

  else if(valor === 1){

    moedas1++;

  }

  atualizarTela();

  salvarCofre();

  criarMoedaAnimada(valor);

}

function atualizarTela(){

  document.getElementById(
    "valorTotal"
  ).textContent =
    formatarValor(totalMoedas);

  document.getElementById(
    "m10"
  ).textContent =
    moedas10;

  document.getElementById(
    "m25"
  ).textContent =
    moedas25;

  document.getElementById(
    "m50"
  ).textContent =
    moedas50;

  document.getElementById(
    "m1"
  ).textContent =
    moedas1;

}

function formatarValor(valor){

  return valor.toLocaleString(
    "pt-BR",
    {
      minimumFractionDigits:2,
      maximumFractionDigits:2
    }
  );

}

function sacarValor(){

  const valor =
    parseFloat(
      prompt(
        "Digite o valor do saque:"
      )
    );

  if(isNaN(valor)){

    return;

  }

  if(valor > totalMoedas){

    alert(
      "Você não tem Saldo para o saque!!"
    );

    return;

  }

  totalMoedas -= valor;

  atualizarTela();

  salvarCofre();

  alert(
    "💸 Saque realizado!"
  );

}

function esvaziarCofre(){

  totalMoedas = 0;

  moedas10 = 0;
  moedas25 = 0;
  moedas50 = 0;
  moedas1 = 0;

  atualizarTela();

  salvarCofre();

  alert(
    "🗑️ Cofre esvaziado!"
  );

}

function salvarCofre(){

  localStorage.setItem(
    "totalMoedas",
    totalMoedas
  );

  localStorage.setItem(
    "moedas10",
    moedas10
  );

  localStorage.setItem(
    "moedas25",
    moedas25
  );

  localStorage.setItem(
    "moedas50",
    moedas50
  );

  localStorage.setItem(
    "moedas1",
    moedas1
  );

}

function carregarCofre(){

  totalMoedas =
    parseFloat(
      localStorage.getItem(
        "totalMoedas"
      )
    ) || 0;

  moedas10 =
    parseInt(
      localStorage.getItem(
        "moedas10"
      )
    ) || 0;

  moedas25 =
    parseInt(
      localStorage.getItem(
        "moedas25"
      )
    ) || 0;

  moedas50 =
    parseInt(
      localStorage.getItem(
        "moedas50"
      )
    ) || 0;

  moedas1 =
    parseInt(
      localStorage.getItem(
        "moedas1"
      )
    ) || 0;

}

function criarMoedaAnimada(valor){

  const coin =
    document.createElement("img");

  if(valor === 0.10){

    coin.src =
      "./10 Centavos.png";

  }

  else if(valor === 0.25){

    coin.src =
      "./25 Centavos.png";

  }

  else if(valor === 0.50){

    coin.src =
      "./50 Centavos.png";

  }

  else{

    coin.src =
      "./1 Real.png";

  }

  coin.className = "coin";

  coin.style.left =
    Math.random()*180 + "px";

  document.getElementById(
    "coins"
  ).appendChild(coin);

  setTimeout(()=>{

    coin.remove();

  },1500);

}

/* =========================
   GAME OVER
========================= */

function mostrarGameOver(){

  const tela =
    document.getElementById(
      "gameOverTela"
    );

  tela.classList.add(
    "ativo"
  );

  setTimeout(()=>{

    tela.classList.remove(
      "ativo"
    );

  },3000);

}

/* =========================
   VICTORY
========================= */

function mostrarVictory(){

  const tela =
    document.getElementById(
      "victoryTela"
    );

  tela.classList.add(
    "ativo"
  );

  setTimeout(()=>{

    tela.classList.remove(
      "ativo"
    );

  },2000);

}