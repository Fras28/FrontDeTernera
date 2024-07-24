import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';



const initialState = {
  value: 0,
}


export const uploadProducts = createAsyncThunk(
  'products/uploadProducts',
  async ({ jsonProd }, { getState }) => {
    const { allData } = getState();
    
    // Si ya se han cargado los productos, no hacer nada
    if (allData.loaded) {
      return;
    }

    try {
      const response = await fetch("https://morton-admin.online/api/articulos/batch", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer [tu-token]"
        },
        body: JSON.stringify({
          data: [
            { /* datos del primer artículo */ },
            { /* datos del segundo artículo */ }
            // Más artículos si es necesario
          ]
        }),
        mode: "cors",
        credentials: "include"
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
    } catch (error) {
      console.error('Error al cargar los productos:', error);
      throw error;
    }
  }
);



export const productsSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(uploadProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.items = action.payload || [];
      })
      .addCase(uploadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// Exportar el reducer del slice
export default productsSlice.reducer;
