import { motion } from 'motion/react';
import { Package, LineChart, Globe, Zap } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Package,
      title: 'Eco-Packaging',
      description: 'Paper-based, 100% recyclable water packaging that drastically reduces plastic footprint.',
      color: 'bg-green-500/10 text-green-500'
    },
    {
      icon: LineChart,
      title: 'Brand Advertising',
      description: 'Turn your packaging into a powerful storytelling canvas with custom graphics and QR integrations.',
      color: 'bg-blue-500/10 text-blue-500'
    },
    {
      icon: Globe,
      title: 'Global Logistics',
      description: 'Efficient distribution networks that ensure your branded water reaches the right hands.',
      color: 'bg-amber-500/10 text-amber-500'
    },
    {
      icon: Zap,
      title: 'Impact Tracking',
      description: 'Real-time analytics on environmental impact and campaign engagement metrics.',
      color: 'bg-purple-500/10 text-purple-500'
    }
  ];

  return (
    <section id="services" className="py-24 px-4 bg-brand-bg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900">What We Offer</h2>
            <p className="text-lg text-neutral-600">
              Beyond just water, we provide a holistic platform for sustainable growth and brand visibility.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="group bg-white p-8 rounded-3xl border border-brand-primary/5 hover:border-brand-primary/20 hover:shadow-2xl transition-all h-full"
            >
              <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-900">{service.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
