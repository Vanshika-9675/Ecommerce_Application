import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellerProducts, STATUSES ,deleteProduct , updateProduct} from '../store/productSlice';
import { useEffect } from 'react';

function SellerProducts() {
    const { data: products, status } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSellerProducts());
        console.log(products);
    }, [dispatch]);

    const handleDelete = (productId)=>{
        dispatch(deleteProduct(productId)).then(()=>{
            dispatch(fetchSellerProducts());
        })
    } 
    
    const handleUpdate = (productId)=>{
        const title = prompt("Enter the new title");
        const price = prompt("Enter new price");
        const image= prompt("Enter new image link");

        dispatch(updateProduct({productId,title,price,image})).then(()=>{
            dispatch(fetchSellerProducts());
        });
    }

    if (status === STATUSES.LOADING) {
        return <h2>LOADING.....</h2>;
    }

    if (status === STATUSES.ERROR) {
        return <h2>Something went wrong...</h2>;
    }

    return (
        <div className="productsWrapper">
          {products.length === 0 ? (
            <h1>You haven't added anything!!</h1>
          ) : (
            products.map((product) => (
              <div className="card" key={product._id}>
                <img src={product.image} alt="" />
                <h4>{product.title}</h4>
                <h5>{product.price}</h5>
                <div className='buttons'>
                    <button className='btn' onClick={()=>handleDelete(product._id)}>Delete</button>
                    <button className='btn' onClick={()=>handleUpdate(product._id)}>Update</button>
                </div>
              </div>
            ))
          )}
        </div>
      );      
}

export default SellerProducts