import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';



const token = localStorage.getItem('token');

export const fetchCartProducts = createAsyncThunk('cart/fetchCartProducts', async () => {
  try {
   
    const response = await fetch(`https://ecommerce-backend-0ifi.onrender.com/api/v1/cart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch cart products');
    }
    const data = await response.json();
    return data.cartProducts;

  } catch (error) {
     console.log(error);
  }
});


export const addProductToCart = createAsyncThunk('cart/addProductToCart', async (productData) => {
  try {
    const response = await fetch(`https://ecommerce-backend-0ifi.onrender.com/api/v1/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    });

    if (!response.ok) {
      throw new Error('Failed to add product to cart');
    }

    const data = await response.json();
    console.log(data);
    return data; 

  } catch (error) {
    console.log(error);
  }
});

export const removeProductFromCart = createAsyncThunk('cart/removeProductFromCart', async (productId) => {
    try {
    const response = await fetch(`https://ecommerce-backend-0ifi.onrender.com/api/v1/cart/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to remove product from cart');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const increaseQuantity = createAsyncThunk(
  'cart/increaseQuantity',
  async (productId) => {
    try {
      const response = await fetch(
        `https://ecommerce-backend-0ifi.onrender.com/api/v1/cart/increase/${productId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to increase quantity');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const decreaseQuantity = createAsyncThunk(
  'cart/decreaseQuantity',
  async (productId) => {
    try {
      const response = await fetch(
        `https://ecommerce-backend-0ifi.onrender.com/api/v1/cart/decrease/${productId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to decrease quantity');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const removeAllProducts = createAsyncThunk('cart/removeAllProducts',async (productId) => {
    try {
      const response = await fetch(
        `https://ecommerce-backend-0ifi.onrender.com/api/v1/cart`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to remove all products from cart');
      }

      const data =  await response.json();

      return data;

    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: [],
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
      .addCase(fetchCartProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartProducts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload
      })
      .addCase(fetchCartProducts.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(addProductToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(removeProductFromCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(removeProductFromCart.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(removeAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeAllProducts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = []; 
      })
      .addCase(removeAllProducts.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  }
});


export const { setwishProducts, setwishStatus} = cartSlice.actions;
export default cartSlice.reducer;
