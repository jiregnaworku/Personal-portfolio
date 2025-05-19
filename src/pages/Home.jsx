import React from "react";
import "../styles/Home.css";
import profilePic from "../assets/profile.png"; // make sure you have this image

const Home = () => {
  return (
    <section className="home" id="home">
      <div className="home-container">
        <div className="home-image">
          <img src={profilePic} alt="Profile" />
        </div>

        <div className="home-content">
          <h1>
            Hi, I'm <span>Jiregna Worku</span>
          </h1>
          <h2>A Passionate Frontend Web and Mobile App Developer</h2>
          <p>
            I'm a 4th-year Software Engineering student at Injibara University
            who loves building beautiful and functional frontend websites and
            mobile applications using React, Node.js, and modern web
            technologies.
          </p>
          <a href="#about" className="home-btn">
            See More
          </a>

          <div className="tech-stack">
            <span>⚛️ React</span>
            <span>📱 React Native</span>
            <span>🟨 JavaScript</span>
            <span>🌐 HTML</span>
            <span>🟦 CSS</span>
            <span>🟩 Node.js</span>
            <span>🍃 MongoDB</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
