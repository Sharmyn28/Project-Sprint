+function () {
    // Elementos
    var botonAgregar = document.getElementById("agregar");
    var botonMostrar = document.getElementById("mostrar");
    var botonBuscar = document.getElementById("buscar");
    var botonTopTecnico = document.getElementById("top-tecnico");
    var botonTopHSE = document.getElementById("top-hse");
    var resultado = document.getElementById("contenedor-estudiantes");

    // Evento Click - Agregar
    var eventoAgregar = function (e) {
        e.preventDefault();
        var estudiante = agregarEstudiante();
        resultado.innerHTML = mostrar(estudiante);
    };

    var eventoMostrar = function (e) {
        e.preventDefault();
        var estudiantes = obtenerListaEstudiantes();
        resultado.innerHTML = mostrarLista(estudiantes);
    };

    var eventoBuscar = function (e) {
        e.preventDefault();
        var estudiantes = obtenerListaEstudiantes();
        //var nombreEstudiante = prompt("¿Qué nombre desea buscar?");
        swal({
              title: "¿Qué nombre desea buscar?",
              text: "Escribe su nombre o letras de referencia",
              type: "input",
              showCancelButton: true,
              closeOnConfirm: false,
              animation: "slide-from-top",
              inputPlaceholder: "Write something"
            },
              function(inputValue){
                if (inputValue === false) return false;

                if (inputValue === "") {
                  swal.showInputError("Debes escribir algo!");
                  return false
                }
            swal("Perfecto", "Escrbiste: " + inputValue, "success");
            var nombreEstudiante = inputValue;
            var estudianteBuscado = buscar(nombreEstudiante, estudiantes);
            resultado.innerHTML = mostrarLista(estudianteBuscado);
        });
        /*var nombreEstudiante = inputValue;
        var estudianteBuscado = buscar(nombreEstudiante, estudiantes);
        resultado.innerHTML = mostrarLista(estudianteBuscado); */
    };

    var eventoTopTecnico = function (e) {
        e.preventDefault();
        var estudiantes = obtenerListaEstudiantes();
        var estudiantesTopTecnico = topTecnico(estudiantes);
        resultado.innerHTML = mostrarLista(estudiantesTopTecnico);
    };

    var eventoTopHSE = function (e) {
        e.preventDefault();
        var estudiantes = obtenerListaEstudiantes();
        var estudiantesTopHSE = topHSE(estudiantes);
        resultado.innerHTML = mostrarLista(estudiantesTopHSE);
    };

    // Manejadores de eventos
    botonAgregar.addEventListener("click", eventoAgregar);
    botonMostrar.addEventListener("click", eventoMostrar);
    botonBuscar.addEventListener("click", eventoBuscar);
    botonTopTecnico.addEventListener("click", eventoTopTecnico);
    botonTopHSE.addEventListener("click", eventoTopHSE);
}();
