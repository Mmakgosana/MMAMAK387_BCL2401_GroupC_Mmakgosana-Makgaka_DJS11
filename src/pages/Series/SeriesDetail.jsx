import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function SeriesDetail() {
    const { id } = useParams();
    const [seasons, setSeasons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleCount, setVisibleCount] = useState(12);