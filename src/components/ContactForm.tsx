import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validate = () => {
    const newErrors: any = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    try {
      await addDoc(collection(db, 'contact_submissions'), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('error');
      // handleFirestoreError(error, OperationType.CREATE, 'contact_submissions');
    }
  };

  return (
    <section id="contact" className="py-24 px-4 bg-[#F1F3EA] relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent text-brand-primary rounded-full text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
            Partner With EKOPAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-text-heading">Your Brand, in Every Hand.</h2>
          <p className="text-lg text-brand-text-muted leading-relaxed">
            Ready to amplify your message through sustainable hydration? Our business development team is here to help you create unforgettable brand moments.
          </p>
        </div>

        <div className="flex-1 w-full bg-white p-8 rounded-[32px] shadow-xl shadow-brand-primary/5 border border-brand-border">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-8 text-center"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-2">Inquiry Submitted</h3>
                <p className="text-sm text-neutral-600 mb-6">
                  Successfully received. Our team will contact you shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="bg-brand-primary text-white px-6 py-2 rounded-full font-bold hover:bg-brand-primary-dark transition-all"
                >
                  New Inquiry
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-brand-primary uppercase tracking-widest">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 bg-brand-bg border ${errors.name ? 'border-red-400' : 'border-brand-border'} rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none transition-all`}
                    placeholder="John Smith"
                  />
                  {errors.name && <p className="text-[10px] text-red-500">{errors.name}</p>}
                </div>
                
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-brand-primary uppercase tracking-widest">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 bg-brand-bg border ${errors.email ? 'border-red-400' : 'border-brand-border'} rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none transition-all`}
                    placeholder="john@company.com"
                  />
                  {errors.email && <p className="text-[10px] text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-brand-primary uppercase tracking-widest">Message</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3 bg-brand-bg border ${errors.message ? 'border-red-400' : 'border-brand-border'} rounded-xl text-sm focus:ring-2 focus:ring-brand-primary outline-none transition-all resize-none`}
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && <p className="text-[10px] text-red-500">{errors.message}</p>}
                </div>

                {status === 'error' && (
                  <div className="flex items-center space-x-2 text-red-500 bg-red-50 p-3 rounded-xl border border-red-100">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <p className="text-[11px] font-bold uppercase">Sync failed. Try again.</p>
                  </div>
                )}

                <button
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-primary-dark shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
                
                <div className="flex items-center justify-center gap-2 mt-4 opacity-50">
                  <svg className="w-4 h-4 text-brand-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>
                  <span className="text-[9px] uppercase font-bold tracking-tighter">Securely Encrypted</span>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-1/2 -left-32 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 -right-32 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}
