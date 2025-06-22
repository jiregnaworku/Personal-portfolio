import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Project from "./pages/Projects";
import Resume from "./pages/Resume";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot/Chatbot";

const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <section id="home">
          <Home />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="project">
          <Project />
        </section>
        <section id="resume">
          <Resume />
        </section>
        <section id="contact">
          <Contact />
        </section>
        <Footer />
      </main>
      <Chatbot />
    </>
  );
};

export default App;
