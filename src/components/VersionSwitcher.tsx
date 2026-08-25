import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check, Layers } from 'lucide-react';
import { useVersion } from '../versions/VersionContext';

/* Přepínač verzí. Sdílený mezi všemi verzemi stránky — tvar rohů
   si každá verze říká přes `sharp`, aby přepínač nevyčníval z designu. */

interface Props {
  /** true = ostré hrany (verze 2+), false = plně zakulacené (verze 1) */
  sharp?: boolean;
  variant?: 'desktop' | 'mobile';
  onNavigate?: () => void;
}

export default function VersionSwitcher({ sharp = false, variant = 'desktop', onNavigate }: Props) {
  const { version, setVersion, versions } = useVersion();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const triggerRadius = sharp ? 'rounded-sm' : 'rounded-full';
  const panelRadius = sharp ? 'rounded-md' : 'rounded-2xl';
  const itemRadius = sharp ? 'rounded-sm' : 'rounded-xl';

  const pick = (id: string) => {
    setVersion(id);
    setOpen(false);
    onNavigate?.();
  };

  const current = versions.find((v) => v.id === version);

  if (variant === 'mobile') {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-2xl font-display font-semibold text-slate-900">
          <Layers className="w-5 h-5 text-primary-600" />
          Verze
        </div>
        <div className="flex flex-col gap-2">
          {versions.map((v) => {
            const active = v.id === version;
            return (
              <button
                key={v.id}
                onClick={() => pick(v.id)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 border text-left transition-colors ${itemRadius} ${
                  active
                    ? 'bg-primary-50 border-primary-200 text-primary-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-primary-200'
                }`}
              >
                <span>
                  <span className="block text-base font-semibold">{v.label}</span>
                  <span className="block text-xs text-slate-400">{v.description}</span>
                </span>
                {active && <Check className="w-4 h-4 shrink-0 text-primary-600" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`px-3 lg:px-4 py-2 text-sm font-semibold transition-all inline-flex items-center gap-1.5 ${triggerRadius} ${
          open ? 'text-primary-600 bg-primary-50' : 'text-slate-600 hover:text-primary-600 hover:bg-primary-50'
        }`}
      >
        Verze
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            role="menu"
            className={`absolute right-0 top-full mt-3 w-64 p-1.5 bg-white/95 backdrop-blur-xl border border-primary-100 shadow-xl shadow-primary-900/10 z-50 ${panelRadius}`}
          >
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Vyber verzi designu
            </div>
            {versions.map((v) => {
              const active = v.id === version;
              return (
                <button
                  key={v.id}
                  type="button"
                  role="menuitem"
                  onClick={() => pick(v.id)}
                  className={`w-full flex items-start justify-between gap-3 px-3 py-2.5 text-left transition-colors ${itemRadius} ${
                    active ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>
                    <span className="block text-sm font-semibold">{v.label}</span>
                    <span className="block text-xs text-slate-400">{v.description}</span>
                  </span>
                  {active && <Check className="w-4 h-4 shrink-0 mt-0.5 text-primary-600" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only">Aktuální verze: {current?.label}</span>
    </div>
  );
}
