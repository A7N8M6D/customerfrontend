import React, { useState } from "react";
import axios from "axios";

const useApiCall = (baseUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const request = async (endpoint, method = "GET", payload = null, id = null) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const url = id ? `${baseUrl}/${endpoint}/${id}` : `${baseUrl}/${endpoint}`;
      let response;

      switch (method.toUpperCase()) {
        case "GET":
          response = await axios.get(url);
          break;
        case "POST":
          console.log("payload",payload)
          console.log("url",url)
          response = await axios.post(url, payload);
          break;
        case "PUT":
          response = await axios.put(url, payload);
          break;
        case "DELETE":
          response = await axios.delete(url);
          break;
        default:
          throw new Error("Invalid method");
      }

      setData(response.data);
      console.log("Response ",response.data.message)
    } catch (err) {
      console.log("Error While APi Call",err)
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, request };
};

export default useApiCall;
