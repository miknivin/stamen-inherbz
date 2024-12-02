// components/OTPAuthentication.js
'use client'
import { useState, useEffect } from 'react';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../../firebase.config';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { registerUser } from '@/services/auth/register';
import { createOrder } from '@/services/orders/order';
import transformUserDataToOrderSchema from '@/utils/transFormOrderData';

const OTPAuthentication = ({ phone, name, shippingInfo}) => {
  const [phoneNumber, setPhoneNumber] = useState(phone || '');
  const [Name,setName]=useState(name||'nivin');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState('');

  useEffect(() => {
    console.log(shippingInfo);
    
    if (phone) {
      handleSendOtp(phone);
    }
  }, [phone]);

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log('reCAPTCHA verified');
      },
      'expired-callback': () => {
        console.log('reCAPTCHA expired');
      }
    });
  };

  const handleSendOtp = async (phoneNumberToSend) => {
    setupRecaptcha();
    const appVerifier = window?.recaptchaVerifier;
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumberToSend, appVerifier);
      setVerificationId(confirmationResult.verificationId);
      console.log('OTP sent');
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleVerifyOtp = async () => {
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    try {
      const result = await signInWithCredential(auth, credential);
      console.log('User signed in:', result.user.accessToken);
  
      const accessToken = result.user.accessToken;
      const password = otp+'@stamen'; 
      const name = Name;
      const phone = phoneNumber
      const userData = {
        name,
        phone,
        password,
        accessToken,
      };
      if (result.user.accessToken) {
        const data = await registerUser(userData);
        console.log('User registered successfully:', data);
        if (data.user.id) {
          const orderData =  transformUserDataToOrderSchema(shippingInfo,data.user.id)
          console.log('orderdata',orderData);
          createOrder(orderData)
        }
      }   
      
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleCreateOrder = async () => {
    try {
      const createdOrder = await createOrder(orderData);
      console.log('Order created successfully:', createdOrder);

    } catch (error) {
      console.error('Failed to create order:', error);
      // Handle the error (e.g., show an error message)
    }
  };

  return (
    <div className="container mt-2 ">
      <div id="recaptcha-container"></div>
      <h1 className="text-center mb-2">OTP Authentication</h1>
      <div className="row justify-content-center">
        <div className="col-md-12">
          {!phone && (
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
          )}
          {!phone && (
            <div className="d-grid mb-4">
              <button className="btn btn-primary" onClick={() => handleSendOtp(phoneNumber)}>Send OTP</button>
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="otp" className="form-label">OTP</label>
            <input
              type="text"
              className="form-control"
              id="otp"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
          </div>
          <div className="d-grid">
            <button className="btn btn-success" onClick={handleVerifyOtp}>Verify OTP</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPAuthentication;
