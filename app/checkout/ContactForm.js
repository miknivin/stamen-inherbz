'use client';
import { useState, useEffect } from 'react';
import { isValidForm } from '../../helpers/contactFormValidation'; 
import Swal from 'sweetalert2';
export default function ContactForm({ handleNext, handleContactFormData }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!isValidForm(name, email, phone)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Input',
                text: 'Please fill in all fields correctly.',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'swal-button-red' // Use the custom class
                }
            });
            return;
        }        
        
        
        const existingShippingInfo = localStorage.getItem('shippingInfo');
        
        if (existingShippingInfo) {
            const parsedShippingInfo = JSON.parse(existingShippingInfo);

            if (
                parsedShippingInfo.name !== name ||
                parsedShippingInfo.email !== email ||
                parsedShippingInfo.phone !== phone
            ) {
                const shippingInfo = { name, email, phone };
                localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
            }

            handleContactFormData(phone);
            handleNext();
        } else {
            const shippingInfo = { name, email, phone };
            localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
            handleContactFormData(phone);
            handleNext();
        }
    };

    useEffect(() => {
        const storedInfo = localStorage.getItem('shippingInfo');
        if (storedInfo) {
            const { name, email, phone } = JSON.parse(storedInfo);
            setName(name || '');
            setEmail(email || '');
            setPhone(phone || '');
        }
    }, []);

    return (
        <form className="text-white" onSubmit={handleSubmit}>
            <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label mb-0" htmlFor="form4Example1">
                    Name
                </label>
                <input
                    type="text"
                    id="form4Example1"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label mb-0" htmlFor="form4Example2">
                    Email address
                </label>
                <input
                    type="email"
                    id="form4Example2"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label mb-0" htmlFor="form4Example3">
                    Phone
                </label>
                <input
                    className="form-control"
                    id="form4Example3"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <button
                type="submit"
                className="theme-btn btn-two"
            >
                <span>Submit</span>
            </button>
        </form>
    );
}
