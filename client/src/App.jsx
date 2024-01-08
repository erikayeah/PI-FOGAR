//style
import './App.css';

//components
import Cards from "../src/components/cards/Cards";
import LandingPage from "../src/components/landingPage/LandingPage";
// import HomePage from "../src/components/homePage/HomePage";
// import FormPage from "../src/components/formPage/FormPage";
// import DetailPage from "../src/components/detailPage/DetailPage";

//dependences
import axios from "axios";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const App = () => {


  return (
    <div className="App">
      {/* Eliminar dsp de ver q cards funcione bien */}
      <Cards/>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/home" element={<HomePage />} />
        <Route path="/create" element={<FormPage />} />
        <Route path="/pokemon/:id" element={<DetailPage />} /> */}
      </Routes>
    </div>
  );

}

export default App
