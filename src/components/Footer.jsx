import React from "react";
import { Link } from "react-scroll";
import { FaGithub, FaLinkedin, FaEnvelope, FaTelegram } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="home" smooth={true} duration={500}>
          Home
        </Link>
        <Link to="about" smooth={true} duration={500}>
          About
        </Link>
        <Link to="projects" smooth={true} duration={500}>
          Projects
        </Link>
        <Link to="contact" smooth={true} duration={500}>
          Contact
        </Link>
        <Link to="resume" smooth={true} duration={500}>
          Resume
        </Link>
      </div>

      <div className="footer-socials">
        <a
          href="https://github.com/jiregnaworku"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub />
        </a>
        <a
          href="www.linkedin.com/in/jiregna-worku-5519302aa"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin />
        </a>
        <a href="mailto:jiregna123w@gmail.com">
          <FaEnvelope />
        </a>
        <a href="https://t.me/@jiroow" target="_blank" rel="noreferrer">
          <FaTelegram />
        </a>
      </div>

      <p className="footer-copy">
        &copy; {new Date().getFullYear()} Jiregna's Portfolio. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
