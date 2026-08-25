import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import Features from '../../components/Features';
import Services from '../../components/Services';
import Team from '../../components/Team';
import Expertise from '../../components/Expertise';
import Contact from '../../components/Contact';
import Footer from '../../components/Footer';

/* Verze 1 — původní zaoblený design. */
export default function PageV1() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-primary-200 selection:text-primary-900 font-sans text-slate-800">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Team />
        <Services />
        <Expertise />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
