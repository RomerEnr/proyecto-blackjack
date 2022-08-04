const moduloBJ = (() => {
    'use strict'

    // Globales

    let puntosJugadores = [];
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['J', 'Q', 'K', 'A'];

    // Referencias al HTML
    const smallPlayer = document.querySelectorAll('small'),
     divCartasJugadores = document.querySelectorAll('.divCartas'),
     btnPedir = document.querySelector('#btnPedir'),
     btnDetener = document.querySelector('#btnDetener'),
     btnNuevo = document.querySelector('#btnNuevo'),
     divMensaje = document.querySelector('#mensaje');

    // Esta función inicializa el juego
    const inicializarJuego = (numJugadores = 2)=>{
        crearDeck();

        puntosJugadores = [];
        for(let i= 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }

        smallPlayer.forEach( elem => elem.textContent = 0);

        divMensaje.innerHTML = '';
        divMensaje.classList.remove('mensaje-ganador')
        divMensaje.classList.remove('mensaje-perdedor')
        divMensaje.classList.remove('mensaje-empate')
    
        divCartasJugadores.forEach(elem => elem.innerHTML = '');
    
        btnDetener.disabled = false;
        btnPedir.disabled = false;
    }
    
    // Esta función crea una nueva baraja random
    const crearDeck = () => {

        deck =[];
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

        return deck.sort((a,b) => 0.5 - Math.random());
    }


    // Esta función pide una carta
    const pedirCarta = ()=>{
        if(deck.length === 0){
            throw('No hay cartas en el deck')
        }

        return deck.pop();
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

    // turno: 0 primero jugador y el último es la computadora
    const acumularPuntos = (carta, turno)=>{
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta)
        smallPlayer[turno].textContent = puntosJugadores[turno];

        return puntosJugadores[turno]

    }

    const crearCarta = (carta, turno) =>{
        const cartaHtml = document.createElement('img')
        cartaHtml.src = `/src/cartas/${carta}.png`
        cartaHtml.classList.add('card')
        divCartasJugadores[turno].append(cartaHtml)
    }

    const determinarGanador = ()=>{
        const [puntosMinimos, puntosComputadora] = puntosJugadores;

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
    
    // Turno de la computadora
    
    const turnoComputadora = (puntosMinimos) =>{
        let puntosComputadora = 0;
    
        do{
    
            const carta = pedirCarta()
            puntosComputadora =  acumularPuntos(pedirCarta(), puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);
    
        }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

        determinarGanador();
    }
    
    // Eventos
    btnPedir.addEventListener('click', ()=>{
        const carta = pedirCarta()
        const puntosJugador = acumularPuntos(carta, 0)

        crearCarta(carta, 0);
    
        // Validación 
        if(puntosJugadores[0] > 21){
            console.warn('Haz perdido colega');
            btnPedir.disabled = true;   
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador)
        } else if (puntosJugadores[0] === 21){
            console.warn('21 Genial')
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador)
    
        }
    })
    
    btnDetener.addEventListener('click', ()=>{
        btnDetener.disabled = true;
        btnPedir.disabled = true;
        turnoComputadora(puntosJugadores[0])
    })
    
    btnNuevo.addEventListener('click', ()=>{
        inicializarJuego()
    })

    return {
        nuevoJuego: inicializarJuego
    };
        
})(); 

