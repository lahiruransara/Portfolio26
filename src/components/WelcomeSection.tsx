import React from 'react';
import { motion } from 'motion/react';

export const WelcomeSection: React.FC = () => {
  return (
    <section 
      id="about" 
      className="w-full min-h-screen flex flex-col items-start justify-start pt-8 pb-16 md:pt-12 md:pb-[clamp(80px,8vw,140px)] relative"
    >
      {/* Full screen width header - Sticky */}
      <div 
        className="w-full px-4 md:px-12 sticky z-40 mix-blend-difference"
        style={{ 
          top: 'calc(var(--sticky-top, 32px) + clamp(10px, 1.5vw, 16px))',
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
          <span className="text-violet-500 font-mono uppercase tracking-[0.2em] font-normal text-[clamp(12px,0.85vw,13px)]">Welcome</span>
        </div>
      </div>

      {/* Max width content container */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-12">
        <div className="flex flex-col items-start text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-bold mt-[clamp(72px,14vw,120px)] md:mt-[clamp(80px,10vw,140px)] mb-[clamp(48px,10vw,96px)] md:mb-[clamp(56px,7vw,112px)]"
            style={{ 
              fontSize: 'clamp(36px, 5.8vw, 88px)',
              lineHeight: 1.05,
              letterSpacing: '-0.04em'
            }}
          >
            Hi, I'm Lahiru<br />
            I design <span className="text-violet-500 italic">solutions</span> for<br />
            complex problems
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl space-y-7 text-zinc-400 leading-relaxed"
            style={{ fontSize: 'clamp(15px, 1.2vw, 19px)' }}
          >
            <p>
              I have 5+ years of experience in UX design, focusing on user experiences and design systems for software, web, and mobile products. I work mostly with products that have too many flows, too many stakeholders, and not enough structure. That's usually where I feel at home.
            </p>
            <p>
              I like clarity. I like systems. I like when things make sense.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
