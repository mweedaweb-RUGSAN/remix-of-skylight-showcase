import { motion } from 'framer-motion';
import { Layers, Building2, Sparkles, Home, ClipboardCheck } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionHeader } from './MediaComponents';

const WhyChooseUs = () => {
  const { t } = useLanguage();

  const items = [
    { icon: Layers, title: t('why.experienced'), desc: t('why.experienced.desc') },
    { icon: Building2, title: t('why.equipment'), desc: t('why.equipment.desc') },
    { icon: Sparkles, title: t('why.creative'), desc: t('why.creative.desc') },
    { icon: Home, title: t('why.reliable'), desc: t('why.reliable.desc') },
    { icon: ClipboardCheck, title: t('why.complete'), desc: t('why.complete.desc') },
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeader title={t('why.title')} subtitle={t('why.subtitle')} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="glass-card p-7 hover-border-glow group"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 ring-1 ring-primary/30 flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_24px_hsl(var(--primary)/0.5)]">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-foreground font-display text-xl font-semibold mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
