let listaEquipos = [];

const objEquipo = {
    id: '',
    nombres: '',
    apellidos: '',
    cedula: ''
};

let editando = false;

const formulario = document.querySelector('#formulario');
const nombresInput = document.querySelector('#nombre');
const apellidosInput = document.querySelector('#apellido');
const cedulaInput = document.querySelector('#cedula');
const aulaInput = document.querySelector('#almacen');
const mesasInput = document.querySelector('#ambiente');
const sillasInput = document.querySelector('#npiso');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if (nombresInput.value === '' || apellidosInput.value === '' || cedulaInput.value === '' | aulaInput.value === '' || mesasInput.value === '' || sillasInput.value === '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    if (editando) {
        editarEquipo();
        editando = false;
    } else {
        objEquipo.id = Date.now();
        objEquipo.nombres = nombresInput.value;
        objEquipo.apellidos = apellidosInput.value;
        objEquipo.cedula = cedulaInput.value;
        objEquipo.aula = aulaInput.value;
        objEquipo.mesas = mesasInput.value;
        objEquipo.sillas = sillasInput.value;

        agregarEquipo();
    }
}

function agregarEquipo() {
    listaEquipos.push({ ...objEquipo });

    mostrarEquipos();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objEquipo.id = '';
    objEquipo.nombres = '';
    objEquipo.apellidos = '';
    objEquipo.cedula = '';
    objEquipo.aula = '';
    objEquipo.mesas = '';
    objEquipo.sillas = '';
}

function mostrarEquipos() {
    limpiarHTML();

    const divEquipos = document.querySelector('.div-estudiantes');

    listaEquipos.forEach(equipo => {
        const { id, nombres, apellidos, cedula, aula, mesas, sillas } = equipo;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${nombres} - ${apellidos} - ${cedula} - ${aula} - ${mesas} - ${sillas}`;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEquipo(equipo);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEquipo(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEquipos.appendChild(parrafo);
        divEquipos.appendChild(hr);
    });
}

function cargarEquipo(equipo) {
    const { id, nombres, apellidos, cedula, aula, mesas, sillas } = equipo;

    nombresInput.value = nombres;
    apellidosInput.value = apellidos;
    cedulaInput.value = cedula;
    aulaInput.value = aula;
    mesasInput.value = mesas;
    sillasInput.value = sillas;

    objEquipo.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

    editando = true;
}

function editarEquipo() {
    objEquipo.nombres = nombresInput.value;
    objEquipo.apellidos = apellidosInput.value;
    objEquipo.cedula = cedulaInput.value;
    objEquipo.aula = aulaInput.value;
    objEquipo.mesas = mesasInput.value;
    objEquipo.sillas = sillasInput.value;

    listaEquipos.map(equipo => {

        if (equipo.id === objEquipo.id) {
            equipo.id = objEquipo.id;
            equipo.nombres = objEquipo.nombres;
            equipo.apellidos = objEquipo.apellidos;
            equipo.cedula = objEquipo.cedula;
            equipo.aula = objEquipo.aula;
            equipo.mesas = objEquipo.mesas;
            equipo.sillas = objEquipo.sillas;
        }

    });

    limpiarHTML();
    mostrarEquipos();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';

    editando = false;
}

function eliminarEquipo(id) {
    listaEquipos = listaEquipos.filter(equipo => equipo.id !== id);

    limpiarHTML();
    mostrarEquipos();
}

function limpiarHTML() {
    const divEquipos = document.querySelector('.div-estudiantes');
    while (divEquipos.firstChild) {
        divEquipos.removeChild(divEquipos.firstChild);
    }
}

// Nueva funcionalidad de búsqueda
const buscarEquipoInput = document.querySelector('#buscarEquipo');
const btnBuscar = document.querySelector('#btnBuscar');

// Evento click del botón "Buscar"
btnBuscar.addEventListener('click', buscarEquipos);

// Evento input de la barra de búsqueda
buscarEquipoInput.addEventListener('input', buscarEquipos);

function buscarEquipos() {
    const busqueda = buscarEquipoInput.value.trim().toLowerCase();
    const equiposFiltrados = listaEquipos.filter(equipo => 
        equipo.nombres.toLowerCase().includes(busqueda) ||
        equipo.apellidos.toLowerCase().includes(busqueda) ||
        equipo.cedula.toLowerCase().includes(busqueda) ||
        equipo.aula.toLowerCase().includes(busqueda) ||
        equipo.mesas.toLowerCase().includes(busqueda) ||
        equipo.sillas.toLowerCase().includes(busqueda)
    );
    mostrarEquiposFiltrados(equiposFiltrados);
}

function mostrarEquiposFiltrados(equipos) {
    limpiarHTML();

    const divEquipos = document.querySelector('.div-estudiantes');

    equipos.forEach(equipo => {
        const { id, nombres, apellidos, cedula, aula, mesas, sillas} = equipo;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${nombres} - ${apellidos} - ${cedula} - ${aula} - ${mesas} - ${sillas}`;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEquipo(equipo);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEquipo(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEquipos.appendChild(parrafo);
        divEquipos.appendChild(hr);
    });
}

// Función inicial para mostrar todos los equipos al inicio
mostrarEquipos();
