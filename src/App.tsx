import { useState } from 'react';
import { AsciiHero } from './components/AsciiHero';
import { WelcomeSection } from './components/WelcomeSection';
import { ServicesSection } from './components/ServicesSection';
import { ScrambleText } from './components/ScrambleText';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Twitter, Mail, ArrowUpRight, Menu, X } from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <main className="bg-black text-white selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[100] p-4 md:pt-6 md:px-8 md:pb-4 flex justify-between items-center mix-blend-difference">
        <div className="font-bold text-[12px] cursor-pointer">
          <ScrambleText text="LAHIRU RANSARA" />
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="hover:text-zinc-400 transition-colors">
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
                  onClick={() => setIsMenuOpen(false)}
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
      <section id="work" className="px-4 md:px-6 lg:px-8 py-32 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">SELECTED<br />WORKS</h2>
          <p className="max-w-xs text-zinc-400 font-mono text-xs uppercase tracking-widest leading-relaxed">
            A collection of digital experiences built with code and creativity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[1, 2, 3, 4].map((i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] bg-zinc-900 overflow-hidden mb-6 relative">
                <img 
                  src={`https://picsum.photos/seed/work-${i}/1200/800`} 
                  alt={`Project ${i}`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ArrowUpRight size={48} className="text-white" />
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-1">PROJECT NAME {i}</h3>
                  <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">Web Design / Development / 2024</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="px-4 md:px-6 lg:px-8 py-32 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16">
          <div className="flex flex-col gap-8">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">LET'S BUILD<br />SOMETHING.</h2>
            <div className="flex gap-4">
              <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-zinc-200 transition-colors">
                Get in touch
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-16">
            <div className="flex flex-col gap-4">
              <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">Social</span>
              <a href="#" className="hover:text-zinc-400 transition-colors">Instagram</a>
              <a href="#" className="hover:text-zinc-400 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-zinc-400 transition-colors">Dribbble</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">Contact</span>
              <a href="mailto:hello@example.com" className="hover:text-zinc-400 transition-colors">hello@example.com</a>
              <div className="flex items-center gap-2 mt-4">
                <Mail size={14} className="text-zinc-500" />
                <span className="text-zinc-500 text-xs">Tokyo, Japan</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-32 pt-8 border-t border-zinc-900 flex justify-between items-center text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
          <span>© 2024 LAHIRU RANSARA</span>
          <span>Built with React & Three.js</span>
        </div>
      </footer>
    </main>
  );
}
