// series.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './Series.css';

export default function Series() {
  const [series, setSeries] = useState([]);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const [sortOption, setSortOption] = useState("none");
  const [currentIndex, setCurrentIndex] = useState(0);

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
    const sortedSeries = [...series];

    if (option !== "none") {
      switch (option) {
        case "most-recent":
          sortedSeries.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
          break;
        case "least-recent":
          sortedSeries.sort((a, b) => new Date(a.pubDate) - new Date(b.pubDate));
          break;
        case "a-z":
          sortedSeries.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "z-a":
          sortedSeries.sort((a, b) => b.title.localeCompare(a.title));
          break;
        default:
          break;
      }
    }
    setSeries(sortedSeries);
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

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, series.length - 3));
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const visibleSeries = series.slice(currentIndex, currentIndex + 3);

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
      <div className="carousel-container">
        <button className="carousel-arrow carousel-arrow-left" onClick={handlePrev}>&lt;</button>
        <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}>
          {visibleSeries.map((item) => (
            <div key={item.id} className="carousel-item">
              <Link to={`/series/${item.id}`} key={item.id}>
                <img src={item.image} alt={item.title} />
                <div className="carousel-content">
                  <h2>{item.title}</h2>
                  <h4>Seasons: {item.seasons}</h4>
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
        <button className="carousel-arrow carousel-arrow-right" onClick={handleNext}>&gt;</button>
      </div>
      <div className="series-cards">
        {series.slice(0, visibleCount).map((item) => (
          <div key={item.id} className="series-card">
            <Link to={`/series/${item.id}`} key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="card-content">
                <h2>{item.title}</h2>
                <h4>Seasons: {item.seasons}</h4>
                <h4>Last Updated: {new Date(item.updated).toLocaleDateString()}</h4>
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
