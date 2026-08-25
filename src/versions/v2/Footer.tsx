import { ArrowUpRight, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 pt-20 pb-10 rounded-t-md -mt-8 relative z-20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          
          {/* Logo & Description */}
          <div className="max-w-sm">
            <a href="#" className="inline-block mb-8 hover:opacity-80 transition-opacity">
              <img 
                src="https://www.zubnicentrum-vm.cz/ksfmdata/images/logo.png" 
                alt="Zubní centrum Valašské Meziříčí" 
                className="h-10 w-auto brightness-0 invert opacity-90"
              />
            </a>
            <p className="text-slate-400 font-light text-balance leading-relaxed">
              Poskytujeme péči na nejvyšší světové úrovni bez marketingového přehánění. Jen čistá, moderní a klidná medicína.
            </p>
          </div>
          
          {/* Minimal Contact / CTA */}
          <div className="flex flex-col items-start md:items-end">
            <div className="text-xs font-bold tracking-widest text-slate-600 uppercase mb-4">Napište nám</div>
            <a href="mailto:info@zubnicentrum-vm.cz" className="group inline-flex items-center gap-4 text-2xl md:text-3xl font-display font-medium text-white hover:text-primary-400 transition-colors">
              info@zubnicentrum-vm.cz
              <div className="w-10 h-10 rounded-sm border border-slate-700 group-hover:border-primary-400 flex items-center justify-center transition-colors">
                <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-primary-400 transition-all group-hover:rotate-45" />
              </div>
            </a>
            <a href="tel:+420608890030" className="group inline-flex items-center gap-4 mt-4 text-2xl md:text-3xl font-display font-medium text-white hover:text-primary-400 transition-colors">
              +420 608 890 030
              <div className="w-10 h-10 rounded-sm border border-slate-700 group-hover:border-primary-400 flex items-center justify-center transition-colors">
                <Phone className="w-5 h-5 text-slate-400 group-hover:text-primary-400 transition-colors" />
              </div>
            </a>
          </div>
          
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-slate-800/60 mb-8"></div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Zubní centrum Valašské Meziříčí s.r.o. Všechna práva vyhrazena.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Ochrana osobních údajů</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Cookies</a>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
