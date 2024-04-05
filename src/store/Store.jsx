import {configureStore} from "@reduxjs/toolkit";
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import userReducer from './userSlice'
import wishReducer from './whishSlice'
import orderReducer from './orderSlice'
import sellerReducer from './sellerSlice'
import categoryReducer from './categorySlice'

const store = configureStore({
    reducer:{
        cart:cartReducer,
        product:productReducer,
        user:userReducer,
        wish:wishReducer,
        order:orderReducer,
        seller:sellerReducer,
        category:categoryReducer
    }
})

export default store;