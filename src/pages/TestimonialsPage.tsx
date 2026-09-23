import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { Quote } from 'lucide-react';
const TestimonialsPage = () => {
  const { t } = useLanguage();
  return <>
    <section className="pt-32 pb-16 px-4"><div className="container-custom text-center"><motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-display font-bold text-foreground">{t('testimonials.title')}</motion.h1><motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">{t('testimonials.subtitle')}</motion.p><div className="w-20 h-0.5 bg-primary mx-auto mt-6" /></div></section>
    <section className="section-padding pt-8"><div className="container-custom"><div className="max-w-4xl mx-auto relative"><div className="glass-card p-12 md:p-16 text-center"><Quote className="w-12 h-12 text-primary/20 mx-auto mb-8" /><p className="text-foreground text-xl md:text-2xl leading-relaxed">{t('testimonials.pending')}</p></div></div></div></section>
    <section className="section-padding"><div className="container-custom"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{Array.from({ length: 3 }).map((_, i) => <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8"><Quote className="w-5 h-5 text-primary/30 mb-4" /><p className="text-muted-foreground text-sm leading-relaxed">{t('testimonials.pending')}</p></motion.div>)}</div></div></section>
  </>;
};
export default TestimonialsPage;
