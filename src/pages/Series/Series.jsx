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

      return (
        <div className="series-container">
          <h1>Series List</h1>
          <div className="series-cards">
            {series.slice(0, visibleCount).map((item) => (
              <div key={item.id} className="series-card">
                <Link to={`/series/${item.id}`} key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <div className="card-content">
                  </div>
                </Link>
                <h2>{item.title}</h2>
                <h4>seasons : {item.seasons}</h4>
              </div>
            ))}
          </div>
          {
            visibleCount < series.length && (
              <button onClick={showMoreSeries}>Show More</button>
            )
          }
        </div >
      );
    }
    
    