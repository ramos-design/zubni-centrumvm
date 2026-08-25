import { motion } from 'motion/react';
import { User, Users } from 'lucide-react';

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "MUDr. Jan Šrubař",
    role: "Zubní lékař, chirurg a parodontolog",
    image: "",
    bio: "Absolvent Univerzity Palackého v Olomouci. Od roku 2013 vede soukromou zubní praxi se zaměřením na dentoalveolární chirurgii, parodontologii a implantologii. Je členem předních odborných společností."
  },
  {
    id: 2,
    name: "MDDr. Martin Šrubař",
    role: "Ortodontista",
    image: "",
    bio: "Vystudoval zubní lékařství v Olomouci a absolvoval atestaci v oboru ortodoncie. Po odborné praxi ve FN Motol vede od roku 2016 soukromou ortodontickou praxi ve Valašském Meziříčí."
  },
  {
    id: 3,
    name: "Adéla Bukovjanová, DiS.",
    role: "Dentální hygienistka",
    image: "",
    bio: "Diplomovaná dentální hygienistka s licencí k výkonu povolání bez odborného dohledu. V ordinaci MUDr. Šrubaře působí již od roku 2014 a zaměřuje se na prevenci i parodontologii."
  },
  {
    id: 4,
    name: "Bc. Veronika Třetinová",
    role: "Dentální hygienistka",
    image: "",
    bio: "Absolvovala obor dentální hygienistka na lékařské fakultě Masarykovy univerzity v Brně. Od roku 2018 působí v našem centru se specializací na detailní parodontologickou péči."
  }
];

export default function Team() {
  return (
    <section id="nas-tym" className="py-24 bg-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary-50 rounded-full blur-3xl opacity-50 z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Centered Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-semibold text-slate-900 mb-6 leading-tight text-balance"
          >
            Seznamte se s naším týmem
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-600 text-balance mx-auto"
          >
            Jsme tým specialistů, kteří spojili své síly, abychom vám nabídli komplexní péči pod jednou střechou. Zakládáme si na neustálém vzdělávání a přátelské atmosféře, díky které se u nás budete cítit uvolněně.
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col"
            >
              {/* Photo */}
              <div className="w-full relative overflow-hidden rounded-md aspect-[4/5] bg-slate-100/80 mb-5 flex items-center justify-center border border-slate-200/60">
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 group-hover:text-primary-300 transition-colors duration-500">
                    <User className="w-24 h-24" strokeWidth={1} />
                  </div>
                )}
              </div>
              
              {/* Info */}
              <div className="flex flex-col">
                <h3 className="text-xl lg:text-2xl font-display font-semibold text-slate-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-slate-600 leading-relaxed text-balance">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
