import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

const BlogPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <section className="pt-32 pb-16 px-4">
        <div className="container-custom text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-display font-bold text-foreground">
            {t('blog.title')}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-muted-foreground text-lg mt-4">
            {t('blog.subtitle')}
          </motion.p>
          <div className="w-20 h-0.5 bg-primary mx-auto mt-6" />
        </div>
      </section>

      <section className="section-padding pt-8"><div className="container-custom"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{Array.from({ length: 6 }).map((_, i) => <motion.article key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card overflow-hidden"><div className="aspect-video bg-secondary" /><div className="p-6"><p className="text-muted-foreground text-sm">{t('blog.pending')}</p></div></motion.article>)}</div></div></section>
    </>
  );
};
export default BlogPage;
