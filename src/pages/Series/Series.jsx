import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Series() {
    const [series, setSeries] = useState([]);
    const [error, setError] = useState(null);
    const [visibleCount, setVisibleCount] = useState(12);