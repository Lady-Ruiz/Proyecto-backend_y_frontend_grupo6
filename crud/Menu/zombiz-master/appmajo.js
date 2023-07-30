let listaEquipos = [];

const objEquipo = {
    id: '',
    nombres: '',
    apellidos: '',
    cedula: ''
};

let editando = false;

const formulario = document.querySelector('#formulario');
const nombresInput = document.querySelector('#nombres');
const apellidosInput = document.querySelector('#apellidos');


formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if (nombresInput.value === '' || apellidosInput.value === '') {
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
  
}

function mostrarEquipos() {
    limpiarHTML();

    const divEquipos = document.querySelector('.div-estudiantes');

    listaEquipos.forEach(equipo => {
        const { id, nombres, apellidos } = equipo;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${nombres} - ${apellidos} `;
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
    const { id, nombres, apellidos } = equipo;

    nombresInput.value = nombres;
    apellidosInput.value = apellidos;
    

    objEquipo.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

    editando = true;
}

function editarEquipo() {
    objEquipo.nombres = nombresInput.value;
    objEquipo.apellidos = apellidosInput.value;
   

    listaEquipos.map(equipo => {

        if (equipo.id === objEquipo.id) {
            equipo.id = objEquipo.id;
            equipo.nombres = objEquipo.nombres;
            equipo.apellidos = objEquipo.apellidos;
            
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
        equipo.apellidos.toLowerCase().includes(busqueda) 
    );
    mostrarEquiposFiltrados(equiposFiltrados);
}

function mostrarEquiposFiltrados(equipos) {
    limpiarHTML();

    const divEquipos = document.querySelector('.div-estudiantes');

    equipos.forEach(equipo => {
        const { id, nombres, apellidos} = equipo;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${nombres} - ${apellidos} `;
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
