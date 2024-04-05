import React from 'react'
import SellerNavbar from '../components/SellerNavbar'
import { useDispatch, useSelector } from 'react-redux';
import {fetchSellerOrders} from '../store/productSlice';
import { useEffect } from 'react';

const SellerOrders = () => {
  const { data: orders, status } = useSelector((state) => state.product);
  const dispatch = useDispatch();

      useEffect(() => {
        dispatch(fetchSellerOrders());
     }, [dispatch]);

    if (status == 'loading') {
      return <h2>LOADING.....</h2>;
    }

    if (status == 'error') {
      return <h2>Something went wrong...</h2>;
    }

  return (
    <div className='area'>
      <SellerNavbar/>
       <h1 style={{textAlign:'center'}}>My Orders</h1>
      <div className="orderWrapper">
        {orders.length === 0 ? (
          <h1>Nobody have ordered yet!!</h1>
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
  )
}

export default SellerOrders