# Proyecto de Blackjack.
Proyecto creado siguiendo el curso de JavaScript de Fernando Herrera en udemy.

## Primeros pasos a la hora de crear el proyecto:
* 1. Primero debemos crear un deck de cartas que posteriormente lo vamos a mezclar. ¿Como hicimos esto?  
    * Primero hemos inicializado una variable con un array vacío donde vamos a almacenar nuestras cartas.
    Lo siguiente es inicializar una función y acto seguido, hemos creado dos array, uno con las cartas normales y luego uno con las cartas especiales y hemos creado dos bucles, uno que iteraremos del 2 al 9 (Número de cartas normales) y el siguiente hemos iterado todos los tipos normales por el número de cartas especiales y posteriormente inicializar esta función  
    

    ````js
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

        shuffledDeck = deck.sort((a,b) => 0.5 - Math.random());
        
        return shuffledDeck
    }

    crearDeck();
    ````

* 2. El siguiente paso, debemos crear la función de pedir carta:
    * Esto lo hemos hecho inicializando una función que elimina una carta del array, pero a su vez devuelve la carta que ha eliminado. Por otro lado, creamos una validación que tome los primeros dos elementos de la carta - 1.
    ````js
    const pedirCarta = ()=>{
    if(deck.length === 0){
        throw('No hay cartas en el deck')
    }

    const carta = deck.pop();

    return carta;
    }
    ````