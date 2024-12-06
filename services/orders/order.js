// orderService.js
import axios from 'axios';

const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders`, orderData, {
    withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error.response?.data?.message || 'Failed to create order';
  }
};

export { createOrder };
