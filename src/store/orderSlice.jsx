import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const token = localStorage.getItem('token');

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
    try {
      const res = await fetch('https://ecommerce-backend-0ifi.onrender.com/api/v1/order', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      
      if (!res.ok) {                               
        throw new Error('Failed to fetch orders');
      } 

      const data = await res.json();
     // console.log(data.orders);
      return data.orders;
    }
    catch (error) {
      console.error("Error fetching user orders:", error);
      throw error;
    }
  }
);

export const addOrder = createAsyncThunk('orders/addOrder',async (data) => {
      try {
        const res = await fetch('https://ecommerce-backend-0ifi.onrender.com/api/v1/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(data)
        });
        if (res.ok) {
          return true; 
        } else {
          throw new Error('Failed to add product to order list');
        }
      } 
      catch (error) 
      {
        console.error('Error adding product to order list:', error);
      }
    }
  );


const orderSlice = createSlice({
    name: 'order',
    initialState: {
      data: [],
      error: null
  },
    reducers: {
      setorders(state, action) {
        state.data = action.payload;
        state.status = 'idle';
        state.error = null;
       },
      setorderStatus(state, action) {
          state.status = action.payload;
      }
    },
    extraReducers: (builder) => {
        builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
       
    }
  });

export const { setorders, setorderStatus} = orderSlice.actions;
export default orderSlice.reducer;