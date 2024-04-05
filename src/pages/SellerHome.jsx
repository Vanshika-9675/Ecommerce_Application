import React from 'react'
import SellerNavbar from '../components/SellerNavbar'
import SellerProducts from '../components/SellerProducts'

const SellerHome = () => {
  return (
    <div className='area'>
    <SellerNavbar/>
     <section>
      <h3>Products to Sell</h3>
        <SellerProducts/>
     </section>
    </div>
  )
}

export default SellerHome