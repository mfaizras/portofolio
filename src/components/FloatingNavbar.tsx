import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, User, Briefcase, Code, Folder, Mail, FileText, GraduationCap, Trophy } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about', icon: User },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Skills', href: '#skills', icon: Code },
  { name: 'Projects', href: '#projects', icon: Folder },
  { name: 'Achievements', href: '#achievements', icon: Trophy },
  { name: 'Education', href: '#education', icon: GraduationCap },
  { name: 'Blog', href: '#blog', icon: FileText },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export default function FloatingNavbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    // Optimization: Use IntersectionObserver for active section highlighting
    // This avoids querying the DOM and forcing reflows on every scroll frame
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Active triggers when section is near top/middle
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    navLinks.forEach(link => {
      const sectionId = link.href.substring(1);
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    // Optimization: Throttled scroll listener for navbar visibility only
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const threshold = aboutSection.offsetTop - 100;
                setIsVisible(window.scrollY > threshold);
            }
            ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true }); // passive for performance

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0, x: '-50%' }}
          animate={{ y: 0, opacity: 1, x: '-50%' }}
          exit={{ y: -100, opacity: 0, x: '-50%' }}
          transition={{ duration: 0.3 }}
          className="fixed top-6 left-1/2 z-50 pointer-events-none" // pointer-events-none on wrapper to pass clicks through if needed
        >
          <nav className="flex items-center gap-1 bg-bgSecondary/80 backdrop-blur-md border border-white/10 rounded-full px-2 py-1.5 shadow-2xl pointer-events-auto">
            
            <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="p-2.5 rounded-full text-secondary hover:text-primary hover:bg-white/5 transition-all"
                title="Back to Top"
            >
                <Home size={18} />
            </button>

            <div className="w-px h-6 bg-white/10 mx-1" />

            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
                    ${isActive ? 'text-bg bg-primary' : 'text-text hover:text-primary hover:bg-white/5'}
                  `}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <link.icon size={16} className={isActive ? 'text-bg' : ''} />
                  <span className="hidden md:block">{link.name}</span>
                </button>
              );
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
