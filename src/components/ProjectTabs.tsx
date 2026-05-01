import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, Code2, Layers, Cpu, BookOpen } from 'lucide-react';
import projects from '../data/projects.json'


const iconMap: Record<string, React.FC<any>> = {
  Code2Icon: Code2,
  LayersIcon: Layers,
  CpuIcon: Cpu,
};

const getIcon = (iconName: string) => {
  if (iconName.startsWith('http')) {
      return (props: { size?: number | string, className?: string }) => (
        <svg
        className={props.className}
        style={{ 
                width: props.size || '1em', 
                height: props.size || '1em',
                objectFit: 'contain' 
            }} ><use href={iconName}></use></svg>
      );
  }
  const IconComponent = iconMap[iconName];
  return IconComponent || Code2;
};

export default function ProjectTabs() {
  const [activeTab, setActiveTab] = useState(projects[0]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="grid md:grid-cols-12 gap-8 lg:gap-12">
        
        <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-4 h-full max-h-screen overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-bg
  [&::-webkit-scrollbar-thumb]:bg-primary
  dark:[&::-webkit-scrollbar-track]:bg-bg
  dark:[&::-webkit-scrollbar-thumb]:bg-primary">
          {projects.map((project) => 
          {
          const ProjectIcon = getIcon(project.icon);
          return (
            <button
              key={project.id}
              onClick={() => setActiveTab(project)}
              className={`
                group relative flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 cursor-pointer
                ${activeTab.id === project.id 
                  ? "bg-bgSecondary text-heading" 
                  : "hover:bg-bgSecondary/50 text-text hover:text-heading"
                }
              `}
            >
              {activeTab.id === project.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl border-l-4 border-primary bg-bgSecondary"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              <div className={`
                relative z-10 p-2.5 rounded-lg transition-colors duration-300
                ${activeTab.id === project.id ? "bg-primary text-white" : "bg-[var(--color-bg)] text-[var(--color-text)]"}
              `}>
                <ProjectIcon size={22}/>
              </div>
              <span className="relative z-10 font-medium text-md lg:text-lg tracking-wide">{project.title}</span>
            </button>
          )})}
        </div>

        <div className="md:col-span-8 lg:col-span-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="group relative h-full bg-bgSecondary rounded-2xl border border-secondary/20 shadow-2xl overflow-hidden"
            >
              {/* Project Image - Large Header Area */}
              <div className="relative h-64 md:h-80 lg:h-96 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-bgSecondary to-transparent z-10 opacity-90" />
                <motion.img 
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                  src={activeTab.image} 
                  alt={activeTab.title} 
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Floating Action Buttons */}
                <div className="absolute top-6 right-6 z-20 flex gap-3">
                  {activeTab.links.github && (
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={activeTab.links.github} 
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-primary transition-colors border border-white/10"
                  >
                    <Github size={18} />
                    <span className="text-sm font-medium">Code</span>
                  </motion.a>
                  )}

                  {activeTab.links.blog && (
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={activeTab.links.blog} 
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-primary transition-colors border border-white/10"
                  >
                    <BookOpen size={18} />
                    <span className="text-sm font-medium">Blog</span>
                  </motion.a>
                  )}

                  {activeTab.links.demo && (
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={activeTab.links.demo} 
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-black hover:bg-white transition-colors shadow-lg"
                  >
                    <ExternalLink size={18} />
                    <span className="text-sm font-bold">Live Demo</span>
                  </motion.a>

                  )}
                </div>
              </div>

              {/* Content Details */}
              <div className="relative z-20 px-8 pb-10 -mt-20 h-full max-h-screen overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-bg
  [&::-webkit-scrollbar-thumb]:bg-primary
  dark:[&::-webkit-scrollbar-track]:bg-tertiary
  dark:[&::-webkit-scrollbar-thumb]:bg-primary">
                <div className="bg-bgSecondary/80 backdrop-blur-xl p-8 rounded-2xl border border-secondary/10 shadow-inner">
                  <div className="mb-6">
                    <h2 className="text-lg md:text-2xl font-bold text-heading mb-3">
                      {activeTab.title}
                    </h2>
                    <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-tertiary rounded-full" />
                  </div>

                  <p className="text-text text-md md:text-lg leading-relaxed mb-8 max-w-3xl text-justify" style={{ whiteSpace: 'pre-wrap' }}>
                    {activeTab.description}
                  </p>

                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-secondary uppercase tracking-widest">
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {activeTab.techStack.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-4 py-2 rounded-lg text-sm font-medium bg-bg text-primary border border-primary/20 hover:border-primary/50 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
