import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

// Link allows for the navigation between different routes in the application
export default function SeriesDetail() {
  const { id } = useParams();//Extracts the 'id' parameter from the URL
  const [seasons, setSeasons] = useState([]);//Stores the list of seasons data fetched from the API
  const [loading, setLoading] = useState(true);//Indicates whether the data is till being loaded
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);//Determines how many season items are visible on the page

  useEffect(() => {// Runs the fetch operation when the component mounts or when the 'id' changes
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }//Checks if the response is OK, then parses the JSON data
        return response.json();
      })
      .then((data) => {
        setSeasons(data.seasons);
        setLoading(false);//Sets the fetched data (seasons) to the seasons state and stops loading.
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, [id]);//Sets any errors that occur to the error state and stops loading.

  const showMoreSeasons = () => {
    setVisibleCount((prevCount) => prevCount + 9);
  };// Increases the number of visible seasons by 9 when called

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
        seasons.slice(0, visibleCount).map((season) => (//Uses the map function to iterate over the seasons array and create a card for each season
          <div key={season.season} className="season-card-container">
          <Link to={`/series/${id}/episodes`} key={season.season} className="season-card-link">
            <div className="season-card">
              {season.image && <img src={season.image} alt={season.title} className="season-image"  />}
              <h2 className="season-title">{season.title}</h2>
              <FontAwesomeIcon
              icon={faHeart}
              className="favorite-icon"
              onClick={() => addToFavorites(season)}
            /> 
            </div>
          </Link>
       
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
