import { createStore } from 'vuex';

export default createStore({
  state: {
    test: 'hola',

    //Array de la lista de comidas a pedir
    carrito: []
  },
  getters: {
    getCarrito(state) {
      return state.carrito
    },
    getTotalCarrito(state) {
      const total = state.carrito.reduce((acumular, producto) => {
        return acumular + parseFloat(producto.precio);
      }, 0);

      return total.toFixed(2);
    }, 
    // Este es para mostrar la cantidad de productos que se han añadido al carrito
    getCantidadCarrito(state) {
      const cantidad = state.carrito.length
      return cantidad
    }

  },
  mutations: {
    agregarCarrito(state, nuevoProducto) {
      console.log(nuevoProducto)
      state.carrito.push(nuevoProducto)
    },
    eliminarCarrito(state, index){
      state.carrito.splice(index, 1)
    }
        
  },
  actions: {
    agregarCarritoAccion(context, nuevoProducto){
      context.commit('agregarCarrito', nuevoProducto)
    },

    eliminarCarritoAccion(context, index){
      context.commit('eliminarCarrito', index)
    }

  }
})