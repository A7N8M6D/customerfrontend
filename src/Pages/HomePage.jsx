import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";
import useApiCall from "../ApiCall/ApiCall";

const HomePage = () => {
  const { loading, error, data, request } = useApiCall(import.meta.env.VITE_API_URL);
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request(import.meta.env.VITE_API_ROUTE_3, "GET");
        if (Array.isArray(response)) {
          setCustomers(response);
        }
      } catch (err) {
        console.error("Error fetching customers:", err);
      }
    };
    fetchData();
  }, []); // No need to include `request` if it's stable

  const handleEdit = (customer) => {
    navigate("/update", { state: customer });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    
    try {
      const response = await request(`${import.meta.env.VITE_API_ROUTE_3}/${id}`, "DELETE");
      if (response?.success) {
        setCustomers((prev) => prev.filter((c) => c._id !== id));
      } else {
        alert("Failed to delete the customer. Try again.");
      }
    } catch (err) {
      console.error("Error deleting customer:", err);
      alert("An error occurred while deleting.");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-center text-red-500">Failed to load customers. Please try again.</p>
      ) : customers.length === 0 ? (
        <p className="text-center text-gray-500">No customers found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {customers.map((customer) => (
            <div key={customer._id} className="rounded-lg overflow-hidden shadow-lg flex flex-col bg-white">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900">{customer.name}</h2>
                <p className="text-sm text-gray-600">{customer.email}</p>
                <p className="text-sm text-gray-600">{customer.address}</p>
              </div>
              <div className="flex justify-between px-6 py-3 bg-gray-100">
                <button
                  onClick={() => handleEdit(customer)}
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                >
                  <FiEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(customer._id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <FiTrash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
