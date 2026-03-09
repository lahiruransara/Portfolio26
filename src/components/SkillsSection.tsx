import React from 'react';
import { motion } from 'motion/react';

const skills = [
  {
    title: "UI / Visual Design",
    description: "Creating unique and accessible designs that not only feel intuitive but also leave a memorable impression on users."
  },
  {
    title: "UX Design",
    description: "Shaping meaningful experiences that truly honour the diverse needs, behaviours, and journeys of our users."
  },
  {
    title: "Enterprise Design Thinking",
    description: "Bringing people and process together to solve complex challenges with a deep sense of empathy and understanding."
  },
  {
    title: "Design Strategy",
    description: "Aligning vision and value, turning insights into intentional, impactful design direction."
  },
  {
    title: "Brand Identity",
    description: "Crafting expressive and cohesive identities that reflect the essence of who brands truly are."
  }
];

export const SkillsSection: React.FC = () => {
  return (
    <section 
      id="skills" 
      className="w-full flex flex-col items-start justify-start pt-8 pb-16 md:pt-12 md:pb-[clamp(80px,8vw,140px)] relative"
    >
      {/* Sticky Header */}
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
          <span className="text-violet-500 font-mono uppercase tracking-[0.2em] font-normal text-[clamp(12px,0.85vw,13px)]">What I'm good at</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-12">
        <div className="flex flex-col items-start text-left">
          {/* Section Title */}
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
            Expertise and <span className="text-violet-500 italic">skills</span>
          </motion.h2>

          {/* Skills List */}
          <div className="w-full border-t border-zinc-900">
            {skills.map((skill, index) => (
              <motion.div 
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12 py-6 md:py-16 border-b border-zinc-900 group"
              >
                <div className="md:col-span-5 flex items-center gap-4">
                  <div className="w-4 h-[1px] bg-violet-500 shrink-0" />
                  <h3 className="text-[clamp(20px,2vw,32px)] font-medium tracking-tight">
                    {skill.title}
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-zinc-400 leading-relaxed max-w-[520px]" style={{ fontSize: 'clamp(14px, 1.1vw, 17px)' }}>
                    {skill.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
