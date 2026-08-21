import { motion } from 'motion/react';

export default function Expertise() {
  return (
    <section id="odbornost" className="py-32 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-20">
          <h2 className="text-sm font-bold tracking-widest text-primary-600 uppercase mb-6">Pro odborníky</h2>
          <h3 className="text-4xl md:text-5xl font-display font-semibold text-slate-900 leading-[1.2]">
            Neseme odpovědnost za <span className="text-primary-600">budoucnost stomatologie.</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-12 border-t border-slate-200 pt-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-primary-400 mb-6 font-display text-lg">01 / Vzdělávání</div>
            <h4 className="text-2xl font-display font-medium mb-4">Školící centrum</h4>
            <p className="text-slate-600 font-light leading-relaxed">
              Působíme jako certifikované školící centrum pro parodontologii a dentoalveolární chirurgii 2. typu. Pořádáme specializované kurzy a workshopy pro lékaře z celé republiky, kde sdílíme naše ověřené léčebné protokoly.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-primary-400 mb-6 font-display text-lg">02 / Klinická praxe</div>
            <h4 className="text-2xl font-display font-medium mb-4">Spolupráce s FNO</h4>
            <p className="text-slate-600 font-light leading-relaxed">
              Naši přední specialisté aktivně působí ve Fakultní nemocnici Ostrava v rámci slizniční poradny. Nedílnou součástí naší práce je i podíl na klinické výuce studentů stomatologie.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-primary-400 mb-6 font-display text-lg">03 / Výzkum</div>
            <h4 className="text-2xl font-display font-medium mb-4">Publikační činnost</h4>
            <p className="text-slate-600 font-light leading-relaxed">
              Pravidelně publikujeme odborné články v recenzovaných časopisech a přednášíme na významných stomatologických kongresech, čímž neustále posouváme úroveň české péče.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
