import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionHeader } from '@/components/MediaComponents';
import { Target, Eye, Lightbulb, BookOpen } from 'lucide-react';
import founderAsset from '@/assets/rugsan-founder.png.asset.json';

const founderFallback = 'https://ik.imagekit.io/mweedaweb/Rugsan%20Construction%20co/Rugsan%20Site%20Media/Rugsan%20Founder.png?updatedAt=1790377287179';

const AboutPage = () => {
  const { t } = useLanguage();

  const values = [
    { icon: BookOpen, title: t('about.story.title'), text: t('about.story.text') },
    { icon: Target, title: t('about.mission.title'), text: t('about.mission.text') },
    { icon: Eye, title: t('about.vision.title'), text: t('about.vision.text') },
    { icon: Lightbulb, title: t('about.philosophy.title'), text: t('about.philosophy.text') },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-surface" />
          <div className="absolute inset-0 cinematic-overlay" />
          <div className="absolute inset-0 bg-background/50" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold text-foreground"
          >
            {t('about.title')}
          </motion.h1>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8"
              >
                <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-foreground font-display text-2xl font-semibold mb-3">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <SectionHeader title={t('about.journey')} subtitle={t('about.journey.subtitle')} />
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
            {['services.videoProduction', 'services.promotional', 'services.socialMedia', 'services.eventCoverage'].map((key, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`relative flex items-start gap-8 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
              >
                <div className="hidden md:block flex-1" />
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1.5 mt-2" />
                <div className="flex-1 ml-12 md:ml-0">
                  <span className="text-primary text-sm tracking-widest font-semibold">0{i + 1}</span>
                  <h4 className="text-foreground font-display text-xl font-semibold mt-1">{t(key)}</h4>
                  <p className="text-muted-foreground text-sm mt-1">{t(`${key}.desc`)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader title={t('about.team.title')} subtitle={t('about.team.subtitle')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card overflow-hidden group"><div className="aspect-[3/4] bg-secondary relative overflow-hidden"><img src={founderAsset.url} onError={(event) => { event.currentTarget.src = founderFallback; }} alt="Eng. Nur Mohamed Ali, Founder of Rugsan Construction Company" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" /></div><div className="p-6 text-center"><h4 className="text-foreground font-display text-lg font-semibold">Eng. Nur Mohamed Ali</h4><p className="text-primary text-sm mt-1">{t('about.founder')}</p><p className="text-muted-foreground text-sm leading-relaxed mt-3">{t('about.founder.desc')}</p></div></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
