import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
});

export const userSignup = createAsyncThunk('user/signup', async (userData) => {
    try {
        const response = await fetch('https://ecommerce-backend-0ifi.onrender.com/api/v1/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error('Failed to sign up user');
        }
        const data = await response.json();
        localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        throw new Error('Failed to sign up user');
    }
});

export const userLogin = createAsyncThunk('user/login', async (userData) => {
    try {
        const response = await fetch('https://ecommerce-backend-0ifi.onrender.com/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error('Failed to log in user');
        }
        const data = await response.json();
        localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        throw new Error('Failed to log in user');
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        status: STATUSES.IDLE,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userSignup.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(userSignup.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(userSignup.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
            .addCase(userLogin.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    }
});

export default userSlice.reducer;
