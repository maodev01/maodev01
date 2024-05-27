let listaLibros = [];

document.addEventListener("DOMContentLoaded", () => {
  cargarLibrosDesdeLocalStorage();
  mostrarLibros();
});

const formulario = document.querySelector("#form-libro");
const titleInput = document.querySelector("#title");
const anhoInput = document.querySelector("#anho");
const autorInput = document.querySelector("#autor");
const editorialInput = document.querySelector("#editorial");
const btnAgregar = document.querySelector("#btn-agregar");
const btnRestablecer = document.querySelector("#btn-reset");

let edit = false;
let idEdicion = null;

formulario.addEventListener("submit", validarFormulario);

function validarFormulario(e) {
  e.preventDefault();

  if (
    titleInput.value === "" ||
    anhoInput.value === "" ||
    autorInput.value === "" ||
    editorialInput.value === ""
  ) {
    alert("¡Debes rellenar todos los campos!");
    return;
  }

  const nuevoLibro = {
    id: edit ? idEdicion : Date.now(),
    titulo: titleInput.value,
    anho: anhoInput.value,
    autor: autorInput.value,
    editorial: editorialInput.value,
  };

  if (edit) {
    editarLibro(nuevoLibro);
    edit = false;
    idEdicion = null;
  } else {
    agregarLibro(nuevoLibro);
  }

  formulario.reset();
  mostrarLibros();
  guardarLibrosEnLocalStorage();
}

function agregarLibro(libro) {
  listaLibros.push(libro);
}

function editarLibro(libroEditado) {
  listaLibros = listaLibros.map(libro =>
    libro.id === libroEditado.id ? libroEditado : libro
  );
}

function mostrarLibros() {
  const divLibros = document.querySelector(".list-libros");
  divLibros.innerHTML = ""; // Limpiar la lista antes de mostrar los libros

  listaLibros.forEach((libro) => {
    const { id, titulo, anho, autor, editorial } = libro;

    const parrafo = document.createElement("p");
    parrafo.textContent = `${id} - ${titulo} - ${anho} - ${autor} - ${editorial}`;
    parrafo.dataset.id = id;

    const botonEditar = document.createElement("button");
    botonEditar.onclick = () => cargarLibro(libro);
    botonEditar.textContent = "Editar";
    botonEditar.classList.add("btn-editar");
    parrafo.append(botonEditar);

    const botonEliminar = document.createElement("button");
    botonEliminar.onclick = () => eliminarLibro(id);
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("btn-eliminar");
    parrafo.append(botonEliminar);

    const hr = document.createElement("hr");

    divLibros.appendChild(parrafo);
    divLibros.appendChild(hr);
  });
}

function cargarLibro(libro) {
  const { id, titulo, anho, autor, editorial } = libro;

  titleInput.value = titulo;
  anhoInput.value = anho;
  autorInput.value = autor;
  editorialInput.value = editorial;

  edit = true;
  idEdicion = id;
}

function eliminarLibro(id) {
  const confirmacion = confirm("¿Deseas eliminar este contenido?");
  if (confirmacion) {
    listaLibros = listaLibros.filter(libro => libro.id !== id);
    mostrarLibros();
    guardarLibrosEnLocalStorage();
  }
}

function guardarLibrosEnLocalStorage() {
  localStorage.setItem('listaLibros', JSON.stringify(listaLibros));
}

function cargarLibrosDesdeLocalStorage() {
  const librosGuardados = localStorage.getItem('listaLibros');
  if (librosGuardados) {
    listaLibros = JSON.parse(librosGuardados);
  }
}
