document.addEventListener('DOMContentLoaded', () => {
    const numeroElementos = 600;
    const colores = ['#D40920', '#1356A2', '#F7D842'];
    let numFilas, numColumnas;

    function encuentraFilasColumnas(num) {
        const altoPantalla = window.innerHeight;
        const tamanoCuadrado = Math.sqrt(altoPantalla * altoPantalla / num);
        numFilas = Math.floor(altoPantalla / tamanoCuadrado);
        numColumnas = Math.ceil(num / numFilas);
    }

    function crearElementos() {
        const contenedor = document.createElement('div');
        contenedor.className = 'contenedor';
        document.body.appendChild(contenedor);

        contenedor.style.display = 'grid';
        contenedor.style.gridTemplateColumns = `repeat(${numColumnas}, 1fr)`;
        contenedor.style.gridTemplateRows = `repeat(${numFilas}, 1fr)`;

        for (let i = 0; i < numFilas * numColumnas; i++) {
            const div = document.createElement('div');
            div.className = `item-${i}`;
            div.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
            contenedor.appendChild(div);
        }
    }

    function cambioDimensionYColor() {
        const elementos = document.querySelectorAll('.contenedor > div');
        elementos.forEach(el => {
            if (Math.random() < 0.1) { // Probabilidad de 10% de cambiar dimensiones y color
                const factorExpansion = Math.floor(Math.random() * 3) + 1; // Factor de expansión de 1 a 3
                el.style.gridRowEnd = `span ${factorExpansion}`;
                el.style.gridColumnEnd = `span ${factorExpansion}`;
                el.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];

                if (Math.random() < 0.5) { // Probabilidad de 50% de generar una subgrilla
                    el.style.display = 'grid';
                    el.style.gridTemplateColumns = `repeat(${factorExpansion}, 1fr)`;
                    el.style.gridTemplateRows = `repeat(${factorExpansion}, 1fr)`;

                    for (let i = 0; i < factorExpansion * factorExpansion; i++) {
                        const subDiv = document.createElement('div');
                        subDiv.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
                        el.appendChild(subDiv);
                    }
                }
            }
        });
    }

    function init() {
        encuentraFilasColumnas(numeroElementos);
        crearElementos();
        setInterval(cambioDimensionYColor, 3000); // Cambiar dimensiones y colores cada 3 segundos
    }

    init();
});
