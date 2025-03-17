import React from "react";

const Button = ({ Name }) => {
  return (
    <button class="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">
      {Name}
    </button>
  );
};

export default Button;
