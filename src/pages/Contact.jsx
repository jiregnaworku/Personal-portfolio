import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { FaGithub, FaTelegram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    emailjs
      .sendForm(
        "service_ag60b9j",
        "template_ssszetj",
        form.current,
        "j3PVT09ocZu7jZ3XE"
      )
      .then(
        () => {
          setSubmitStatus("success");
          form.current.reset();
        },
        () => {
          setSubmitStatus("error");
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: "jiregna123w@gmail.com",
      href: "mailto:jiregna123w@gmail.com",
      color: "text-red-500"
    },
    {
      icon: FaPhoneAlt,
      label: "Phone",
      value: "+251 918 348 141",
      href: "tel:+251918348141",
      color: "text-green-500"
    },
    {
      icon: FaTelegram,
      label: "Telegram",
      value: "@jiroow",
      href: "https://t.me/jiroow",
      color: "text-blue-500"
    },
    {
      icon: FaGithub,
      label: "GitHub",
      value: "github.com/jiregnaworku",
      href: "https://github.com/jiregnaworku",
      color: "text-gray-800 dark:text-gray-200"
    },
    {
      icon: FaMapMarkerAlt,
      label: "Location",
      value: "Addis Ababa, Ethiopia",
      href: "#",
      color: "text-purple-500"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Get In <span className="text-primary-200">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-primary-200 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, 
            or just having a chat about technology and development.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
              <p className="text-primary-100 text-lg leading-relaxed mb-8">
                Feel free to reach out through any of these channels. I typically respond within 24 hours.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  target={info.href.startsWith('http') ? "_blank" : "_self"}
                  rel={info.href.startsWith('http') ? "noopener noreferrer" : ""}
                  className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 group"
                >
                  <div className={`p-3 bg-white/20 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                    <info.icon className={`text-2xl ${info.color}`} />
                  </div>
                  <div>
                    <p className="text-primary-200 text-sm font-medium">{info.label}</p>
                    <p className="text-white font-semibold">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Send Message</h3>
            
            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-400 rounded-lg">
                <p className="text-green-200">Message sent successfully! I'll get back to you soon.</p>
              </div>
            )}
            
            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-400 rounded-lg">
                <p className="text-red-200">Failed to send message. Please try again.</p>
              </div>
            )}

            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-primary-200 text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-primary-200 text-sm font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-primary-200 text-sm font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell me about your project or just say hello!"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
