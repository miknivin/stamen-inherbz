'use client'
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Layout from "@/components/layout/Layout";
import styles from './StepperForm.module.css';
import ContactForm from './ContactForm';
import Shipping from './Shipping';
import CheckOut from './CheckOut';
import OTPAuthentication from '@/components/elements/OtpAuthentication';
import { showAlert } from '@/utils/alertUtils';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisabledStepOne, setIsDisabledStepOne] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [shippingInfo, setShippingInfo] = useState(null);
  const [quantity, setQuantity] = useState(1);

const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
};

  const handleStepChange = (step) => {
    if (step === 2) {
      const shippingData = localStorage.getItem('shippingInfo');
      if (shippingData) {
        const parsedShippingData = JSON.parse(shippingData);
        if (
          !parsedShippingData?.name ||
          !parsedShippingData?.email ||
          !parsedShippingData?.phone
        ) {
          showAlert('Error', 'Need to submit Contact Details.', 'error');
          setCurrentStep(1);
        } else {
          setShippingInfo(parsedShippingData);
          setCurrentStep(step);
        }
      } else {
        showAlert('Error', 'Need to submit Contact Details.', 'error');
        setCurrentStep(1);
        console.error('Shipping info is not available in localStorage.');
      }
    } else if (step === 3) {
      const shippingData = localStorage.getItem('shippingInfo');
      if (shippingData) {
        const parsedShippingData = JSON.parse(shippingData);
        if (
          !parsedShippingData?.address ||
          !parsedShippingData?.postalCode ||
          !parsedShippingData?.selectedCity ||
          !parsedShippingData?.selectedState
        ) {
          showAlert('Error', 'Need to submit address', 'error');
          setCurrentStep(2);
        } else {
          setShippingInfo(parsedShippingData);
          setCurrentStep(step);
        }
      } else {
        showAlert('Error', 'Need to submit address', 'error');
        setCurrentStep(2);
        console.error('Shipping info is not available in localStorage.');
      }
    } else {
      setCurrentStep(step);
    }
  };

  const handleNext = () => {
    if (currentStep === 3) {
      const shippingData = localStorage.getItem('shippingInfo');
      if (shippingData) {
        const parsedShippingData = JSON.parse(shippingData);
        setShippingInfo(parsedShippingData);
        setUserName(parsedShippingData?.name || "");
        setIsModalOpen(true);
      } else {
        console.error('error');
      }
    } else {
      handleStepChange(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    handleStepChange(currentStep - 1);
  };

  const handleContactFormData = (data) => {  
    setPhoneNumber('+91' + data);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log('ph');
  }, [phoneNumber]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className='text-white'>Contact Information</h2>
            <ContactForm handleNext={handleNext} handleContactFormData={handleContactFormData} />
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className='text-white'>Shipping Information</h2>
            <Shipping handleNextShipping={handleNext} />
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className='text-white'>Check Out Session</h2>
            <div>
            <CheckOut quantity={quantity} onQuantityChange={handleQuantityChange} />
              <div className='w-100 d-flex justify-content-start' style={{ marginBottom: '15px' }}>
                <button onClick={handleNext} className='theme-btn btn-one'>
                  <span>Pay On Delivery</span>
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Layout headerStyle={1} footerStyle={1} path={'checkout'}>
        <div className={styles.stepperWrapper}>
          <div className={styles.steps}>
            <button
              className={`${styles.step} ${currentStep === 1 ? styles.active : ''}`}
              onClick={() => handleStepChange(1)}
            >
              Step 1: <br /> Contact Info
            </button>
            <button
              className={`${styles.step} ${currentStep === 2 ? styles.active : ''}`}
              onClick={() => handleStepChange(2)}
            >
              Step 2: <br /> Shipping Info
            </button>
            <div
              style={{ color: 'black' }}
              className={`${styles.step} ${currentStep === 3 ? styles.active : ''}`}
              onClick={() => handleStepChange(3)}
            >
              Step 3: <br /> Checkout
            </div>
          </div>
          <div className={styles.formContainer}>
            {renderStepContent()}
          </div>
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          ariaHideApp={false}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              zIndex: 9999999,
            },
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              padding: '20px',
              borderRadius: '10px',
              maxWidth: '500px',
              overflow: 'hidden',
              width: '100%',
            }
          }}
        >
          <OTPAuthentication 
            name={userName} 
            phone={phoneNumber} 
            shippingInfo={shippingInfo} 
            Quantity={quantity} closeModal={closeModal} />
        </Modal>
      </Layout>
    </>
  );
}
