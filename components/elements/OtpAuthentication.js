'use client'
import { useState, useEffect } from 'react';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../../firebase.config';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { registerUser } from '@/services/auth/register';
import { createOrder } from '@/services/orders/order';
import transformUserDataToOrderSchema from '@/utils/transFormOrderData';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const OTPAuthentication = ({ phone, name, shippingInfo, Quantity, closeModal }) => {
  const [phoneNumber, setPhoneNumber] = useState(phone || '');
  const [Name, setName] = useState(name || '');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [timer, setTimer] = useState(0);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
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

  const handleSendOtp = async (phoneNumberToSend) => {
    setIsLoading(true);
    setupRecaptcha();
    const appVerifier = window?.recaptchaVerifier;
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumberToSend, appVerifier);
      setVerificationId(confirmationResult.verificationId);
      console.log('OTP sent');
      setResendDisabled(true);
      setTimer(60); 
    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    try {
      const result = await signInWithCredential(auth, credential);
      const accessToken = result.user.accessToken;
      const password = otp + '@stamen';
      const name = Name;
      const phone = phoneNumber;
      const userData = {
        name,
        phone,
        password,
        accessToken,
      };
      if (result.user.accessToken) {
        const data = await registerUser(userData);
        console.log('User registered successfully');
        if (data.user.id) {
          const orderData = transformUserDataToOrderSchema(shippingInfo, data.user.id, Quantity);
          //console.log('orderdata', orderData);
          const orderRes = await createOrder(orderData);
          if (orderRes._id) {
            Swal.fire({
              title: 'Order Success',
              text: 'Your order was successful!',
              icon: 'success',
              showCancelButton: true,
              confirmButtonText: 'Order Details',
              cancelButtonText: 'View Orders',
            }).then((result) => {
              if (result.isConfirmed) {
                router.push('/order-details');
              } else {
                router.push('/view-orders');
              }
            });
            closeModal();
          }
        }
      }

    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-2 ">
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
              </div>
              <div className="d-grid mb-4">
                <button className="btn btn-primary" onClick={() => handleSendOtp(phoneNumber)} disabled={isLoading}>
                  {isLoading ? (
                    <div className="spinner-border text-light" role="status">
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
                    <div className="spinner-border text-light" role="status">
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

export default OTPAuthentication;
