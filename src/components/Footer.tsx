import { motion } from 'motion/react';
import { Droplets } from 'lucide-react';
import ekopaqLogo from '../assets/images/regenerated_image_1778898557185.jpg';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center">
            <img 
              src={ekopaqLogo} 
              alt="EKOPAQ Logo" 
              className="h-[90px] w-auto object-contain grayscale invert mix-blend-screen"
            />
          </div>
          <p className="text-neutral-400 max-w-sm leading-relaxed">
            Leading the charge in sustainable water packaging and innovative advertising. 
            Join us in our mission to eliminate plastic waste and promote eco-conscious branding.
          </p>

        </div>

        <div className="space-y-6">
          <ul className="space-y-4 text-neutral-400">
            <FooterLink label="Privacy Policy" />
            <FooterLink label="Terms of Service" />
            <FooterLink label="Sustainability Report" />
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 mt-20 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm text-neutral-500">
          © {new Date().getFullYear()} EKOPAQ. All rights reserved.
        </div>
        <div className="text-xs text-neutral-600 flex items-center space-x-1">
          <span>Crafted with</span>
          <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
          <span>for the Planet.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ label }: { label: string }) {
  return (
    <li>
      <button className="text-neutral-400 hover:text-brand-primary transition-colors cursor-pointer">
        {label}
      </button>
    </li>
  );
}


