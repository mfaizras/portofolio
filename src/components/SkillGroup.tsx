import { motion } from 'motion/react';
import { 
  FrontendIcon, BackendIcon, ToolsIcon, CloudIcon,
  GenericCodeIcon,  SvgIcon, BrainIcon
} from './SkillIcons';
import skillData from '../data/skills.json';

// Map string keys from JSON to actual React components
const iconMap: Record<string, React.FC<any>> = {
  FrontendIcon, BackendIcon, ToolsIcon, CloudIcon,
  GenericCodeIcon, SvgIcon, BrainIcon
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
  return IconComponent || GenericCodeIcon;
};

export default function SkillGroup() {
  return (
    <section id="skills" className="pt-20 pb-10 bg-bg">
      <div className="max-w-7xl mx-auto px-4">
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-heading mb-4">
            Skills
          </h2>
          <p className="mt-6 text-text text-lg max-w-2xl mx-auto">
            A comprehensive look at the technologies I use to bring ideas to life, categorized by domain.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {skillData.map((category, index) => {
                const CategoryIcon = getIcon(category.icon);

                return (
                <motion.div
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group relative bg-bgSecondary rounded-2xl p-8 border border-white/5 hover:border-primary/30 transition-all duration-300 shadow-xl overflow-hidden"
                >
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`p-3 rounded-lg bg-bg border border-white/5 ${category.color}`}>
                                <CategoryIcon size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-heading">
                                {category.title}
                            </h3>
                        </div>
                        
                        <p className="text-text text-sm mb-6 leading-relaxed border-b border-white/5 pb-4">
                            {category.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill) => {
                                const SkillIcon = getIcon(skill.icon);
                                return (
                                    <span 
                                        key={skill.name}
                                        className="px-3 py-1.5 rounded-md text-sm font-medium bg-bg text-primary/90 border border-white/5 hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all cursor-default flex items-center gap-2"
                                        title={`Proficiency: ${skill.level}`}
                                    >
                                        <SkillIcon size={16} />
                                        {skill.name}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
                );
            })}
        </div>

      </div>
    </section>
  );
}
