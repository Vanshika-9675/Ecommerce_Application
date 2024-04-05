import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import {Provider} from 'react-redux';
import store from './store/Store'
import Auth from './pages/Auth';
import Order from './pages/Order'
import Whishist from './pages/Whishist';
import SellerAuth from './pages/SellerAuth';
import SellerHome from './pages/SellerHome';
import SellerAddProducts from './pages/SellerAddProducts';
import SellerOrders from './pages/SellerOrders';
import Electronics from './pages/Electronics';
import Clothes from './pages/Clothes';
import FootWear from './pages/FootWear';
import BeautyProduct from './pages/BeautyProduct';
import Category from './components/Category';

function App() {

  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Auth />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/myOrder' element={<Order />}></Route>
          <Route path='/wishlist' element={<Whishist />}></Route>
          <Route path='/seller' element={<SellerAuth/>}></Route>
          <Route path='/sellerHome' element={<SellerHome/>}></Route>
          <Route path='/addProducts' element={<SellerAddProducts/>}></Route>              
          <Route path='/sellerOrders' element={<SellerOrders/>}></Route>              
          <Route path='/electronics' element={<Electronics/>}></Route>              
          <Route path='/clothes' element={<Clothes/>}></Route>              
          <Route path='/footWear' element={<FootWear/>}></Route>              
          <Route path='/beauty' element={<BeautyProduct/>}></Route>             
          <Route path='/categories' element={<Category/>}></Route>             
        </Routes>
      </BrowserRouter>   
    </Provider>
    </>
  )
}

export default App