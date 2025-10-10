import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Project from "./pages/Projects";
import Resume from "./pages/Resume";
import Footer from "./components/Footer";
import Admin from "./pages/Admin";

const AppContent = () => {
  const location = useLocation();

  // ✅ Fix: include "#" handling (for HashRouter)
  const isAdminRoute = location.pathname.includes('admin');

  return (
    <>
      {/* Show Navbar & main site only if NOT admin */}
      {!isAdminRoute && <Navbar />}

      <main>
        <Routes>
          {/* ✅ Separate routes for clarity */}
          <Route
            path="/"
            element={
              <>
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
              </>
            }
          />

          {/* ✅ Admin route */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      {/* ✅ Hide footer on admin too */}
      {!isAdminRoute && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
