document.addEventListener('DOMContentLoaded', () => {
    crearTablero();
    agregarEventos();
    esconder();
    modalCuentaAtras()
})

let contadorDeCasillas = 1;
let casillasDescubiertas = 0;
const rutas = [
    {
        energia: "eolica",
        fuente: "imagenes/turbinas-eolicas1.webp",
        numero: 1
    },
    {
        energia: "eolica",
        fuente: "imagenes/turbinas-eolicas2.webp",
        numero: 2
    },
    {
        energia: "solar",
        fuente: "imagenes/paneles-solares1.jpg",
        numero: 1
    },
    {
        energia: "solar",
        fuente: "imagenes/paneles-solares2.png",
        numero: 2
    },
    {
        energia: "biomasa",
        fuente: "imagenes/planta-biomasa1.jpeg",
        numero: 1
    },
    {
        energia: "biomasa",
        fuente: "imagenes/planta-biomasa2.jpeg",
        numero: 2
    },
    {
        energia: "hidroelectrica",
        fuente: "imagenes/presa-agua1.webp",
        numero: 1
    },
    {
        energia: "hidroelectrica",
        fuente: "imagenes/presa-agua2.jpg",
        numero: 2
    },
    {
        energia: "carbon",
        fuente: "imagenes/planta-carbon1.jpg",
        numero: 1
    },
    {
        energia: "carbon",
        fuente: "imagenes/planta-carbon2.jpg",
        numero: 2
    },
    {
        energia: "petroleo",
        fuente: "imagenes/planta-petroleo1.jpg",
        numero: 1
    },
    {
        energia: "petroleo",
        fuente: "imagenes/planta-petroleo2.webp",
        numero: 2
    },
    {
        energia: "gas natural",
        fuente: "imagenes/planta-gasnatural1.jpg",
        numero: 1
    },
    {
        energia: "gas natural",
        fuente: "imagenes/planta-gasnatural2.jpg",
        numero: 2
    },
    {
        energia: "nuclear",
        fuente: "imagenes/planta-nuclear1.jpg",
        numero: 1
    },
    {
        energia: "nuclear",
        fuente: "imagenes/planta-nuclear2.jpg",
        numero: 2
    }
]

const pistas = [
    {
        energia: "eolica",
        pista: "se produce al aprovechar la fuerza del viento con turbinas eólicas, convirtiendo su energía cinética en electricidad",
        dato: "La energía eólica también puede ayudar a ahorrar agua, ya que no requiere el consumo de grandes cantidades de agua para su funcionamiento, a diferencia de otras fuentes de energía como la energía nuclear o la energía termosolar"
    },
    {
        energia: "hidroelectrica",
        pista: "se obtiene al aprovechar la energía del agua en movimiento, como en ríos o presas, para generar electricidad de forma sostenible",
        dato: "la primera central hidroeléctrica del mundo se construyó en 1882 en Appleton, Wisconsin, Estados Unidos, y todavía está en funcionamiento hoy en día?"
    },
    {
        energia: "solar",
        pista: "se produce mediante la captura de la energía del sol mediante paneles solares, generando electricidad limpia y renovable",
        dato: "la energía solar es la fuente de energía más abundante en la Tierra? En una hora, la cantidad de energía solar que llega a la Tierra es suficiente para cubrir las necesidades energéticas mundiales durante un año entero."
    },
    {
        energia: "biomasa",
        pista: "se produce a partir de materia orgánica, como residuos agrícolas, forestales o de alimentos, convertida en biocombustibles para generar electricidad o calor",
        dato: "la energía de biomasa se ha utilizado durante miles de años? Por ejemplo, la leña ha sido utilizada como fuente de calor y energía desde la antigüedad."
    },
    {
        energia: "carbon",
        pista: "se produce a partir de la combustión del carbón, utilizado en la generación de electricidad a pesar de su alta contaminación ",
        dato: "la quema de carbón para generar electricidad es una de las principales fuentes de emisiones de dióxido de carbono (CO2) y otros contaminantes atmosféricos?"
    }
    , {
        energia: "nuclear",
        pista: "Se produce mediante la fisión nuclear en reactores nucleares, generando una gran cantidad de energía utilizada para generar electricidad",
        dato: "los residuos nucleares producidos por las plantas de energía nuclear son altamente peligrosos y deben ser almacenados de forma segura durante miles de años debido a su radiactividad?"
    },
    {
        energia: "petroleo",
        pista: "Se produce a partir del petróleo crudo, utilizado como combustible en vehículos, calefacción y generación de electricidad",
        dato: "los derrames de petróleo, tanto en tierra como en el mar, pueden tener efectos devastadores en los ecosistemas y la vida silvestre, y pueden tardar décadas en recuperarse completamente?"
    },
    {
        energia: "gas natural",
        pista: "Se obtiene del gas natural, un combustible fósil que se utiliza ampliamente para la calefacción de edificios, la generación de electricidad y como combustible para vehículos",
        dato: "la extracción de gas natural mediante fracturación hidráulica (fracking) puede tener impactos negativos en el medio ambiente, como la contaminación del agua subterránea y la liberación de gases de efecto invernadero?"
    }
]

let clicks = [];
let contador = 0;

function crearTablero() {
    const tablero = document.getElementById('tablero')
    for (let i = 0; i < 4; i++) {
        const fila = crearFila();
        tablero.appendChild(fila);
    }
    return tablero
}


const crearFila = () => {
    const div = document.createElement('div')
    div.classList.add('row');
    for (let i = 0; i < 4; i++) {
        const casilla = crearCasilla();
        div.appendChild(casilla);
    }
    return div
}


const crearCasilla = () => {
    const div = document.createElement('div');
    const fuente = obtenerFuente()
    div.setAttribute('data-energia', fuente.energia)
    div.setAttribute('data-casilla', contadorDeCasillas)
    div.className = 'divCasilla col mb-2'
    div.innerHTML = (
        `<img src=${fuente.fuente} class="casilla"></img>`
    )
    contadorDeCasillas++;
    return div;
}

const obtenerFuente = () => {
    const array = reorganizarRutas(rutas)
    const fuente = array[0]
    array.splice(0, 1)
    return fuente
}

function reorganizarRutas(array) {
    function comparacionAleatoria() {
        return Math.random() - 0.5;
    }

    return array.sort(comparacionAleatoria);
}

const agregarEventos = () => {
    const arrayDivs = Array.from(document.getElementsByClassName('divCasilla'))
    arrayDivs.forEach(Element => {
        Element.addEventListener('click', (event) => {
            const div = Element.closest('.col')
            chequear(div)
        })
    })
}

function chequear(div) {
    clicks.push(div);
    contador++;

    clicks[0].classList.add('click');

    if (contador == 2) {
        const [elemento1, elemento2] = clicks
        contador = 0;
        if (
            elemento1.dataset.energia == elemento2.dataset.energia &&
            elemento1.dataset.casilla != elemento2.dataset.casilla
        ) {
            clicks[0].classList.remove('click')
            desEsconder([elemento1, elemento2])
            datoCurioso(elemento1.dataset.energia)
            casillasDescubiertas++;
            if (casillasDescubiertas == 8) {
                seGano()
            }
        } else {
            clicks[0].classList.remove('click')
            mostrarPista(elemento1.dataset.energia)
        }
        clicks = []
    }
}

function datoCurioso(parametro) {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = "";
    const energia = pistas.find(elemento => elemento.energia == parametro);
    const parrafo = document.createElement('p');
    parrafo.classList.add('datoCurioso')
    parrafo.textContent = energia.dato
    modalBody.appendChild(parrafo)
    const btn = document.getElementById('btnModal');
    btn.click();
}

function seGano() {

}

function mostrarPista(elementoParametro) {
    const pista = pistas.find(elemento => elemento.energia == elementoParametro)
    const contenedorPista = document.getElementById('pista');
    contenedorPista.innerHTML = "";
    contenedorPista.innerHTML = `El primer elemento seleccionado ${pista.pista}`;

}

function desEsconder(array) {
    const [elemento, elemento2] = array
    console.log(elemento)
    console.log(elemento2)
    elemento.classList.remove('casillaHover')
    elemento.classList.remove('esconder')
    elemento.firstChild.classList.remove('invisible')
    elemento2.classList.remove('casillaHover')
    elemento2.classList.remove('esconder')
    elemento2.firstChild.classList.remove('invisible')
}

function modalCuentaAtras() {
    const body = Array.from(document.getElementsByTagName('body'))[0]
    div = document.createElement('div');
    div.id = "modalCuentaAtras";
    div.className = "modalCuentaAtras"
    div.innerHTML = (
        `<div>
            <span id="cuentaAtras"><span>
        </div>`
    )
    body.appendChild(div)
}

const esconder = () => {
    const arrayDivs = Array.from(document.getElementsByClassName('col'))
    let contador = 9;
    let interval = setInterval(() => {
        contador--
        let cuenta = document.getElementById('cuentaAtras');
        cuenta.innerHTML = contador
        if (contador == 0) {
            const body = (document.getElementsByTagName('body'))[0]
            const modal = document.getElementById('modalCuentaAtras')
            body.removeChild(modal)
            clearInterval(interval)
        }
    }, 1000);
    setTimeout(() => {
        arrayDivs.forEach(Element => {
            Element.firstChild.classList.add('invisible')
            Element.classList.add('esconder')
            Element.classList.add('casillaHover')
        })
    }, 9000);
}