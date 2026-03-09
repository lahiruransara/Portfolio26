import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
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
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "end 0.5"]
  });

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
                <motion.span 
                  style={{ opacity: useTransform(scrollYProgress, [0.1, 0.25], [0.2, 1]) }}
                  className="underline decoration-zinc-100 underline-offset-4 md:underline-offset-8"
                >
                  Random Software Ltd
                </motion.span>
                <RevealText 
                  progress={scrollYProgress}
                  range={[0.1, 0.5]}
                  text=", where I design user interfaces that reshape human-software interaction."
                />
              </div>
              
              <div className="text-[clamp(15px,3.5vw,48px)] leading-[1.4] md:leading-[1.2] font-medium tracking-tight">
                <RevealText progress={scrollYProgress} range={[0, 0.5]} text="I believe in " />
                <motion.span style={{ opacity: useTransform(scrollYProgress, [0.1, 0.2], [0.2, 1]) }} className="text-violet-500">(1)</motion.span> <RevealText progress={scrollYProgress} range={[0.1, 0.5]} text="less is more, " />
                <motion.span style={{ opacity: useTransform(scrollYProgress, [0.15, 0.25], [0.2, 1]) }} className="text-violet-500">(2)</motion.span> <RevealText progress={scrollYProgress} range={[0.15, 0.5]} text="put users first, " />
                <motion.span style={{ opacity: useTransform(scrollYProgress, [0.2, 0.3], [0.2, 1]) }} className="text-violet-500">(3)</motion.span> <RevealText progress={scrollYProgress} range={[0.2, 0.5]} text="work smarter, not harder, and " />
                <motion.span style={{ opacity: useTransform(scrollYProgress, [0.25, 0.35], [0.2, 1]) }} className="text-violet-500">(4)</motion.span> <RevealText progress={scrollYProgress} range={[0.25, 0.5]} text="good communication." />
              </div>

              <div className="text-[clamp(15px,3.5vw,48px)] leading-[1.4] md:leading-[1.2] font-medium tracking-tight">
                <RevealText progress={scrollYProgress} range={[0, 0.5]} text="I value " />
                <motion.span style={{ opacity: useTransform(scrollYProgress, [0.05, 0.15], [0.2, 1]) }} className="text-violet-500">(1)</motion.span> <RevealText progress={scrollYProgress} range={[0.1, 0.5]} text="impact over output, " />
                <motion.span style={{ opacity: useTransform(scrollYProgress, [0.15, 0.25], [0.2, 1]) }} className="text-violet-500">(2)</motion.span> <RevealText progress={scrollYProgress} range={[0.2, 0.5]} text="real collaboration, " />
                <motion.span style={{ opacity: useTransform(scrollYProgress, [0.25, 0.35], [0.2, 1]) }} className="text-violet-500">(3)</motion.span> <RevealText progress={scrollYProgress} range={[0.3, 0.5]} text="design maturity, " />
                <motion.span style={{ opacity: useTransform(scrollYProgress, [0.35, 0.45], [0.2, 1]) }} className="text-violet-500">(4)</motion.span> <RevealText progress={scrollYProgress} range={[0.4, 0.5]} text="complex problem spaces, " />
                <motion.span style={{ opacity: useTransform(scrollYProgress, [0.45, 0.55], [0.2, 1]) }} className="text-violet-500">(5)</motion.span> <RevealText progress={scrollYProgress} range={[0.5, 0.6]} text="room to grow, and " />
                <motion.span style={{ opacity: useTransform(scrollYProgress, [0.55, 0.65], [0.2, 1]) }} className="text-violet-500">(6)</motion.span> <RevealText progress={scrollYProgress} range={[0.6, 0.7]} text="human-first culture." />
              </div>
            </div>

            {/* Footer Links */}
            <div className="w-full mt-12 md:mt-[clamp(80px,12vw,160px)] pt-6 md:pt-8 border-t border-zinc-900 flex flex-wrap items-center gap-x-6 md:gap-x-12 gap-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] xl:text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">Also me:</span>
              </div>
              
              <a href="#" className="group flex items-center gap-1 text-[10px] xl:text-xs font-mono uppercase tracking-[0.2em] text-white hover:text-zinc-400 transition-colors">
                <ScrambleText text="Photography" />
                <ArrowUpRight size={12} className="transition-transform" />
              </a>

              <a href="#" className="group flex items-center gap-1 text-[10px] xl:text-xs font-mono uppercase tracking-[0.2em] text-white hover:text-zinc-400 transition-colors">
                <ScrambleText text="Youtube" />
                <ArrowUpRight size={12} className="transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
