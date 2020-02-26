const miModulo = (() => {
    'use strinct'


    /**
     * 2C = Two of Clubs (Tréboles)
     * 2D = Two of Diamonds (Diamantes)
     * 2H = Two of Hearts (corazones)
     * 2S = Two of Spades (Espadas)
     */

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    // Referencias HTML
    const puntosHTML = document.querySelectorAll('small'),
        dviCartasJugadores = document.querySelectorAll('.divCartas');


    let puntosJugadores = [];

    // Referencias del HTMl
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach(elem => elem.innerText = 0);

        dviCartasJugadores.forEach(elem => elem.innerHTML = '')
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    };
    // Esta funciòn crea una nueva baraja
    const crearDeck = () => {
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo)
            }
        }
        return _.shuffle(deck);
    };



    // Esta función me permite tomar una carta

    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }

        return deck.pop();
    };

    const valorCarta = (carta) => {

        // regresa un nuevo string
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1;
    };

    // Turno: 0= primer jugador y el ùltimo  sera la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] += valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    };

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        dviCartasJugadores[turno].append(imgCarta);
    };

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {

            if (puntosComputadora === puntosMinimos) {
                alert('Nadie Gana =(');
            } else if (puntosMinimos > 21) {
                alert('Computadora Gana');
            } else if (puntosComputadora > 21) {
                alert('Jugador gana');
            } else if (puntosComputadora === 21) {
                alert('Computadora Gana');
            } else if (puntosMinimos === 21) {
                alert('Jugador Gana');
            }
        }, 100);
    }

    // turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);

            crearCarta(carta, puntosJugadores.length - 1);
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
    };

    // const valor = valorCarta(pedirCarta());
    // console.log(valor);

    // Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        let puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0)

        if (puntosJugador > 21) {
            console.warn('Lo siento mucho perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('genial');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });

    btnNuevo.addEventListener('click', () => {
        inicializarJuego();

    });

    return {
        nuevoJuego: inicializarJuego,
    }
})();