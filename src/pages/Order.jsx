import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import {fetchOrders} from '../store/orderSlice';
import { useDispatch,useSelector } from 'react-redux';

function Order() {

  const { data:orders, status } = useSelector((state) => state.order);
  const dispatch = useDispatch();


  useEffect(() => {
      dispatch(fetchOrders());
  }, [dispatch]);
  
  if (status == 'loading') {
    return <h2>LOADING.....</h2>;
  }
  
  if (status == 'error') {
    return <h2>Something went wrong...</h2>;
  }

  return (
    <div className='area'>
      <Navbar/>
       <h1 style={{textAlign:'center'}}>My Orders</h1>
      <div className="orderWrapper">
        {orders.length === 0 ? (
          <h1>You haven't ordered anything!!</h1>
        ) : (
          orders.map(order => (
            <div className="orderCard" key={order._id}>
              <img src={order.image}/>
              <h5>Total Amount: Rs. {order.totalprice}</h5>
              <div>
                <span>Quantity: {order.quantity}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Order;
