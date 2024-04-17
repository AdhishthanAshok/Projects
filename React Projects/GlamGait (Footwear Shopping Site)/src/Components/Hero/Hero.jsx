import React from "react";
import hero_img from "../assets/Hero_shoe2.png";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero_left">
        <h2>New Arrivals</h2>
        <h2>FootWear for</h2>
        <h2>EVERYONE!!</h2>
        <button to=".popular">Explore More &#8594; </button>
      </div>
      <div className="hero_right">
        <img src={hero_img} alt="hero_img_shoe" className="hero_shoe_img" />
      </div>
    </div>
  );
};

export default Hero;
