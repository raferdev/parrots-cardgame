let quantidadeCartas = 0;
let arrayCartas = []
let cartas = [0, 1, 2, 3, 4, 5, 6];
let contador = 0;
let carta1 = 99;
let carta2 = 98;
let paresAchados = 0;
let idCarta1 = 99;
let idCarta2 = 99;
const relogio = document.querySelector(".relogio");
let intervalo = null;
let terminarContagem = 0;
let tempoDeJogo = 0;

function aumentarContagem() {
  if(terminarContagem === 1) {
    clearInterval(intervalo);
  } else {
      tempoDeJogo ++
    relogio.innerHTML = parseInt(relogio.innerHTML) + 1; 
  }
}
intervalo = setInterval(aumentarContagem, 1000);







function funcaoQuantidadeCartas() {
    quantidadeCartas = prompt('Com quantas cartas você quer jogar? Deve ser de 4 a 14 cartas e apenas pares.');
    if (quantidadeCartas == null) {
        let resposta = prompt('Quer continuar? Sim/Não')
        if (resposta == "Sim") {
            funcaoQuantidadeCartas()
        }
        return
    }
    geradorCartas(quantidadeCartas)
}

funcaoQuantidadeCartas()

function geradorCartas(numero) {
    if (numero >= 4 && numero <= 14 && numero % 2 === 0) {
        embaralhar(cartas);
        for (i = 0; i < parseInt(numero / 2); i++) {
            arrayCartas.push(cartas[i])
            arrayCartas.push(cartas[i])
        }
        embaralhar(arrayCartas)

        let cartaHtml = document.querySelector('section');

        for (i = 0; i < arrayCartas.length; i++) {
            cartaHtml.innerHTML += `
		<div data-identifier="card" class = "cardPrimario carta${i}" onclick= "virarcarta(this, ${arrayCartas[i]}, ${i})" >
        <div class= "cardSecundario">
            <div data-identifier="back-face" class="card cardFrente"></div>
            <div data-identifier="front-face" class="card cardVerso verso${arrayCartas[i]}"></div>
        </div>
        </div>
		`
        }
    } else {
        funcaoQuantidadeCartas()
    }
}

function virarcarta(carta, verso, idCarta) {
    function cartaVirada(carta, verso, idCarta) {
        if (contador == 2) {
            return
        } else if (contador == 0) {
            carta1 = verso;
            idCarta1 = idCarta
            carta.classList.add('rotacao')
            contador++
            return
        } else if (contador == 1) {
            carta2 = verso;
            idCarta2 = idCarta
            carta.classList.add('rotacao')
            contador++
            if (carta1 == carta2) {
                setTimeout(boa, 1000)
                return
            } else {
                setTimeout(desvirarCarta, 2000);
            }
            return
        }

    }
    cartaVirada(carta, verso, idCarta)
}

function desvirarCarta() {
    let desvirar1 = document.querySelector(".carta"+idCarta1);
    let desvirar2 = document.querySelector(".carta"+idCarta2);
    desvirar1.classList.remove('rotacao');
    desvirar2.classList.remove('rotacao');
    contador = 0;
    idCarta1 = 99;
    idCarta2 = 99;
    carta1 = 98;
    carta2 = 99;
}

function boa() {
    carta1 = 98;
    carta2 = 99;
    contador = 0;
    paresAchados++
    if (paresAchados == parseInt(quantidadeCartas) / 2) {
        terminarContagem = 1;
        alert(`Acabou você demorou apenas ${tempoDeJogo} segundos`)
        let respostaReiniciar = prompt('Quer continuar? Sim/Não')
        if (respostaReiniciar == "Sim") {
            let cartaHtml = document.querySelector('section');
            cartaHtml.innerHTML = ''
            paresAchados = 0;
            idCarta1 = 99;
            idCarta2 = 99;
            arrayCartas = [];
            quantidadeCartas = 0;
            terminarContagem = 0;
            relogio.innerHTML = 0;
            tempoDeJogo = 0;
            funcaoQuantidadeCartas()
        }
        return
    }
}


function embaralhar(array) {
    array.sort(() => Math.random() - 0.5);
}