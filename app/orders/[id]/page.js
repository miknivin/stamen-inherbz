'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '@/components/layout/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function OrderDetailPage({params}) {
  const { id } = params;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/myOrders/${id}`, {
          withCredentials: true,
        });
        setOrder(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className='w-100 h-100 d-flex justify-content-center align-items-center mt-5'>
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!order) {
    return <p>No order found.</p>;
  }

  const { shippingInfo, paymentInfo, _id, orderItems, paymentMethod, itemsPrice, taxAmount, shippingAmount, totalAmount, orderStatus, createdAt } = order;

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div style={{minHeight:'80vh'}}  className="container mt-5">
       
        
        <div className='w-100 d-flex justify-content-between align-items-center pt-5 mb-4'>
          <Link href='/orders' className='btn btn-danger'> 
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          
          <h1 className="text-center ">Order Details</h1>
          <div style={{width:'20px',height:'20px'}}></div>
        </div>
        <div className="row mb-4">
          <div className="col-md-4">
            <h5 className='mb-3'>Order Details</h5>
            <p><strong>Order ID:</strong> {_id?.slice(-6)}</p>
            <p><strong>Status:</strong> {orderStatus}</p>
            <p><strong>Created At:</strong> {new Date(createdAt).toLocaleString()}</p>
          </div>
          <div className="col-md-4">
            <h5 className='mb-3'>Shipping Details</h5>
            <p><strong>Name:</strong> {shippingInfo.fullName}</p>
            <p><strong>Phone No:</strong> {shippingInfo.phoneNo}</p>
            <p><strong>Address:</strong> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.zipCode}, {shippingInfo.country}</p>
          </div>
          <div className="col-md-4">
            <h5 className='mb-3'>Payment Info</h5>
            <p><strong>Method:</strong> {paymentMethod}</p>
            <p><strong>Payment ID:</strong> {paymentInfo.id || 'N/A'}</p>
            <p><strong>Total Amount:</strong> {totalAmount}</p>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>₹ {item.price}</td>
                  <td><img src={item.image} alt={item.name} width={50} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
