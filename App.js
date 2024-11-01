import React, { useState, useEffect } from 'react';
import './App.css'; // Asegúrate de importar el archivo de estilos

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [anio_publicacion, setAnioPublicacion] = useState('');
  const [genero, setGenero] = useState('');
  const [libros, setLibros] = useState([]);
  const [editarIndex, setEditarIndex] = useState(null);
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevoAutor, setNuevoAutor] = useState('');
  const [nuevoAnio, setNuevoAnio] = useState('');
  const [nuevoGenero, setNuevoGenero] = useState('');

  // Función para obtener libros desde el servidor
  const obtenerLibros = async () => {
    try {
      const response = await fetch('http://localhost:3001/libros');
      const data = await response.json();
      setLibros(data);
    } catch (error) {
      console.error('Error al obtener libros:', error);
    }
  };

  useEffect(() => {
    obtenerLibros();
  }, []);

  // Función para agregar un nuevo libro
  const agregarLibro = async () => {
    if (titulo && autor) {
      try {
        const response = await fetch('http://localhost:3001/libros', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ titulo, autor, anio_publicacion, genero }),
        });
        const nuevoLibro = await response.json();
        setLibros([...libros, nuevoLibro]);
        setTitulo('');
        setAutor('');
        setAnioPublicacion('');
        setGenero('');
      } catch (error) {
        console.error('Error al agregar libro:', error);
      }
    }
  };

  // Función para eliminar un libro
  const eliminarLibro = async (id) => {
    try {
      await fetch(`http://localhost:3001/libros/${id}`, {
        method: 'DELETE',
      });
      obtenerLibros(); // Refresca la lista después de eliminar un libro
    } catch (error) {
      console.error('Error al eliminar libro:', error);
    }
  };

  // Función para preparar la edición de un libro
  const prepararEdicion = (libro) => {
    setEditarIndex(libro.id);
    setNuevoTitulo(libro.titulo);
    setNuevoAutor(libro.autor);
    setNuevoAnio(libro.anio_publicacion);
    setNuevoGenero(libro.genero);
  };

  // Función para actualizar un libro
  const actualizarLibro = async () => {
    if (nuevoTitulo && nuevoAutor) {
      try {
        await fetch(`http://localhost:3001/libros/${editarIndex}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ titulo: nuevoTitulo, autor: nuevoAutor, anio_publicacion: nuevoAnio, genero: nuevoGenero }),
        });
        obtenerLibros(); // Refresca la lista después de actualizar
        cancelarEdicion(); // Cancela la edición
      } catch (error) {
        console.error('Error al actualizar libro:', error);
      }
    }
  };

  // Función para cancelar la edición
  const cancelarEdicion = () => {
    setEditarIndex(null);
    setNuevoTitulo('');
    setNuevoAutor('');
    setNuevoAnio('');
    setNuevoGenero('');
  };

  return (
    <div className="App">
      <h1>Gestión de Libros</h1>
      <div>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Año de Publicación"
          value={anio_publicacion}
          onChange={(e) => setAnioPublicacion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Género"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        />
        <button onClick={agregarLibro}>Agregar Libro</button>
      </div>

      <h2>Lista de Libros</h2>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Año de Publicación</th>
            <th>Género</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.map((libro) => (
            <tr key={libro.id}>
              <td>{libro.titulo}</td>
              <td>{libro.autor}</td>
              <td>{libro.anio_publicacion}</td>
              <td>{libro.genero}</td>
              <td>
                <button onClick={() => eliminarLibro(libro.id)}>Eliminar</button>
                <button onClick={() => prepararEdicion(libro)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editarIndex && (
        <div>
          <h3>Editar Libro</h3>
          <input
            type="text"
            placeholder="Nuevo Título"
            value={nuevoTitulo}
            onChange={(e) => setNuevoTitulo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nuevo Autor"
            value={nuevoAutor}
            onChange={(e) => setNuevoAutor(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nuevo Año"
            value={nuevoAnio}
            onChange={(e) => setNuevoAnio(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nuevo Género"
            value={nuevoGenero}
            onChange={(e) => setNuevoGenero(e.target.value)}
          />
          <button onClick={actualizarLibro}>Actualizar Libro</button>
          <button onClick={cancelarEdicion}>Cancelar</button>
        </div>
      )}
    </div>
  );
}

export default App;
