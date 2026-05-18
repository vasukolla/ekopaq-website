import { motion } from 'motion/react';
import { Target, Heart, Sparkles } from 'lucide-react';
import aboutImage from '../assets/images/regenerated_image_1778840884599.webp';

export default function About() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-[3rem] overflow-hidden">
              <img
                src={aboutImage}
                alt="Woman drinking from sustainable EKOPAQ water carton in a scenic mountain landscape"
                className="w-full aspect-[4/3] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-brand-primary text-white p-8 rounded-3xl shadow-2xl hidden md:block">
              <div className="text-4xl font-bold mb-1">0%</div>
              <div className="text-sm font-medium opacity-80 uppercase tracking-widest">Plastic Waste</div>
            </div>
          </motion.div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900">Our Vision for a Cleaner Earth</h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                EKOPAQ was born from a simple realization: the world's most essential resource shouldn't be wrapped in its most damaging material. We've developed a system that balances commerce with conservation.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="text-brand-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1">Targeted Advertising</h4>
                  <p className="text-sm text-neutral-500">Reach consumers in meaningful moments with high-recall packaging.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="text-pink-500 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1">Social Impact</h4>
                  <p className="text-sm text-neutral-500">Part of every partnership goes towards ocean cleanup and community welfare.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="text-amber-500 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1">Pure Quality</h4>
                  <p className="text-sm text-neutral-500">Mineral-rich, sourced from protected aquifers for the highest purity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
