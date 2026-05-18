import { motion } from 'motion/react';
import { Leaf, Menu, X, Droplets, Home, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import ekopaqLogo from '../assets/images/regenerated_image_1778898557185.jpg';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', icon: Home },
    { name: 'About', icon: Leaf },
    { name: 'Services', icon: Droplets },
    { name: 'Contact', icon: MessageSquare },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/80 backdrop-blur-md border-b border-brand-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-28">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center group cursor-pointer"
          >
            <img 
              src={ekopaqLogo} 
              alt="EKOPAQ Logo" 
              className="h-[90px] w-auto object-contain transition-transform group-hover:scale-105 mix-blend-multiply"
            />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  const el = document.getElementById(item.name.toLowerCase());
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`text-sm font-medium transition-colors flex items-center space-x-1 ${item.name === 'Home' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-brand-text-muted hover:text-brand-primary'}`}
              >
                <span>{item.name}</span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-neutral-600 hover:text-brand-primary transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-brand-bg border-b border-brand-primary/10 py-4 px-4 space-y-4"
        >
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setIsOpen(false);
                const el = document.getElementById(item.name.toLowerCase());
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center space-x-3 w-full p-3 text-neutral-600 hover:bg-brand-primary/10 hover:text-brand-primary rounded-lg transition-all"
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </motion.div>
      )}
    </header>
  );
}
