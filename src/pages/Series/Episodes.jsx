import { useState, useEffect } from "react";//manage state and side effects in the component
import { useParams } from "react-router-dom";// extracts the URL parameters
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Episodes() {
    const { seasonId } = useParams();//extracts the 'seasonId' parameter from the URL. This 'seasonId is used to fetch the relevant data
    const [episodes, setEpisodes] = useState([]);// Stores the list of episodes
    const [loading, setLoading] = useState(true);// Indicates whether the data is still being fetched
    const [error, setError] = useState(null);  //Stores any error that occurs during the data fetch


    //useEffect Hook
    useEffect(() => {
        fetch(`https://podcast-api.netlify.app/id/${seasonId}`)//makes a network request to get the data
          .then((response) => {// Checks if the response is okay, if not, it throws an error
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {// Processes the JSON response, extracts episodes and updates the state
            const seasons = data.seasons;
            const allEpisodes = seasons.flatMap((season) => season.episodes);
            setEpisodes(allEpisodes);
            setLoading(false);
          })
          .catch((error) => {// Catches any error that occur during the fetch process and updates the error state
            console.error("Error fetching episodes:", error);
            setError(error);
            setLoading(false);
          });
      }, [seasonId]);// Runs when the component mounts or when the seasonID changes, it fetches data from the API using the seasonID to construcy the URL//

      const addToFavorites = (episode) => {
        const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
        const showId = episode.episode;
    
        if (!existingFavorites[showId]) {
          existingFavorites[showId] = [];
        }
    
        const isAlreadyFavorite = existingFavorites[showId].some(fav => fav.title === episode.title);
    
        if (!isAlreadyFavorite) {
          existingFavorites[showId].push(episode);
          localStorage.setItem('favorites', JSON.stringify(existingFavorites));
          alert(`${episode.title} has been added to your favorites!`);
        } else {
          alert(`${episode.title} is already in your favorites!`);
        }
      };
                        
      //Conditional Rendering
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }
      //Rendering Episodes
      return (
        <div className="episodes-container">
        {episodes.map((episode) => (
          <div key={episode.episode} className="episode-card">
            <div className="episode-info">
              <h2>{episode.title}</h2>
              <p>{episode.description}</p>
            </div>
            <FontAwesomeIcon
              icon={faHeart}
              className="favorite-icon"
              onClick={() => addToFavorites(episode)}
            />
          </div>
        ))}
      </div>
    );
  }