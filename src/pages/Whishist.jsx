import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchwishProducts, deleteWishProduct} from '../store/whishSlice';
import { addProductToCart } from '../store/cartSlice';
import Navbar from '../components/Navbar';

export default function Whishist() {

  const dispatch = useDispatch();
  const [wishproducts, setWish] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("heyy");
    setLoading(true);
    dispatch(fetchwishProducts())
      .then((data) => {
        setLoading(false);
        setWish(data.payload.wishlist);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [dispatch]);

//  const handleAdd =(id)=>{
//     dispatch(addProductToCart(id));
//     dispatch(deleteWishProduct(id)).then(()=>{
//       setLoading(true);
//       dispatch(fetchwishProducts())
//       .then((response) => {
//         setLoading(false);
//         setWish(response.payload.wishlist);
//       })
//       .catch((err) => {
//         setLoading(false);
//         console.log(err);
//       });
//     }) 
//     .catch((error) => {
//       setLoading(false);
//       console.error('Error in adding to cart!!:', error);
//     });
//  }

 const handleRemoveWish = (id)=>{
   dispatch(deleteWishProduct(id))
    .then(() => {
      setLoading(true);
      dispatch(fetchwishProducts())
      .then((response) => {
        setLoading(false);
        setWish(response.payload.wishlist);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    })
    .catch((error) => {
      setLoading(false);
      console.error('Error removing wish:', error);
    });
   
 }

  return (
    <div className='area'>
      <Navbar />
      <h3>Cart</h3>
      <div className="shopping">
        <div className="cartWrapper">
          {loading ? (
            <h1>Loading...</h1>
          ) : wishproducts.length === 0 ? (
            <h1>Nothing in the Wishlist :(</h1>
          ) : (
            wishproducts.map(p => (
              <div className="cartCard" key={p._id}>
                <img src={p.image} alt="" />
                <h5>{p.name}</h5>
                <h5>Rs. {p.price}</h5>
                <button className='btn' onClick={() => handleRemoveWish(p._id)}>Remove from Wishlist</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
