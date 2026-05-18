/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-brand-bg selection:bg-brand-primary selection:text-white">
      <Header />
      
      <main>
        <Hero />
        <About />
        <Services />
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}

