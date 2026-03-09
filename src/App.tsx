import React, { useState, useCallback } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { AsciiHero } from './components/AsciiHero';
import { WelcomeSection } from './components/WelcomeSection';
import { ServicesSection } from './components/ServicesSection';
import { WorkSection } from './components/WorkSection';
import { ScrambleText } from './components/ScrambleText';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Twitter, Mail, ArrowUpRight, Menu, X } from 'lucide-react';
import portrait from './assets/portrait.png';

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
        <AsciiHero imagePath={portrait} />
      </section>

      {/* Welcome Section */}
      <WelcomeSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Work Section */}
      <WorkSection />

      {/* Footer */}
      <footer id="contact" className="min-h-screen w-full bg-black text-white px-4 md:px-12 pt-12 xl:pt-24 pb-4 md:pb-12 flex flex-col relative">
        {/* Top Label - Sticky */}
        <div 
          className="w-full sticky z-40 mix-blend-difference left-0"
          style={{ 
            top: 'calc(var(--sticky-top, 40px) + clamp(10px, 1.5vw, 16px))',
            height: '0px'
          }}
        >
          <style dangerouslySetInnerHTML={{ __html: `
            :root { --sticky-top: 40px; }
            @media (min-width: 768px) {
              :root { --sticky-top: 48px; }
            }
          `}} />
          <div className="flex items-center gap-4">
            <div className="w-8 h-[1px] bg-violet-500" />
            <span className="text-violet-500 font-mono uppercase tracking-[0.2em] text-[clamp(10px,0.8vw,12px)]">Contact</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col justify-end flex-1 mt-[clamp(100px,15vh,160px)]">
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12 w-full">
            <div className="flex flex-col gap-6 xl:gap-12 w-full">
              <span className="text-zinc-400 font-mono text-sm xl:text-xl uppercase tracking-widest">Got an interesting idea?</span>
              <h2 className="text-[clamp(72px,18vw,240px)] font-bold leading-[0.65] tracking-normal w-full">
                Let's <br /> connect.
              </h2>
            </div>

            <div className="flex flex-col items-start xl:items-end gap-6 font-mono text-[10px] xl:text-xs uppercase tracking-[0.2em] text-white text-left xl:text-right">
              <div className="flex flex-col items-start xl:items-end gap-3">
                <a href="https://www.linkedin.com/in/lahiruransara/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">
                  <ScrambleText text="LinkedIn" />
                </a>
                <a href="https://www.behance.net/lahiruransara" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">
                  <ScrambleText text="Behance" />
                </a>
                <a href="https://www.upwork.com/freelancers/~019866009246" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">
                  <ScrambleText text="Upwork" />
                </a>
              </div>
              <a href="mailto:lahiruransara@icloud.com" className="hover:text-zinc-400 transition-colors mt-4">
                <ScrambleText text="lahiruransara@icloud.com" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
    </ReactLenis>
  );
}
