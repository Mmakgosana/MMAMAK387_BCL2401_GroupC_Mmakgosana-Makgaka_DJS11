import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Favorites() {
  const [favorites, setFavorites] = useState({});
  const [sortOrder, setSortOrder] = useState('');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    setFavorites(existingFavorites);
  }, []);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const sortedFavorites = Object.keys(favorites).reduce((acc, showId) => {
    const sortedShowFavorites = [...favorites[showId]].sort((a, b) => {
      if (sortOrder === 'recent') {
        return new Date(b.updated) - new Date(a.updated);
      } else if (sortOrder === 'least-recent') {
        return new Date(a.updated) - new Date(b.updated);
      } else if (sortOrder === 'a-z') {
        return a.title.localeCompare(b.title);
      } else if (sortOrder === 'z-a') {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });
    acc[showId] = sortedShowFavorites;
    return acc;
  }, {});

  const filteredFavorites = Object.keys(sortedFavorites).reduce((acc, showId) => {
    const filteredShowFavorites = sortedFavorites[showId].filter(item =>
      item.title.toLowerCase().includes(filterValue.toLowerCase())
    );
    if (filteredShowFavorites.length > 0) {
      acc[showId] = filteredShowFavorites;
    }
    return acc;
  }, {});

  const removeFromFavorites = (showId, item) => {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || {};

    if (existingFavorites[showId]) {
      existingFavorites[showId] = existingFavorites[showId].filter(fav => fav.title !== item.title);

      if (existingFavorites[showId].length === 0) {
        delete existingFavorites[showId];
      }

      localStorage.setItem('favorites', JSON.stringify(existingFavorites));
      setFavorites(existingFavorites);
      alert(`${item.title} has been removed from your favorites!`);
    }
  };

  return (
    <div className="series-container">
      <h1>Favorites</h1>
      <div>
        <label>
          Sort by:
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="">Select</option>
            <option value="recent">Most Recent</option>
            <option value="least-recent">Least Recent</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </label>
        <label>
          Filter by title:
          <input type="text" value={filterValue} onChange={handleFilterChange} />
        </label>
      </div>
      {Object.keys(filteredFavorites).length === 0 ? (
        <div>No favorites added yet.</div>
      ) : (
        Object.keys(filteredFavorites).map(showId => (
          <div key={showId} className="favorites-show">
            <h2>Show ID: {showId}</h2>
            <div className="series-cards">
              {filteredFavorites[showId].map(item => (
                <div key={item.id} className="series-card">
                  <img src={item.image} alt={item.title} className="series-image" />
                  <div className="card-content">
                    <h3>{item.title}</h3>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="favorite-icon"
                      onClick={() => removeFromFavorites(showId, item)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
