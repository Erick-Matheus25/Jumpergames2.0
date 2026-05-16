let vidas = 3;

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

      <h2>Jokenpô</h2>

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

      <h2>Batalha de Dados</h2>

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

      <h2>Cara ou Coroa</h2>

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

}

/* =========================
   MOSTRAR VIDAS
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

/* =========================
   ATUALIZAR VIDAS
========================= */

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

/* =========================
   PERDER VIDA
========================= */

function perderVida(){

  vidas--;

  atualizarVidas();

  document.body.classList.add(
    "tela-tremendo"
  );

  setTimeout(()=>{

    document.body.classList.remove(
      "tela-tremendo"
    );

  },300);

  if(vidas <= 0){

    mostrarGameOver();

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
      Math.floor(
        Math.random()*3
      )
    ];

  let resultado = "";

  if(escolha === pc){

    resultado = "⚖️ EMPATE";

  }

  else if(

    (escolha === "Pedra" && pc === "Tesoura") ||

    (escolha === "Papel" && pc === "Pedra") ||

    (escolha === "Tesoura" && pc === "Papel")

  ){

    resultado = "🎉 VOCÊ GANHOU";

    mostrarVictory();

  }

  else{

    resultado = "❌ VOCÊ PERDEU";

    perderVida();

  }

  document.getElementById(
    "resultado"
  ).innerHTML = `

    Você:
    ${escolha}

    <br><br>

    PC:
    ${pc}

    <br><br>

    ${resultado}

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

    img.src =
      "./dadojumper.png";

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