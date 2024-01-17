import React from "react";
import styles from "./Loading.module.css";
import loaderGif from "../../assets/images/loading.gif";

const Loading = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2 style={{ color: "black" }}> Loading </h2>
      <img className={styles.image} src={loaderGif} alt="Loading..." />
    </div>
  );
};

export default Loading;
