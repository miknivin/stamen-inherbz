'use client';

import { useEffect, useState } from "react";
import { isValidShippingForm } from '../../helpers/contactFormValidation'; // Adjust the path according to your directory structure

export default function Shipping({ handleNextShipping }) {
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState("19");
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");

    // Fetch states.json on initial load
    useEffect(() => {
        fetch('data/states.json')
            .then(response => response.json())
            .then(data => {
                const filteredStates = data.filter(state => state.country_id === "101");
                setStates(filteredStates);
            })
            .catch(error => console.error('Error fetching states:', error));
    }, []);

    // Fetch cities.json when selectedState changes
    useEffect(() => {
        if (selectedState) {
            fetch('data/cities.json')
                .then(response => response.json())
                .then(data => {
                    const filteredCities = data.filter(city => city.state_id === selectedState);
                    setCities(filteredCities);
                })
                .catch(error => console.error('Error fetching cities:', error));
        }
    }, [selectedState]);

    // Load existing shipping info from localStorage and set state values
    useEffect(() => {
        const existingShippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));
        if (existingShippingInfo) {
            setAddress(existingShippingInfo.address || "");
            setSelectedState(existingShippingInfo.selectedState?.id || "19");
            setSelectedCity(existingShippingInfo.selectedCity?.id || "");
            setPostalCode(existingShippingInfo.postalCode || "");
        }
    }, []);

    // Update localStorage whenever form values change
    useEffect(() => {
        if (states.length && cities.length) {
            const existingShippingInfo = JSON.parse(localStorage.getItem('shippingInfo')) || {};
            const selectedStateName = states.find(i => i.id === selectedState) || "";
            const selectedCityName = cities.find(i => i.id === selectedCity) || "";
    
            const shippingInfo = {
                ...existingShippingInfo,
                address,
                selectedState: selectedStateName,
                selectedCity: selectedCityName,
                postalCode
            };
            localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
        }
    }, [address, selectedState, selectedCity, postalCode, states, cities]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValidShippingForm(address, selectedState, selectedCity, postalCode)) {
            handleNextShipping(); // Call the handleNext function to navigate to the next step
        } else {
            alert('Please fill in all fields correctly. Postal code must be 6 digits.');
        }
    };

    return (
        <form className="text-white" onSubmit={handleSubmit}>
            <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label mb-0" htmlFor="form4Example4">Address</label>
                <input
                    type="text"
                    id="form4Example4"
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label mb-0" htmlFor="form4Example8">Country</label>
                <input readOnly value="India" type="text" id="form4Example8" className="form-control" />
            </div>
            <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label mb-0" htmlFor="form4Example6">State</label>
                <select
                    id="form4Example6"
                    className="form-control form-select"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                >
                    <option value="" disabled>Select state</option>
                    {states.map(state => (
                        <option key={state.id} value={state.id}>{state.name}</option>
                    ))}
                </select>
            </div>
            <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label mb-0" htmlFor="form4Example5">City</label>
                <select
                    id="form4Example5"
                    className="form-control"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                >
                    <option value="" disabled>Select city</option>
                    {cities.map(city => (
                        <option key={city.id} value={city.id}>{city.name}</option>
                    ))}
                </select>
            </div>
            <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label mb-0" htmlFor="form4Example7">Postal Code</label>
                <input
                    type="text"
                    id="form4Example7"
                    className="form-control"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                />
            </div>
            <button
                data-mdb-ripple-init
                type="submit"
                className="theme-btn btn-one"
            >
                <span>Go to Checkout</span>
            </button>
        </form>
    );
}
