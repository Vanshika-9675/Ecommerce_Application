import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading'
});

const token = localStorage.getItem('token');


export const fetchwishProducts = createAsyncThunk('wish/fetch', async () => {
  try {
      const response = await fetch('https://ecommerce-backend-0ifi.onrender.com/api/v1/wish', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
           throw new Error('Failed to fetch wishlist products');
      }
      const data = await response.json();
      console.log("data", data);
     
      return data;
  } catch (error) {
      throw new Error('Failed to fetch wishlist products');
  }
});


export const addwishProducts = createAsyncThunk('wish/add',async (proData)=>{
  try {
    const response = await fetch('https://ecommerce-backend-0ifi.onrender.com/api/v1/wish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(proData),
    });
    console.log(response);
    if (!response.ok) {
        throw new Error('Failed to add product to wishes');
    }
    const data = await response.json();

    return data;
   } 
   catch (error) {
    throw new Error('Failed');
  }
})

export const deleteWishProduct = createAsyncThunk('wish/delete', async (wishId) => {
  try {
    const response = await fetch(`https://ecommerce-backend-0ifi.onrender.com/api/v1/wish/${wishId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to delete wish');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to delete wish');
  }
});

const wishSlice = createSlice({
      name: 'wish',
      initialState: {
          data: [],
          status: STATUSES.IDLE,
          error: null
      },
      reducers: {
        setwishProducts(state, action) {
              state.data = action.payload;
              state.status = STATUSES.IDLE;
              state.error = null;
          },
          setwishStatus(state, action) {
              state.status = action.payload;
          }
      },
      extraReducers: (builder) => {
          builder
              .addCase(fetchwishProducts.pending, (state) => {
                  state.status = STATUSES.LOADING;
              })
              .addCase(fetchwishProducts.fulfilled, (state, action) => {
                  state.data = action.payload;
                  state.status = STATUSES.IDLE;
              })
              .addCase(fetchwishProducts.rejected, (state, action) => {
                  state.status = STATUSES.ERROR;
              })
              .addCase(deleteWishProduct.pending, (state) => {
                state.status = STATUSES.LOADING;
              })
              .addCase(deleteWishProduct.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
              })
              .addCase(deleteWishProduct.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.error = action.error.message;
              });
      }
    });

export const { setwishProducts, setwishStatus} = wishSlice.actions;
export default wishSlice.reducer;

