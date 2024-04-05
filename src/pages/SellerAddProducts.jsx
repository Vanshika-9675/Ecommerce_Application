import React, { useState } from 'react'
import SellerNavbar from '../components/SellerNavbar'
import { useNavigate } from 'react-router-dom';
import { useDispatch ,useSelector } from 'react-redux'; 
import {addProducts} from '../store/productSlice'
import { IoIosArrowDropdown } from "react-icons/io";

const SellerAddProducts = () => { 
  const {status} = useSelector((state) => state.product);
  const dispatch = useDispatch(); 

   const [title,setTitle] = useState('');
   const [price,setPrice] = useState('');
   const [image,setImage] = useState('');
   const [category,setCategory] = useState('Electronics');

    const handleAdd = (e)=>{
         e.preventDefault();
         try {
            dispatch(addProducts({title,price,image,category})).then(()=>{
                alert("Product added successfullyy!!")
                setTitle('');
                setPrice('');
                setImage('');
            });
         } catch (error) {
            console.log(error);
         }
    }

  return (
    <div className="area">
        <SellerNavbar/>
        <h2>Add products to Sell</h2>
        <div className="container">
            <div className='wrapper'>
            <form action=""  onSubmit={handleAdd}>
            <div className="input-box">
                <input type="text" placeholder='Enter product title' value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="input-box">
                <input type="text" placeholder='Enter product price' value={price} onChange={(e) => setPrice(e.target.value)} required  />
            </div>
            <div className="input-box">
                <input type="url" placeholder='Paste product image link' value={image} onChange={(e) => setImage(e.target.value)}  required  />
            </div>
            <div className='input-box'>
              <select id="productSelect" value={category} onChange={(e)=>{setCategory(e.target.value)}}>
               <option value="Electronics">Electronics</option>
               <option value="Clothes">Clothes</option>
               <option value="Foot-wear">Foot-Wear</option>
               <option value="Beauty-Product">Beauty-Product</option>
              </select>
              <IoIosArrowDropdown className='icon dropdown'/>
            </div>
            <button type='submit' onClick={handleAdd}>ADD PRODUCT</button>  
            </form> 
            </div>
        </div>
    </div>
  )          
}

export default SellerAddProducts