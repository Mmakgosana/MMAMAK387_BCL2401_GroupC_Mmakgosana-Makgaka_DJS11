import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Series() {
    const [series, setSeries] = useState([]);
    const [error, setError] = useState(null);
    const [visibleCount, setVisibleCount] = useState(12);

    useEffect(() => {
        fetch("https://podcast-api.netlify.app")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => setSeries(data))
          .catch((error) => setError(error));
      }, []);
    
      const showMoreSeries = () => {
        setVisibleCount((prevCount) => prevCount + 9);
      }; 
      
      if (error) {
        return <div>Error: {error.message}</div>;
      }
    