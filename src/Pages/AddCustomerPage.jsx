import React from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import useApiCall from "../ApiCall/ApiCall";

const AddCustomer = () => {
  const { loading, error, data, request } = useApiCall(import.meta.env.VITE_API_URL);

  // Define validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    address: Yup.string()
      .min(5, "Address must be at least 5 characters")
      .required("Address is required"),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: { name: "", email: "", address: "" },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("API ROUTE:", import.meta.env.VITE_API_ROUTE_1);

      await request(import.meta.env.VITE_API_ROUTE_1, "POST", values);
      if (!error) {
        alert("Customer added successfully!");
        resetForm();
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-3">
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h1 className="text-2xl">Create a New Customer</h1>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                  Enter the following details to add a new customer.
                </p>
              </div>
            </div>
            <form onSubmit={formik.handleSubmit} className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <Input
                  label="Customer Name"
                  name="name"
                  placeholder="Enter name"
                  formik={formik}
                />
                <Input
                  label="Email"
                  name="email"
                  placeholder="Enter email"
                  formik={formik}
                />
                <Input
                  label="Address"
                  name="address"
                  placeholder="Enter address"
                  formik={formik}
                />
                {loading && <p className="text-blue-500">Submitting...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}
              </div>
              <div className="pt-4 flex items-center space-x-4">
                <Button Name="Create" onClick={formik.handleSubmit} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
