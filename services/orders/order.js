const createOrder = async (orderData) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log(response);
        
        throw new Error(errorData.message || 'Failed to create order');
      }
  
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };