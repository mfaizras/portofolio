import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';
import experienceData from '../data/experience.json';

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section id="experience" className="py-20 bg-bg relative" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-heading mb-4">
            Professional Journey
          </h2>
          <p className="mt-6 text-text text-lg max-w-2xl">
            My career path and the impactful roles I've held in the tech industry.
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="relative">
          {/* Vertical Line for Desktop */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-0.5 bg-white/5 md:-translate-x-1/2" />

          <div className="flex flex-col gap-12 md:gap-24">
            {experienceData.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={item.id} className={`relative flex items-center md:justify-between ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-[28px] md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-bgSecondary z-10 shadow-[0_0_0_4px_rgba(127,90,240,0.2)]" />

                  {/* Empty space for the other side on desktop */}
                  <div className="hidden md:block w-5/12" />

                  {/* Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="ml-16 md:ml-0 w-full md:w-5/12"
                  >
                    <div className="group relative bg-bgSecondary rounded-2xl p-8 border border-white/5 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1">
                      
                      {/* Gradient Splash */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-[100px] pointer-events-none transition-opacity opacity-50 group-hover:opacity-100" />

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                         <div>
                            <h3 className="text-2xl font-bold text-heading leading-tight mb-1">
                                {item.role}
                            </h3>
                            <h4 className="text-lg font-medium text-primary">
                                {item.company}
                            </h4>
                         </div>
                         <div className="flex items-center gap-2 text-sm font-mono text-secondary bg-bg px-3 py-1.5 rounded-full border border-white/5 w-fit">
                            <Calendar size={14} />
                            {item.period}
                         </div>
                      </div>

                      <p className="text-text leading-relaxed mb-6">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map((tech) => (
                           <span key={tech} className="px-3 py-1 text-xs font-medium text-primary/80 bg-primary/5 rounded-md border border-primary/10">
                             {tech}
                           </span>
                        ))}
                      </div>

                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
