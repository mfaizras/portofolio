
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Calendar, Clock, Tag, Search, X } from 'lucide-react';

interface Post {
    slug: string;
    data: {
        title: string;
        description: string;
        pubDate: Date;
        heroImage?: { src: string } | string;
        tags?: string[];
    }
}

interface BlogListProps {
    posts: Post[];
}

export default function BlogList({ posts }: BlogListProps) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        posts.forEach(post => {
            post.data.tags?.forEach(tag => tags.add(tag));
        });
        return Array.from(tags).sort();
    }, [posts]);

    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesTag = selectedTag ? post.data.tags?.includes(selectedTag) : true;
            const matchesSearch = post.data.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                post.data.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTag && matchesSearch;
        });
    }, [posts, selectedTag, searchQuery]);

    const getImageUrl = (image: any) => {
        if (!image) return null;
        if (typeof image === 'string') return image;
        return image.src;
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div>
            {/* Search and Filter Controls */}
            <div className="mb-12 space-y-6">
                {/* Search Bar */}
                <div className="relative max-w-xl mx-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-bgSecondary border border-white/10 rounded-full py-3 pl-10 pr-4 text-text focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-secondary/50"
                    />
                    {searchQuery && (
                        <button 
                            onClick={() => setSearchQuery('')}
                            className="absolute inset-y-0 right-3 flex items-center text-secondary hover:text-white"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                {/* Tags Filter */}
                <div className="flex flex-wrap justify-center gap-2">
                    <button
                        onClick={() => setSelectedTag(null)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedTag === null
                                ? 'bg-primary text-white'
                                : 'bg-bgSecondary text-secondary hover:bg-white/5 hover:text-text'
                        }`}
                    >
                        All
                    </button>
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                selectedTag === tag
                                    ? 'bg-primary text-white'
                                    : 'bg-bgSecondary text-secondary hover:bg-white/5 hover:text-text'
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Posts Grid */}
            <motion.div 
                layout
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                <AnimatePresence mode="popLayout">
                    {filteredPosts.map((post) => (
                        <motion.article
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            key={post.slug}
                            className="group flex flex-col h-full bg-bgSecondary rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            <a
                                href={`/blog/${post.slug}/`}
                                className="block h-full flex flex-col"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                    {post.data.heroImage && (
                                        <img
                                            src={getImageUrl(post.data.heroImage)}
                                            alt={post.data.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                    )}
                                    <div className="absolute bottom-3 left-3 z-20 flex gap-2 flex-wrap">
                                        {post.data.tags?.slice(0, 2).map((tag) => (
                                            <span key={tag} className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold bg-black/50 backdrop-blur-md text-white rounded border border-white/10">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-xs text-secondary font-mono mb-4">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={12} />
                                            {formatDate(post.data.pubDate)}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={12} /> 5 min read
                                        </span>
                                    </div>

                                    <h2 className="text-xl font-bold text-heading mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.data.title}
                                    </h2>

                                    <p className="text-text text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                                        {post.data.description}
                                    </p>

                                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                                        Read Article <ArrowRight size={16} className="ml-1" />
                                    </div>
                                </div>
                            </a>
                        </motion.article>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredPosts.length === 0 && (
                <div className="text-center py-20 text-text">
                    <p className="text-xl">No articles found matching your criteria.</p>
                    <button 
                        onClick={() => { setSelectedTag(null); setSearchQuery(''); }}
                        className="mt-4 text-primary hover:underline"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
}
