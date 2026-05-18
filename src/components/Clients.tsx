import { motion } from 'motion/react';

export default function Clients() {
  const clients = ['NatureFirst', 'AquaPure', 'EcoVentures', 'GreenLife', 'GlobalHydrate'];

  return (
    <section className="py-20 bg-white border-y border-brand-primary/5">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-12">
          Trusted by Industry Leaders
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          {clients.map((client) => (
            <div key={client} className="text-2xl md:text-3xl font-serif font-bold text-neutral-900 tracking-tighter cursor-default hover:text-brand-primary transition-colors">
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
