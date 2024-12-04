export default function transformUserDataToOrderSchema(localStorageData, userId, quantity) {
    return {
      shippingInfo: {
        fullName: localStorageData.name,
        address: localStorageData.address,
        city: localStorageData.selectedCity.name,
        phoneNo: localStorageData.phone,
        zipCode: localStorageData.postalCode,
        country: 'India' 
      },
      user: userId, 
      orderItems: [
        {
          name: 'Stamen Cream',
          quantity: quantity||1,
          image: `${process.env.NEXT_PUBLIC_URL}/assets/images/banner/banner-img-1.png`,
          price: '500',
          product: 'product_id_here' 
        }
      ],
      paymentMethod: 'COD',
      paymentInfo: {
        id: '', // Optional for COD
        status: '' // Optional for COD
      },
      itemsPrice: 500,
      taxAmount: 0, // You might want to calculate this
      shippingAmount: 0, // You might want to add shipping costs
      totalAmount: 500,
      orderStatus: 'Processing'
    };
  }