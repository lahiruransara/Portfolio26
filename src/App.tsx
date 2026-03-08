import React, { useState, useCallback } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { AsciiHero } from './components/AsciiHero';
import { WelcomeSection } from './components/WelcomeSection';
import { ServicesSection } from './components/ServicesSection';
import { WorkSection } from './components/WorkSection';
import { ScrambleText } from './components/ScrambleText';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Twitter, Mail, ArrowUpRight, Menu, X } from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lenis = useLenis();

  const handleScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(href, {
        offset: 0,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
    setIsMenuOpen(false);
  }, [lenis]);

  const navItems = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <ReactLenis root>
      <main className="bg-black text-white selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[100] p-4 md:pt-6 md:px-8 md:pb-4 flex justify-between items-center mix-blend-difference">
        <div className="font-bold text-[12px] cursor-pointer">
          <ScrambleText text="LAHIRU RANSARA" />
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest">
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              onClick={(e) => handleScroll(e, item.href)}
              className="hover:text-zinc-400 transition-colors"
            >
              <ScrambleText text={item.label} />
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-[2px] -mr-[2px] relative z-[110] text-white"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isMenuOpen ? 'close' : 'menu'}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
          </AnimatePresence>
        </button>
      </nav>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90] bg-black flex flex-col items-start justify-center px-4 md:hidden"
          >
            <div className="flex flex-col items-start gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="text-6xl font-bold tracking-tighter hover:text-zinc-400 transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-4 left-4 text-[12px] font-mono uppercase tracking-widest text-white"
            >
              Creative Designer | UX & Design Systems
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="h-screen">
        <AsciiHero imagePath="/assets/portrait.png" />
      </section>

      {/* Welcome Section */}
      <WelcomeSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Work Section */}
      <WorkSection />

      {/* Footer */}
      <footer id="contact" className="px-4 md:px-12 pt-12 md:pt-24 lg:pt-32 pb-4 md:pb-6 lg:pb-8">
        <div className="mx-auto flex flex-col md:flex-row justify-between gap-16">
          <div className="flex flex-col gap-4">
            <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Got an interesting idea?</span>
            <h2 className="text-[clamp(36px,5.8vw,88px)] font-bold">LET'S TALK.</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-16 sm:gap-24 font-mono">
            <div className="flex flex-col gap-4">
              <span className="text-zinc-500 text-[10px] uppercase tracking-widest">Social</span>
              <a href="#" className="group flex items-center gap-1 hover:text-zinc-400 transition-colors text-xs">
                <ScrambleText text="Instagram" />
                <ArrowUpRight size={12} className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#" className="group flex items-center gap-1 hover:text-zinc-400 transition-colors text-xs">
                <ScrambleText text="LinkedIn" />
                <ArrowUpRight size={12} className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#" className="group flex items-center gap-1 hover:text-zinc-400 transition-colors text-xs">
                <ScrambleText text="Dribbble" />
                <ArrowUpRight size={12} className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#" className="group flex items-center gap-1 hover:text-zinc-400 transition-colors text-xs">
                <ScrambleText text="Upwork" />
                <ArrowUpRight size={12} className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#" className="group flex items-center gap-1 hover:text-zinc-400 transition-colors text-xs">
                <ScrambleText text="Behance" />
                <ArrowUpRight size={12} className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-zinc-500 text-[10px] uppercase tracking-widest">Contact</span>
              <a href="mailto:lahiruransara@icloud.com" className="hover:text-zinc-400 transition-colors text-xs whitespace-nowrap">
                <ScrambleText text="lahiruransara@icloud.com" />
              </a>
              <a href="tel:+19866009246" className="hover:text-zinc-400 transition-colors text-xs">
                <ScrambleText text="+1 986 600 9246" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mx-auto mt-32 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-start sm:items-center sm:gap-0 text-xs text-zinc-500 font-mono uppercase tracking-tighter">
          <span>© 2026 LAHIRU RANSARA</span>
          <span>Designed with lots of ❤ and built with <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><ScrambleText text="Google AI Studio" className="underline" /></a></span>
        </div>
      </footer>
    </main>
    </ReactLenis>
  );
}
