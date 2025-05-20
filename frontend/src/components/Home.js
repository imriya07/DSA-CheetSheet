import React from "react";
import backgroundImage from "../images/DSA-back.jpg"; 
import "../index.css"; 

const Home = () => {
  return (
    <div className="home-container">
      <img src={backgroundImage} alt="Background" className="background-image" />

      <div className="overlay">
        <div className="welcome-card">
          <h1 className="welcome-home">Welcome</h1>
          <p className="every">Every great story starts with a first step. Sign up to begin or log in to continue yours!</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
