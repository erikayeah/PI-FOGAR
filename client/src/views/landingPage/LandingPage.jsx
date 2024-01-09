//Style
import style from "./LandingPage.module.css";

//Hooks
import { useNavigate } from "react-router-dom";
import {useEffect} from "react";


const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
   document.body.style.backgroundImage = `url('/src/assets/images/fondoLanding2.gif')`;
   return () => {
     document.body.style.backgroundImage = null;
   };
 }, []);

  const handleHome = () => {
    navigate("/home");
  };

  return (
    <div className= {style.container}>

        <h1> PokeAPI </h1>
        <button onClick={handleHome}> Gotta catch 'em all! </button>
        
    </div>
  );
};

export default LandingPage;
