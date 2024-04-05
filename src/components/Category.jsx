import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Category() {
  const navigation = useNavigate();

   const handleElectronics = ()=>{
       navigation('/electronics');  
   }
   const handleClothes = ()=>{
       navigation('/clothes');  
    }
    const handleFootWear = ()=>{
       navigation('/footWear'); 
    }
    const handleBeauty = ()=>{
      navigation('/beauty'); 
   }

  return (
    <div className="area">
      <Navbar/>
      <div className='catregoryParent'>
        <div className="category"  onClick={handleElectronics}>
            <img src="https://media.istockphoto.com/id/171276224/photo/electronics-shopping.jpg?s=612x612&w=0&k=20&c=mcOOmz2ZaakBmL1XHUNG-ymiNCgjGlODAp5jB6HFoj0=" alt="" />
            <h2>Electronics</h2>
        </div>
        <div className="category"  onClick={handleClothes}>
            <img src="https://images.ctfassets.net/3s5io6mnxfqz/3N5iXB8yNlqVQS3xWdIIgX/fa0d654680fbd64eb5852dbbbcf4cca4/AdobeStock_303371265.jpeg" alt="" />
            <h2>Clothes</h2>
        </div>
        <div className="category" onClick={handleFootWear}>
           <img src="https://static.businessworld.in/article/article_extra_large_image/1560859917_Yqz5H0_sneaker2_470.jpg" alt="" />
           <h2>Foot-Wear</h2>
        </div>
        <div className="category" onClick={handleBeauty}>
           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCV4o4BH-g4pY2d9_l4hdaTfbGhRr8lk5RM6HvLr292g&s" alt="" />
           <h2>Beauty-Products</h2>
        </div>
      </div>
    </div>
  )
}

export default Category