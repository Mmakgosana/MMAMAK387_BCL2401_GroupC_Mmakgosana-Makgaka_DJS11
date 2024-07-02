// episodes.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Episodes() {
  const { seasonId } = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${seasonId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const seasons = data.seasons;
        const allEpisodes = seasons.flatMap((season) => season.episodes);
        setEpisodes(allEpisodes);
        setLoading(false);

        // Initialize favorite status
        const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
        const showFavorites = existingFavorites[seasonId] || [];
        const favoritesMap = {};
        showFavorites.forEach(fav => {
          favoritesMap[fav.id] = true;
        });
        setFavorites(favoritesMap);
      })
      .catch((error) => {
        console.error("Error fetching episodes:", error);
        setError(error);
        setLoading(false);
      });
  }, [seasonId]);

  const toggleFavorite = (episode) => {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    const showId = seasonId;

    if (!existingFavorites[showId]) {
      existingFavorites[showId] = [];
    }

    const isAlreadyFavorite = favorites[episode.episode];

    if (isAlreadyFavorite) {
      // Remove from favorites
      existingFavorites[showId] = existingFavorites[showId].filter(fav => fav.id !== episode.episode);
      delete favorites[episode.episode];
    } else {
      // Add to favorites
      existingFavorites[showId].push(episode);
      favorites[episode.episode] = true;
    }

    localStorage.setItem('favorites', JSON.stringify(existingFavorites));
    setFavorites({ ...favorites });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="episodes-container">
      <h1 key={`episodesH1`}>Episodes</h1>
      {episodes.length > 0 ? (
        episodes.map((episode) => (
          <div key={episode.episode} className="episode-card">
            {episode.image && <img src={episode.image} alt={episode.title} className="episode-image" />}
            <div key={`episode${episode.episode}Content`} className="episode-content">
              <audio controls>
                <source src={episode.file} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <h2>{episode.title}</h2>
              <p>{episode.description}</p>
            </div>
            <FontAwesomeIcon
              key={`episode${episode.episode}Icon`}
              icon={faHeart}
              className="favorite-icon"
              style={{ color: favorites[episode.episode] ? 'red' : 'grey' }}
              onClick={() => toggleFavorite(episode)}
            />
          </div>
        ))
      ) : (
        <div key={`noEpisodes`}>No episodes available.</div>
      )}
    </div>
  );
}
