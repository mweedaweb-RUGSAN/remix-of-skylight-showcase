import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { ProjectCard, VideoPlayerModal } from '@/components/MediaComponents';
import { portfolioItems, portfolioCategories, type PortfolioItem } from '@/data/portfolio';
import { categoryKeys } from '@/data/workLabels';

const PortfolioPage = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [videoOpen, setVideoOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const filtered = activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(p => p.category === activeCategory);

  return (
    <>
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-surface" />
          <div className="absolute inset-0 cinematic-overlay" />
          <div className="absolute inset-0 bg-background/50" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-display font-bold text-foreground">
            {t('portfolio.title')}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-muted-foreground text-lg mt-4">
            {t('portfolio.subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {portfolioCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-sm text-xs tracking-widest uppercase transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat === 'All' ? t('portfolio.all') : t(categoryKeys[cat])}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map(project => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard
                    title={project.title[language]}
                    category={`${t(categoryKeys[project.category])} · ${t('portfolio.working')}`}
                    placeholderLabel={t('portfolio.mediaPending')}
                    videoUrl={undefined}
                    onClick={() => { setSelectedProject(project); setVideoOpen(true); }}
                  />
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {project.description[language]}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <VideoPlayerModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoUrl={undefined}
        title={selectedProject?.title[language]}
      />
    </>
  );
};

export default PortfolioPage;
