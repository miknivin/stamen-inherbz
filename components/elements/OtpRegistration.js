'use client'
import { useState, useEffect } from 'react';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../../firebase.config';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { registerUser } from '@/services/auth/register';

import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const OTPRegister = ({ phone, name, shippingInfo, Quantity, closeModal }) => {
  const [phoneNumber, setPhoneNumber] = useState(phone || '');
  const [Name, setName] = useState(name || '');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [timer, setTimer] = useState(0);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [phoneError, setPhoneError] = useState('');
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          console.log('reCAPTCHA verified');
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
        }
      });
    }
  };

  const validateAndFormatPhoneNumber = (phone) => {
    phone = phone.trim();
  
    if (!phone.startsWith('+91')) {
      phone = '+91' + phone;
    }
    
    const phoneNumberWithoutPrefix = phone.replace('+91', '');
  
    const isValid = /^\d{10}$/.test(phoneNumberWithoutPrefix);
  
    if (isValid) {
      return phone;
    } else {
      setPhoneError('Invalid phone number. It should contain exactly 10 digits');
      throw new Error('Invalid phone number. It should contain exactly 10 digits');
    }
  };
  
  const handleSendOtp = async (phoneNumberToSend) => {
    try {
      const formattedPhoneNumber = validateAndFormatPhoneNumber(phoneNumberToSend);
      setIsLoading(true);
      setupRecaptcha();
      const appVerifier = window?.recaptchaVerifier;
      try {
        const confirmationResult = await signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier);
        setVerificationId(confirmationResult.verificationId);
        console.log('OTP sent');
        setPhoneNumber(formattedPhoneNumber)
        setResendDisabled(true);
        setTimer(60); 
      } catch (error) {
        console.error('Error sending OTP:', error);
      } finally {
        setIsLoading(false);
      }
    } catch (validationError) {
        console.error(validationError)
    }
  };


  const handleVerifyOtp = async () => {
    setIsLoading(true);
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    try {
      const result = await signInWithCredential(auth, credential);
      //console.log(result);
      
      const accessToken = result.user.accessToken;
      const password = otp + '@stamen';
      const name = 'phone-logged-user';
      const email = `phoneloggeduser${otp+result?.user?.uid}@gmail.com`
      const phone = phoneNumber;
      const userData = {
        name,
        phone,
        email,
        password,
        accessToken,
      };
      if (result.user.accessToken) {
        const user = await registerUser(userData);
        if (user) {
          closeModal()
          Swal.fire({
            title: 'Success!',
            text: 'OTP verification successful.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        }
        console.log('User registered successfully');
      }
    } catch (error) {
      closeModal()
      console.error('Error:', error.message);
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mt-2 ">
      <div className='d-flex justify-content-end'>
        <button onClick={()=>closeModal()}>
          <FontAwesomeIcon color='#000' icon={faX} />
        </button>
      </div>
      <div id="recaptcha-container"></div>
      <div className="row justify-content-center">
        <div className="col-md-12">
          {!verificationId && (
            <>
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
                 {phoneError && <div className="text-danger">{phoneError}</div>}
              </div>
              <div className="d-grid mb-4">
                <button className="btn btn-primary" onClick={() => handleSendOtp(phoneNumber)} disabled={isLoading}>
                  {isLoading ? (
                    <div style={{width:'2rem',height:'2rem'}} className="spinner-border text-light" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    'Send OTP'
                  )}
                </button>
              </div>
            </>
          )}
          {verificationId && (
            <>
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
              <div className="d-grid mb-3">
                <button className="btn btn-success" onClick={handleVerifyOtp} disabled={isLoading}>
                  {isLoading ? (
                    <div style={{width:'2rem',height:'2rem'}} className="spinner-border text-light" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    'Verify OTP'
                  )}
                </button>
              </div>
              <div className="d-grid">
                <button className="btn btn-tertiary" onClick={() => handleSendOtp(phoneNumber)} disabled={resendDisabled || isLoading}>
                  {resendDisabled ? `Resend OTP (${timer})` : 'Resend OTP'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPRegister;
