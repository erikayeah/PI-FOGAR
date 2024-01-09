import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/navBar/NavBar";
import Cards from "../../components/cards/Cards";

const HomePage = () => {


  return (
    <div>
      <NavBar />
      <Cards />
    </div>
  );
};

export default HomePage;
