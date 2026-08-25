import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Phone, MoveRight, Cpu, Microscope, Smartphone, Shield, HeartPulse } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const easeOutQuint = [0.22, 1, 0.36, 1];
// Symmetric ease for the carousel hand-off. easeOutQuint covers ~80% of the
// distance in the first third, which reads as a jerk followed by a crawl.
const SLIDE_EASE = [0.45, 0, 0.15, 1];
const SLIDE_INTERVAL = 3800;

const CAROUSEL_FEATURES = [
  { id: 1, icon: Cpu, label: "Technologie", title: "Moderní přístrojové", subtitle: "vybavení" },
  { id: 2, icon: Microscope, label: "Inovace", title: "Digitální", subtitle: "laboratoř" },
  { id: 3, icon: Smartphone, label: "Prevence", title: "Dental", subtitle: "monitoring" },
  { id: 4, icon: Shield, label: "Specializace", title: "In-house", subtitle: "ortodoncie" },
  { id: 5, icon: HeartPulse, label: "Chirurgie", title: "Transplantační", subtitle: "centrum" },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % CAROUSEL_FEATURES.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const visibleFeatures = [
    CAROUSEL_FEATURES[startIndex],
    CAROUSEL_FEATURES[(startIndex + 1) % CAROUSEL_FEATURES.length],
    CAROUSEL_FEATURES[(startIndex + 2) % CAROUSEL_FEATURES.length],
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-white">
      {/* Full-width Background Image */}
      <motion.div 
        style={{ y: yImage }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
      >
        {/* Gradients to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent z-10 w-full md:w-3/4 lg:w-2/3"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 md:from-transparent to-transparent z-10 h-full"></div>
        <div className="absolute inset-0 bg-primary-500/15 mix-blend-color z-10 pointer-events-none"></div>
        <img 
          src="/DSC05848-HDR.jpg" 
          alt="Moderní zubní ordinace" 
          className="w-full h-full object-cover object-[10%_center] md:object-[15%_center]"
          style={{ filter: 'saturate(20%) contrast(115%)' }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full mt-10 md:mt-0 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12">
        <div className="max-w-3xl w-full">
          <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-display font-semibold text-primary-950 leading-[1.05] mb-6 tracking-tight">
            <div className="overflow-hidden pb-2 -mb-2">
              <motion.div initial={{ y: "100%", rotate: 2 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: 1, delay: 0.1, ease: easeOutQuint }}>
                Moderní
              </motion.div>
            </div>
            <div className="overflow-hidden pb-2 -mb-2">
              <motion.div initial={{ y: "100%", rotate: 2 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: 1, delay: 0.15, ease: easeOutQuint }}>
                stomatologie
              </motion.div>
            </div>
            <div className="overflow-hidden pb-2 -mb-2">
              <motion.div initial={{ y: "100%", rotate: 2 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: 1, delay: 0.2, ease: easeOutQuint }} className="text-primary-600">
                s lidským
              </motion.div>
            </div>
            <div className="overflow-hidden pb-2 -mb-2">
              <motion.div initial={{ y: "100%", rotate: 2 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: 1, delay: 0.25, ease: easeOutQuint }} className="text-primary-600">
                přístupem.
              </motion.div>
            </div>
          </h1>
          
          <div className="overflow-hidden mb-10 max-w-xl">
            <motion.p 
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: easeOutQuint }}
              className="text-lg md:text-xl text-slate-600 text-balance leading-relaxed font-light"
            >
              Nabízíme špičkovou péči s využitím nejnovějších technologií. V naší ordinaci vás čeká klidné prostředí, bezbolestné ošetření a plná pozornost.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: easeOutQuint }}
            className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
          >
            <a 
              href="#kontakt"
              className="morphglass-btn-primary group inline-flex items-center gap-4 px-8 py-4 rounded-sm"
            >
              <span className="text-sm font-semibold tracking-wide uppercase font-display">Objednat se</span>
              <Phone className="w-4 h-4 group-hover:scale-110 transition-transform duration-500" />
            </a>
            
            <a 
              href="#sluzby"
              className="morphglass-btn group inline-flex items-center gap-3 px-8 py-4 rounded-sm text-slate-800"
            >
              <span className="text-sm font-semibold tracking-wide uppercase font-display">Naše služby</span>
              <MoveRight className="w-4 h-4 text-primary-600 group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
          </motion.div>
        </div>

        {/* Animated Carousel UI Elements */}
        <div className="hidden md:flex flex-col gap-4 h-[340px] justify-end pb-2 relative w-[280px] shrink-0">
          <AnimatePresence mode="popLayout">
            {visibleFeatures.map((feature) => (
              <motion.div 
                layout="position"
                key={feature.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                // The card below slides up into this one's slot, so the two
                // overlap — and because the panels are translucent, the leaving
                // card's 1px bottom edge stays readable *through* the arriving
                // one and sweeps across it as a hairline.
                //
                // The exit therefore has to outrun the arrival: 80px on easeOut
                // in 0.45s stays ahead of 108px on SLIDE_EASE in 0.85s for the
                // whole time it is visible, so the two never share space while
                // the leaving card still has any opacity left.
                exit={{
                  opacity: 0,
                  y: -80,
                  transition: { duration: 0.45, ease: 'easeOut' },
                }}
                // The arriving card is laid out in the bottom slot straight
                // away, while the card that currently occupies that slot is
                // still sliding out of it. Through translucent panels its top
                // edge is readable and sweeps across its neighbour as a band,
                // so its opacity is held back until the slot is nearly free.
                transition={{
                  duration: 0.85,
                  ease: SLIDE_EASE,
                  opacity: { delay: 0.5, duration: 0.35, ease: 'easeOut' },
                }}
                className="morphglass morphglass-hover p-5 rounded-md w-[280px] flex items-center gap-4 shrink-0"
              >
                <div className="morphglass-well w-12 h-12 rounded-sm text-primary-600 flex items-center justify-center shrink-0">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-600/90 font-display mb-0.5">{feature.label}</div>
                  <div className="text-sm font-semibold text-primary-950 leading-tight font-display">
                    {feature.title}<br />{feature.subtitle}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
