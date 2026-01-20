import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'motion/react';
import { Trophy, Award, Mic, Star, ChevronLeft, ChevronRight, Zap, Code, Cloud, Users } from 'lucide-react';
import achievements from '../data/achievments.json';

const iconMap: Record<string, React.FC<any>> = {
  TrophyIcon: Trophy,
  CloudIcon: Cloud,
  StarIcon: Star,
  MicIcon: Mic,
  AwardIcon: Award,
  UsersIcon: Users,
};

const getIcon = (iconName: string) => {
  if (iconName.startsWith('http')) {
      return (props: { size?: number | string, className?: string }) => (
          <img 
            src={iconName} 
            alt="icon" 
            loading="lazy"
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
  return IconComponent || Trophy;
};

// Helper to chunk the array into groups of 4
const chunkArray = (arr: typeof achievements, size: number) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
};

export default function Achievements() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const achievementChunks = chunkArray(achievements, 4);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="achievements" className="w-full py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-heading mb-6">
            Achievements
          </h2>
          <p className="mt-6 text-text text-lg max-w-2xl mx-auto">
            Milestones that mark my journey in technology.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative px-2 md:px-12">
          
          {/* Navigation Buttons */}
          <button 
            onClick={scrollPrev} 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-bgSecondary border border-white/10 text-text hover:text-primary hover:border-primary transition-all hidden md:flex shadow-xl"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={scrollNext} 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-bgSecondary border border-white/10 text-text hover:text-primary hover:border-primary transition-all hidden md:flex shadow-xl"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Embla Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y touch-pinch-zoom">
              {achievementChunks.map((chunk, chunkIndex) => (
                <div 
                  key={chunkIndex} 
                  className="flex-[0_0_100%] min-w-0 pl-4" // One slide per view
                >
                  <div className="grid md:grid-cols-2 gap-6 pb-2">
                    {chunk.map((item) => {
                      const AchievementIcon = getIcon(item.icon);
                      return(
                      
                      <motion.div
                        key={item.id}
                        whileHover={{ y: -5 }}
                        className="group relative bg-bgSecondary rounded-2xl p-6 border border-secondary/10 hover:border-primary/50 transition-colors shadow-lg overflow-hidden h-full"
                      >
                         <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />

                         <div className="relative z-10 flex items-start gap-4">
                            <div className={`p-3 rounded-lg bg-bg border border-white/5 shadow-inner shrink-0 ${item.color}`}>
                              <AchievementIcon size={24} />
                            </div>
                            <div>
                               <h3 className="text-lg font-bold text-heading group-hover:text-primary transition-colors mb-1">
                                {item.title}
                              </h3>
                              <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
                                {item.organization} • {item.date}
                              </p>
                              <p className="text-sm text-text leading-relaxed">
                                {item.description}
                              </p>
                              {item.link && (
                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline mt-2">
                                  {item.label || "Learn More"}
                                </a>
                              )}
                            </div>
                         </div>
                      </motion.div>
                    )})}
                    {/* Preserve grid layout if less than 4 items */}
                    {chunk.length < 4 && Array.from({ length: 4 - chunk.length }).map((_, i) => (
                         <div key={`empty-${i}`} className="hidden md:block" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Pagination */}
          <div className="flex justify-center gap-2 mt-8">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === selectedIndex ? "bg-primary w-8" : "bg-bgSecondary hover:bg-secondary"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
