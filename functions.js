document.addEventListener("DOMContentLoaded", function (event) {
  //VARIABLES
  let numeroElementos = 600;
  let colorRojo = "#D92938";
  let colorAzul = "#42558C";
  let colorAmarillo = "#F2CB05";
  let colorAmarilloMed = "#F2B705";
  let colorBlanco = "#F2F2F2";
  let colorNegro = "#000";
  let rndInt;
  //inicialización
  let [numFilas, numColumnas] = encuentraFilasColumnas(numeroElementos);

  crearElementos(numeroElementos);

  //selecciones
  let todosItems = document.querySelectorAll(`.contenedor>div`);
  function encuentraFilasColumnas(num) {
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
  function asignacionColor(el) {
    let color;
    switch (randomIntFromInterval(1, 5)) {
      case 1:
        color = colorRojo;
        break;
      case 2:
        color = colorAzul;
        break;
      case 3:
        color = colorAmarillo;
        break;

      case 4:
        color = colorBlanco;
        break;
      case 5:
        color = colorNegro;
        break;
    }
    el.style.backgroundColor = color;
  }
  function elementoSeleccionado(el) {
    todosItems.forEach((el) => {
      asignacionColor(el);
    });
  }
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

    el.style.gridArea = `${posicion.fila}/${posicion.columna}/${
      posicion.fila + random
    }/${posicion.columna + random}`;
    crearSubgrid(el, random*2);
  }
  function crearSubgrid(padre, numEl) {
    const subGrid = document.createElement("div");
    padre.style.backgroundColor = colorNegro;
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
    elementoSeleccionado(todosItems);
    cambioDimension(10);
    cambioDimension(8);
    cambioDimension(8);
    cambioDimension(6);
    //cambioDimension(7);
  }
  function reset() {
    location.reload();
  }

  setInterval(reset, 3000);
  init();
});
