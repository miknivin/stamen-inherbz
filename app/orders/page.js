'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '@/components/layout/Layout';
import Link from 'next/link'
export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(5); // Set default items per page
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/myOrders`;

    const fetchOrders = async () => {
      try {
        const response = await axios.get(apiUrl, {
          withCredentials: true
        });
        console.log(response);
        setOrders(response.data.data);
      } catch (error) {
        console.log('error fetching', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
        <div className="spinner-border text-danger mt-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Filter orders by search term
  const filteredOrders = orders.filter((order) => {
    return (
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.totalAmount.toString().includes(searchTerm)
    );
  });

  // Get current orders for the current page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle Previous and Next button clicks
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(filteredOrders.length / ordersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle change of orders per page
  const handleItemsPerPageChange = (e) => {
    setOrdersPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <div style={{marginTop:"100px"}} className="d-flex justify-content-center flex-column align-items-center text-center pb-4">
          <h1>Orders</h1>
        <div style={{gap:'10px'}} className='d-flex justify-content-between w-100 align-items-center container'>
            {/* Search Box */}
          <input
            type="text"
            style={{maxWidth:'200px', width:'100%'}}
            className="form-control mb-4"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Dropdown for selecting items per page */}
          <div className="mb-4">
            <select
              id="itemsPerPage"
              className="form-select"
              value={ordersPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
          

          {filteredOrders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <>
              <div style={{overflow:'auto',width:"100%"}} className='container'>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Order Date</th>
                      <th>Amount</th>
                      <th>Order Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id.slice(-6)}</td>
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>{order.totalAmount}</td>
                        <td>{order.orderStatus}</td>
                        <td><Link href={`/orders/${order._id}`} className="btn btn-danger">View</Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>     
              {/* Bootstrap Pagination */}
              <nav aria-label="Page navigation example pb-3">
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      style={{height:'auto'}}
                      aria-label="Previous"
                      onClick={handlePrev}
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </button>
                  </li>
                  {Array.from({ length: Math.ceil(filteredOrders.length / ordersPerPage) }, (_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <button
                        className="page-link"
                        href="#"
                        style={{height:'auto'}}
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === Math.ceil(filteredOrders.length / ordersPerPage) ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      aria-label="Next"
                      style={{height:'auto'}}
                      onClick={handleNext}
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </>
          )}
        </div>
      </Layout>
    </>
  );
}
