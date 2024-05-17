import React, { useContext } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {

  const [searhParams, setSearchParams] = useSearchParams();
  const success = searhParams.get("success");
  const orderId = searhParams.get("orderId");
  const {url} = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(url+"/api/order/verify",{success,orderId});
     if(response.data.success){
       navigate("/myorders");
     }else{
      navigate("/");
     }
  }
  return (
    <div className='verify'>
        <div className='spinner'></div>
    </div>
  )
}

export default Verify;