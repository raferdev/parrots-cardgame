let quantidadeCartas = 0;
let arrayCartas = []
let cartas = [0,1,2,3,4,5,6];

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
        for ( i = 0 ; i < parseInt(numero/2); i++) {
            arrayCartas.push(cartas[i])
            arrayCartas.push(cartas[i])
        }
        embaralhar(arrayCartas)
        
        let cartaHtml = document.querySelector('section');
        for (i = 0; i < arrayCartas.length ; i++) {
            cartaHtml.innerHTML += `
		<div class = "cardPrimario" onclick= "virarcarta(this)" >
        <div class= "cardSecundario">
            <div class="card cardFrente"></div>
            <div class="card cardVerso verso${arrayCartas[i]}"></div>
        </div>
        </div>
		`
        }
    } else {
        alert('Número Inválido, tente novamente :P')
        funcaoQuantidadeCartas()
    }
}

function virarcarta(carta) {
    carta.classList.add('rotacao')
}
function embaralhar(array){
    array.sort(()=> Math.random() - 0.5);
}