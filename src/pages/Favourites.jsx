// Favourites.jsx
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Favourites() {
  const [favorites, setFavorites] = useState({});
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    const allFavorites = Object.values(storedFavorites).flat();
    setFavorites(allFavorites);

    const extractedGenres = new Set(allFavorites.flatMap(item => item.genres));
    setGenres(["All", ...Array.from(extractedGenres)]);
  }, []);

  const removeFromFavorites = (showId, episodeTitle) => {
    const updatedFavorites = { ...favorites };
    if (updatedFavorites[showId]) {
      updatedFavorites[showId] = updatedFavorites[showId].filter(fav => fav.title !== episodeTitle);
      if (updatedFavorites[showId].length === 0) {
        delete updatedFavorites[showId];
      }
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    }
  };

  return (
    <div>
      <h1>My Favorites</h1>
      {Object.keys(favorites).length > 0 ? (
        Object.keys(favorites).map(showId => (
          <div key={showId}>
            <h2>Show ID: {showId}</h2>
            {favorites[showId].map(episode => (
              <div key={episode.title} className="episode-card">
                <h3>{episode.title}</h3>
                <p>{episode.description}</p>
                <audio controls>
                  <source src={episode.file} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                <button onClick={() => removeFromFavorites(showId, episode.title)}>
                  Remove from Favorites
                </button>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div>No favorites yet.</div>
      )}
    </div>
  );
}
