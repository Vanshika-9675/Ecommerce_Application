import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
});

export const sellerSignup = createAsyncThunk('user/signup', async (sellerData) => {
    try {
        const response = await fetch('https://ecommerce-backend-0ifi.onrender.com/api/v1/seller/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sellerData),
        });
        if (!response.ok) {
            throw new Error('Failed to sign up seller');
        }
        const data = await response.json();
        localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        throw new Error('Failed to sign up seller');
    }
});

export const sellerLogin = createAsyncThunk('user/login', async (sellerData) => {
    try {
        const response = await fetch('https://ecommerce-backend-0ifi.onrender.com/api/v1/seller/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sellerData),
        });
        if (!response.ok) {
            throw new Error('Failed to log in seller');
        }
        const data = await response.json();
        localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        throw new Error('Failed to log in seller');
    }
});

const sellerSlice = createSlice({
    name: 'seller',
    initialState: {
        data: null,
        status: STATUSES.IDLE,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sellerSignup.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(sellerSignup.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(sellerSignup.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
            .addCase(sellerLogin.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(sellerLogin.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(sellerLogin.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    }
});

export default sellerSlice.reducer;
