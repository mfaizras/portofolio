import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'motion/react';
import { GraduationCap, Award, Calendar, BookOpen, ChevronRight, GripHorizontal } from 'lucide-react';
import educationData from '../data/education.json';

const iconMap: Record<string, React.FC<any>> = {
  GraduationCapIcon: GraduationCap,
  AwardIcon: Award,
  BookOpenIcon: BookOpen,
};

const getIcon = (iconName: string) => {
  if (iconName.startsWith('http')) {
      return (props: { size?: number | string, className?: string }) => (
          <img 
            src={iconName} 
            alt="icon" 
            className={props.className}
            style={{ 
                width: props.size || '1em', 
                height: props.size || '1em',
                objectFit: 'contain' 
            }} 
          />
      );
  }
  const IconComponent = iconMap[iconName];
  return IconComponent || GraduationCap;
};

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (sliderRef.current && containerRef.current) {
        setSliderWidth(sliderRef.current.scrollWidth);
        setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  return (
    <section id="education" className="bg-bg py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-heading mb-4">
              Education & Path
            </h2>
            <p className="text-text text-lg mt-4 max-w-xl">
              Academic background and certifications. Drag to explore.
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-primary/80 font-medium text-sm border border-primary/20 px-3 py-1.5 rounded-full bg-primary/5">
            <GripHorizontal size={16} /> Drag Timeline
          </div>
        </motion.div>

        {/* Draggable Container */}
        <div ref={containerRef} className="relative w-full cursor-grab active:cursor-grabbing overflow-hidden">
            
            {/* Visual Line Background - Centered */}
            <div className="absolute top-[34px] left-0 w-full h-0.5 bg-gradient-to-r from-bgSecondary via-primary/30 to-bgSecondary z-0" />

            <motion.div 
                ref={sliderRef}
                drag="x"
                dragConstraints={{ right: 0, left: -(sliderWidth - containerWidth + 50) }}
                className="flex gap-12 px-4 pt-16 pb-8"
            >
                {educationData.map((item, index) => {
                  const EduIcon = getIcon(item.icon);
                return (
                    <motion.div
                        key={item.id}
                        className="relative w-[320px] shrink-0 group"
                    >
                        {/* Dot - Centered Horizontally */}
                        <div className="absolute top-[-42px] left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-bgSecondary border-4 border-primary z-20 shadow-[0_0_0_4px_rgba(22,22,26,1)] group-hover:scale-125 transition-transform duration-300">
                             <div className="absolute inset-0 bg-primary/50 rounded-full animate-ping opacity-0 group-hover:opacity-100" />
                        </div>

                        {/* Connection Line from Dot to Card */}
                        <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-0.5 h-5 bg-gradient-to-b from-primary/50 to-bgSecondary group-hover:h-5 transition-all duration-300 opacity-50" />

                        {/* Content Card */}
                        <div className="relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-primary/50 transition-all duration-500">
                             <div className="bg-bgSecondary p-6 rounded-[15px] h-full border-t border-white/5 relative overflow-hidden group-hover:-translate-y-1 transition-transform duration-300 shadow-xl">
                                
                                {/* Header Color Splash */}
                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color}`} />

                                <div className="flex items-center gap-3 mb-4 mt-2">
                                    <div className={`p-2.5 rounded-lg bg-bg border border-white/5 ${item.type === 'certification' ? 'text-tertiary' : 'text-primary'}`}>
                                        <EduIcon size={22} />
                                    </div>
                                    <span className="text-xs font-bold font-mono text-secondary uppercase tracking-widest bg-bg px-2 py-1 rounded border border-white/5">
                                        {item.period}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-heading mb-2 leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-sm font-medium text-primary/90 mb-4">
                                    {item.institution}
                                </p>
                                <p className="text-text text-sm leading-relaxed">
                                    {item.description}
                                </p>

                             </div>
                        </div>
                    </motion.div>
                )})}
            </motion.div>
        </div>

      </div>
    </section>
  );
}
