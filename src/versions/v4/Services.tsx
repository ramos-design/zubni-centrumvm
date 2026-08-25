import { motion } from 'motion/react';
import { useState } from 'react';

const services = [
  {
    id: "01",
    title: "Ortodoncie",
    description: "Srovnáme váš úsměv pomocí moderních neviditelných dlah i klasických rovnátek s využitím Dental monitoringu.",
    image: "https://images.unsplash.com/photo-1598256989800-fea5f00e9981?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Chirurgie",
    description: "Bezbolestné stomatochirurgické zákroky s maximálním ohledem na vaše pohodlí v našem moderním centru.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Implantologie",
    description: "Zavádění špičkových zubních implantátů a složité rekonstrukce chrupu s využitím moderních 3D technologií.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "Parodontologie",
    description: "Léčba paradentózy pomocí standardizovaného protokolu na našem školícím pracovišti 2. typu.",
    image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "05",
    title: "Dentální hygiena",
    description: "Základ zdravého úsměvu. Šetrné odstranění zubního kamene a plaku s využitím moderních pískovačů.",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop"
  }
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="sluzby" className="py-32 bg-primary-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl font-display font-semibold text-[#0E80BA] mb-6"
          >
            Multioborová péče
          </motion.h2>
        </div>

        <div className="flex flex-col border-t border-primary-800">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-primary-800 cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-16 z-10 w-full md:w-auto">
                <span className="text-xl font-display text-primary-500 font-light transition-colors group-hover:text-primary-300">
                  {service.id}
                </span>
                <h3 className="text-3xl md:text-5xl font-display font-semibold transition-transform duration-500 ease-out group-hover:translate-x-4">
                  {service.title}
                </h3>
              </div>
              
              <div className="mt-4 md:mt-0 z-10 max-w-sm md:text-right">
                <p className="text-primary-200 font-light md:opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
