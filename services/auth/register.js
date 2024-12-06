// api.js
import axios from 'axios';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/phone`, userData, {
      withCredentials: true, // Ensures cookies are sent with the request
      headers: {
        'Content-Type': 'application/json', // Specify content type as JSON
        // You can add other custom headers if needed
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.message || 'Error registering user');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(error.message || 'Error setting up request');
    }
  }
};
