'use client'
import Link from "next/link";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from 'react-modal';
import OTPRegister from "@/components/elements/OtpRegistration";
import { Toaster, toast } from 'react-hot-toast';

export default function Header1({ scroll, isMobileMenu, handleMobileMenu, isSidebar, handlePopup, handleSidebar, pathName }) {
    const [orders, setOrders] = useState(null);
    const [isUser, setIsUser] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    
    const isCheckoutRoute = pathName === 'checkout';

    const closeModal = () => {
        setIsModalOpen(false);
        fetchData();  // Call fetchData when the modal is closed
    };
    
    const logout = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`, {
            method: 'GET',
            credentials: 'include',
          });
    
          const data = await response.json();
    
          if (response.ok) {
            setIsUser(false);
            setOrders(null);
            toast.success('Logged out successfully!');
          } else {
            console.error('Error logging out', data);
            toast.error(`Logout failed: ${data.message}`);
          }
        } catch (error) {
          console.error('Error while logging out', error);
          toast.error('Error while logging out');
        }
      };

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/myOrders`, {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                setIsUser(true);
                setOrders(data.data);
            } else {
                console.error('Failed to fetch data:', data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <header className={`main-header ${scroll ? "fixed-header" : ""}`}>
                {/* Header Top */}
                <div className="">
                    <div className="header-top">
                        <div className="auto-container">
                            <div className="top-inner">
                                <ul className="info-list clearfix">
                                    <li>
                                        <i className="icon-2"></i>Phone: <Link href="tel:+919738105105">+91 9738 105 105</Link>
                                    </li>
                                    <li>
                                        <i className="icon-2"></i>Email: <a href="mailto:hello@inherbz.com">hello@inherbz.com</a>
                                    </li>
                                </ul>
                                <ul className="social-links clearfix">
                                    <li>
                                        <a href="https://www.facebook.com/inherbzwellness">
                                            <i className="icon-7"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.instagram.com/inherbz_wellness">
                                            <i className="icon-4"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Header Upper */}
                    <div className="header-lower ">
                        <div className="outer-container">
                            <div className="auto-container">
                                <div className="outer-box">
                                    <div className="logo-box">
                                        <figure className="logo">
                                            <Link href="/">
                                                <img 
                                                    src="/assets/images/logo.png" 
                                                    alt="Logo" 
                                                    style={{ width: '100%', height: 'auto' }} 
                                                />
                                            </Link>
                                        </figure>
                                    </div>
                                    <>
                                        <div className="justify-content-center align-items-center mobile-fixed">
                                            {!isCheckoutRoute && (
                                            <Link href="/checkout" className="theme-btn btn-one">
                                                <span>Order now</span>
                                            </Link>
                                            )}
                                        </div>
                                        <div style={{ gap: '10px', width:"100%",justifyContent:'end'}} className="d-flex btn-box">
                                            {orders?.length > 0 && (
                                            <Link href="/orders" className="card-link d-flex align-items-center text-white text-decoration-underline">
                                                My Orders
                                            </Link>
                                            )}
                                            {!isCheckoutRoute && (
                                            <Link href="/checkout" className="theme-btn btn-two mobile-hide">
                                                <span>Order now</span>
                                            </Link>
                                            )}
                                            {!isUser ? (
                                                <button title="login" onClick={() => setIsModalOpen(!isModalOpen)} className="theme-btn btn-two">
                                                    <span style={{ borderRadius:"50%" }} className="p-3">
                                                        <svg className="text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" strokeWidth="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                                        </svg>
                                                    </span>
                                                </button>
                                            ) : (
                                                <button title="logout" onClick={() => logout()} className="theme-btn btn-one">
                                                    <span style={{ borderRadius:"50%" }} className="p-3">
                                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"/>
                                                        </svg>
                                                    </span>
                                                </button>
                                            )}
                                        </div>
                                    </>
                                    <div className="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Sticky Header */}
                <div className="sticky-header">
                    <div className="auto-container">
                        <div className="outer-box">
                            <div className="logo-box">
                                <figure className="logo"><Link href="/"><img src="assets/images/logo.png" alt="" /></Link></figure>
                            </div>
                            <nav className="main-menu navbar-expand-md navbar-light clearfix">
                                <div className="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                                </div>
                            </nav>
                            <ul className="menu-right-content">
                                <div style={{ gap:'10px' }} className="d-flex btn-box">
                                    {(orders?.length > 0) && <Link href="/orders" className="card-link d-flex align-items-center text-white text-decoration-underline">My Orders</Link>}
                                    {!isCheckoutRoute && (
                                            <Link href="/checkout" className="theme-btn btn-two mobile-hide">
                                                <span>Order Now</span>
                                            </Link>
                                    )}
                                    {!isUser ? (
                                        <button title="login" onClick={() => setIsModalOpen(!isModalOpen)} className="theme-btn btn-two">
                                            <span style={{ borderRadius:"50%" }} className="p-3">
                                                <svg className="text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeWidth="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                                </svg>
                                            </span>
                                        </button>
                                    ) : (
                                        <button title="logout" onClick={() => logout()} className="theme-btn btn-one">
                                            <span style={{ borderRadius:"50%" }} className="p-3">
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"/>
                                                </svg>
                                            </span>
                                        </button>
                                    )}
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* End Sticky Menu */}
                {/* Mobile Menu */}
                {/* <MobileMenu handleMobileMenu={handleMobileMenu} /> */}
            </header>

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
                <OTPRegister closeModal={closeModal} />
            </Modal>
            <Toaster position="top-right"/>
        </>
    );
}
