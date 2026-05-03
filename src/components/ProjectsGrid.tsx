import { useMemo, useState, type ComponentType } from 'react';
import { Bot, ExternalLink, Github, Monitor, Server, Star } from 'lucide-react';
import projects from '../data/projects.json';
import categoryMeta from '../data/projectCategories.json';
import skillsData from '../data/skills.json';

type ProjectType = 'web' | 'api' | 'ai';

type ProjectLinks = {
  demo?: string;
  github?: string;
  blog?: string;
};

type ProjectItem = {
  id: number;
  title: string;
  summary?: string;
  description: string;
  techStack: Array<string | { label: string; icon?: string }>;
  links: ProjectLinks;
  image?: string;
  categories: ProjectType[];
  featured?: boolean;
  order?: number;
  stars?: number | string | null;
  slug?: string;
  href?: string;
};

type ProjectsGridProps = {
  limit?: number;
  showFilters?: boolean;
  showViewAll?: boolean;
  viewAllHref?: string;
  items?: ProjectItem[];
};

const iconMap: Record<string, ComponentType<{ size?: number }>> = {
  Bot,
  Monitor,
  Server,
};

type CategoryMeta = {
  label: string;
  badge: string;
  thumb: string;
  icon: string;
  iconColor: string;
};

type SkillCategory = {
  skills: { name: string; icon?: string }[];
};

type TechItem = {
  label: string;
  icon?: string;
};

const techIconMap = new Map<string, string>();
(skillsData as SkillCategory[]).forEach((category) => {
  category.skills.forEach((skill) => {
    if (skill.icon) {
      techIconMap.set(skill.name, skill.icon);
    }
  });
});

const normalizeTechItem = (item: string | TechItem): TechItem => {
  if (typeof item === 'string') {
    return { label: item, icon: techIconMap.get(item) };
  }

  return { label: item.label, icon: item.icon ?? techIconMap.get(item.label) };
};

const categories = categoryMeta as Record<ProjectType, CategoryMeta>;

const filters = [
  { key: 'all', label: 'All' },
  { key: 'web', label: 'Web App' },
  { key: 'api', label: 'API' },
  { key: 'ai', label: 'AI / Bot' },
] as const;

const resolveType = (project: ProjectItem): ProjectType => {
  if (project.categories && project.categories.length > 0) {
    const primary = project.categories[0];
    if (primary === 'api' || primary === 'ai' || primary === 'web') {
      return primary;
    }
  }
  return 'web';
};

const matchesFilter = (project: ProjectItem, filter: ProjectType) => {
  return project.categories.includes(filter);
};

export default function ProjectsGrid({
  limit,
  showFilters = true,
  showViewAll = true,
  viewAllHref = '/projects',
  items,
}: ProjectsGridProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | ProjectType>('all');
  const dataSource = items ?? (projects as ProjectItem[]);

  const sortedSource = useMemo(() => {
    return [...dataSource].sort((a, b) => {
      const featuredA = a.featured ?? false;
      const featuredB = b.featured ?? false;
      if (featuredA !== featuredB) {
        return featuredA ? -1 : 1;
      }

      const orderA = a.order ?? Number.POSITIVE_INFINITY;
      const orderB = b.order ?? Number.POSITIVE_INFINITY;
      if (orderA !== orderB) {
        return orderA - orderB;
      }

      return a.title.localeCompare(b.title);
    });
  }, [dataSource]);

  const visibleProjects = useMemo(() => {
    const filtered = activeFilter === 'all'
      ? sortedSource
      : sortedSource.filter((project) => matchesFilter(project, activeFilter));

    if (typeof limit === 'number') {
      return filtered.slice(0, limit);
    }

    return filtered;
  }, [activeFilter, limit, sortedSource]);

  return (
    <div className="w-full">
      {showFilters && (
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {filters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActiveFilter(filter.key)}
              aria-pressed={activeFilter === filter.key}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide border transition-colors
                ${activeFilter === filter.key
                  ? 'bg-primary/15 text-primary border-primary/50'
                  : 'bg-bgSecondary text-text border-white/10 hover:border-primary/40 hover:text-heading'
                }
              `}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}

      <div
        className="grid gap-6 items-stretch"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))',
        }}
      >
        {visibleProjects.map((project) => {
          const type = resolveType(project);
          const meta = categories[type];
          const Icon = iconMap[meta.icon] ?? Monitor;
          const primaryLink = project.href
            || (project.slug ? `/projects/${project.slug}` : undefined)
            || project.links.demo
            || project.links.github
            || project.links.blog;

          const CardContent = (
            <article
              className={`group flex h-full flex-col overflow-hidden rounded-2xl bg-bgSecondary border transition-colors
                ${primaryLink ? 'cursor-pointer' : ''}
                ${project.featured
                  ? 'border-primary/60 shadow-[0_0_0_1px_rgba(127,90,240,0.3)]'
                  : 'border-white/10 hover:border-primary/40'
                }
              `}
            >
              <div className={`relative aspect-video flex items-center justify-center ${meta.thumb}`}>
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <Icon size={40} className={meta.iconColor} />
                )}
                {project.image && (
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
                )}
                {project.featured && (
                  <span className="absolute left-3 top-3 text-[10px] font-semibold uppercase tracking-widest text-primary bg-bg/80 border border-primary/40 px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-heading leading-snug">
                    {project.title}
                  </h3>
                  <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full whitespace-nowrap ${meta.badge}`}>
                    {meta.label}
                  </span>
                </div>

                <p className="text-sm text-text leading-relaxed line-clamp-2">
                  {project.summary || project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 3).map((tech) => {
                    const { label, icon } = normalizeTechItem(tech);

                    return (
                      <span
                        key={label}
                        className="inline-flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-md border border-white/10 bg-bg text-text"
                      >
                        {icon && (
                          <img
                            src={icon}
                            alt={label}
                            loading="lazy"
                            className="h-3.5 w-auto max-w-[14px] shrink-0 object-contain"
                          />
                        )}
                        {label}
                      </span>
                    );
                  })}
                  {project.techStack.length > 3 && (
                    <span className="text-[11px] px-2 py-1 rounded-md border border-white/10 bg-bg text-text">
                      {project.techStack.length - 3}+
                    </span>
                  )}
                </div>

                <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        onClick={(event) => event.stopPropagation()}
                        className="inline-flex items-center gap-1 text-primary hover:text-heading transition-colors"
                      >
                        <ExternalLink size={14} /> Demo
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        onClick={(event) => event.stopPropagation()}
                        className="inline-flex items-center gap-1 text-primary hover:text-heading transition-colors"
                      >
                        <Github size={14} /> Repo
                      </a>
                    )}
                  </div>
                  {/* <div className="inline-flex items-center gap-1 text-secondary">
                    <Star size={12} className="text-[#f3c76f]" />
                    <span>{project.stars ?? '—'}</span>
                  </div> */}
                </div>
              </div>
            </article>
          );

          return primaryLink ? (
            <a
              key={project.id}
              href={primaryLink}
              rel="noreferrer"
              className="block h-full"
            >
              {CardContent}
            </a>
          ) : (
            <div key={project.id} className="block h-full">
              {CardContent}
            </div>
          );
        })}
      </div>

      {showViewAll && (
        <div className="mt-10 flex justify-center">
          <a
            href={viewAllHref}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-sm font-semibold text-text hover:text-heading hover:border-primary/40 transition-colors"
          >
            View all projects
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      )}
    </div>
  );
}
