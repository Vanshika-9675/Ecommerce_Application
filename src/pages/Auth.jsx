import React, { useState } from 'react';
import './Auth.css';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useDispatch ,useSelector } from 'react-redux'; 
import { userSignup, userLogin , STATUSES} from '../store/userSlice'; 

function Auth() {
  const [action, setAction] = useState("Sign Up");
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { status } = useSelector((state) => state.user);
  const dispatch = useDispatch(); 

  const navigation = useNavigate();

  const handleAction = () => {
    setAction(prevAction => prevAction === "Sign Up" ? "Log In" : "Sign Up");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (action === 'Sign Up') {
        dispatch(userSignup({ userName, email, password }));
        navigation('/home'); 
      } else {
        dispatch(userLogin({ email, password })); 
        navigation('/home');
      }
    } catch (error) {
          navigation('/');
          console.error(`Error during ${action}: ${error}`);
          window.alert(`Error during ${action}: ${error.message}`);
      }
  };

  if (status === STATUSES.LOADING){
    return <h2>LOADING.....</h2>;
   }

  if (status === STATUSES.ERROR){
      return <h2>Something went wrong...</h2>;
  }

  const sellerPage = ()=>{
     navigation('/seller');
  }

  return (
    <div className="parent">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>{action}</h1>

          {action === "Sign Up" && (
            <div className="input-box">
              <input
                type="text"
                placeholder='User name'
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <FaUser className='icon' />
            </div>
          )}

          <div className="input-box">
            <input
              type="email"
              placeholder='Email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MdEmail className='icon' />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder='Password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className='icon' />
          </div>
          <button type="submit">{action}</button>
          <div className='register-link'>
            <p>{action === "Sign Up" ? "Already have" : "Create"} an account? <button type="button" onClick={handleAction}>{action === "Sign Up" ? "Log In" : "Sign Up"}</button>
            </p>
          </div>
        </form>
      </div>
      <div><button className='sellerBtn' onClick={sellerPage}>Login as Seller?</button></div>
    </div>
  );
}

export default Auth;
