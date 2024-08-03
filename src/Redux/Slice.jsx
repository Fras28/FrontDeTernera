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
  pedidoActual: null,
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
    const { token, pedidoActual, user } = state;
    
    if (pedidoActual) {
      return pedidoActual;
    }
    
    try {
      const response = await axios.post(`${API_BASE}/api/pedidos`, 
        {
          data: {
              user: {id:user.id},
              comercio:{id:1},
              estado: "pendiente",
              total: 0,
          }
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

export const agregarArticuloPedido = createAsyncThunk(
  "counter/agregarArticuloPedido",
  async ({ pedidoId, articuloId, valorId, cantidad, precio }, thunkAPI) => {
    const { token } = thunkAPI.getState();
    
    try {
      const response = await axios.post(`${API_BASE}/api/pedido-articulos`, 
        {
          data: {
            pedido: pedidoId,
            articulo: articuloId,
            valor: valorId,
            cantidad,
            precio_unitario: precio,
            subtotal: cantidad * precio,
          }
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

export const finalizarPedido = createAsyncThunk(
  "counter/finalizarPedido",
  async (pedidoId, thunkAPI) => {
    const { token } = thunkAPI.getState();
    
    try {
      const response = await axios.put(`${API_BASE}/api/pedidos/${pedidoId}`, 
        {
          estado: 'completado',
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
  async (usuarioId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE}/api/pedidos?usuario_id=${usuarioId}&populate=pedido_articulos.articulo&populate=pedido_articulos.valor`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const calculateCartTotal = (cart) => {
  return cart.reduce(
    (total, item) => total + item.precioFinal * item.quantity,
    0
  );
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const {
        articleId,
        name,
        price,
        quantity,
        valor,
        valorId,
        precioFinal,
        discountPercentage,
      } = action.payload;
      const existingItem = state.cart.find(
        (item) => item.articleId === articleId && item.valorId === valorId
      );
      if (existingItem) {
        existingItem.quantity = quantity;
      } else {
        state.cart.push({
          articleId,
          name,
          price,
          quantity,
          valor,
          valorId,
          precioFinal,
          discountPercentage,
        });
      }
      state.cartTotal = calculateCartTotal(state.cart);
    },
    updateCartQuantity: (state, action) => {
      const { articleId, valorId, quantity } = action.payload;
      const item = state.cart.find(
        (item) => item.articleId === articleId && item.valorId === valorId
      );
      if (item) {
        item.quantity = quantity;
      }
      state.cartTotal = calculateCartTotal(state.cart);
    },
    updateCartItemQuantity: (state, action) => {
      const { articleId, valorId, quantity } = action.payload;
      const item = state.cart.find(
        (item) => item.articleId === articleId && item.valorId === valorId
      );

      if (item) {
        if (quantity <= 0) {
          state.cart = state.cart.filter(
            (item) => item.articleId !== articleId || item.valorId !== valorId
          );
        } else {
          item.quantity = quantity;
        }
      }
      state.cartTotal = calculateCartTotal(state.cart);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) =>
          item.articleId !== action.payload.articleId ||
          item.valorId !== action.payload.valorId
      );
      state.cartTotal = calculateCartTotal(state.cart);
    },
    clearCart: (state) => {
      state.cart = [];
      state.cartTotal = 0;
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
        state.articulos = state.categories.flatMap(category => 
          category.sub_categorias.flatMap(subCategory => 
            subCategory.articulos
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
        state.pedidoActual = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Crear Pedido
      .addCase(crearPedido.fulfilled, (state, action) => {
        state.pedidoActual = action.payload.data;
        state.status = 'succeeded';
      })
      .addCase(agregarArticuloPedido.fulfilled, (state, action) => {
        if (state.pedidoActual) {
          if (!state.pedidoActual.attributes.pedido_articulos) {
            state.pedidoActual.attributes.pedido_articulos = [];
          }
          state.pedidoActual.attributes.pedido_articulos.push(action.payload.data);
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
        state.status = 'succeeded';
      })
      // Generic error handler
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload || action.error.message;
        }
      );
  },
});

export const {
  addToCart,
  updateCartQuantity,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
} = counterSlice.actions;

export default counterSlice.reducer;

