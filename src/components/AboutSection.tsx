import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { ScrambleText } from './ScrambleText';

const RevealText = ({ text, progress, range, className }: { text: string, progress: any, range: [number, number], className?: string }) => {
  const words = text.split(" ");
  const [startRange, endRange] = range;
  const totalWords = words.length;

  return (
    <span className={className}>
      {words.map((word, i) => {
        const wordStart = startRange + (i / totalWords) * (endRange - startRange);
        const wordEnd = wordStart + (1 / totalWords) * (endRange - startRange);
        return (
          <Word key={i} progress={progress} range={[wordStart, wordEnd]}>
            {word}
          </Word>
        );
      })}
    </span>
  );
};

interface WordProps {
  children: React.ReactNode;
  progress: any;
  range: [number, number];
}

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">
      {children}
    </motion.span>
  );
};

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "end 0.2"]
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section 
      ref={sectionRef}
      id="about-me" 
      className="w-full relative h-auto py-20 md:py-32"
    >
      {/* Sticky Header - Moved outside to be direct child of section for proper sticking */}
      <div 
        className="w-full px-4 md:px-12 sticky z-40 mix-blend-difference"
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
        <div className="flex items-center justify-start gap-4">
          <div className="w-8 h-[1px] bg-violet-500" />
          <span className="text-violet-500 font-mono uppercase tracking-[0.2em] font-normal text-[clamp(12px,0.85vw,13px)]">Nice to meet you</span>
        </div>
      </div>

      <div className="relative w-full h-auto flex flex-col items-start justify-start pt-8 pb-8 md:pt-12 md:pb-[clamp(80px,8vw,140px)] overflow-visible">
        {/* Content Container */}
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-12 flex-1 flex flex-col justify-start md:justify-center pt-12 md:pt-0">
          <div className="flex flex-col items-start text-left w-full">
            {/* Section Title */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-bold mt-0 mb-8 md:mb-[clamp(56px,7vw,112px)]"
              style={{ 
                fontSize: 'clamp(28px, 5.8vw, 88px)',
                lineHeight: 1.05,
                letterSpacing: '-0.04em'
              }}
            >
              Beyond the <span className="text-violet-500 italic">portfolio</span>
            </motion.h2>

            {/* Reveal Text Content */}
            <div className="max-w-5xl space-y-8 md:space-y-16 text-white w-full">
              <div className="text-[clamp(15px,3.5vw,48px)] leading-[1.4] md:leading-[1.2] font-medium tracking-tight">
                <RevealText 
                  progress={scrollYProgress}
                  range={[0, 0.5]}
                  text="I currently work as a UX Designer at "
                />
                <motion.a 
                  href="https://randomsoftware.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ opacity: useTransform(scrollYProgress, [0.1, 0.25], [0.2, 1]) }}
                  className="underline decoration-zinc-100 underline-offset-4 md:underline-offset-8 hover:text-zinc-400 transition-colors cursor-pointer"
                >
                  Random Software Ltd
                </motion.a>
                <RevealText 
                  progress={scrollYProgress}
                  range={[0.1, 0.5]}
                  text=", where I design user interfaces that reshape human-software interaction."
                />
              </div>
              
              <div className="text-[clamp(15px,3.5vw,48px)] leading-[1.4] md:leading-[1.2] font-medium tracking-tight">
                <RevealText progress={scrollYProgress} range={[0, 0.5]} text="I believe in " />
                <motion.span 
                  onMouseEnter={() => setHoveredId('belief-1')}
                  onMouseLeave={() => setHoveredId(null)}
                  onMouseMove={handleMouseMove}
                  style={{ opacity: useTransform(scrollYProgress, [0.1, 0.2], [0.2, 1]) }} 
                  className="text-violet-500 cursor-help relative inline-block"
                >
                  (1)
                </motion.span>{" "}
                <RevealText progress={scrollYProgress} range={[0.1, 0.5]} text="less is more, " />
                <motion.span 
                  onMouseEnter={() => setHoveredId('belief-2')}
                  onMouseLeave={() => setHoveredId(null)}
                  onMouseMove={handleMouseMove}
                  style={{ opacity: useTransform(scrollYProgress, [0.15, 0.25], [0.2, 1]) }} 
                  className="text-violet-500 cursor-help relative inline-block"
                >
                  (2)
                </motion.span>{" "}
                <RevealText progress={scrollYProgress} range={[0.15, 0.5]} text="put users first, " />
                <motion.span 
                  onMouseEnter={() => setHoveredId('belief-3')}
                  onMouseLeave={() => setHoveredId(null)}
                  onMouseMove={handleMouseMove}
                  style={{ opacity: useTransform(scrollYProgress, [0.2, 0.3], [0.2, 1]) }} 
                  className="text-violet-500 cursor-help relative inline-block"
                >
                  (3)
                </motion.span>{" "}
                <RevealText progress={scrollYProgress} range={[0.2, 0.5]} text="work smarter, not harder, and " />
                <motion.span 
                  onMouseEnter={() => setHoveredId('belief-4')}
                  onMouseLeave={() => setHoveredId(null)}
                  onMouseMove={handleMouseMove}
                  style={{ opacity: useTransform(scrollYProgress, [0.25, 0.35], [0.2, 1]) }} 
                  className="text-violet-500 cursor-help relative inline-block"
                >
                  (4)
                </motion.span>{" "}
                <RevealText progress={scrollYProgress} range={[0.25, 0.5]} text="good communication." />
              </div>

              <div className="text-[clamp(15px,3.5vw,48px)] leading-[1.4] md:leading-[1.2] font-medium tracking-tight">
                <RevealText progress={scrollYProgress} range={[0, 0.5]} text="I value " />
                <motion.span 
                  onMouseEnter={() => setHoveredId('value-1')}
                  onMouseLeave={() => setHoveredId(null)}
                  onMouseMove={handleMouseMove}
                  style={{ opacity: useTransform(scrollYProgress, [0.05, 0.15], [0.2, 1]) }} 
                  className="text-violet-500 cursor-help relative inline-block"
                >
                  (1)
                </motion.span>{" "}
                <RevealText progress={scrollYProgress} range={[0.1, 0.5]} text="impact over output, " />
                <motion.span 
                  onMouseEnter={() => setHoveredId('value-2')}
                  onMouseLeave={() => setHoveredId(null)}
                  onMouseMove={handleMouseMove}
                  style={{ opacity: useTransform(scrollYProgress, [0.15, 0.25], [0.2, 1]) }} 
                  className="text-violet-500 cursor-help relative inline-block"
                >
                  (2)
                </motion.span>{" "}
                <RevealText progress={scrollYProgress} range={[0.2, 0.5]} text="real collaboration, " />
                <motion.span 
                  onMouseEnter={() => setHoveredId('value-3')}
                  onMouseLeave={() => setHoveredId(null)}
                  onMouseMove={handleMouseMove}
                  style={{ opacity: useTransform(scrollYProgress, [0.25, 0.35], [0.2, 1]) }} 
                  className="text-violet-500 cursor-help relative inline-block"
                >
                  (3)
                </motion.span>{" "}
                <RevealText progress={scrollYProgress} range={[0.3, 0.5]} text="design maturity, " />
                <motion.span 
                  onMouseEnter={() => setHoveredId('value-4')}
                  onMouseLeave={() => setHoveredId(null)}
                  onMouseMove={handleMouseMove}
                  style={{ opacity: useTransform(scrollYProgress, [0.35, 0.45], [0.2, 1]) }} 
                  className="text-violet-500 cursor-help relative inline-block"
                >
                  (4)
                </motion.span>{" "}
                <RevealText progress={scrollYProgress} range={[0.4, 0.5]} text="complex problem spaces, " />
                <motion.span 
                  onMouseEnter={() => setHoveredId('value-5')}
                  onMouseLeave={() => setHoveredId(null)}
                  onMouseMove={handleMouseMove}
                  style={{ opacity: useTransform(scrollYProgress, [0.45, 0.55], [0.2, 1]) }} 
                  className="text-violet-500 cursor-help relative inline-block"
                >
                  (5)
                </motion.span>{" "}
                <RevealText progress={scrollYProgress} range={[0.5, 0.6]} text="room to grow, and " />
                <motion.span 
                  onMouseEnter={() => setHoveredId('value-6')}
                  onMouseLeave={() => setHoveredId(null)}
                  onMouseMove={handleMouseMove}
                  style={{ opacity: useTransform(scrollYProgress, [0.55, 0.65], [0.2, 1]) }} 
                  className="text-violet-500 cursor-help relative inline-block"
                >
                  (6)
                </motion.span>{" "}
                <RevealText progress={scrollYProgress} range={[0.6, 0.7]} text="human-first culture." />
              </div>
            </div>

            {/* Footer Links */}
            <div className="w-full mt-12 md:mt-[clamp(80px,12vw,160px)] pt-6 md:pt-8 border-t border-zinc-900 flex flex-wrap items-center gap-x-6 md:gap-x-12 gap-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] xl:text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">Also me:</span>
              </div>
              
              <a href="https://unsplash.com/@lahirur96" className="group flex items-center gap-1 text-[10px] xl:text-xs font-mono uppercase tracking-[0.2em] text-white hover:text-zinc-400 transition-colors">
                <ScrambleText text="Photography" />
                <ArrowUpRight size={12} className="transition-transform" />
              </a>

              <a href="https://www.youtube.com/@lahirudoesarts" className="group flex items-center gap-1 text-[10px] xl:text-xs font-mono uppercase tracking-[0.2em] text-white hover:text-zinc-400 transition-colors">
                <ScrambleText text="Youtube" />
                <ArrowUpRight size={12} className="transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {hoveredId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              position: 'fixed',
              left: mousePos.x + 20,
              top: mousePos.y + 20,
              zIndex: 1000,
              pointerEvents: 'none',
            }}
            className="max-w-[300px] p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl"
          >
            <p className="text-xs md:text-sm font-sans leading-relaxed text-zinc-300">
              {hoveredId === 'belief-1' && "Strip away the unnecessary until only what matters remains. Every element earns its place through purpose, not decoration."}
              {hoveredId === 'belief-2' && "Real people with real problems, that's where every decision starts. Empathy isn't a phase, it's the foundation."}
              {hoveredId === 'belief-3' && "Scalable systems, reusable patterns, and automation where it counts. Efficiency isn't laziness, it's respect for everyone's time."}
              {hoveredId === 'belief-4' && "The best design work means nothing if you can't explain the why. Clarity in conversation is just as important as clarity on screen."}
              
              {hoveredId === 'value-1' && "I want my work to matter. I'm looking for teams where design decisions are driven by real problems and measured by meaningful outcomes, not pixel volume."}
              {hoveredId === 'value-2' && "Design is a team sport. I value environments where engineers, PMs, and designers work as one, not in silos."}
              {hoveredId === 'value-3' && "Organizations that understand design as strategy, not decoration. A seat at the table, not just a step in the pipeline."}
              {hoveredId === 'value-4' && "I thrive in ambiguity. Enterprise, healthcare, education, the harder the problem, the more interesting the design work."}
              {hoveredId === 'value-5' && "Environments that encourage experimentation, continuous learning, and pushing beyond what's comfortable. AI, systems thinking, new methodologies."}
              {hoveredId === 'value-6' && "Teams that value empathy internally, not just in their products. Where trust, transparency, and psychological safety aren't just slogans."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
