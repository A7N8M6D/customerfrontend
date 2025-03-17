import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import HomePage from "../Pages/HomePage";
import AddCustomer from "../Pages/AddCustomerPage";
import { UpdateCustomer } from "../../../BackendCustomer/src/controllers/customer.controler";
const Path = () => {
  return (
    <>
      <div >
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/add" element={<AddCustomer/>}/>
          <Route path="/update" element={<UpdateCustomer/>}/>
        </Routes>
        <Footer/>
      </div>
    </>
  );
};

export default Path;
