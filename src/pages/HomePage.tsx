import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { ArrowRight, ChevronDown, Quote, Building2, DraftingCompass, HardHat, Files, ClipboardCheck, Ruler } from 'lucide-react';
import { useState } from 'react';
import { getFeaturedPortfolio, type PortfolioItem } from '@/data/portfolio';
import { categoryKeys } from '@/data/workLabels';

import { ProjectCard, VideoPlayerModal, SectionHeader } from '@/components/MediaComponents';
import WhyChooseUs from '@/components/WhyChooseUs';
import ProcessSection from '@/components/ProcessSection';
import { DigitalMarketingPackages, EventPackages } from '@/components/Packages';

const featuredProductions = getFeaturedPortfolio(6);

const serviceIcons = [Building2, DraftingCompass, HardHat, Files, ClipboardCheck, Ruler];
const CounterPlaceholder = ({ label }: { label: string }) => (
  <div className="text-center"><div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold gradient-text mb-2">—</div><p className="text-muted-foreground text-sm tracking-widest uppercase">{label}</p></div>
);

const HomePage = () => {
  const { t, language } = useLanguage();
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedProduction, setSelectedProduction] = useState<PortfolioItem | null>(null);

  const services = [
    { key: 'services.videoProduction' },
    { key: 'services.promotional' },
    { key: 'services.socialMedia' },
    { key: 'services.photography' },
    { key: 'services.eventCoverage' },
    { key: 'services.brandMedia' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: 'easeOut' }}
        >
          <div className="w-full h-full bg-surface" />
          {/* Cinematic dark layer + brand-tinted gradient for stronger text readability */}
          <div className="absolute inset-0 bg-background/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/85" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-background/40 mix-blend-multiply" />
          <div className="absolute inset-0 cinematic-overlay" />
        </motion.div>

        <div className="relative z-10 container-custom px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <span className="h-px w-10 bg-primary/60" />
              <span className="text-primary text-xs md:text-sm tracking-[0.5em] uppercase font-medium">
                RUGSAN
              </span>
              <span className="h-px w-10 bg-primary/60" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.05] mb-8 max-w-5xl mx-auto tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
              <span className="block text-foreground">Rugsan</span>
              <span className="block gradient-text">Construction Company</span>
              <span className="block text-foreground/90 text-3xl md:text-4xl lg:text-5xl mt-4 font-display italic font-medium">
                Architecture · Engineering · Construction
              </span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">{t('hero.subheadline')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/portfolio" className="btn-primary">{t('hero.cta.primary')}</Link>
              <Link to="/contact" className="btn-outline">{t('hero.cta.secondary')}</Link>
            </div>
          </motion.div>
        </div>

        {/* Modern scroll indicator */}
        <motion.a
          href="#featured"
          aria-label={t('hero.scroll')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <span className="text-[10px] tracking-[0.4em] uppercase font-medium">{t('hero.scroll')}</span>
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-current/40 flex items-start justify-center p-1.5"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <div className="w-1.5 h-3 rounded-full bg-primary" />
          </motion.div>
          <ChevronDown className="w-3.5 h-3.5 -mt-1 animate-bounce" />
        </motion.a>
      </section>

      {/* Recent Productions */}
      <section id="featured" className="section-padding bg-surface">
        <div className="container-custom">
          <SectionHeader title={t('featured.title')} subtitle={t('featured.subtitle')} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProductions.map((item) => (
              <ProjectCard
                key={item.id}
                title={item.title[language]}
                category={t(categoryKeys[item.category])}
                placeholderLabel={t('portfolio.mediaPending')}
                videoUrl={undefined}
                onClick={() => {
                  setSelectedProduction(item);
                  setVideoModalOpen(true);
                }}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/portfolio" className="btn-outline inline-flex items-center gap-2">
              {t('featured.more')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader title={t('services.title')} subtitle={t('services.subtitle')} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ key }, i) => { const Icon = serviceIcons[i]; return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
                className="glass-card p-8 hover-lift hover-border-glow group flex flex-col items-center text-center"
              >
                <div className="icon-glow-wrap-lg mb-6">
                  <Icon className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] text-primary transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1" />
                </div>
                <h3 className="text-foreground font-display text-xl font-semibold mb-3">{t(key)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{t(`${key}.desc`)}</p>
                <Link to="/services" className="inline-flex items-center gap-2 text-primary text-sm tracking-wider uppercase hover:gap-3 transition-all">
                  {t('services.learnMore')} <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ); })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Process */}
      <ProcessSection />

      {/* Digital Marketing Packages */}
      <DigitalMarketingPackages />

      {/* Event & Graduation Packages */}
      <EventPackages />

      {/* Stats */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <CounterPlaceholder label={t('stats.projects')} />
            <CounterPlaceholder label={t('stats.clients')} />
            <CounterPlaceholder label={t('stats.years')} />
            <CounterPlaceholder label={t('stats.awards')} />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <SectionHeader title={t('testimonials.title')} subtitle={t('testimonials.subtitle')} />
          <div className="max-w-3xl mx-auto relative min-h-[320px]">
            <div className="glass-card p-10 md:p-12 text-center relative overflow-hidden">
              <Quote className="w-10 h-10 text-primary/40 mx-auto mb-6" />
              <p className="text-foreground text-lg md:text-xl leading-relaxed">{t('testimonials.pending')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <div className="w-full h-full bg-surface" />
        </div>
        {/* Cinematic gradient overlay */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/95" />
        {/* Animated light flares */}
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="cta-flare cta-flare-a w-[420px] h-[420px] -top-32 -left-24" />
          <div className="cta-flare cta-flare-b w-[380px] h-[380px] -bottom-32 -right-20" />
        </div>
        <div className="relative z-10 container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-5 tracking-tight">
              {t('cta.title')}
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">{t('cta.subtitle')}</p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2 animate-glow-pulse">
              {t('cta.button')} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <VideoPlayerModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        videoUrl={undefined}
        title={selectedProduction?.title[language] || t('portfolio.mediaPending')}
      />
    </>
  );
};

export default HomePage;
