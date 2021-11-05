import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImgs from './components/ListadoImgs';

function App() {
  const [ busqueda, guardarBusqueda ] = useState("");
  const [ imagenes, guardarImagenes ] = useState([]);
  const [ paginaActual, guardarPaginaActual ] = useState(1);
  const [ totalPaginas, guardarTotalPaginas ] = useState(5);

  useEffect(() => {
    const askAPI =  async () => {
        if(busqueda === "") return; //Por el momento, esto nos asegura que "useEffect" no retornara nada.

        const imagenesPorPagina = 30;
        const key = '24203523-63a4abb4ce1efef7bd029a83b';
        const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

        const respuesta =  await fetch(url);
        const resultado = await respuesta.json();

        guardarImagenes(resultado.hits);

        //Calcular el total de paginas
        let calcularTotalPaginas = Math.ceil(resultado.totalHits/imagenesPorPagina);
        guardarTotalPaginas(calcularTotalPaginas);

        //Mover la pantalla hacia arriba
        const jumbotron = document.querySelector('.jumbotron');
        jumbotron.scrollIntoView({behavior: 'smooth'});

        //Verificando que la variable este recibiendo los datos
        console.log(resultado);
        console.log("Numero de hits: " + resultado.hits);
     };

     askAPI();
  }, [busqueda, paginaActual]);

  //Definiendo la pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;

    if(nuevaPaginaActual === 0) return; //Esta linea es para evitar que la paginacion tome numeros negativos

    guardarPaginaActual(nuevaPaginaActual);
   // console.log(nuevaPaginaActual);
    //return ();
  };

  //Definiendo la pagina siguiente
  const paginaSiguiente = () => {
    let paginaSiguiente = paginaActual + 1;

    if(paginaSiguiente > totalPaginas) return; //Este condicional evita que la paginacion sobrepase 
    //los numeros disponibles.
    guardarPaginaActual(paginaSiguiente);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>
        <Formulario 
          guardarBusqueda={guardarBusqueda}
        />        
      </div>

      <div className="row justify-content-center">
        <ListadoImgs             
            imagenes = {imagenes}
        />

        {(paginaActual === 1 ? null : (
            <button
                type="button"
                className="bbtn btn-outline-secondary mr-1 mb-4"    
                onClick = {paginaAnterior}      
                style={{color:'black'}}
            >&laquo; Anterior</button>
        ))}

        {(paginaActual === totalPaginas ? null : (
            <button 
                type="button"
                className="bbtn btn-outline-secondary mb-4"
                onClick = {paginaSiguiente}          
                style={{color:'black'}}
            >Siguiente &raquo;</button>
        ) )}

      </div>
    </div>
  );
}

export default App;
