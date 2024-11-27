// components/OTPAuthentication.js
'use client'
import { useState } from 'react';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../../firebase.config';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

const OTPAuthentication = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState('');

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container', {
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

  const handleSendOtp = async () => {
    setupRecaptcha();
    const appVerifier = window?.recaptchaVerifier;
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
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
      console.log('User signed in:', result.user);
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div id="recaptcha-container"></div>
      <h1 className="text-center mb-4">OTP Authentication</h1>
      <div className="row justify-content-center">
        <div className="col-md-12">
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
          <div className="d-grid mb-4">
            <button className="btn btn-primary" onClick={handleSendOtp}>Send OTP</button>
          </div>
          <div className="mb-3">
            <label htmlFor="otp" className="form-label">OTP</label>
            <input
              type="text"
              className="form-control"
              id="otp"
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
