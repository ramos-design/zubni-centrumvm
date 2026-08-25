import { Phone, Menu, X, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import VersionSwitcher from '../../components/VersionSwitcher';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 sm:px-6 lg:px-8 flex justify-center pointer-events-none">
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full max-w-7xl rounded-sm transition-all duration-500 pointer-events-auto flex justify-between items-center px-6 md:px-8 border ${scrolled ? 'py-2.5 md:py-3 bg-white/95 backdrop-blur-xl shadow-xl shadow-primary-900/5 border-primary-100/50' : 'py-4 md:py-5 bg-transparent border-transparent'}`}
      >
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <a href="#" className="block hover:opacity-80 transition-opacity">
            <img 
              src="https://www.zubnicentrum-vm.cz/ksfmdata/images/logo.png" 
              alt="Zubní centrum Valašské Meziříčí" 
              className={`w-auto drop-shadow-sm transition-all duration-500 ${scrolled ? 'h-6 md:h-8' : 'h-8 md:h-10'}`}
            />
          </a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-1 lg:space-x-2">
          <a href="#o-nas" className="px-3 lg:px-4 py-2 rounded-sm text-sm font-semibold text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-all">O nás</a>
          <a href="#sluzby" className="px-3 lg:px-4 py-2 rounded-sm text-sm font-semibold text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-all">Služby</a>
          <a href="#odbornost" className="px-3 lg:px-4 py-2 rounded-sm text-sm font-semibold text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-all">Pro odborníky</a>
          <a href="#cenik" className="px-3 lg:px-4 py-2 rounded-sm text-sm font-semibold text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-all">Ceník</a>
          <a href="#kontakt" className="px-3 lg:px-4 py-2 rounded-sm text-sm font-semibold text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-all">Kontakt</a>
          <VersionSwitcher />
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a 
            href="tel:+420123456789"
            className={`morphglass-btn-primary group inline-flex items-center gap-2 rounded-sm text-xs font-bold uppercase tracking-widest ${scrolled ? 'px-6 py-2.5' : 'px-8 py-3.5'}`}
          >
            <Phone className="w-4 h-4 fill-white/20" />
            +420 123 456 789
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="morphglass-btn text-primary-900 p-2 rounded-sm focus:outline-none"
            aria-expanded="false"
          >
            <span className="sr-only">Otevřít menu</span>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden absolute top-28 left-4 right-4 bg-white/95 backdrop-blur-xl border border-primary-100 shadow-2xl rounded-md overflow-hidden pointer-events-auto"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              <a onClick={() => setIsOpen(false)} href="#o-nas" className="text-2xl font-display font-semibold text-slate-900 hover:text-primary-600 transition-colors">O nás</a>
              <a onClick={() => setIsOpen(false)} href="#sluzby" className="text-2xl font-display font-semibold text-slate-900 hover:text-primary-600 transition-colors">Služby</a>
              <a onClick={() => setIsOpen(false)} href="#odbornost" className="text-2xl font-display font-semibold text-slate-900 hover:text-primary-600 transition-colors">Pro odborníky</a>
              <a onClick={() => setIsOpen(false)} href="#cenik" className="text-2xl font-display font-semibold text-slate-900 hover:text-primary-600 transition-colors">Ceník</a>
              <a onClick={() => setIsOpen(false)} href="#kontakt" className="text-2xl font-display font-semibold text-slate-900 hover:text-primary-600 transition-colors">Kontakt</a>
              
              <div className="pt-6 mt-2 border-t border-slate-100">
                <VersionSwitcher variant="mobile" onNavigate={() => setIsOpen(false)} />
              </div>

              <div className="pt-6 border-t border-slate-100">
                <a 
                  onClick={() => setIsOpen(false)}
                  href="tel:+420123456789"
                  className="morphglass-btn-primary flex items-center justify-center gap-3 w-full py-5 rounded-md text-base font-bold uppercase tracking-widest"
                >
                  <Phone className="w-5 h-5 fill-white/20" />
                  +420 123 456 789
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
