let vidas = 3;

let luzLigada = false;

let totalMoedas = 0;

/* =========================
   SONS
========================= */

const somVitoria =
document.getElementById("somVitoria");

const somDerrota =
document.getElementById("somDerrota");

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
document.getElementById("areaJogo");

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
src="./dado1jumper.png"
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

<div
id="timerPomodoro"
class="pomodoro-timer">

25:00

</div>

<div class="botoes-pomodoro">

<button onclick="iniciarPomodoro()">
▶ INICIAR
</button>

<button onclick="pararPomodoro()">
⏹ PARAR
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

<div class="tecla" onclick="tocarNota('do')">
A<br>DO
</div>

<div class="tecla" onclick="tocarNota('re')">
S<br>RE
</div>

<div class="tecla" onclick="tocarNota('mi')">
D<br>MI
</div>

<div class="tecla" onclick="tocarNota('fa')">
F<br>FA
</div>

<div class="tecla" onclick="tocarNota('sol')">
G<br>SOL
</div>

<div class="tecla" onclick="tocarNota('la')">
H<br>LA
</div>

<div class="tecla" onclick="tocarNota('si')">
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
document.querySelectorAll(".vida");

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

setTimeout(()=>{

const coracoes =
document.querySelectorAll(".vida");

coracoes.forEach((c)=>{

c.src = coracaoCheio;

});

},3000);

}

}

/* =========================
   JOKENPO
========================= */

function jogarJokenpo(escolha){

const opcoes =
["Pedra","Papel","Tesoura"];

const pc =
opcoes[Math.floor(Math.random()*3)];

if(

(escolha==="Pedra" && pc==="Tesoura") ||
(escolha==="Papel" && pc==="Pedra") ||
(escolha==="Tesoura" && pc==="Papel")

){

document.getElementById("resultado")
.innerHTML =
`🎉 VOCÊ GANHOU<br>PC: ${pc}`;

mostrarVictory();

}

else if(escolha === pc){

document.getElementById("resultado")
.innerHTML =
`⚖️ EMPATE`;

}

else{

document.getElementById("resultado")
.innerHTML =
`❌ VOCÊ PERDEU<br>PC: ${pc}`;

perderVida();

}

}

/* =========================
   DADOS
========================= */

function jogarDado(){

const img =
document.getElementById("imgDado");

img.classList.add("girando");

let contador = 0;

const animacao =
setInterval(()=>{

const aleatorio =
Math.floor(Math.random()*6)+1;

img.src =
`./dado1jumper.png`;

contador++;

if(contador >= 10){

clearInterval(animacao);

img.classList.remove("girando");

const numero =
Math.floor(Math.random()*6)+1;

img.src =
`./dado1jumper.png`;

if(numero >= 4){

document.getElementById(
"resultadoDados"
).innerHTML =
`🎉 Tirou ${numero}`;

mostrarVictory();

}

else{

document.getElementById(
"resultadoDados"
).innerHTML =
`❌ Tirou ${numero}`;

perderVida();

}

}

},100);

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

let trocas = 0;

const animacao =
setInterval(()=>{

moeda.src =

trocas % 2 === 0
? "./carajumper.png"
: "./coroajumper.png";

trocas++;

if(trocas >= 10){

clearInterval(animacao);

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

mostrarVictory();

document.getElementById(
"resultadoMoeda"
).innerHTML =

`🎉 ACERTOU
<br>
RESULTADO: ${resultado}`;

}

else{

perderVida();

document.getElementById(
"resultadoMoeda"
).innerHTML =

`❌ ERROU
<br>
RESULTADO: ${resultado}`;

}

}

},100);

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

}

/* =========================
   COFRE
========================= */

function adicionarMoeda(valor){

totalMoedas += valor;

document.getElementById(
"valorTotal"
).innerHTML =
"R$ " + totalMoedas.toFixed(2);

const moeda =
document.createElement("img");

moeda.className = "coin";

if(valor === 0.10){
moeda.src = "./10 Centavos.png";
}

else if(valor === 0.25){
moeda.src = "./25 Centavos.png";
}

else if(valor === 0.50){
moeda.src = "./50 Centavos.png";
}

else{
moeda.src = "./1 Real.png";
}

moeda.style.left =
Math.random()*150 + "px";

document.getElementById("coins")
.appendChild(moeda);

setTimeout(()=>{

moeda.remove();

},1500);

}

function sacarValor(){

let valor =
prompt("Digite o valor para sacar:");

if(valor === null){
return;
}

valor = parseFloat(valor);

if(isNaN(valor) || valor <= 0){

alert("Digite um valor válido!");

return;

}

if(valor > totalMoedas){

alert(
"Você não tem Saldo para o saque!!"
);

}

else{

totalMoedas -= valor;

document.getElementById(
"valorTotal"
).innerHTML =

"R$ " + totalMoedas.toFixed(2);

alert(
`💸 Saque de R$ ${valor.toFixed(2)} realizado!`
);

}

}

function esvaziarCofre(){

totalMoedas = 0;

document.getElementById(
"valorTotal"
).innerHTML = "R$ 0.00";

alert("🗑️ Cofre esvaziado!");

}

/* =========================
   POMODORO
========================= */

let tempoPomodoro = 1500;
let intervaloPomodoro = null;

function iniciarPomodoro(){

  clearInterval(intervaloPomodoro);

  intervaloPomodoro = setInterval(()=>{

    tempoPomodoro--;

    const el = document.getElementById("timerPomodoro");

    if(el){
      const min = Math.floor(tempoPomodoro / 60);
      const seg = tempoPomodoro % 60;

      el.innerHTML =
        String(min).padStart(2,"0") + ":" +
        String(seg).padStart(2,"0");
    }

    if(tempoPomodoro <= 0){
      clearInterval(intervaloPomodoro);
      mostrarVictory();
    }

  },1000);
}

function pararPomodoro(){
  clearInterval(intervaloPomodoro);
}

function resetarPomodoro(){
  clearInterval(intervaloPomodoro);
  tempoPomodoro = 1500;

  const el = document.getElementById("timerPomodoro");
  if(el) el.innerHTML = "25:00";
}
/* =========================
   TECLADO
========================= */

function tocarNota(nota){

const audio =
new Audio(`./${nota}.mp3`);

audio.currentTime = 0;

audio.play();

const teclas =
document.querySelectorAll(".tecla");

teclas.forEach((tecla)=>{

if(
tecla.innerHTML
.toLowerCase()
.includes(nota)
){

tecla.style.background =
"#00ffee";

setTimeout(()=>{

tecla.style.background =
"white";

},200);

}

});

}

/* =========================
   TECLADO FÍSICO
========================= */

document.addEventListener("keydown",(event)=>{

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

tela.classList.add("ativo");

setTimeout(()=>{

tela.classList.remove("ativo");

},3000);

}

function mostrarVictory(){

somVitoria.currentTime = 0;

somVitoria.play();

const tela =
document.getElementById(
"victoryTela"
);

tela.classList.add("ativo");

setTimeout(()=>{

tela.classList.remove("ativo");

},2000);

}

/* =========================
   FUNCOES POMODORO
========================= */

