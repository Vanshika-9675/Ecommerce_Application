import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {fetchCartProducts , removeProductFromCart ,increaseQuantity , decreaseQuantity , removeAllProducts} from '../store/cartSlice';
import Navbar from '../components/Navbar'
import { useEffect } from 'react';
import { addOrder } from '../store/orderSlice';

function Cart() {

  const { data:cartProducts, status } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchCartProducts());
  }, [dispatch]);


  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      await Promise.all(cartProducts.map(p => dispatch(addOrder(p))));
      removeAll();
    } catch (error) {
      console.log(error);
    }
  };

const removeAll = ()=>{
  dispatch(removeAllProducts()).then(()=>{
    dispatch(fetchCartProducts());
  }).catch((err)=>{
     console.log(err);
  });
}


if (status == 'loading') {
  return <h2>LOADING.....</h2>;
}

if (status == 'error') {
  return <h2>Something went wrong...</h2>;
}

const handleRemove = (id) =>{
    dispatch(removeProductFromCart(id)).then(()=>{
      dispatch(fetchCartProducts());
    }).catch((err)=>{
       console.log(err);
    });
  }
  const inc = (id) => {
    dispatch(increaseQuantity(id)).then(()=>{
      dispatch(fetchCartProducts());
    }).catch((err)=>{
       console.log(err);
    });
  }
  const dec = (id) => {
    dispatch(decreaseQuantity(id)).then(()=>{
      dispatch(fetchCartProducts());
    }).catch((err)=>{
       console.log(err);
    });
  }


  return (
    <div className='area'>
      <Navbar />
      <h3>Cart</h3>
      <div className="shopping">
      <div className="cartWrapper">
      {cartProducts.length === 0 ? (
          <h1>Nothing in the cart :(</h1>
        ): (
          cartProducts.map(p => (
          <div className="cartCard" key={p._id}>
            <img src={p.image} alt="" />
            <h5>{p.name}</h5>
            <h5>Rs. {p.totalprice}</h5>
            <div>
              <button onClick={() => inc(p.productId)}>+</button>
              <span>&nbsp;&nbsp; Quantity: {p.quantity} &nbsp;&nbsp;</span>
              <button onClick={() => dec(p.productId)}>-</button>
            </div>
            <button className='btn' onClick={()=>handleRemove(p.productId)}>Remove</button>
          </div>
        ))
      )}
      </div>
     <div className="order">
         <button className='btn' onClick={(e)=>handleOrder(e)}>ORDER NOW</button>
     </div>
      </div>
    
    </div>
  )
}

export default Cart
