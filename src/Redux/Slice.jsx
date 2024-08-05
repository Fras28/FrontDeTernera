import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

const initialState = {
  user: null,
  token: null,
  role: null,
  categories: [],
  articulos: [],
  valores: [],
  cart: [],
  pedidos: [],
  pedidoActual: [],
  historial: [],
  cartTotal: 0,
  status: "idle",
  error: null,
};

// Async thunks
export const fetchCategories = createAsyncThunk(
  "counter/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE}/api/categorias?populate=img&populate=sub_categorias.articulos.valors`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPedidosUser = createAsyncThunk(
  "counter/fetchPedidos",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_BASE}/api/pedidos-with-user?userId=${userId}`
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchValor = createAsyncThunk(
  "counter/fetchValor",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/api/valors`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE}/api/auth/local/register`,
        userData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, thunkAPI) => {
    try {
      const loginResponse = await axios.post(`${API_BASE}/api/auth/local`, {
        identifier: credentials.email,
        password: credentials.password,
      });

      const token = loginResponse.data.jwt;
      localStorage.setItem("token", token);

      const userResponse = await axios.get(
        `${API_BASE}/api/users/me?populate=role&populate=pedidos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userData = userResponse.data;
      const role = userData.role ? userData.role.name : null;
      const pedidos = userData.pedidos || [];

      return {
        ...userData,
        token,
        role,
        pedidos,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("token");
  return null;
});

export const crearPedido = createAsyncThunk(
  "counter/crearPedido",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const { token, user } = state;

    try {
      const response = await axios.post(
        `${API_BASE}/api/pedidos`,
        {
          data: {
            user: { id: user.id },
            comercio: { id: 1 },
            estado: "xxxx",
            total: 0,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const agregarArticuloPedido = createAsyncThunk(
  "counter/agregarArticuloPedido",
  async (
    { pedidoId, articuloId, valorId, cantidad, precio, nombre, valor },
    thunkAPI
  ) => {
    const { token } = thunkAPI.getState();

    try {
      const response = await axios.post(
        `${API_BASE}/api/pedido-articulos`,
        {
          data: {
            pedido: pedidoId,
            articulo: articuloId,
            valor: valorId,
            cantidad,
            precio_unitario: precio,
            subtotal: cantidad * precio,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Combine server response with local data
      return {
        id: response?.data?.data?.id,
        articleId: articuloId,
        name: nombre,
        price: precio,
        quantity: cantidad,
        valor: valor,
        valorId: valorId,
        precioFinal: precio,
        ...response.data.data.attributes,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const finalizarPedido = createAsyncThunk(
  "counter/finalizarPedido",
  async (pedidoId, thunkAPI) => {
    const { token,cartTotal } = thunkAPI.getState();

    try {
      const response = await axios.put(
        `${API_BASE}/api/pedidos/${pedidoId}`,
        {
          estado: "pendiente",
          total:cartTotal
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const obtenerHistorialPedidos = createAsyncThunk(
  "counter/obtenerHistorial",
  async (_, thunkAPI) => {
    const { user } = thunkAPI.getState();
    try {
      const response = await axios.get(
        `${API_BASE}/api/pedidos?filters[user][id][$eq]=${user?.id}&populate=pedido_articulos.articulo&populate=pedido_articulos.valor`
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const calculateCartTotal = (cart) => {
  return cart.reduce(
    (total, item) => total + item.subtotal,
    0
  );
};

const calculatePedidoTotal = (pedidoArticulos) => {
  return pedidoArticulos.reduce(
    (total, articulo) => total + articulo.subtotal,
    0
  );
};

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    pedidoActual: []
  },
  reducers: {
    addToCart: (state, action) => {
      const { articleId, name, price, quantity, valor, valorId, precioFinal, descuento } = action.payload;

      if (!state.pedidoActual) {
        state.pedidoActual = {
          attributes: {
            pedido_articulos: [],
            total: 0
          }
        };
      }

      const existingItemIndex = state.pedidoActual.attributes.pedido_articulos.findIndex(
        item => item.articleId === articleId && item.valorId === valorId
      );

      const subtotal = quantity * precioFinal;

      if (existingItemIndex !== -1) {
        state.pedidoActual.attributes.pedido_articulos[existingItemIndex] = {
          ...state.pedidoActual.attributes.pedido_articulos[existingItemIndex],
          quantity,
          subtotal,
          updatedAt: new Date().toISOString()
        };
      } else {
        state.pedidoActual.attributes.pedido_articulos.push({
          articleId,
          name,
          price,
          quantity,
          valor,
          valorId,
          precioFinal,
          subtotal,
          descuento,
          updatedAt: new Date().toISOString()
        });
      }

      state.pedidoActual.attributes.total = calculateCartTotal(state.pedidoActual.attributes.pedido_articulos);
    },
    
    updateCartQuantity: (state, action) => {
      const { articleId, valorId, quantity } = action.payload;
      const itemIndex = state.pedidoActual.attributes.pedido_articulos.findIndex(
        item => item.articleId === articleId && item.valorId === valorId
      );

      if (itemIndex !== -1) {
        if (quantity === 0 || quantity === null) {
          // Eliminar el artículo si la cantidad es 0 o null
          state.pedidoActual.attributes.pedido_articulos.splice(itemIndex, 1);
        } else {
          state.pedidoActual.attributes.pedido_articulos[itemIndex].quantity = quantity;
          state.pedidoActual.attributes.pedido_articulos[itemIndex].subtotal = quantity * state.pedidoActual.attributes.pedido_articulos[itemIndex].precioFinal;
          state.pedidoActual.attributes.pedido_articulos[itemIndex].updatedAt = new Date().toISOString();
        }
        state.pedidoActual.attributes.total = calculateCartTotal(state.pedidoActual.attributes.pedido_articulos);
      }
    },
    
    removeFromCart: (state, action) => {
      const { articleId, valorId } = action.payload;
      if (state.pedidoActual) {
        state.pedidoActual.attributes.pedido_articulos = state.pedidoActual.attributes.pedido_articulos.filter(
          item => !(item.articleId === articleId && item.valorId === valorId)
        );
        state.pedidoActual.attributes.total = calculateCartTotal(state.pedidoActual.attributes.pedido_articulos);
      }
    },
    
    clearCart: (state) => {
      if (state.pedidoActual) {
        state.pedidoActual.attributes.pedido_articulos = [];
        state.pedidoActual.attributes.total = 0;
      }
    },
  },
  extraReducers: (builder) => {
    builder

      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload.map((category) => ({
          id: category.id,
          ...category.attributes,
          sub_categorias: category.attributes.sub_categorias.data.map(
            (subCategory) => ({
              id: subCategory.id,
              ...subCategory.attributes,
              articulos: subCategory.attributes.articulos.data.map(
                (articulo) => ({
                  id: articulo.id,
                  ...articulo.attributes,
                })
              ),
            })
          ),
        }));

        // Extraer todos los artículos de todas las categorías y subcategorías
        state.articulos = state.categories.flatMap((category) =>
          category.sub_categorias.flatMap(
            (subCategory) => subCategory.articulos
          )
        );

        console.log("Artículos cargados:", state.articulos);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.error("Error loading categories:", action.payload);
      })
      // Fetch Pedidos User
      .addCase(fetchPedidosUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPedidosUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pedidos = action.payload;
      })
      .addCase(fetchPedidosUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch Valor
      .addCase(fetchValor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchValor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.valores = action.payload;
        console.log("Valores loaded:", state.valores);
      })
      .addCase(fetchValor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.error("Error loading valores:", action.payload);
      })
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.token = action.payload.token;
        state.role = action.payload.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Logout User
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
        state.token = null;
        state.role = null;
        state.cart = [];
        state.cartTotal=0;
        state.pedidoActual = [];
        state.historial = [];
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Crear Pedido
      .addCase(crearPedido.fulfilled, (state, action) => {
        state.pedidoActual = action.payload;
        state.pedidoActual.attributes.total = 0;
        state.pedidoActual.attributes.pedido_articulos = [];
      })
      .addCase(agregarArticuloPedido.fulfilled, (state, action) => {
        if (state.pedidoActual) {
          const newArticulo = action.payload;
          const existingIndex = state.pedidoActual.attributes.pedido_articulos.findIndex(
            item => item.articleId === newArticulo.articleId && item.valorId === newArticulo.valorId
          );

          if (existingIndex !== -1) {
            state.pedidoActual.attributes.pedido_articulos[existingIndex] = newArticulo;
          } else {
            state.pedidoActual.attributes.pedido_articulos.push(newArticulo);
          }

          state.pedidoActual.attributes.total = calculatePedidoTotal(state.pedidoActual.attributes.pedido_articulos);
        }
      })
      // Finalizar Pedido
      .addCase(finalizarPedido.fulfilled, (state, action) => {
        state.historial.push(action.payload);
        state.pedidoActual = null;
        state.cart = [];
        state.cartTotal = 0;
      })
      // Obtener Historial Pedidos
      .addCase(obtenerHistorialPedidos.fulfilled, (state, action) => {
        state.historial = action.payload;
        state.status = "succeeded";
      })
      // Generic error handler
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload || action.error.message;
        }
      );
  },
});

export const {
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} = counterSlice.actions;

export default counterSlice.reducer;
