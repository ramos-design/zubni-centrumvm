import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Phone, MoveRight, Cpu, Microscope, Shield, HeartPulse } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const easeOutQuint = [0.22, 1, 0.36, 1];
// Symmetric ease for the carousel hand-off. easeOutQuint covers ~80% of the
// distance in the first third, which reads as a jerk followed by a crawl.
const SLIDE_EASE = [0.45, 0, 0.15, 1];

/* Verze 3 — pomalejší karusel: tři boxy nad sebou, horní je hlavní (modré
   sklo, ostrý), spodní dva jsou čím níž, tím rozmazanější. S každým
   přehozením se vymění i fotka na pozadí celé hero sekce. */
const SLIDE_INTERVAL = 6000;

// Hloubka podle slotu: shora dolů ubývá krytí a přibývá rozostření, aby
// spodní boxy vypadaly, že se teprve tlačí dopředu. Scale je držené jemné —
// rozestup mezi kartami má zůstat stejný jako ve verzi 1 a 2.
const DEPTH = [
  { opacity: 1, blur: 0, scale: 1 },
  { opacity: 0.78, blur: 3, scale: 0.98 },
  { opacity: 0.5, blur: 6.5, scale: 0.955 },
];

// Fotka se prolíná ~1,6 s a celou dobu, co je vidět, pomalu vyjíždí ze
// zvětšení zpátky na 1 (Ken Burns). Doba zoomu je delší než interval, aby se
// pohyb nikdy nezastavil a nezačal na konci „stát“.
const FADE = 1.6;
const ZOOM = 7.6;

const SLIDES = [
  {
    id: 1,
    icon: Cpu,
    label: 'Technologie',
    title: 'Moderní přístrojové',
    subtitle: 'vybavení',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=2000&q=80',
    alt: 'Moderní zubní ordinace s křeslem a přístrojovým vybavením',
    focus: 'object-center',
  },
  {
    id: 2,
    icon: Microscope,
    label: 'Inovace',
    title: 'Digitální',
    subtitle: 'laboratoř',
    image: 'https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?auto=format&fit=crop&w=2000&q=80',
    alt: '3D snímek chrupu na tabletu při digitálním plánování',
    focus: 'object-center',
  },
  {
    id: 3,
    icon: Shield,
    label: 'Specializace',
    title: 'In-house',
    subtitle: 'ortodoncie',
    image: 'https://images.unsplash.com/photo-1667133295315-820bb6481730?auto=format&fit=crop&w=2000&q=80',
    alt: 'Nasazování průhledného ortodontického aligneru pacientce',
    focus: 'object-[center_35%]',
  },
  {
    id: 4,
    icon: HeartPulse,
    label: 'Chirurgie',
    title: 'Transplantační',
    subtitle: 'centrum',
    image: 'https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=2000&q=80',
    alt: 'Tým lékařů při sterilním chirurgickém zákroku',
    focus: 'object-[center_30%]',
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  // Nahoře aktuální box, pod ním dva další, které se teprve derou nahoru.
  const visibleSlides = [
    SLIDES[index],
    SLIDES[(index + 1) % SLIDES.length],
    SLIDES[(index + 2) % SLIDES.length],
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-white">
      {/* Full-width Background Image */}
      <motion.div
        style={{ y: yImage }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
      >
        {/* Všechny fotky jsou v DOM naráz a jen se prolínají opacitou — po
            prvním načtení jsou v cache, takže přechod nikdy neproblikne
            prázdným místem. */}
        {SLIDES.map((slide, i) => {
          const active = i === index;
          return (
            <motion.img
              key={slide.id}
              src={slide.image}
              alt={slide.alt}
              initial={false}
              animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 1.14 }}
              transition={{
                opacity: { duration: FADE, ease: 'easeInOut' },
                // Na výchozí zvětšení se fotka vrací až když je neviditelná,
                // jinak by na konci prolnutí viditelně cukla.
                scale: active
                  ? { duration: ZOOM, ease: 'linear' }
                  : { duration: 0.01, delay: FADE + 0.2 },
              }}
              className={`absolute inset-0 w-full h-full object-cover z-0 ${slide.focus}`}
              style={{ filter: 'saturate(20%) contrast(115%)' }}
            />
          );
        })}

        {/* Gradients to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent z-10 w-full md:w-3/4 lg:w-2/3"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 md:from-transparent to-transparent z-10 h-full"></div>
        <div className="absolute inset-0 bg-primary-500/15 mix-blend-color z-10 pointer-events-none"></div>
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
              className="morphglass-btn-primary group inline-flex items-center gap-4 px-8 py-4 rounded-full"
            >
              <span className="text-sm font-semibold tracking-wide uppercase font-display">Objednat se</span>
              <Phone className="w-4 h-4 group-hover:scale-110 transition-transform duration-500" />
            </a>

            <a
              href="#sluzby"
              className="morphglass-btn group inline-flex items-center gap-3 px-8 py-4 rounded-full text-slate-800"
            >
              <span className="text-sm font-semibold tracking-wide uppercase font-display">Naše služby</span>
              <MoveRight className="w-4 h-4 text-primary-600 group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
          </motion.div>
        </div>

        {/* Tři boxy nad sebou ve stejném rozestupu jako ve verzi 1 a 2.
            Horní je hlavní — podbarvený modře a ostrý, ty pod ním jsou čím
            níž, tím rozmazanější a slabší. */}
        <div className="hidden md:flex flex-col gap-4 h-[340px] justify-end pb-2 relative w-[280px] shrink-0">
          <AnimatePresence mode="popLayout">
            {visibleSlides.map((slide, position) => {
              const depth = DEPTH[position] ?? DEPTH[DEPTH.length - 1];
              const isMain = position === 0;
              return (
                <motion.div
                  layout="position"
                  key={slide.id}
                  initial={{ opacity: 0, y: 40, scale: 0.94, filter: 'blur(10px)' }}
                  animate={{
                    opacity: depth.opacity,
                    y: 0,
                    scale: depth.scale,
                    filter: `blur(${depth.blur}px)`,
                  }}
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
                    scale: 0.98,
                    filter: 'blur(8px)',
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
                    filter: { duration: 0.8, ease: 'easeOut' },
                  }}
                  className={`p-5 rounded-3xl w-[280px] flex items-center gap-4 shrink-0 ${
                    isMain ? 'morphglass-primary' : 'morphglass morphglass-hover'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                      isMain ? 'morphglass-well-primary text-white' : 'morphglass-well text-primary-600'
                    }`}
                  >
                    <slide.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className={`text-[10px] font-bold uppercase tracking-widest font-display mb-0.5 ${
                      isMain ? 'text-primary-900/85' : 'text-slate-600/90'
                    }`}>
                      {slide.label}
                    </div>
                    <div className="text-sm font-semibold text-primary-950 leading-tight font-display">
                      {slide.title}<br />{slide.subtitle}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
