import React from "react";

const Input = ({ label, name, placeholder, formik }) => {
  return (
    <div className="flex flex-col">
      <label className="leading-loose">{label}</label>
      <input
        {...formik.getFieldProps(name)}
        type="text"
        className={`px-4 py-2 border w-full sm:text-sm rounded-md focus:outline-none text-gray-600 ${
          formik.touched[name] && formik.errors[name]
            ? "border-red-500"
            : "border-gray-300 focus:ring-gray-500 focus:border-gray-900"
        }`}
        placeholder={placeholder}
      />
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-red-500 text-sm">{formik.errors[name]}</p>
      )}
    </div>
  );
};

export default Input;
