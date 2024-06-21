import React from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "../../public/logo_icon.png"



export default function Header() {
    return (
        <header>
            
            <Link className="site-logo" to="/">
            <img src={logo} alt="Logo" />
            Tech Tonic!
            </Link>
            <nav>
                <NavLink to="/series">
                    Series
                </NavLink>
                <NavLink to="/about">
                    About
                </NavLink>
                <NavLink to="/about">
                    Favourites
                </NavLink>
            </nav>
           
        </header>
    )
}