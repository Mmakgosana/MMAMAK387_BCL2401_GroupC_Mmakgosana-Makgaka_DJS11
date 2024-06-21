import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Series() {
  const [series, setSeries] = useState([]);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const [sortOption, setSortOption] = useState("none"); // State for sorting option

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

  const filterAndSortSeries = (option) => {
    setSortOption(option);
    const sortedSeries = [...series]; // Create a copy of series

    if (option !== "none") {
      switch (option) {
        case "most-recent":
          sortedSeries.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate)); // Sort by latest pubDate
          break;
        case "least-recent":
          sortedSeries.sort((a, b) => new Date(a.pubDate) - new Date(b.pubDate)); // Sort by earliest pubDate
          break;
        case "a-z":
          sortedSeries.sort((a, b) => a.title.localeCompare(b.title)); // Sort by title A-Z
          break;
        case "z-a":
          sortedSeries.sort((a, b) => b.title.localeCompare(a.title)); // Sort by title Z-A
          break;
        default:
          // No change if option is invalid
          break;
      }
    }
    setSeries(sortedSeries); // Update the displayed series
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="series-container">
      <h1>Series List</h1>
      <div className="filter-buttons">
        <button onClick={() => filterAndSortSeries("most-recent")}>
          Most Recent
        </button>
        <button onClick={() => filterAndSortSeries("least-recent")}>
          Least Recent
        </button>
        <button onClick={() => filterAndSortSeries("a-z")}>A-Z</button>
        <button onClick={() => filterAndSortSeries("z-a")}>Z-A</button>
        <button onClick={() => filterAndSortSeries("none")}>Reset</button>
      </div>
      <div className="series-cards">
        {series.slice(0, visibleCount).map((item) => (
          <div key={item.id} className="series-card">
            <Link to={`/series/${item.id}`} key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="card-content">
                <h2>{item.title}</h2>
                <h4>seasons : {item.seasons}</h4>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {visibleCount < series.length && (
        <button onClick={showMoreSeries}>Show More</button>
      )}
    </div>
  );
}

    
    