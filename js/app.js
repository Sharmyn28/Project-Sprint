var estudiantes = [];
var dialogo = document.getElementById('dialogo'); // OJO: comentar esta linea para hacer las pruebas unitarias
// se realizo un total de 16 pruebas unitarias con mocha
var assert = require('assert'); //llamamos al modulo assert de node js para hacer tdd

function Estudiante(nombre, puntosTecnicos, puntosHSE) { // creamos la clase Estudiante
    this.nombre = nombre;
    this.puntosTecnicos = puntosTecnicos;
    this.puntosHSE = puntosHSE;
}

function obtenerListaEstudiantes() {
    // TO DO: Retornar la lista de estudiantes
    return estudiantes; //devolvemos la lista de estudiantes
}

function registrarEstudiante() {
    dialogo.showModal(); // abre el dialogo para registrar un estudiante
}

function agregarEstudiante() {
    // TO DO: Preguntar al usuario por el nombre, puntos técnicos y puntos de HSE de un estudiante
    // Hint: El estudiante debe ser agregado a la lista de estudiantes
    // TO DO: Retornar el estudiante recientemente creado
    var nombre = document.getElementById('nombre').value; //capturamos los datos
    var puntosTecnicos = document.getElementById('puntosTecnicos').value;
    var puntosHSE = document.getElementById('puntosHSE').value;
    var estudiante = "";
    // filtramos para validar que no haya dos nombres iguales
    var filtro = buscar(nombre, estudiantes);
    if (filtro.length != 0) {
        sweetAlert("Registro invalido", "Mensaje del sistema", "error");

    } else {
        estudiante = new Estudiante(nombre, puntosTecnicos, puntosHSE); //creamos un objeto estudiante
        estudiantes.push(estudiante); // agregamos el objeto al arreglo
        swal("Estudiante Registrado", "Mensaje del sistema", "success");
    }
    dialogo.close(); // cerramos el dialogo
    return estudiante;
}

function mostrar(estudiante) {
    // TO DO: Completar el template para que muestre las propiedades correctas del estudiante
    var resultado = "";
    if (typeof estudiante == "object" && (estudiante != null || estudiante != undefined) && !Array.isArray(estudiante)) {
        resultado += "<div class='row'>";
        resultado += "<div class='col m12'>";
        resultado += "<div class='card blue-grey darken-1'>";
        resultado += "<div class='card-content white-text'>";
        resultado += "<p><strong>Nombre:</strong> " + (estudiante.nombre != undefined ? estudiante.nombre : "Nada para mostrar") + "</p>";
        resultado += "<p><strong>Puntos Técnicos:</strong> " + (estudiante.puntosTecnicos != undefined ? estudiante.puntosTecnicos : "Nada para mostrar") + "</p>";
        resultado += "<p><strong>Puntos HSE:</strong> " + (estudiante.puntosHSE != undefined ? estudiante.puntosHSE : "Nada para mostrar") + "</p>";
        resultado += "</div>";
        resultado += "</div>";
        resultado += "</div>";
        resultado += "</div>";
    }
    return resultado;
}
//pruebas unitarias para posibles entradas del modulo mostrar(estudiante)
describe("funcion que muestra un estudiante ", function() {
    it("el resultado deberia ser '' si no se ingresa un objeto estudiante", function() {
        var res = mostrar();
        assert.equal('', res);
    });
    it("el resultado deberia ser '' si es estudiante es undefined", function() {
        var res = mostrar(undefined);
        assert.equal("", res);
    });
    it("el resultado deberia ser '' si estudiante es un string", function() {
        var res = mostrar("hola mundo");
        assert.equal("", res);
    });
    it("el resultado deberia ser '' si estudiante es un array", function() {
        var res = mostrar([1, 2, 3, 4]);
        assert.equal("", res);
    });
});

function mostrarLista(estudiantes) {
    // TO DO: Iterar la lista del estudiantes para devolverlos en el formato que usa la función mostrar(estudiante)
    // Retornar el template de todos los estudiantes
    var resultado = "";
    if (Array.isArray(estudiantes)) {
        estudiantes.forEach((elemento) => {
            resultado += mostrar(elemento);
        })
    }
    return resultado;
}
//pruebas unitarias para posibles entradas de la funcion mostrarLista(estudiante)
describe("funcion que muestra la lista de estudiantes ", function() {
    it("el resultado deberia ser '' si no se ingresa un array de estudiantes", function() {
        var res = mostrarLista();
        assert.equal('', res);
    });
    it("el resultado deberia ser '' si es estudiante es undefined", function() {
        var res = mostrarLista(undefined);
        assert.equal("", res);
    });
    it("el resultado deberia ser '' si estudiante es un string", function() {
        var res = mostrarLista("string de lista de estudiantes");
        assert.equal("", res);
    });
});


function buscar(nombre, estudiantes) {
    // TO DO: Buscar el nombre en la lista de estudiantes que se recibe por parámetros
    // Retornar el objeto del estudiante buscado
    // Nota: NO IMPORTA SI EL USUARIO ESCRIBE EL NOMBRE EN MAYÚSCULAS O MINÚSCULAS
    if (nombre != null && nombre != undefined && nombre != '' && Array.isArray(estudiantes)) {
        return estudiantes.filter(elemento => {
            return nombre.toLowerCase() == elemento.nombre.toLowerCase() // filtramos por aquellos que tengan el mismo nombre eliminamos case sensitive
        });
        //swal("Estudiante no Encontrado", "Mensaje del sistema", "warning");
    } else
        return estudiantes;

}
//pruebas unitarias para buscar un estudiante
describe("funcion que busca un estudiante ", function() {
    it("el resultado deberia ser la lista de estudiantes si no se ingresa un nombre", function() {
        var res = mostrarLista(estudiantes);
        assert.equal(estudiantes, res);
    });
    it("el resultado deberia ser la lista de estudiantes si estudiante es undefined", function() {
        var res = mostrarLista(undefined, estudiantes);
        assert.equal(estudiantes, res);
    });
    it("el resultado deberia ser la lista de estudiantes si estudiante es null", function() {
        var res = mostrarLista(null, estudiantes);
        assert.equal(estudiantes, res);
    });
});


function topTecnico(estudiantes) {
    // TO DO: Retornar el arreglo de estudiantes ordenado por puntaje técnico de mayor a menor
    if (Array.isArray(estudiantes)) {
        return estudiantes.sort((n, m) => {
            return m.puntosTecnicos - n.puntosTecnicos; // ordenamos de mayor a menor
        });
    } else
        return [];
}
//pruebas unitarias para el modulo topTecnico
describe("funcion que lista los estudiantes segun un orden de puntos Tecnicos ", function() {
    it("el resultado deberia ser un arreglo vacio si estudiantes es un string", function() {
        var res = topTecnico("string o cadena");
        assert.deepEqual([], res);
    });
    it("el resultado deberia ser un arreglo vacio si no ingresa el parametro estudiantes", function() {
        var res = topTecnico();
        assert.deepEqual([], res);
    });
    it("el resultado deberia ser un arreglo vacio si ingresa un numero", function() {
        var res = topTecnico(0);
        assert.deepEqual([], res);
    });
});

function topHSE(estudiantes) {
    // TO DO: Retornar el arreglo de estudiantes ordenado por puntaje de HSE de mayor a menor
    if (Array.isArray(estudiantes)) {
        return estudiantes.sort((n, m) => {
            return m.puntosHSE - n.puntosHSE; // ordenamos de mayor a menor
        });
    } else
        return [];
}
//pruebas unitarias para el modulo topHSE
describe("funcion que lista los estudiantes segun un orden de puntos HSE ", function() {
    it("el resultado deberia ser un arreglo vacio si estudiantes es un string", function() {
        var res = topHSE("string o cadena");
        assert.deepEqual([], res);
    });
    it("el resultado deberia ser un arreglo vacio si no ingresa el parametro estudiantes", function() {
        var res = topHSE();
        assert.deepEqual([], res);
    });
    it("el resultado deberia ser un arreglo vacio si ingresa un numero", function() {
        var res = topHSE(0);
        assert.deepEqual([], res);
    });
});
