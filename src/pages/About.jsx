import React, { useEffect, useState } from "react";
import "../styles/About.css";
import "../Styles/global.css";

const About = () => {
  const sentences = [
    "Hi, I'm Jiregna Worku.",
    "I'm a Software Engineering student.",
    "I build beautiful web & mobile apps.",
    "Welcome to my portfolio 👋",
  ];

  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const current = sentences[index];
      setText((prev) =>
        isDeleting ? current.substring(0, prev.length - 1) : current.substring(0, prev.length + 1)
      );

      if (!isDeleting && text === current) {
        setTimeout(() => setIsDeleting(true), 1200);
        setTypingSpeed(50);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % sentences.length);
        setTypingSpeed(100);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, index, typingSpeed]);

  return (
    <div className="gradient-bg">
      <div className="page-content">
        <section className="about">
          <h2>About Me</h2>
          <div className="about-content">
            <h3 className="intro-type"><span>{text}</span><span className="cursor">|</span></h3>

            <p>
              I'm Jiregna Worku, a 4th-year Software Engineering student at Injibara University.
              I specialize in creating visually appealing and user-friendly web and mobile applications.
              With a strong foundation in React, JavaScript, Node.js, and modern UI/UX practices,
              I enjoy solving problems and building products that make a difference.
            </p>

            <p>
              My journey in tech began with curiosity and quickly grew into a passion for frontend
              development and Flutter Mobile App Development. I'm always eager to learn and improve,
              exploring the latest tools and technologies in the field.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
