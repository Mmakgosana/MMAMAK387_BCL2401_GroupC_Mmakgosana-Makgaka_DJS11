import React, { useState, useEffect } from "react";// useState allows you to add state to a functional component and useEffect perform side effects in function component
import { Link } from "react-router-dom";//A component from 'react-router-dom' that allows for navigation between different routes in the application
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Series() {
  //state variables
  const [series, setSeries] = useState([]);//Stores the list of series data fetched from the API
  const [error, setError] = useState(null);//Stores any error that occurs during the data fetch
  const [visibleCount, setVisibleCount] = useState(12);//Determines how many series items are visible on the page
  const [sortOption, setSortOption] = useState("none"); //Stores the current sorting option selected by the user.

  useEffect(() => {//Runs the fetch operation when the component mounts.
    fetch("https://podcast-api.netlify.app")//Gets data from the given URL.
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })//Checks if the response is OK, then parses the JSON DATA
      .then((data) => setSeries(data))//Sets the fetched data to the 'series' state
      .catch((error) => setError(error));//Sets any errors that occur to the 'error' state
  }, []);

  const showMoreSeries = () => {
    setVisibleCount((prevCount) => prevCount + 9);
  };// Increases the number of visible series by 9 when called.

  const filterAndSortSeries = (option) => {
    setSortOption(option);// Create a copy of the series array
    const sortedSeries = [...series]; // Sorts the series based on the selected option

    if (option !== "none") {
      switch (option) {//Sorts the series based on the selected option
        case "most-recent":
          sortedSeries.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate)); // Sort by latest pubDate
          break;// By the latest publication date
        case "least-recent":
          sortedSeries.sort((a, b) => new Date(a.pubDate) - new Date(b.pubDate)); // Sort by earliest pubDate
          break;// By the earliest publication date
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

  const addToFavorites = (item) => {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    const showId = item.id;

    if (!existingFavorites[showId]) {
      existingFavorites[showId] = [];
    }

    const isAlreadyFavorite = existingFavorites[showId].some(fav => fav.title === item.title);

    if (!isAlreadyFavorite) {
      existingFavorites[showId].push(item);
      localStorage.setItem('favorites', JSON.stringify(existingFavorites));
      alert(`${item.title} has been added to your favorites!`);
    } else {
      alert(`${item.title} is already in your favorites!`);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }//If there's an error, it displays an error message

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
            <FontAwesomeIcon
              icon={faHeart}
              className="favorite-icon"
              onClick={() => addToFavorites(item)}
            />
          </div>
        ))}
      </div>
      {visibleCount < series.length && (
        <button onClick={showMoreSeries}>Show More</button>
      )}
    </div>
  );
}

    
    