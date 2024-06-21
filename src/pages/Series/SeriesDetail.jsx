import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

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