// src/App.jsx
import Navbar from "./components/Navbar";
import Section from "./components/layout/Section";

import Hero from "./components/Hero";
import About from "./components/About";        // “Our Story”
import Clients from "./components/Clients";
import Services from "./components/Services";  // “What We Do”
import Partners from "./components/Partners";  // “Technology Partner”
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import Preloader from "./components/Preloader"; // <-- NEW

export default function App() {
  return (
    <>
      {/* The loader is a fixed overlay; it won’t affect your layout or backgrounds */}
      <Preloader />

      <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
        <Navbar />

        {/* Hero (no grid) */}
        <Section id="hero" withGrid={false}>
          <Hero />
        </Section>

        {/* Our Story (grid) */}
        <Section id="story" withGrid>
          <About />
        </Section>

        {/* Clients (no grid) */}
        <Section id="clients" withGrid={false}>
          <Clients />
        </Section>

        {/* What We Do (grid) */}
        <Section id="services" withGrid>
          <Services />
        </Section>

        {/* Technology Partner (no grid) */}
        <Section id="partners" withGrid={false}>
          <Partners />
        </Section>

        {/* Contact (grid) */}
        <Section id="contact" withGrid>
          <Contact />
        </Section>

        <Footer />
      </div>
    </>
  );
}
