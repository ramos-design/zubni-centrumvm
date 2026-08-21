import { Phone, MapPin, Mail, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

const DEPARTMENTS = [
  {
    title: "Stomatochirurgie",
    doctor: "MUDr. Jan Šrubař",
    phone: "+420 608 890 030",
    email: "zubnicentrum@gmail.com",
    hours: [
      { day: "Pondělí", times: "8:00 - 12:30  13:30 - 16:30" },
      { day: "Úterý", times: "8:00 - 12:30  13:30 - 16:30" },
      { day: "Středa", times: "8:00 - 13:00  -" },
      { day: "Čtvrtek", times: "-  -" },
      { day: "Pátek", times: "-  -" },
    ]
  },
  {
    title: "Ortodoncie",
    doctor: "MDDr. Martin Šrubař",
    phone: "+420 725 992 599",
    email: "zubnicentrum@gmail.com",
    hours: [
      { day: "Pondělí", times: "8:00 - 12:30  13:30 - 15:00" },
      { day: "Úterý", times: "8:00 - 12:30  13:30 - 15:00" },
      { day: "Středa", times: "8:00 - 12:30  13:30 - 15:00" },
      { day: "Čtvrtek", times: "8:00 - 12:30  13:30 - 15:00" },
      { day: "Pátek", times: "8:00 - 13:00  -" },
    ]
  },
  {
    title: "Dentální hygiena",
    phone: "+420 608 890 030",
    email: "zubnicentrum@gmail.com",
    hours: [
      { day: "Pondělí", times: "8:00 - 12:30  13:30 - 16:00" },
      { day: "Úterý", times: "8:00 - 12:30  13:30 - 16:00" },
      { day: "Středa", times: "8:00 - 12:30  13:30 - 16:00" },
      { day: "Čtvrtek", times: "8:00 - 12:30  13:30 - 16:00" },
      { day: "Pátek", times: "8:00 - 12:30  13:30 - 15:00" },
    ]
  },
  {
    title: "Zhotovování OPG a CBCT",
    subtitle: "(rentgenologické vyšetření)",
    description: "OPG a CBCT zhotovujeme pouze na základě platné žádanky od zubního lékaře a bez předchozího objednání.",
    hours: [
      { day: "Pondělí", times: "-  -" },
      { day: "Úterý", times: "-  -" },
      { day: "Středa", times: "-  -" },
      { day: "Čtvrtek", times: "8:00 - 12:00  13:00 - 15:00" },
      { day: "Pátek", times: "-  -" },
    ]
  }
];

export default function Contact() {
  return (
    <section id="kontakt" className="py-24 bg-primary-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header - General Contact */}
        <div className="mb-24">
          <h2 className="text-sm font-bold tracking-widest text-primary-600 uppercase mb-4">Kontakt & Objednávky</h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <a href="tel:+420608890030" className="group inline-flex items-center gap-4 md:gap-6">
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-full border-2 border-primary-950 group-hover:border-primary-600 flex items-center justify-center transition-colors shrink-0">
                <Phone className="w-5 h-5 md:w-8 md:h-8 text-primary-950 group-hover:text-primary-600 transition-colors" />
              </div>
              <span className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-primary-950 group-hover:text-primary-600 transition-colors">
                +420 608 890 030
              </span>
            </a>
          </motion.div>
          <p className="text-xl text-slate-600 font-light mt-8 max-w-xl">
            Pro nejrychlejší komunikaci a nalezení vhodného termínu preferujeme telefonický kontakt.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-16 border-t border-primary-200 pt-16">
          {DEPARTMENTS.map((dept, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col"
            >
              <h3 className="text-2xl font-display font-semibold text-primary-500 mb-1">{dept.title}</h3>
              {dept.subtitle && <p className="text-primary-500 font-medium mb-1">{dept.subtitle}</p>}
              
              <div className="mb-4 h-6">
                 {dept.doctor && <p className="text-slate-900 font-bold">{dept.doctor}</p>}
              </div>
              
              {dept.description && (
                <p className="text-slate-600 text-sm mb-4 max-w-md leading-relaxed text-balance">
                  {dept.description}
                </p>
              )}
              
              {dept.phone && (
                <div className="flex flex-col gap-2 mb-6 text-sm">
                  <div className="flex items-start sm:items-center flex-col sm:flex-row gap-1 sm:gap-2">
                    <span className="text-slate-500 sm:w-56">Objednání na TELEFONU:</span>
                    <a href={`tel:${dept.phone.replace(/\s/g, '')}`} className="text-slate-900 font-medium hover:text-primary-600 transition-colors">
                      {dept.phone}
                    </a>
                  </div>
                  {dept.email && (
                    <div className="flex items-start sm:items-center flex-col sm:flex-row gap-1 sm:gap-2">
                      <span className="text-slate-500 sm:w-56">EMAIL <span className="text-xs">(neslouží k objednání)</span>:</span>
                      <a href={`mailto:${dept.email}`} className="text-primary-500 hover:text-primary-600 transition-colors">
                        {dept.email}
                      </a>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-auto">
                <h4 className="font-semibold text-slate-900 mb-4 text-sm">Ordinační hodiny:</h4>
                <div className="flex flex-col gap-2 text-sm text-slate-600">
                  {dept.hours.map((h, i) => {
                    const times = h.times.split('  ');
                    return (
                      <div key={i} className="flex gap-4 max-w-[280px]">
                        <span className="font-medium text-slate-700 w-16">{h.day}</span>
                        <span className="w-24 text-right">{times[0] !== '-' ? times[0] : '-'}</span>
                        <span className="w-24 text-right">{times[1] ? (times[1] !== '-' ? times[1] : '') : ''}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Notice */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-sm text-slate-500 italic pb-16"
        >
          Poslední pacient bude ošetřen 15 minut před koncem pracovní doby.
        </motion.div>

        {/* Bottom Section - Address & Map */}
        <div className="mt-16 pt-16 border-t border-primary-200">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            
            {/* Left side: Info & Photo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 flex flex-col"
            >
              <h4 className="font-display font-semibold text-2xl text-slate-900 mb-8">Kde nás najdete</h4>
              
              <div className="flex gap-4 items-start mb-6">
                <MapPin className="w-6 h-6 text-primary-500 shrink-0 mt-1" />
                <div className="text-slate-600 leading-relaxed text-lg">
                  <p className="font-medium text-slate-900 text-xl mb-1">Zubní Centrum</p>
                  <p>Křižná 857</p>
                  <p>757 01 Valašské Meziříčí</p>
                </div>
              </div>
              
              <a 
                href="https://maps.google.com/?q=Křižná+857,+757+01+Valašské+Meziříčí" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors mb-12 ml-10"
              >
                Otevřít v mapách
                <ArrowUpRight className="w-4 h-4" />
              </a>
              
              {/* Photo */}
              <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100 w-full max-w-sm relative">
                  <img 
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" 
                    alt="Budova Zubního centra" 
                    className="w-full h-full object-cover grayscale opacity-80" 
                  />
                  <div className="absolute inset-0 border border-slate-900/5 rounded-2xl pointer-events-none"></div>
              </div>
            </motion.div>
            
            {/* Right side: Functional Map */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 h-full min-h-[400px] w-full rounded-3xl overflow-hidden relative border border-slate-200/60 bg-slate-100"
            >
               <iframe 
                 title="Mapa ordinace"
                 src="https://maps.google.com/maps?q=Křižná%20857,%20757%2001%20Valašské%20Meziříčí&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                 width="100%" 
                 height="100%" 
                 className="absolute inset-0 w-full h-full border-0 grayscale opacity-90 contrast-125 mix-blend-multiply"
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
               />
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
