import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE;

const initialState = {
  value: 0,
  categories: [],
  articulos: [],
  cart: [],
  status: 'idle',
  error: null
}

export const fetchCategories = createAsyncThunk(
  'counter/fetchCategories',
  async () => {
    const response = await axios.get(`${API_BASE}/api/categorias?populate=img&populate=sub_categorias.articulos.valors`);
    return response.data.data;
  }
)

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { articleId, name, price, quantity, valor, valorId } = action.payload;
      const existingItemIndex = state.cart.findIndex(item => item.articleId === articleId && item.valorId === valorId);
      
      if (existingItemIndex !== -1) {
        const newQuantity =  quantity;
        if (newQuantity <= 0) {
          state.cart.splice(existingItemIndex, 1);
        } else {
          state.cart[existingItemIndex].quantity = newQuantity;
        }
      } else if (quantity > 0) {
        state.cart.push({ articleId, name, price, quantity, valor, valorId });
      }
    },
    updateCartItemQuantity: (state, action) => {
      const { articleId, valorId, quantity } = action.payload;
      const itemIndex = state.cart.findIndex(item => item.articleId === articleId && item.valorId === valorId);
      
      if (itemIndex !== -1) {
        if (quantity <= 0) {
          state.cart.splice(itemIndex, 1);
        } else {
          state.cart[itemIndex].quantity = quantity;
        }
      }
    },
    removeFromCart: (state, action) => {
      const { articleId, valorId } = action.payload;
      state.cart = state.cart.filter(item => !(item.articleId === articleId && item.valorId === valorId));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload.map(category => ({
          id: category.id,
          ...category.attributes,
          sub_categorias: category.attributes.sub_categorias.data.map(subCategory => ({
            id: subCategory.id,
            ...subCategory.attributes,
            articulos: subCategory.attributes.articulos.data.map(articulo => ({
              id: articulo.id,
              ...articulo.attributes
            }))
          }))
        }));

        // Extraer todos los artículos y guardarlos en el estado articulos
        state.articulos = action.payload.flatMap(category =>
          category.attributes.sub_categorias.data.flatMap(subCategory =>
            subCategory.attributes.articulos.data.map(articulo => ({
              id: articulo.id,
              ...articulo.attributes
            }))
          )
        );
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { addToCart, updateCartItemQuantity, removeFromCart } = counterSlice.actions;

export default counterSlice.reducer;