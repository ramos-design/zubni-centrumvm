import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

const features = [
  {
    title: "Technologický náskok",
    description: "Moderní přístrojové vybavení, in-house digitální laboratoř a Dental monitoring pro maximální přesnost ošetření, které zkracuje čas strávený v křesle.",
    number: "01",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "In-house péče",
    description: "Multioborová spolupráce pod jednou střechou. Od ortodoncie přes parodontologii až po chirurgii – vše vyřešíte plynule na jednom pracovišti.",
    number: "02",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Lidský přístup",
    description: "Zakládáme si na klidné a přátelské atmosféře bez stresu. Ke každému pacientovi přistupujeme individuálně, s respektem a empatií.",
    number: "03",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Rodinná tradice",
    description: "Stavíme na pevných základech, více než 20 letech zkušeností a dlouholeté důvěře našich pacientů z celého regionu.",
    number: "04",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop"
  }
];

export default function Features() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="o-nas" className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Sticky Left Column */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-5xl font-display font-semibold text-slate-900 mb-6"
              >
                Proč svěřit úsměv <br />
                <span className="text-primary-600">právě nám?</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg text-slate-500 font-light max-w-md"
              >
                Naším cílem je poskytovat péči na nejvyšší světové úrovni bez marketingového přehánění. Jen čistá, moderní a klidná medicína.
              </motion.p>
              
              {/* Dynamic Image Container (Desktop Only for stickiness) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="mt-12 relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hidden lg:block bg-slate-100"
              >
                <AnimatePresence>
                  <motion.img
                    key={activeIndex}
                    src={features[activeIndex].image}
                    alt={features[activeIndex].title}
                    initial={{ opacity: 0, filter: "blur(8px)", scale: 1.05 }}
                    animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                    exit={{ opacity: 0, filter: "blur(8px)", scale: 0.95 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* Scrolling Right Column */}
          <div className="lg:col-span-7">
            {/* Added generous padding to allow scrolling past items */}
            <div className="flex flex-col gap-24 py-12 lg:py-48">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  onViewportEnter={() => setActiveIndex(index)}
                  viewport={{ margin: "-50% 0px -50% 0px" }}
                  className="relative"
                >
                  {/* Mobile Image (Visible only on smaller screens where sticky doesn't apply well) */}
                  <div className="lg:hidden w-full aspect-video rounded-2xl overflow-hidden bg-slate-100 mb-8 relative">
                     <img 
                       src={feature.image} 
                       alt={feature.title}
                       className="absolute inset-0 w-full h-full object-cover"
                     />
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative pl-8 md:pl-12 border-l border-primary-100"
                  >
                    <div className={`absolute top-0 left-0 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white transition-colors duration-500 ${activeIndex === index ? 'bg-primary-500' : 'bg-primary-100'}`}></div>
                    
                    <div className="text-sm font-display font-bold text-primary-300 mb-3">{feature.number}</div>
                    <h3 className={`text-2xl md:text-3xl font-display font-medium mb-4 transition-colors duration-500 ${activeIndex === index ? 'text-primary-600' : 'text-slate-900'}`}>
                      {feature.title}
                    </h3>
                    <p className={`text-lg font-light leading-relaxed max-w-xl transition-colors duration-500 ${activeIndex === index ? 'text-slate-700' : 'text-slate-500'}`}>
                      {feature.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
