import React from 'react'
import { NavLink, useNavigate} from 'react-router-dom';

const SellerNavbar = () => {
    const navigation = useNavigate();

    const logout = ()=>{
        localStorage.removeItem('token')
        navigation('/seller')
     }

  return (
    <div className='navbar'>
    <span className='logo'>ONLINE STORE</span>
    <div>
      <NavLink exact="true" to='/sellerhome' className='navLink' activeclassname='active'>Home</NavLink>
      <NavLink to='/sellerOrders' className='navLink' activeclassname='active'>My Orders</NavLink>
      <NavLink to='/addProducts' className='navLink' activeclassname='active'>Add Products</NavLink>
      <button onClick={logout} className='logout'>LOGOUT</button>
    </div>
  </div>
  )
}

export default SellerNavbar