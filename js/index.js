// Pasos para crear este proyecto.
// Primero necesitamos crear una baraja de cartas.

/*
2C = 2 puntos
2H = 2 puntos
2S = 2 puntos
2D = 2 puntos

Especiales

*/

let puntosJugador = 0;
let puntosComputadora = 0;

const smallPlayer = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasComputadora = document.querySelector('#computadora-cartas')
const btnPedir = document.querySelector('#btnPedir')
const btnDetener = document.querySelector('#btnDetener')
const btnNuevo = document.querySelector('#btnNuevo')
const divMensaje = document.querySelector('#mensaje')






let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['J', 'Q', 'K', 'A'];


// Esta función crea una nueva baraja random
const crearDeck = () => {
    for (let i = 2; i < 10; i++){
        for (let tipo of tipos){
            deck.push(i + tipo);
        }
        
    }

    for (let tipo of tipos){
        for(let especial of especiales){
            deck.push(especial + tipo);
        }
    }

    // console.log(deck)
    shuffledDeck = deck.sort((a,b) => 0.5 - Math.random());
    console.log(shuffledDeck)
}

crearDeck();

// Esta función pide una carta
const pedirCarta = ()=>{
    if(deck.length === 0){
        throw('No hay cartas en el deck')
    }

    const carta = deck.pop();

    return carta;
}

// Valor de la carta
const valorCarta = (carta) =>{
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor) ) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
    // if(isNaN(valor)){
    //     switch(carta){
    //         case 'A': 
    //             puntos += 10;
    //             break;
                
    //         default:
    //             console.log('error')
    //     }

    // } else{
    //     puntos = valor * 1;
    // }
}

// Insertar mensajes de win/lose

const crearMensajeGanador = ()=>{
    divMensaje.classList.add('mensaje-ganador')
    const textoGanador = document.createElement('p')
    textoGanador.classList.add('texto')
    textoGanador.textContent = '¡Enhorabuena haz ganado!'
    divMensaje.append(textoGanador);
}

const crearMensajePerdedor = ()=>{
    divMensaje.classList.add('mensaje-perdedor')
    const textoPerdedor = document.createElement('p')
    textoPerdedor.classList.add('texto')
    textoPerdedor.textContent = 'Gana la consola, intentalo de nuevo...'
    divMensaje.append(textoPerdedor);
}

const crearMensajeEmpate = ()=>{
    divMensaje.classList.add('mensaje-empate')
    const textoEmpate = document.createElement('p')
    textoEmpate.classList.add('texto')
    textoEmpate.textContent = 'Ha habido un empate...'
    divMensaje.append(textoEmpate);
}

// Turno de la computadora

const turnoComputadora = (puntosMinimos) =>{

    do{

        const carta = pedirCarta()
        puntosComputadora = puntosComputadora+ valorCarta(carta)
        smallPlayer[1].innerHTML = puntosComputadora
    
    
        // Insertar carta
        const cartaHtml = document.createElement('img')
        cartaHtml.src = `/src/cartas/${carta}.png`
        cartaHtml.classList.add('card')
        divCartasComputadora.append(cartaHtml)


        if(puntosMinimos > 21){
            break;
        }
    

    }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

    setTimeout(() => {
        if(puntosComputadora === puntosMinimos){
            crearMensajeEmpate()
        } else if (puntosMinimos > 21){
            crearMensajePerdedor()
        } else if(puntosComputadora > 21){
            crearMensajeGanador()
        } else{
            crearMensajePerdedor()
        }
    
    }, 30);


}

// Eventos
btnPedir.addEventListener('click', ()=>{
    const carta = pedirCarta()
    puntosJugador = puntosJugador  + valorCarta(carta)
    smallPlayer[0].innerHTML = puntosJugador


    // Insertar carta
    const cartaHtml = document.createElement('img')
    cartaHtml.src = `/src/cartas/${carta}.png`
    cartaHtml.classList.add('card')
    divCartasJugador.append(cartaHtml)


    // Validación 
    if(puntosJugador > 21){
        console.warn('Haz perdido colega');
        btnPedir.disabled = true;   
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador)
    } else if (puntosJugador === 21){
        console.warn('21 Genial')
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador)

    }
})

btnDetener.addEventListener('click', ()=>{
    btnDetener.disabled = true;
    btnPedir.disabled = true;
    turnoComputadora(puntosJugador)
})

btnNuevo.addEventListener('click', ()=>{
    crearDeck();
    puntosComputadora = 0;
    puntosJugador = 0;

    smallPlayer[0].innerHTML = 0;
    smallPlayer[1].innerHTML = 0;

    divMensaje.innerHTML = '';
    divMensaje.classList.remove('mensaje-ganador')
    divMensaje.classList.remove('mensaje-perdedor')
    divMensaje.classList.remove('mensaje-empate')

    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';

    btnDetener.disabled = false;
    btnPedir.disabled = false;
    
})



