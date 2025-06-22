import React from "react";
import "../styles/Home.css";
import "../Styles/global.css";
import profilePic from "../assets/profile.png";

const Home = () => {
  return (
    <div className="gradient-bg">
      <div className="page-content" style={{color: '#fff'}}>
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
                who loves building beautiful and functional frontend websites and mobile applications using React, Node.js, and modern web technologies.
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
                <span>🛠️ Express.js</span>
                <span>📦 Git & GitHub</span>
                <span>📱 Flutter</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
