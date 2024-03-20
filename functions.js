document.addEventListener("DOMContentLoaded", function (event) {

  // Se definen las variables:

  let numeroElementos = 1200;
  let fondo = ["#F0F1F2", "#D2D6D9", "#B4BBBF", "#A8AEBF", "#AEBFBC"];
  let blancoPuro = "#fff";
  let paletaCalida = ["#D90404", "#F28705", "#F2B705"];
  let paletaEsmeralda = ["#00E3CC", "#44E3D3", "#32A89C"]
  let paletaFria = ["#00BBC9", "#00747C", "#CACACA"];
  let paletaNoche = ["#0B04D9", "#0433BF", "#03258C"];
  let paletaNoche2 = ["#03258C", "#022859", "#0597F2"];
  let rndInt;
  let colorGap = fondo[3];


  //inicialización
  let [numFilas, numColumnas] = encuentraFilasColumnas(numeroElementos);
  crearElementos(numeroElementos);

  //selecciones
  let todosItems = document.querySelectorAll(`.contenedor>div`);

  function encuentraFilasColumnas(num) {

    // Calcula las filas y columnas
    let minDiferencia = num;
    let dimensiones = [1, num];
    for (let i = 1; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        const j = num / i;
        const diferencia = Math.abs(i - j);

        if (diferencia < minDiferencia) {
          minDiferencia = diferencia;
          dimensiones = [i, j]; // i = número de filas, j = número de columnas
        }
      }
    }

    return dimensiones;
  }

  //genera los elementos en el dom 

  function crearElementos(num) {
    const contenedor = document.createElement("div");
    contenedor.setAttribute("class", `contenedor`);
    document.body.appendChild(contenedor);
    contenedor.style.gridTemplateColumns = `repeat(${numColumnas}, 1fr)`;
    contenedor.style.gridTemplateRows = `repeat(${numFilas}, 1fr)`;
    for (let i = 1; i < numeroElementos; i++) {
      let item = document.createElement("div");
      item.setAttribute("class", `item-${i}`);
      contenedor.appendChild(item);
    }
  }

  // Encuentra un elemento en la grilla

  function obtenerPosicionEnGrilla(elemento) {
    let contenedorGrilla = document.querySelector(".contenedor");
    let elementosGrilla = Array.from(contenedorGrilla.children);
    let indice = elementosGrilla.indexOf(elemento);
    let estilosGrilla = window.getComputedStyle(contenedorGrilla);
    let columnasGrilla = parseInt(
      estilosGrilla.gridTemplateColumns.split(" ").length,
      10
    );
    let fila = Math.floor(indice / columnasGrilla) + 1; // +1 porque la cuenta de filas/columnas comienza en 1
    let columna = (indice % columnasGrilla) + 1;
    return { fila, columna };
  }

  //Elige un elemento aleatorio
  function aleatorioNearest(celdas, extension, paleta) {
    const nEl = celdas.length;
    const tamanoGrilla = Math.round(Math.sqrt(nEl));
    const profundidadAmarilla = extension;

    //selecciona una celda aleatoria
    const indiceAleatorio = Math.floor(Math.random() * nEl);
    const celdaAleatoria = celdas[indiceAleatorio];

    // Pintar adyacentes horizontales de cada celda adyacente a la celda aleatoria de amarillo según la profundidadAmarilla
    function pintarAdyacentesAmarillo(indiceBase, profundidad) {
      for (let i = 1; i <= profundidad; i++) {
        [indiceBase - i, indiceBase + i].forEach(indice => {
          if (indice >= 0 && indice < celdas.length && Math.floor(indice / tamanoGrilla) === Math.floor(indiceBase / tamanoGrilla)) {
            celdas[indice].style.backgroundColor = paleta[2];
          }
        });
      }
    }

    // Calcular los índices de las celdas adyacentes directamente arriba, abajo, izquierda y derecha
    const indicesAdyacentes = [
      indiceAleatorio - tamanoGrilla, // Arriba
      indiceAleatorio + tamanoGrilla, // Abajo
      indiceAleatorio - 1,            // Izquierda
      indiceAleatorio + 1             // Derecha
    ].filter(indice => indice >= 0 && indice < celdas.length && Math.abs(indice % tamanoGrilla - indiceAleatorio % tamanoGrilla) <= 1);

    // Primero pintamos de amarillo las celdas adyacentes a las celdas azules
    indicesAdyacentes.forEach(indiceAdyacente => {
      pintarAdyacentesAmarillo(indiceAdyacente, profundidadAmarilla);
    });

    // Luego aseguramos que las celdas adyacentes a la celda aleatoria sean azules
    indicesAdyacentes.forEach(indice => {
      celdas[indice].style.backgroundColor = paleta[1];
    });

    // Finalmente, aseguramos que la celda aleatoria permanezca roja
    celdaAleatoria.style.backgroundColor = paleta[0]; // Mantener la celda aleatoria pintada de rojo

  }

  //Asigna colores aleatoriamente
  function asignacionColor(el) {
    if (!el.style.backgroundColor || el.style.backgroundColor === blancoPuro) {

      let color;
      switch (randomIntFromInterval(1, 5)) {
        case 1:
          color = fondo[0];
          break;
        case 2:
          color = fondo[1];
          break;
        case 3:
          color = fondo[4];
          break;
        case 4:
          color = fondo[2];
          break
        case 5:
          color = fondo[3];
          break;
      }
      el.style.backgroundColor = color;
    }

  }

  function elementoSeleccionado(num, min, max) {
    let randPalette = Math.random();
    console.log(randPalette)
    if (randPalette <= 0.2) {
      console.log(randPalette);
      for (i = 1; i <= num; i++) {
        aleatorioNearest(todosItems, randomIntFromInterval(min, max), paletaCalida);
      }
    } else if (randPalette <= 0.4) {
      console.log(randPalette);

      for (i = 1; i <= num; i++) {
        aleatorioNearest(todosItems, randomIntFromInterval(min, max), paletaEsmeralda);
      }
    } else if (randPalette <= 0.6) {
      console.log(randPalette);

      for (i = 1; i <= num; i++) {
        aleatorioNearest(todosItems, randomIntFromInterval(min, max), paletaFria);
      }
    } else if (randPalette <= 0.8) {
      console.log(randPalette);

      for (i = 1; i <= num; i++) {
        aleatorioNearest(todosItems, randomIntFromInterval(min, max), paletaNoche);
      }
    } else if (randPalette < 1) {
      console.log(randPalette);

      for (i = 1; i <= num; i++) {
        aleatorioNearest(todosItems, randomIntFromInterval(min, max), paletaNoche2);
      }
    }


    todosItems.forEach((el) => {

      asignacionColor(el);

    });

  }
  //Cambia la dimensión d forma aleatoria
  function cambioDimension(dim) {
    rndInt = randomIntFromInterval(-2, numeroElementos);
    let el = document.querySelector(`.item-${rndInt}`);
    let random = randomIntFromInterval(1, dim);
    let posicion = obtenerPosicionEnGrilla(el);
    // Calcular límites máximos basados en la posición actual y el tamaño de la grilla
    let maxFila = numFilas - posicion.fila + 1;
    let maxColumna = numColumnas - posicion.columna + 1;
    // Ajustar 'random' para no exceder los límites de la grilla
    random = Math.min(random, maxFila, maxColumna);
    let numElems = random * 2;
    el.style.gridArea = `${posicion.fila}/${posicion.columna}/${posicion.fila + random}/${posicion.columna + random}`;
    crearSubgrid(el, numElems);
    return el;
  }

  function crearSubgrid(padre, numEl) {
    const subGrid = document.createElement("div");
    padre.style.backgroundColor = colorGap;
    padre.appendChild(subGrid);

    for (let i = 1; i <= numEl * numEl; i++) {
      let subGridEl = document.createElement("div");
      subGrid.appendChild(subGridEl);
      asignacionColor(subGridEl);


    }

    subGrid.setAttribute("class", `subgrid`);
    subGrid.style.gridTemplateColumns = `repeat(${numEl}, 1fr)`;
    subGrid.style.gridTemplateRows = `repeat(${numEl}, 1fr)`;

  }

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function init() {
    document.body.style.backgroundColor = colorGap;
    elementoSeleccionado(3, 2, 4);
    elementoSeleccionado(6, 2, 4);
    elementoSeleccionado(5, 2, 4);
    elementoSeleccionado(2, 2, 4);
    elementoSeleccionado(10, 2, 4);
    elementoSeleccionado(3, 2, 4);
    elementoSeleccionado(6, 2, 4);

    cambioDimension(4);
    cambioDimension(8);
    cambioDimension(6);
    cambioDimension(6);
    cambioDimension(7);
  }
  function reset() {
    location.reload();
  }

  setInterval(reset, 2000);
  init();
});
