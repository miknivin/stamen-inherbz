
export const isValidForm = (name, email, phone) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    return name.trim() !== '' && emailRegex.test(email) && phoneRegex.test(phone);
  };
  
  // utils/validation.js

export const isValidShippingForm = (address, selectedState, selectedCity, postalCode) => {
    const postalCodeRegex = /^\d{6}$/; // Assuming Indian postal codes are 6 digits
    return (
      address.trim() !== '' &&
      selectedState.trim() !== '' &&
      selectedCity.trim() !== '' &&
      postalCodeRegex.test(postalCode)
    );
  };
  