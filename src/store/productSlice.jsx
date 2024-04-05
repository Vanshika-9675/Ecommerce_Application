import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
});

const token = localStorage.getItem('token');

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    try {
        const response = await fetch('https://ecommerce-backend-0ifi.onrender.com/api/v1/product');
        if (!response.ok) {
             throw new Error('Failed to fetch products');
        }
        const data = await response.json();
       
        return data;
    } catch (error) {
        throw new Error('Failed to fetch products');
    }
});

export const addProducts = createAsyncThunk('products/add', async (productData) => {
    try {
        const response = await fetch('https://ecommerce-backend-0ifi.onrender.com/api/v1/seller/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(productData)
        });

        if (!response.ok) {
            throw new Error('Failed to add product');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return console.log('Failed to add product');
    }
});


export const fetchSellerProducts = createAsyncThunk('fetch/SellerProducts', async ()=>{
    try {
        const res = await fetch('https://ecommerce-backend-0ifi.onrender.com/api/v1/seller/product',{
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        if (!res.ok) {
            throw new Error('Failed to fetch products');
       }
       
       const data = await res.json();
       return data.products;
    } 
    catch (error) {
        console.log(error);
       console.log("Failed to fetch the seller's products!"); 
    }
})
export const fetchSellerOrders = createAsyncThunk('fetch/SellerOrders', async ()=>{
    try {
        const res = await fetch('https://ecommerce-backend-0ifi.onrender.com/api/v1/seller/orders',{
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        if (!res.ok) {
            throw new Error('Failed to fetch products');
       }
       
       const data = await res.json();
       return data.products;
    } 
    catch (error) {
        console.log(error);
       console.log("Failed to fetch the seller's products!"); 
    }
})

export const deleteProduct = createAsyncThunk('products/deleteProduct',async (productId) => {
      try {
        const response = await fetch(`https://ecommerce-backend-0ifi.onrender.com/api/v1/seller/product/${productId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }); 
        if (!response.ok) {
          throw new Error('Failed to delete product');
        }
        const data = await response.json();
  
        return data;

      } 
      catch (error) {
        console.log(error);
      }
    }
  );

export const updateProduct = createAsyncThunk('update/product', async(productData)=>{
    try {
     
        const response = await fetch(`https://ecommerce-backend-0ifi.onrender.com/api/v1/seller/product`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(productData)
        });

        if (!response.ok) {
            throw new Error('Failed to update product');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        return console.log('Failed to add product');
    }
})
  

const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
        error: null
    },
    reducers: {
        setProducts(state, action) {
            state.data = action.payload;
            state.status = STATUSES.IDLE;
            state.error = null;
        },
        setStatus(state, action) {
            state.status = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            }) .addCase(addProducts.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(addProducts.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
            })
            .addCase(addProducts.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.error = action.payload;
            })
           .addCase(fetchSellerProducts.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchSellerProducts.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.data = action.payload
            })
            .addCase(fetchSellerProducts.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.error = action.payload;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.status = STATUSES.LOADING;
                state.error = null;
              })
             .addCase(deleteProduct.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
              })
             .addCase(deleteProduct.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
              })
             .addCase(fetchSellerOrders.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchSellerOrders.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.data = action.payload
            })
            .addCase(fetchSellerOrders.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.error = action.payload;
            });
    }
});

export const { setProducts, setStatus} = productSlice.actions;
export default productSlice.reducer;
