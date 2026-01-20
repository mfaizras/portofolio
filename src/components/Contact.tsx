import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Send, Github, Linkedin, Twitter, Instagram,Facebook, ExternalLink } from 'lucide-react';
import SocialData from '../data/socialMedia.json';
import ContactData from '../data/hero.json';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setIsSent(false), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-heading mb-4">
            Let's Work Together
          </h2>
          <p className="mt-6 text-text text-lg max-w-2xl mx-auto">
            {ContactData.contactDesc}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Contact Info */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <h3 className="text-2xl font-bold text-heading mb-6">Get in Touch</h3>
                <p className="text-text leading-relaxed mb-10">
                    {ContactData.getInTouchText}
                </p>

                <div className="space-y-6 mb-12">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-bgSecondary border border-white/5 rounded-lg text-primary">
                            <Mail size={24} />
                        </div>
                        <div>
                            <h4 className="text-heading font-semibold mb-1">Email</h4>
                            <a href={`mailto:${ContactData.email}`} className="text-secondary hover:text-primary transition-colors">
                                {ContactData.email}
                            </a>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-bgSecondary border border-white/5 rounded-lg text-primary">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h4 className="text-heading font-semibold mb-1">Location</h4>
                            <p className="text-text">
                                {ContactData.location}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5">
                    <h4 className="text-heading font-semibold mb-4">Connect with me</h4>
                    <div className="flex gap-4">
                        {SocialData.map((Social, index) => (
                            <a 
                                key={index}
                                href={Social.href}
                                className="p-3 bg-bgSecondary border border-white/5 rounded-lg text-text hover:text-primary hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
                            >
                                <i className={Social.icon}></i>
                            </a>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-bgSecondary p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden"
            >
                 {/* Decorative Form Background */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

                 <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-semibold text-heading uppercase tracking-wider">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            className="bg-bg border border-white/10 rounded-xl px-4 py-3 text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-white/20"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-semibold text-heading uppercase tracking-wider">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            required
                            className="bg-bg border border-white/10 rounded-xl px-4 py-3 text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-white/20"
                            placeholder="john@example.com"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-sm font-semibold text-heading uppercase tracking-wider">Message</label>
                        <textarea 
                            id="message" 
                            name="message"
                            value={formState.message}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="bg-bg border border-white/10 rounded-xl px-4 py-3 text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none placeholder:text-white/20"
                            placeholder="Tell me about your project..."
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting || isSent}
                        className={`mt-4 group flex items-center justify-center gap-2 py-4 px-8 rounded-xl font-bold bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98] ${isSent ? 'from-green-500 to-green-600' : ''}`}
                    >
                        {isSubmitting ? (
                            'Sending...'
                        ) : isSent ? (
                            'Message Sent!'
                        ) : (
                            <>
                                Send Message <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                 </form>
            </motion.div>

        </div>

        {/* Footer Copyright */}
        <div className="mt-24 pt-8 border-t border-white/5 text-center text-text/50 text-sm">
            <p>&copy; {new Date().getFullYear()} {ContactData.footerName}. All rights reserved.</p>
        </div>

      </div>
    </section>
  );
}
