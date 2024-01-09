//style
import './App.css';

//components
import LandingPage from "../src/views/landingPage/LandingPage";
import HomePage from "../src/views/homePage/HomePage";
import DetailPage from "../src/views/detailPage/DetailPage";

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
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/pokemon/:id" element={<DetailPage />} /> {/* Cambiado de 'component' a 'element' */}
        </Routes>
      </div>
    );

}

export default App
