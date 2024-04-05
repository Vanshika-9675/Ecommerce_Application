import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '../store/cartSlice';
import {addwishProducts} from '../store/whishSlice';
import {fetchCategories , STATUSES } from '../store/categorySlice';
import Navbar from '../components/Navbar';

const Clothes = () => {
  const { data: products, status } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchCategories("Clothes"));
  }, [dispatch]);

  const handleAdd = (product) => {
      dispatch(addProductToCart(product)).then(()=>{
          alert("Item added to cart!")
      })
  };

  const handleAddwish = async(product)=>{
      dispatch(addwishProducts(product)).then(()=>{
          alert("Item added to wishlist!")
      });
  }

  if (status === STATUSES.LOADING) {
      return <h2>LOADING.....</h2>;
  }

  if (status === STATUSES.ERROR) {
      return <h2>Something went wrong...</h2>;
  }
  return (
    <div className='area'>
    <Navbar/>
    <h2>Clothes</h2>
    <div className="productsWrapper">
         {products && products.map((product) => (
             <div className="card" key={product._id}>
                 <img src={product.image} alt="" />
                 <h4>{product.title}</h4>
                 <h5>{product.price}</h5>
                 <div className='buttons'>
                 <button onClick={() => handleAdd(product)} className="btn">
                  Add to Cart
                 </button>
                 <button className='btn' onClick={() => handleAddwish(product)}>
                  Add to Whishist
                 </button>
                 </div>
             </div>
         ))}
     </div>
 </div>
  )
}

export default Clothes