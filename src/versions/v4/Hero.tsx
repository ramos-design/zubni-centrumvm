import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import type { MotionValue } from 'motion/react';
import { Phone, MoveRight, Cpu, Microscope, Shield, HeartPulse } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const easeOutQuint = [0.22, 1, 0.36, 1];
// Symetrický ease pro předání karty — easeOutQuint ujede 80 % dráhy v první
// třetině, což vypadá jako trhnutí a pak plazení.
const SLIDE_EASE = [0.45, 0, 0.15, 1];

/* Verze 4 — jako verze 3 (měnící se fotka na pozadí), ale v hero stojí vpravo
   dva zubaři vyříznutí z pozadí a vedle nich se střídá vždy jen JEDEN box.
   Žádné rozmazané karty pod ním. */
const SLIDE_INTERVAL = 6000;

/* Průhledný výřez (PNG/WebP s alfa kanálem) dvou zubařů. Soubor patří do
   složky public/, takže se servíruje z kořene webu. Když chybí, hero se
   zobrazí bez něj (viz onError níž) a na jeho místě zůstane jen nápověda. */
const DENTISTS_CUTOUT = '/zubari.png';

// Fotka se prolíná ~1,6 s a celou dobu, co je vidět, pomalu vyjíždí ze
// zvětšení zpátky na 1 (Ken Burns). Doba zoomu je delší než interval, aby se
// pohyb nikdy nezastavil.
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

type Slide = (typeof SLIDES)[number];

/* Jedna karta — vždy jen ta aktuální, žádné rozmazané pod ní. Renderuje se
   dvakrát (desktopová u zubařů, mobilní v toku), proto je vytažená bokem. */
function SlideCard({ slide }: { slide: Slide }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slide.id}
        initial={{ opacity: 0, y: 36, scale: 0.96, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        exit={{
          opacity: 0,
          y: -36,
          scale: 0.97,
          filter: 'blur(8px)',
          transition: { duration: 0.45, ease: 'easeIn' },
        }}
        transition={{ duration: 0.75, ease: SLIDE_EASE }}
        className="morphglass morphglass-hover p-5 rounded-md w-full flex items-center gap-4"
      >
        <div className="morphglass-well w-12 h-12 rounded-sm text-primary-600 flex items-center justify-center shrink-0">
          <slide.icon className="w-6 h-6" />
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-600/90 font-display mb-0.5">
            {slide.label}
          </div>
          <div className="text-sm font-semibold text-primary-950 leading-tight font-display">
            {slide.title}<br />{slide.subtitle}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* Výřez dvojice. Velikost se řídí výškou rodiče, který má přes `aspect-*`
   poměr stran PNG (1038 × 1016) — místo je tak rezervované ještě před
   načtením a karta vedle nich při loadu nepodskočí. */
function Dentists({ y, onError }: { y: MotionValue<string>; onError: () => void }) {
  return (
    <motion.img
      src={DENTISTS_CUTOUT}
      alt="MUDr. Jan Šrubař a MDDr. Martin Šrubař"
      onError={onError}
      style={{ y }}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.1, delay: 0.35, ease: easeOutQuint }}
      className="h-full w-full object-contain object-bottom drop-shadow-[0_25px_45px_rgba(15,23,42,0.18)] select-none pointer-events-none"
    />
  );
}

/* Zástupný rámeček — jen dokud v public/ chybí výřez. */
function CutoutPlaceholder() {
  return (
    <div className="h-full flex items-end justify-center pb-24">
      <div className="w-[280px] border border-dashed border-primary-300/70 bg-white/50 backdrop-blur-sm rounded-md px-4 py-6 text-center">
        <div className="text-[10px] font-bold uppercase tracking-widest text-primary-600 font-display mb-1">
          Chybí fotka
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Vlož průhledné PNG dvou zubařů jako
          <br />
          <code className="text-primary-700">public{DENTISTS_CUTOUT}</code>
        </p>
      </div>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  // Zubaři se při scrollu posouvají pomaleji než pozadí, ať mezi nimi a fotkou
  // vznikne hloubka a nevypadají nalepení.
  const yDentists = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  const [index, setIndex] = useState(0);
  const [hasCutout, setHasCutout] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[index];

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
        {SLIDES.map((s, i) => {
          const active = i === index;
          return (
            <motion.img
              key={s.id}
              src={s.image}
              alt={s.alt}
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
              className={`absolute inset-0 w-full h-full object-cover z-0 ${s.focus}`}
              style={{ filter: 'saturate(20%) contrast(115%)' }}
            />
          );
        })}

        {/* Gradients to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent z-10 w-full md:w-3/4 lg:w-2/3"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 md:from-transparent to-transparent z-10 h-full"></div>
        <div className="absolute inset-0 bg-primary-500/15 mix-blend-color z-10 pointer-events-none"></div>
      </motion.div>

      {/* Světlý podklad pod nohama zubařů, aby výřez nekončil ostrým řezem
          o spodní hranu sekce. */}
      <div className="absolute bottom-0 right-0 h-40 w-full md:w-2/3 bg-gradient-to-t from-white via-white/60 to-transparent z-10 pointer-events-none" />

      {/* ── Desktop (lg+): zubaři jsou samostatná vrstva kotvená ke spodní hraně
           sekce, ne sloupec v gridu. Jen tak můžou být ~2× větší, aniž by
           roztáhli obsah nebo ukrojili šířku nadpisu. ──────────────────────── */}
      <div className="hidden lg:block absolute bottom-0 right-[1%] xl:right-[4%] h-[64vh] xl:h-[72vh] aspect-[1038/1016] z-10">
        {hasCutout ? <Dentists y={yDentists} onError={() => setHasCutout(false)} /> : <CutoutPlaceholder />}
      </div>

      {/* ── Karta má vlastní vrstvu zarovnanou na pravý okraj obsahové mřížky
           sekce (stejný max-w-7xl + padding jako text), takže lícuje s okrajem
           sekce a klidně překrývá dvojici zubařů. Výška vrstvy je stejná jako
           u zubařů, aby bottom-[38%] sedělo na původní úrovni. ───────────── */}
      <div className="hidden lg:block absolute bottom-0 inset-x-0 h-[64vh] xl:h-[72vh] z-30 pointer-events-none">
        <div className="max-w-7xl mx-auto h-full relative">
          <div className="absolute bottom-[38%] right-4 sm:right-6 lg:right-8 w-[300px] pointer-events-auto">
            <SlideCard slide={slide} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full mt-10 md:mt-0 flex flex-col items-center lg:items-start justify-between gap-16">
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

        {/* ── Do lg: zubaři i karta jedou v toku pod textem, ať se vejdou na
             úzký displej. Karta jim leží přes levý okraj (-mr) stejně jako na
             desktopu. ─────────────────────────────────────────────────────── */}
        <div className="lg:hidden w-full flex items-end justify-center gap-0">
          <div className="w-[220px] sm:w-[260px] shrink-0 -mr-14 sm:-mr-16 relative z-20">
            <SlideCard slide={slide} />
          </div>
          <div className="h-[300px] sm:h-[400px] md:h-[460px] aspect-[1038/1016] shrink-0 -mb-20 relative z-10">
            {hasCutout ? <Dentists y={yDentists} onError={() => setHasCutout(false)} /> : <CutoutPlaceholder />}
          </div>
        </div>
      </div>
    </section>
  );
}
