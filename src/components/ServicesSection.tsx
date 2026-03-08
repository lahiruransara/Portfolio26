import React from 'react';
import { motion } from 'motion/react';

const services = [
  {
    title: "UX & Product Design",
    description: "Turning ambiguous problems into clear, structured interfaces. I work across the full product lifecycle, from early discovery to polished interactions, always optimizing for the people who'll actually use the thing.",
    tags: ["End-to-end product design", "Complex workflows", "Cross-platform", "Interaction design", "Prototyping", "User flows"],
    layout: "left"
  },
  {
    title: "Design Systems & Ops",
    description: "Building the infrastructure that makes good design repeatable. Component libraries, token architectures, the boring-sounding stuff that quietly saves thousands of hours.",
    tags: ["Component architecture", "Design tokens", "Variables setup", "Theming", "Team workflows", "Documentation"],
    layout: "left"
  },
  {
    title: "Research & Strategy",
    description: "Decisions backed by evidence, not gut feelings. I synthesize qualitative and quantitative signals into structures teams can actually act on.",
    tags: ["User research", "Competitor analysis", "Information architecture", "Product strategy", "Data-informed decisions", "Stakeholder alignment"],
    layout: "left"
  }
];

export const ServicesSection: React.FC = () => {
  return (
    <section 
      id="services" 
      className="w-full min-h-screen flex flex-col items-start justify-start pt-8 pb-16 md:pt-12 md:pb-[clamp(80px,8vw,140px)] relative"
    >
      {/* Sticky Header - Matching Welcome Section */}
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
          <span className="text-violet-500 font-mono uppercase tracking-[0.2em] font-normal text-[clamp(12px,0.85vw,13px)]">My Services</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="w-full p-[clamp(64px,12vw,100px)_16px_0px] md:p-[clamp(56px,7vw,120px)_48px_0px]">
        <div className="flex flex-col items-start text-left">
          {/* Header Group */}
          <div className="w-full mb-[clamp(40px,8vw,80px)] md:mb-[clamp(64px,8vw,140px)] max-w-[900px]">
            {/* Section Title */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-bold"
              style={{ 
                fontSize: 'clamp(36px, 5.8vw, 88px)',
                lineHeight: 1.05,
                letterSpacing: '-0.04em'
              }}
            >
              Here's <span className="text-violet-500 italic">what I actually do</span> every day
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-zinc-400 leading-relaxed"
              style={{ 
                fontSize: 'clamp(15px, 1.2vw, 19px)',
                marginTop: 'clamp(28px, 3vw, 48px)',
                maxWidth: '520px'
              }}
            >
              <p>
                I get to enjoy talking about design systems, colors, pixels, and AI, while pretending it's important for work.
              </p>
            </motion.div>
          </div>

          {/* Services List */}
          <div className="w-full space-y-[clamp(80px,15vw,160px)]">
            {services.map((service, index) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="w-full border-t border-zinc-900 pt-12"
              >
                <h3 className="text-[clamp(32px,4.5vw,76px)] font-light tracking-tighter mb-12">
                  {service.title}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                  {service.layout === 'left' ? (
                    <>
                      <div className="md:col-span-5">
                        <p className="text-zinc-400 leading-relaxed max-w-[520px]" style={{ fontSize: 'clamp(15px, 1.2vw, 19px)' }}>
                          {service.description}
                        </p>
                      </div>
                      <div className="md:col-span-7 flex flex-wrap gap-2 md:justify-start content-start">
                        {service.tags.map(tag => (
                          <span key={tag} className="px-4 py-2 rounded-full border border-zinc-800 text-[clamp(11px,0.9vw,14px)] tracking-wider text-zinc-400 hover:border-violet-500 hover:text-white transition-colors cursor-default">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="md:col-span-7 flex flex-wrap gap-2 content-start order-2 md:order-1">
                        {service.tags.map(tag => (
                          <span key={tag} className="px-4 py-2 rounded-full border border-zinc-800 text-[clamp(11px,0.9vw,14px)] tracking-wider text-zinc-400 hover:border-violet-500 hover:text-white transition-colors cursor-default">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="md:col-span-5 order-1 md:order-2">
                        <p className="text-zinc-400 leading-relaxed" style={{ fontSize: 'clamp(15px, 1.2vw, 19px)' }}>
                          {service.description}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
