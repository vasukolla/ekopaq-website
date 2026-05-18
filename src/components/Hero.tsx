import { motion } from 'motion/react';
import { ArrowRight, Leaf, Recycle, Award } from 'lucide-react';
import heroImage from '../assets/images/regenerated_image_1778840513536.jpg';

export default function Hero() {
  return (
    <section id="home" className="pt-44 pb-20 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:flex-[0.8] space-y-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-sm font-semibold"
          >
            <Leaf className="w-4 h-4" />
            <span>Sustainable Future of Packaging</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl font-extrabold text-brand-text-heading leading-[1.1] font-serif"
          >
            Fresh Hydration, <br />
            <span className="text-brand-secondary">Zero Cost</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-brand-text-muted max-w-lg mx-auto lg:mx-0 leading-relaxed"
          >
            Experience pure, refreshing spring water—provided to everyone, everywhere, at no cost. At ekopaq, every sip comes in packaging funded by brand partnerships, not consumers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-brand-primary text-white rounded-full font-bold hover:bg-brand-primary-dark shadow-sm transition-all group flex items-center w-full sm:w-auto justify-center"
            >
              Start Your Inquiry
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>


        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="lg:flex-[1.2] relative"
        >
          <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl">
            <img
              src={heroImage}
              alt="EKOPAQ Sustainable Water Carton"
              className="w-full aspect-[4/5] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-brand-primary/20 rounded-full blur-3xl" />
          
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 -right-8 z-20 bg-white p-4 rounded-2xl shadow-xl border border-brand-primary/10 hidden md:block"
          >
            <Recycle className="text-brand-primary w-8 h-8 mb-2" />
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-400">Mission</div>
            <div className="text-sm font-semibold">Zero Waste</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-1/4 -left-8 z-20 bg-white p-4 rounded-2xl shadow-xl border border-brand-primary/10 hidden md:block"
          >
            <Award className="text-brand-primary w-8 h-8 mb-2" />
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-400">Impact</div>
            <div className="text-sm font-semibold">Global Outreach</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
