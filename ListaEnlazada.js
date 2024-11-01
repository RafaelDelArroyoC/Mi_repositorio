class Nodo {
    constructor(dato) {
      this.dato = dato;
      this.siguiente = null;
    }
  }
  
  class ListaEnlazada {
    constructor() {
      this.cabeza = null;
      this.tamaño = 0;
    }
  
    agregar(dato) {
      const nuevoNodo = new Nodo(dato);
      if (!this.cabeza) {
        this.cabeza = nuevoNodo;
      } else {
        let actual = this.cabeza;
        while (actual.siguiente) {
          actual = actual.siguiente;
        }
        actual.siguiente = nuevoNodo;
      }
      this.tamaño++;
    }
  
    eliminar(index) {
      if (this.cabeza === null || index < 0 || index >= this.tamaño) return;
  
      if (index === 0) {
        this.cabeza = this.cabeza.siguiente;
      } else {
        let actual = this.cabeza;
        let contador = 0;
  
        while (actual !== null && contador < index - 1) {
          actual = actual.siguiente;
          contador++;
        }
  
        if (actual === null || actual.siguiente === null) return;
  
        // Eliminar el nodo apuntando al siguiente del siguiente
        actual.siguiente = actual.siguiente.siguiente;
      }
      
      this.tamaño--; // Decrementamos el tamaño de la lista
    }
  
    actualizar(index, dato) {
      if (index < 0 || index >= this.tamaño) return;
      let actual = this.cabeza;
      let i = 0;
      while (i < index) {
        actual = actual.siguiente;
        i++;
      }
      actual.dato = dato;
    }
  
    listar() {
      let libros = [];
      let actual = this.cabeza;
      while (actual) {
        libros.push(actual.dato);
        actual = actual.siguiente;
      }
      return libros;
    }
  }
  
  export default ListaEnlazada;
  