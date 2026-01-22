import { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Clock, Calendar, Tag } from 'lucide-react';
import blogImage from '../assets/blog-placeholder.png';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
  image?: string;
}

interface BlogSectionProps {
    posts: BlogPost[];
}

export default function BlogSection({ posts = [] }: BlogSectionProps) {
  return (
    <section id="blog" className="py-20 bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-heading mb-4">
              Latest Posts
            </h2>
            <p className="mt-4 text-text text-lg max-w-xl">
              Thoughts, tutorials, and insights about web development and design.
            </p>
          </div>
          {posts.length > 0 && (
            <a href="/blog" className="hidden md:flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
              View all posts <ArrowRight size={18} />
            </a>
          )}
        </motion.div>

        {/* Grid */}
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
                <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group flex flex-col h-full bg-bgSecondary rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                    <a href={`/blog/${post.slug}`} className="flex flex-col h-full"> 
                        {/* Image Area */}
                        <div className="relative h-48 overflow-hidden">
                            <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                            <img 
                                src={post.image || blogImage.src} 
                                alt={post.title} 
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                            />
                            
                            {/* Tags Overlay */}
                            <div className="absolute bottom-3 left-3 z-20 flex gap-2 flex-wrap">
                                {post.tags && post.tags.slice(0, 2).map(tag => (
                                    <span key={tag} className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold bg-black/50 backdrop-blur-md text-white rounded border border-white/10">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex items-center gap-4 text-xs text-secondary font-mono mb-4">
                                <span className="flex items-center gap-1">
                                    <Calendar size={12} /> {post.date}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock size={12} /> {post.readTime}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-heading mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                            </h3>
                            
                            <p className="text-text text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                                {post.excerpt}
                            </p>

                            <div className="mt-auto pt-4 border-t border-white/5 flex items-center text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                                Read Article <ArrowRight size={16} className="ml-1" />
                            </div>
                        </div>
                    </a>
                </motion.article>
            ))}
            <div className="mt-12 text-center md:hidden">
                <a href="/blog" className="inline-flex items-center gap-2 text-primary font-medium border border-primary/20 px-6 py-3 rounded-full hover:bg-primary/5 transition-all">
                    View all posts <ArrowRight size={18} />
                </a>
            </div>
    
          </div>
          ) : (
            <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className=""
        >
            <div>
              <p className='text-center mt-12 text-text'>There Is No Posts Yet.</p>
            </div>
            </motion.div>
          )}
        </div>
        
    </section>
  );
}
