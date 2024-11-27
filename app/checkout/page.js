'use client';
import { useState , useEffect} from 'react';
import Modal from 'react-modal';
import Layout from "@/components/layout/Layout";
import styles from './StepperForm.module.css';
import ContactForm from './ContactForm';
import Shipping from './Shipping';
import CheckOut from './CheckOut';
import OTPAuthentication from '@/components/elements/OtpAuthentication';




export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNext = () => {
    if (currentStep === 3) {
      setIsModalOpen(true);
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//         Modal.setAppElement('#__next');
//     }
// }, []);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className='text-white'>Contact Information</h2>
            <ContactForm />
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className='text-white'>Shipping Information</h2>
            <Shipping />
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className='text-white'>Check Out Session</h2>
            <div>
                <CheckOut />
                <div className='w-100 d-flex justify-content-start' style={{ marginBottom: '15px' }}>
                    <button className='theme-btn btn-one'>
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
      <Layout headerStyle={1} footerStyle={1}>
        <div className={styles.stepperWrapper}>
          <div className={styles.steps}>
            <button
              className={`${styles.step} ${currentStep === 1 ? styles.active : ''}`}
              onClick={() => setCurrentStep(1)}
            >
              Step 1: <br/> Contact Info
            </button>
            <button
              className={`${styles.step} ${currentStep === 2 ? styles.active : ''}`}
              onClick={() => setCurrentStep(2)}
            >
              Step 2: <br/> Shipping Info
            </button>
            <div
              className={`${styles.step} ${currentStep === 3 ? styles.active : ''}`}
              onClick={() => setCurrentStep(3)}
            >
              Step 3: <br/> Checkout
            </div>
          </div>
          <div className={styles.formContainer}>
            {renderStepContent()}
            {/* <div className='d-flex justify-content-end gap-3'>
              {currentStep > 1 && (
                <button className='btn bg-primary' onClick={handlePrevious}>Previous</button>
              )}
              {(currentStep < 3) && (
                <button className='btn' onClick={handleNext}>Next</button>
              )}
              {(currentStep === 3) && (
                <button className='btn' onClick={() => setIsModalOpen(true)}>Next</button>
              )}
            </div> */}
          </div>
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          ariaHideApp={false}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.75)'
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
              width: '100%',
            }
          }}
        >
          <OTPAuthentication />
        </Modal>
      </Layout>
    </>
  );
}
