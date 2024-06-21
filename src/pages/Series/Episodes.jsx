import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Episodes() {
    const { seasonId } = useParams();
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
          })
          .catch((error) => {
            console.error("Error fetching episodes:", error);
            setError(error);
            setLoading(false);
          });
      }, [seasonId]);

      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }