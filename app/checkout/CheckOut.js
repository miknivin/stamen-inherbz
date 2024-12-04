'use client'

import { useEffect, useState } from "react";
import Image from "next/image";

export default function CheckOut({ quantity, onQuantityChange }) {
    const [shippingInfo, setShippingInfo] = useState({
        fullName: "",
        phone: "",
        email: "",
        address: "",
    });

    useEffect(() => {
        const storedInfo = JSON.parse(localStorage.getItem("shippingInfo"));
        if (storedInfo) {
            setShippingInfo(storedInfo);
        }
    }, []);

    const increaseQuantity = () => {
        onQuantityChange(quantity + 1);
    };

    const decreaseQuantity = () => {
        onQuantityChange(Math.max(1, quantity - 1));
    };

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value > 0) {
            onQuantityChange(value);
        }
    };

    return (
        <div className="card mb-3" style={{ maxWidth: '600px' }}>
            <div className="row no-gutters">
                <div className="col-md-4" style={{ position: 'relative', paddingLeft: '20px', paddingTop: '20px' }}>
                    <Image
                        src={"/assets/images/gallery/gallery-1.png"}
                        width={100}
                        height={100}
                        alt="product image"
                        quality={100}
                        className="card-img pl-5"
                        layout="responsive"
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">Stamen Cream</h5>
                        <div style={{ fontSize: '0.9em' }} className="card-text text-black">
                            <div className="d-flex align-items-center">
                                <button className="btn btn-outline-secondary" onClick={decreaseQuantity}>-</button>
                                <input
                                    type="number"
                                    className="form-control text-center mx-2"
                                    style={{ width: '100%' }}
                                    value={quantity}
                                    disabled
                                    onChange={handleQuantityChange}
                                    min="1"
                                />
                                <button className="btn btn-outline-secondary" onClick={increaseQuantity}>+</button>
                            </div>
                            <div className='d-flex border-bottom w-100'>
                                <div className='col-4'>
                                    <b>Full Name:</b>
                                </div>
                                <div className='col-8'>{shippingInfo.name || "N/A"}</div>
                            </div>
                            <div className='d-flex border-bottom w-100'>
                                <div className='col-4'>
                                    <b>Phone:</b>
                                </div>
                                <div className='col-8'>{shippingInfo.phone || "N/A"}</div>
                            </div>
                            <div className='d-flex border-bottom w-100'>
                                <div className='col-4'>
                                    <b>Email:</b>
                                </div>
                                <div className='col-8'>{shippingInfo.email || "N/A"}</div>
                            </div>
                            <div className='d-flex border-bottom w-100'>
                                <div className='col-4'>
                                    <b>Address:</b>
                                </div>
                                <div className='col-8'>{shippingInfo.address || "N/A"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
