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
  pedidos:[],
  cartTotal: 0,
  status: "idle",
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "counter/fetchCategories",
  async () => {
    const response = await axios.get(
      `${API_BASE}/api/categorias?populate=img&populate=sub_categorias.articulos.valors`
    );
    return response.data.data;
  }
);


export const fetchPedidosUser = createAsyncThunk(
  "counter/fetchPedidos",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      console.log("Current state:", state); // Log the entire state for debugging

      // Check if user exists in the state
      if (!state?.allData || !state?.allData?.user) {
        throw new Error("User not found in state");
      }

      const userId = state?.allData?.user?.id;
      console.log("User ID:", userId); // Log the user ID

      if (!userId) {
        throw new Error("User ID is undefined");
      }

      const response = await axios.get(
        `${API_BASE}/api/pedidos-with-user?userId=${userId}`
      );
      console.log("API response:", response.data); // Log the API response
      return response.data.data;
    } catch (error) {
      console.error("Error in fetchPedidosUser:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchValor = createAsyncThunk("counter/fetchValor", async () => {
  const response = await axios.get(`${API_BASE}/api/valors`);
  return response.data.data;
});

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData) => {
    const response = await axios.post(
      `${API_BASE}/api/auth/local/register`,
      userData
    );
    return response.data;
  }
);

export const loginUser = createAsyncThunk("user/login", async (credentials) => {
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
  const pedidos = userData.pedidos || []; // Add this line to extract pedidos

  return {
    ...userData,
    token,
    role,
    pedidos, // Include pedidos in the returned data
  };
});

export const logoutUser = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("token");
  return null;
});

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

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder
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

        state.articulos = action.payload.flatMap((category) =>
          category.attributes.sub_categorias.data.flatMap((subCategory) =>
            subCategory.attributes.articulos.data.map((articulo) => ({
              id: articulo.id,
              ...articulo.attributes,
            }))
          )
        );
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPedidosUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPedidosUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pedidos = action.payload;
      })
      .addCase(fetchPedidosUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch pedidos";
      })

      .addCase(fetchValor.pending, (state, action) => {
        state.valores = "loading";
      })
      .addCase(fetchValor.fulfilled, (state, action) => {
        state.valores = action.payload;
      })

      .addCase(fetchValor.rejected, (state, action) => {
        state.valores = "failed";
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
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
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
        state.token = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  updateCartQuantity,
  logout,
  
  
} = counterSlice.actions;

export default counterSlice.reducer;
