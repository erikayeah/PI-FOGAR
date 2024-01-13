//style
import './App.css';

//components
import LandingPage from "../src/views/landingPage/LandingPage";
import HomePage from "../src/views/homePage/HomePage";
import DetailPage from "../src/views/detailPage/DetailPage";
import FormPage from "../src/views/formPage/FormPage";


//dependences
;
import { Routes, Route } from "react-router-dom";


const App = () => {

  return (
    
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/post" element={<FormPage />} />
          <Route path="/pokemon/:id" element={<DetailPage />} /> {/* Cambiado de 'component' a 'element' */}
        </Routes>
      </div>
    );

}

export default App
