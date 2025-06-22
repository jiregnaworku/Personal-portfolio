import React, { useRef } from "react";
import emailjs from "emailjs-com";
import "../styles/Contact.css";
import "../Styles/global.css";
import { FaGithub, FaTelegram, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ag60b9j", // Replace with EmailJS service ID
        "template_ssszetj", // Replace with EmailJS template ID
        form.current,
        "j3PVT09ocZu7jZ3XE" // Replace with EmailJS public key
      )
      .then(
        () => {
          alert("Message sent successfully!");
          form.current.reset();
        },
        () => {
          alert("Failed to send message. Try again.");
        }
      );
  };

  return (
    <div className="gradient-bg">
      <div className="page-content" style={{color: '#fff'}}>
        <section className="contact" id="contact">
          <h2>Contact Me</h2>
          <div className="contact-container">
            <div className="contact-info">
              <p>
                <FaEnvelope />{" "}
                <a href="mailto:jiregna123w@gmail.com">jiregna123w@gmail.com</a>
              </p>
              <p>
                <FaPhoneAlt /> <a href="tel:+251918348141">+251 918 348 141</a>
              </p>
              <p>
                <FaTelegram />{" "}
                <a href="https://t.me/jiroow" target="_blank" rel="noreferrer">
                  @jiroow
                </a>
              </p>
              <p>
                <FaGithub />{" "}
                <a
                  href="https://github.com/jiregnaworku"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/jiregnaworku
                </a>
              </p>
            </div>
          </div>
          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              required
            />
            <button type="submit">Send Message</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Contact;
