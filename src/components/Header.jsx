import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <Link className="site-logo" to="/">
            Podcast_App
            </Link>
            <nav>
                <NavLink to="/series">
                    Series
                </NavLink>
                <NavLink to="/about">
                    About
                </NavLink>
            </nav>
        </header>
    )
}