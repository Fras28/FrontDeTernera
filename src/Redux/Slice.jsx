import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE;

const initialState = {
  value: 0,
  categories: [],
  articulos: [],
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
  reducers: {},
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

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
