import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login/Login"
import Home from "./pages/Home";
import About from "./pages/About";
import Series from "./pages/Series/Series";
import Layout from "./components/Layout";
import SeriesDetail from "./pages/Series/SeriesDetail";
import Episodes from "./pages/Series/Episodes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/series" element={<Series />} />
          <Route path="/series/:id" element={<SeriesDetail />} />
          <Route path="/series/:seasonId/episodes" element={<Episodes />} />
          {/* <Route path="login" element={<Login/>} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


