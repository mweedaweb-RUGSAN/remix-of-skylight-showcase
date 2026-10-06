import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionHeader } from '@/components/MediaComponents';
import { portfolioItems } from '@/data/portfolio';
import { CheckCircle, Quote } from 'lucide-react';

const CaseStudiesPage = () => {
  const { t, language } = useLanguage();
  const studies = portfolioItems.slice(0, 2);
  return <>
    <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
      <div className="absolute inset-0 bg-surface"><div className="absolute inset-0 cinematic-overlay" /><div className="absolute inset-0 bg-background/50" /></div>
      <div className="relative z-10 text-center px-4">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-display font-bold text-foreground">{t('caseStudies.title')}</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-muted-foreground text-lg mt-4">{t('caseStudies.subtitle')}</motion.p>
      </div>
    </section>
    <section className="section-padding"><div className="container-custom space-y-32">
      {studies.map((study, i) => <motion.article key={study.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-12">
        <div className="relative aspect-[21/9] rounded-lg overflow-hidden bg-secondary flex items-center justify-center">
          <span className="text-muted-foreground text-sm">{t('portfolio.mediaPending')}</span>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-12"><p className="text-primary text-sm tracking-widest uppercase mb-2">{t('portfolio.working')}</p><h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">{study.title[language]}</h2></div>
        </div>
        <div className="grid grid-cols-3 gap-6">{['caseStudies.strategy', 'caseStudies.production', 'caseStudies.results'].map(key => <div key={key} className="glass-card p-6 text-center"><div className="text-base md:text-lg font-display font-bold gradient-text mb-1">{t(`${key}.value`)}</div><p className="text-muted-foreground text-xs tracking-widest uppercase">{t(key)}</p></div>)}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-8"><h3 className="text-primary text-sm tracking-widest uppercase mb-3">{t('caseStudies.problem')}</h3><p className="text-muted-foreground leading-relaxed">{study.description[language]}</p></div>
          {['caseStudies.strategy', 'caseStudies.production', 'caseStudies.results'].map(key => <div key={key} className="glass-card p-8"><h3 className="text-primary text-sm tracking-widest uppercase mb-3">{t(key)}</h3><p className="text-muted-foreground leading-relaxed">{t('caseStudies.unavailable')}</p></div>)}
        </div>
        <div className="glass-card p-10 text-center max-w-3xl mx-auto"><Quote className="w-8 h-8 text-primary/30 mx-auto mb-4" /><p className="text-foreground text-lg leading-relaxed">{t(`testimonials.${i + 1}.text`)}</p><p className="text-primary text-sm mt-5">{t(`testimonials.${i + 1}.attribution`)}</p></div>
        {i < studies.length - 1 && <div className="w-20 h-px bg-border mx-auto" />}
      </motion.article>)}
    </div></section>
  </>;
};
export default CaseStudiesPage;
