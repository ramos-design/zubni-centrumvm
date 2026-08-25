import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import Services from './Services';
import Team from './Team';
import Expertise from './Expertise';
import Contact from './Contact';
import Footer from './Footer';

/* Verze 3 — zaoblený design jako verze 1, ale hero má jen dva boxy a pozadí se mění s nimi. */
export default function PageV3() {
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
