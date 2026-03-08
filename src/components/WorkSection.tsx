import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useLenis } from 'lenis/react';
import { ArrowUpRight } from 'lucide-react';
import { ScrambleText } from './ScrambleText';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  year: string;
  description: string;
  bullets: string[];
  tags: string[];
  image: string;
}

const projects: Project[] = [
  {
    id: "PSE",
    title: "PSE Campaign Builder Manager",
    subtitle: "",
    location: "UAE · 2022-2023",
    year: "2022-2023",
    description: "Scaling a multi-brand e-commerce ecosystem through governance, systems, and AI-assisted workflows.",
    bullets: [
      "Led Design System governance across multiple product and dev teams",
      "Reduced design-to-dev friction through good documentation and UX practices",
      "Facilitated stakeholder alignment in complex, multi-team environments"
    ],
    tags: ["DESIGNSYSTEMS", "BACKOFFICE", "AI"],
    image: "https://picsum.photos/seed/veepee/1200/1600"
  },
  {
    id: "Worldwise",
    title: "Worldwise: The Wisdom App",
    subtitle: "",
    location: "United States · 2024-Present",
    year: "2024-Present",
    description: "Structuring design work and integrating AI into a multi-role education platform for computer science learning.",
    bullets: [
      "Introduced structure and documentation to previously fragmented design work",
      "Improved cross-role consistency across student, teacher, and admin flows",
      "Helped integrate AI-driven features without compromising usability"
    ],
    tags: ["EDUCATION", "AI", "DESIGNSYSTEMS"],
    image: "https://picsum.photos/seed/kira/1200/1600"
  },
  {
    id: "CORONA",
    title: "CORONA Admin",
    subtitle: "",
    location: "FIGMA Community · 2024-Present",
    year: "2024-Present",
    description: "Designing a medical conversational AI platform end to end, from clinical dashboards to design system to AI decision logic.",
    bullets: [
      "Transformed a fragmented interface into a structured, scalable platform",
      "Enabled faster product iteration through a consistent design system",
      "Improved clarity across complex clinical monitoring workflows"
    ],
    tags: ["HEALTHTECH", "CONVERSATIONALAI", "DESIGNSYSTEMS"],
    image: "https://picsum.photos/seed/tucuvi/1200/1600"
  },
  {
    id: "TherapistAvatar",
    title: "Therapist Avatar",
    subtitle: "",
    location: "Australia · 2024-2025",
    year: "2024-2025",
    description: "Improving clarity and conversion in a global e-commerce platform with high data density and strict product compatibility rules.",
    bullets: [
      "Identified key friction points affecting conversion and search success",
      "Improved product discovery clarity through research-backed interaction changes",
      "Strengthened stakeholder confidence by presenting structured insights and rationale"
    ],
    tags: ["ECOMMERCE", "UXRESEARCH", "ENTERPRISE"],
    image: "https://picsum.photos/seed/hp/1200/1600"
  }
];

export function WorkSection() {
  const [activeProject, setActiveProject] = useState(projects[0].id);
  const lenis = useLenis();

  const handleProjectScroll = useCallback((projectId: string) => {
    if (lenis) {
      lenis.scrollTo(`#${projectId}`, {
        offset: -100, // Adjust offset to account for sticky header
        duration: 1.2,
      });
    }
  }, [lenis]);

  return (
    <section id="work" className="relative text-white pt-8 pb-16 md:pt-12 md:pb-[clamp(80px,8vw,140px)]">
      {/* Sticky Header */}
      <div 
        className="sticky z-50 w-full"
        style={{ 
          top: 'calc(var(--sticky-top, 40px) + clamp(10px, 1.5vw, 16px))'
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          :root { 
            --sticky-top: 40px; 
            --card-offset: 16px; 
            --h-gap: 16px;
          }
          @media (min-width: 768px) {
            :root { 
              --sticky-top: 48px; 
              --card-offset: 24px; 
              --h-gap: 32px;
            }
          }
        `}} />
        <div className="px-4 py-4 md:px-12">
          {/* Desktop Layout (lg+) */}
          <div className="hidden lg:grid grid-cols-3 items-center w-full">
            <div className="flex items-center gap-4">
              <div className="w-8 h-[1px] bg-violet-500" />
              <span className="text-violet-500 font-mono uppercase tracking-[0.2em] font-normal text-[clamp(12px,0.85vw,13px)] mix-blend-difference">Selected Work</span>
            </div>
            <div className="flex items-center justify-center gap-8 text-[clamp(10px,0.8vw,12px)] font-mono uppercase tracking-widest text-zinc-500">
              {projects.map((p) => (
                <button 
                  key={p.id} 
                  onClick={() => handleProjectScroll(p.id)}
                  className={`transition-colors hover:text-zinc-400 mix-blend-difference whitespace-nowrap ${activeProject === p.id ? 'text-white' : ''}`}
                >
                  <ScrambleText text={p.id} />
                </button>
              ))}
            </div>
            <div className="flex justify-end">
              <a href="#" className="flex items-center gap-2 text-[clamp(10px,0.8vw,12px)] font-mono uppercase tracking-widest hover:text-zinc-400 transition-colors mix-blend-difference">
                <span><ScrambleText text="See All Projects" /></span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Mobile/Tablet Layout (<lg) */}
          <div className="flex lg:hidden flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-[1px] bg-violet-500" />
              <span className="text-violet-500 font-mono uppercase tracking-[0.2em] font-normal text-[clamp(12px,0.85vw,13px)] mix-blend-difference">Selected Work</span>
            </div>
            <div className="flex items-center justify-between w-full gap-8">
              <div className="flex items-center gap-4 text-[clamp(10px,0.8vw,12px)] font-mono uppercase tracking-widest text-zinc-500 overflow-x-auto no-scrollbar">
                {projects.map((p) => (
                  <button 
                    key={p.id} 
                    onClick={() => handleProjectScroll(p.id)}
                    className={`transition-colors hover:text-zinc-400 mix-blend-difference whitespace-nowrap ${activeProject === p.id ? 'text-white' : ''}`}
                  >
                    <ScrambleText text={p.id} />
                  </button>
                ))}
              </div>
              <a href="#" className="flex items-center gap-2 text-[clamp(10px,0.8vw,12px)] font-mono uppercase tracking-widest hover:text-zinc-400 transition-colors mix-blend-difference shrink-0">
                <span className="hidden sm:inline"><ScrambleText text="See All Projects" /></span>
                <span className="sm:hidden"><ScrambleText text="All" /></span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="w-full flex flex-col gap-6">
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index} 
            onInView={() => setActiveProject(project.id)}
          />
        ))}
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onInView: () => void;
  key?: any;
}

function ProjectCard({ project, index, onInView }: ProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      onInView();
    }
  }, [isInView, onInView]);

  return (
    <div 
      id={project.id}
      ref={containerRef}
      className="relative w-full min-h-[calc(150vh-130px)]"
    >
      <div 
        className="sticky mx-auto flex flex-col md:flex-row items-stretch overflow-hidden bg-[rgb(10, 10, 10)] border border-zinc-800 rounded-[20px] shadow-2xl"
        style={{
          top: 'calc(var(--sticky-top, 48px) + 80px + var(--card-offset, 24px))',
          height: 'calc(100vh - (var(--sticky-top, 48px) + 80px + var(--card-offset, 24px)) - var(--h-gap, 32px))',
          minHeight: 'fit-content',
          width: 'calc(100% - (var(--h-gap, 32px) * 2))'
        }}
      >
        {/* Left: Image with tilt effect */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:w-1/2 h-[40%] md:h-full relative overflow-hidden group shrink-0"
        >
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 -rotate-3 group-hover:rotate-0 group-hover:scale-100"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>

        {/* Right: Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="w-full md:w-1/2 p-6 md:p-12 lg:p-16 flex flex-col justify-center"
        >
          <div className="flex flex-col gap-2 mb-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              {project.location}
            </span>
            <h3 
              className="font-bold tracking-tighter leading-[1.1]"
              style={{ fontSize: 'clamp(28px, 3.5vw, 64px)' }}
            >
              {project.title} {project.subtitle && <span className="text-zinc-500 block">· {project.subtitle}</span>}
            </h3>
          </div>

          <p 
            className="text-zinc-400 leading-relaxed mb-6 max-w-lg"
            style={{ fontSize: 'clamp(14px, 1.1vw, 17px)' }}
          >
            {project.description}
          </p>

          <ul className="space-y-3 mb-8">
            {project.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                <span className="mt-2 w-1 h-1 rounded-full bg-violet-500 shrink-0" />
                <span className="leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag) => (
              <span 
                key={tag}
                className="px-4 py-2 rounded-full border border-zinc-800 text-[clamp(11px,0.9vw,14px)] tracking-wider text-zinc-400 hover:border-violet-500 hover:text-white transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
