import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
});

export const fetchCategories = createAsyncThunk('products/fetchCategories',async (category) => {
      try {
        const response = await fetch(`https://ecommerce-backend-0ifi.onrender.com/api/v1/product/${category}`); 
        if (!response.ok) {
          throw new Error( `Failed to fetch ${category} products`);
        }
        const products = await response.json();
        return products.data;
      } catch (error) {
         console.log(error);
      }
    }
);

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
        error: null
    },
    reducers: {
        setcategoryProducts(state, action) {
            state.data = action.payload;
            state.status = STATUSES.IDLE;
            state.error = null;
        },
        setcategoryStatus(state, action) {
            state.status = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchCategories.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchCategories.fulfilled, (state, action) => {
            state.status = 'idle';
            state.data = action.payload;
          })
          .addCase(fetchCategories.rejected, (state, action) => {
            state.status = 'error';
            state.error = action.error.message;
          })
      }    
});

export const { setcategoryProducts, setcategoryStatus } = categorySlice.actions;
export default categorySlice.reducer;
