// seriesDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


export default function SeriesDetail() {
  const { id } = useParams();
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSeasons(data.seasons);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const showMoreSeasons = () => {
    setVisibleCount((prevCount) => prevCount + 9);
  };

  const addToFavorites = (season) => {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    const showId = id;

    if (!existingFavorites[showId]) {
      existingFavorites[showId] = [];
    }

    const isAlreadyFavorite = existingFavorites[showId].some(fav => fav.title === season.title);

    if (!isAlreadyFavorite) {
      existingFavorites[showId].push(season);
      localStorage.setItem('favorites', JSON.stringify(existingFavorites));
      alert(`${season.title} has been added to your favorites!`);
    } else {
      alert(`${season.title} is already in your favorites!`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="series-detail-container">
      {seasons.length > 0 ? (
        seasons.slice(0, visibleCount).map((season) => (
          <div key={season.season} className="season-card-container">
            <Link to={`/series/${id}/episodes`} className="season-card-link">
              <div className="season-card">
                {season.image && <img src={season.image} alt={season.title} className="season-image" />}
                <h2 className="season-title">{season.title}</h2>
                <p className="show-updated">
                  Last Updated: {new Date(season.updated).toLocaleDateString()}
                </p>
              </div>
            </Link>
            <FontAwesomeIcon
              icon={faHeart}
              className="favorite-icon"
              onClick={() => addToFavorites(season)}
            />
          </div>
        ))
      ) : (
        <div>No seasons available.</div>
      )}
      {visibleCount < seasons.length && (
        <button onClick={showMoreSeasons}>Show More</button>
      )}
    </div>
  );
}
