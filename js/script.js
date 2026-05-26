

/* =========================
   VARIAVEIS GLOBAIS
========================= */


let vidas = 3;


let luzLigada = false;


let contadorLuz = 0;


let totalMoedas =
parseFloat(
localStorage.getItem("cofre")
) || 0;


let xp =
parseInt(
localStorage.getItem(
"jumper_xp"
)
) || 0;


let nivel =
parseInt(
localStorage.getItem(
"jumper_nivel"
)
) || 1;


let conquistas =
JSON.parse(
localStorage.getItem(
"jumper_conquistas"
)
) || [];


let tempoPomodoro = 1500;


let tempoInicialPomodoro = 1500;


let intervaloPomodoro = null;


let modoPausa = false;


/* =========================
   SONS
========================= */


const somVitoria =
document.getElementById(
"somVitoria"
);


const somDerrota =
document.getElementById(
"somDerrota"
);


/* =========================
   IMAGENS
========================= */


const coracaoCheio =
"./coracaoCheio.png";


const coracaoMorto =
"./coracaoMorto.png";


/* =========================
   SAVE
========================= */


function salvarDados(){


localStorage.setItem(
"jumper_xp",
xp
);


localStorage.setItem(
"jumper_nivel",
nivel
);


localStorage.setItem(
"cofre",
totalMoedas
);


localStorage.setItem(
"jumper_conquistas",
JSON.stringify(conquistas)
);


}


/* =========================
   HUD
========================= */


function atualizarHUD(){


const xpTexto =
document.getElementById(
"xpTexto"
);


const nivelTexto =
document.getElementById(
"nivelTexto"
);


const xpBar =
document.getElementById(
"xpBar"
);


if(xpTexto){


xpTexto.innerHTML =
`XP: ${xp}/${nivel * 100}`;


}


if(nivelTexto){


nivelTexto.innerHTML =
`LV ${nivel}`;


}


if(xpBar){


xpBar.style.width =
(xp / (nivel * 100)) * 100 + "%";


}


}


function ganharXP(valor){


xp += valor;


if(xp >= nivel * 100){


xp = 0;


nivel++;


mostrarVictory();


alert(
`🎉 LEVEL UP!
VOCÊ CHEGOU
AO NÍVEL ${nivel}`
);


}


atualizarHUD();


salvarDados();


}


/* =========================
   CONQUISTAS
========================= */


function desbloquearConquista(nome){


if(
conquistas.includes(nome)
){


return;


}


conquistas.push(nome);


salvarDados();


atualizarConquistas();


}


function atualizarConquistas(){


const lista =
document.getElementById(
"listaConquistas"
);


if(!lista){


return;


}


lista.innerHTML = "";


if(conquistas.length === 0){


lista.innerHTML =


`
<div class="conquista">
Nenhuma conquista desbloqueada.
</div>
`;


return;


}


conquistas.forEach((c)=>{


lista.innerHTML +=


`
<div class="conquista">
🏆 ${c}
</div>
`;


});


}


function abrirConquistas(){


document.getElementById(
"painelConquistas"
).classList.add(
"ativo"
);


}


function fecharConquistas(){


document.getElementById(
"painelConquistas"
).classList.remove(
"ativo"
);


}


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


<h2>🎲 Dados</h2>


<div id="vidasBox">
${mostrarVidas()}
</div>


<img
id="imgDado"
class="dado-img"
src="./dadojumper.png"
onclick="jogarDado()">


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


<div id="contadorLuz">


💡 Luz ligada:
${contadorLuz} vezes


</div>


`;


}


/* =========================
   COFRE
========================= */


else if(jogo === "cofre"){


area.innerHTML = `


<h2>🏦 Cofrinho</h2>


<div class="cofre-box">


<img
src="./Caldeirao.png"
class="caldeirao">


<div id="coins"></div>


</div>


<h1 id="valorTotal">


R$ ${totalMoedas.toFixed(2)}


</h1>


<div class="botoes-moedas">


<button onclick="adicionarMoeda(0.10)">
+ 10¢
</button>


<button onclick="adicionarMoeda(0.25)">
+ 25¢
</button>


<button onclick="adicionarMoeda(0.50)">
+ 50¢
</button>


<button onclick="adicionarMoeda(1)">
+ R$1
</button>


</div>


<br>


<div class="acoes-cofre">


<button onclick="sacarValor()">
💸 SACAR
</button>


<button onclick="esvaziarCofre()">
🗑️ ESVAZIAR
</button>


</div>


`;


}


/* =========================
   POMODORO
========================= */


else if(jogo === "pomodoro"){


area.innerHTML = `


<h2>🍅 Pomodoro</h2>


<div class="pomodoro-box">


<div id="modoPomodoro">
🔥 FOCO
</div>


<div
id="timerPomodoro"
class="pomodoro-timer">


25:00


</div>


<div class="barra-container">


<div
id="barraPomodoro"
class="barra">
</div>


</div>


<div class="config-pomodoro">


<div>


<label>
FOCO
</label>


<input
id="tempoFoco"
type="number"
value="25">


</div>


<div>


<label>
PAUSA
</label>


<input
id="tempoPausa"
type="number"
value="5">


</div>


</div>


<div class="botoes-pomodoro">


<button onclick="iniciarPomodoro()">
▶ INICIAR
</button>


<button onclick="pararPomodoro()">
⏸ PAUSAR
</button>


<button onclick="resetarPomodoro()">
🔄 RESETAR
</button>


</div>


</div>


`;


}


/* =========================
   TECLADO
========================= */


else if(jogo === "teclado"){


area.innerHTML = `


<h2>🎹 Piano</h2>


<div class="teclado">


<div
class="tecla"
onclick="tocarNota('do')">


A<br>DO


</div>


<div
class="tecla"
onclick="tocarNota('re')">


S<br>RE


</div>


<div
class="tecla"
onclick="tocarNota('mi')">


D<br>MI


</div>


<div
class="tecla"
onclick="tocarNota('fa')">


F<br>FA


</div>


<div
class="tecla"
onclick="tocarNota('sol')">


G<br>SOL


</div>


<div
class="tecla"
onclick="tocarNota('la')">


H<br>LA


</div>


<div
class="tecla"
onclick="tocarNota('si')">


J<br>SI


</div>


</div>


`;


}


}


/* =========================
   VIDAS
========================= */


function mostrarVidas(){


return `


<img class="vida" src="${coracaoCheio}">
<img class="vida" src="${coracaoCheio}">
<img class="vida" src="${coracaoCheio}">


`;


}


function perderVida(){


vidas--;


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


if(vidas <= 0){


somDerrota.currentTime = 0;


somDerrota.play();


mostrarGameOver();


vidas = 3;


}


}


/* =========================
   JOKENPO
========================= */


function jogarJokenpo(escolha){


const opcoes =
["Pedra","Papel","Tesoura"];


const pc =
opcoes[
Math.floor(
Math.random()*3
)
];


if(


(escolha==="Pedra" && pc==="Tesoura") ||


(escolha==="Papel" && pc==="Pedra") ||


(escolha==="Tesoura" && pc==="Papel")


){


document.getElementById(
"resultado"
).innerHTML =


`🎉 VOCÊ GANHOU
<br>
PC: ${pc}`;


mostrarVictory();


ganharXP(20);


desbloquearConquista(
"Primeira Vitória"
);


}


else if(escolha === pc){


document.getElementById(
"resultado"
).innerHTML =


`⚖️ EMPATE`;


}


else{


document.getElementById(
"resultado"
).innerHTML =


`❌ VOCÊ PERDEU
<br>
PC: ${pc}`;


perderVida();


}


}


/* =========================
   DADOS
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
)+1;


document.getElementById(
"resultadoDados"
).innerHTML =


`🎲 Número:
${numero}`;


if(numero >= 4){


mostrarVictory();


ganharXP(15);


}


else{


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


document.getElementById(
"resultadoMoeda"
).innerHTML =


`🪙 RESULTADO:
${resultado}`;


if(escolha === resultado){


mostrarVictory();


ganharXP(10);


}


else{


perderVida();


}


},1000);


}


/* =========================
   INTERRUPTOR
========================= */


function alternarLuz(){


luzLigada = !luzLigada;


document.getElementById(
"tomada"
).src =


luzLigada
? "./tomadaligada.png"
: "./tomadadesligada.png";


document.getElementById(
"cenarioBg"
).src =


luzLigada
? "./quarto-claro.png"
: "./quartoescuro.png";


if(luzLigada){


contadorLuz++;


document.getElementById(
"contadorLuz"
).innerHTML =


`💡 Luz ligada:
${contadorLuz} vezes`;


ganharXP(2);


}


}


/* =========================
   COFRE
========================= */


function adicionarMoeda(valor){


totalMoedas += valor;


salvarDados();


document.getElementById(
"valorTotal"
).innerHTML =


"R$ " +
totalMoedas.toFixed(2);


const moeda =
document.createElement(
"img"
);


moeda.className = "coin";


if(valor === 0.10){


moeda.src =
"./10 Centavos.png";


}


else if(valor === 0.25){


moeda.src =
"./25 Centavos.png";


}


else if(valor === 0.50){


moeda.src =
"./50 Centavos.png";


}


else{


moeda.src =
"./1 Real.png";


}


moeda.style.left =
Math.random() * 180 + "px";


document.getElementById(
"coins"
).appendChild(moeda);


setTimeout(()=>{


moeda.remove();


},1500);


}


function sacarValor(){


let valor =
prompt(
"Digite o valor:"
);


if(valor === null){


return;


}


valor =
parseFloat(valor);


if(


isNaN(valor) ||


valor <= 0


){


alert(
"Valor inválido!"
);


return;


}


if(valor > totalMoedas){


alert(
"Saldo insuficiente!"
);


}


else{


totalMoedas -= valor;


salvarDados();


document.getElementById(
"valorTotal"
).innerHTML =


"R$ " +
totalMoedas.toFixed(2);


}


}


function esvaziarCofre(){


totalMoedas = 0;


salvarDados();


document.getElementById(
"valorTotal"
).innerHTML =


"R$ 0.00";


}


/* =========================
   POMODORO
========================= */


function iniciarPomodoro(){


clearInterval(
intervaloPomodoro
);


const foco =
parseInt(
document.getElementById(
"tempoFoco"
).value
) || 25;


const pausa =
parseInt(
document.getElementById(
"tempoPausa"
).value
) || 5;


if(!modoPausa){


tempoPomodoro = foco * 60;


tempoInicialPomodoro =
foco * 60;


}


else{


tempoPomodoro = pausa * 60;


tempoInicialPomodoro =
pausa * 60;


}


intervaloPomodoro =
setInterval(()=>{


tempoPomodoro--;


const min =
Math.floor(
tempoPomodoro / 60
);


const seg =
tempoPomodoro % 60;


const timer =
document.getElementById(
"timerPomodoro"
);


timer.innerHTML =


String(min)
.padStart(2,"0")


+


":"


+


String(seg)
.padStart(2,"0");


document.getElementById(
"barraPomodoro"
).style.width =


(


tempoPomodoro /


tempoInicialPomodoro


) * 100 + "%";


if(tempoPomodoro <= 10){


timer.classList.add(
"alerta-final"
);


}


if(tempoPomodoro <= 0){


clearInterval(
intervaloPomodoro
);


mostrarVictory();


ganharXP(50);


desbloquearConquista(
"Mestre do Pomodoro"
);


modoPausa = !modoPausa;


document.getElementById(
"modoPomodoro"
).innerHTML =


modoPausa
? "☕ PAUSA"
: "🔥 FOCO";


}


},1000);


}


function pararPomodoro(){


clearInterval(
intervaloPomodoro
);


}


function resetarPomodoro(){


clearInterval(
intervaloPomodoro
);


modoPausa = false;


tempoPomodoro = 1500;


tempoInicialPomodoro = 1500;


document.getElementById(
"timerPomodoro"
).innerHTML =


"25:00";


document.getElementById(
"barraPomodoro"
).style.width =


"100%";


document.getElementById(
"modoPomodoro"
).innerHTML =


"🔥 FOCO";


}


/* =========================
   TECLADO
========================= */


function tocarNota(nota){


const audio =
new Audio(
`./${nota}.mp3`
);


audio.currentTime = 0;


audio.volume = 0.7;


audio.play();


const teclas =
document.querySelectorAll(
".tecla"
);


teclas.forEach((tecla)=>{


if(


tecla.innerHTML
.toLowerCase()
.includes(nota)


){


tecla.classList.add(
"ativa"
);


setTimeout(()=>{


tecla.classList.remove(
"ativa"
);


},200);


}


});


}


/* =========================
   TECLADO FISICO
========================= */


document.addEventListener(
"keydown",
(event)=>{


const tecla =
event.key.toLowerCase();


if(tecla === "a"){
tocarNota("do");
}


else if(tecla === "s"){
tocarNota("re");
}


else if(tecla === "d"){
tocarNota("mi");
}


else if(tecla === "f"){
tocarNota("fa");
}


else if(tecla === "g"){
tocarNota("sol");
}


else if(tecla === "h"){
tocarNota("la");
}


else if(tecla === "j"){
tocarNota("si");
}


});


/* =========================
   TELAS
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


function mostrarVictory(){


somVitoria.currentTime = 0;


somVitoria.play();


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


/* =========================
   INICIAR
========================= */


window.onload = ()=>{


atualizarHUD();


atualizarConquistas();


};
