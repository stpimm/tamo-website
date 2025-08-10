import Navbar from "./components/Navbar";
import Section from "./components/layout/Section";

import Hero from "./components/Hero";
import About from "./components/About";        // “Our Story”
import Clients from "./components/Clients";
import Services from "./components/Services";  // “What We Do”
import Partners from "./components/Partners";  // “Technology Partner”
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import Preloader from "./components/Preloader";

export default function App() {
  return (
    <>
      <Preloader />

      {/* Snap only on md+ so mobile scroll is free */}
      <div className="h-[100svh] overflow-y-scroll md:snap-y md:snap-mandatory">
        <Navbar />

        {/* Hero */}
        <Section id="hero" withGrid={false}>
          <Hero />
        </Section>

        {/* Our Story */}
        <Section id="story" withGrid>
          <About />
        </Section>

        {/* Clients */}
        <Section id="clients" withGrid={false}>
          <Clients />
        </Section>

        {/* What We Do */}
        <Section id="services" withGrid>
          <Services />
        </Section>

        {/* Technology Partner */}
        <Section id="partners" withGrid={false}>
          <Partners />
        </Section>

        {/* Contact */}
        <Section id="contact" withGrid>
          <Contact />
        </Section>

        <Footer />
      </div>
    </>
  );
}
