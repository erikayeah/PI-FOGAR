//Style
import styles from "./LandingPage.module.css";
import landing from "../../assets/images/fondoFon.jpg";
import logo from "../../assets/images/logo.png";

//Hooks
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundImage = `url(${landing})`;
    return () => {
      document.body.style.backgroundImage = null;
    };
  }, [landing]);

  const handleHome = () => {
    navigate("/home");
  };

  return (
    <div className={styles.container}>
      <img className={styles.image} src={logo} alt="" />
      <button className={styles.btn} onClick={handleHome}>
        <span className={styles.noselect}>Gotta catch 'em all!</span>
      </button>
    </div>
  );
};

export default LandingPage;
