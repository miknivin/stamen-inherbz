'use client';
import { useState, useEffect } from 'react';
import { isValidForm } from '../../helpers/contactFormValidation'; 

export default function ContactForm({ handleNext }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const existingShippingInfo = localStorage.getItem('shippingInfo');
        
        if (existingShippingInfo) {
            handleNext();
        } else {
            if (isValidForm(name, email, phone)) {
                const shippingInfo = { name, email, phone };
                localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
                alert('Shipping info saved!');
                handleNext();
            } else {
                alert('Please fill in all fields correctly.');
            }
        }
    };
    

    // Populate form fields from localStorage
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
            {/* Name input */}
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
            {/* Email input */}
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
            {/* Phone input */}
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
            {/* Submit button */}
            <button
                type="submit"
                className="theme-btn btn-one"
            >
                <span>Submit</span>
            </button>
        </form>
    );
}
