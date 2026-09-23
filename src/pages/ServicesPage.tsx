import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { Link } from 'react-router-dom';
import { SectionHeader } from '@/components/MediaComponents';
import { DigitalMarketingPackages, EventPackages } from '@/components/Packages';
import { Building2, DraftingCompass, HardHat, Files, ClipboardCheck, Ruler, ArrowRight } from 'lucide-react';
import serviceVideo from '@/assets/service-video.jpg';

const ServicesPage = () => {
  const { t } = useLanguage();

  const services = [
    { icon: Building2, key: 'services.videoProduction' },
    { icon: DraftingCompass, key: 'services.promotional' },
    { icon: HardHat, key: 'services.socialMedia' },
    { icon: Files, key: 'services.photography' },
    { icon: ClipboardCheck, key: 'services.eventCoverage' },
    { icon: Ruler, key: 'services.brandMedia' },
  ];
  const capabilities = ['services.videoProduction', 'services.promotional', 'services.socialMedia', 'services.photography', 'services.eventCoverage', 'services.brandMedia'];
  const capabilityIcons = [Building2, DraftingCompass, HardHat, Files, ClipboardCheck, Ruler];

  return (
    <>
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={serviceVideo} alt="Our Services" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 cinematic-overlay" />
          <div className="absolute inset-0 bg-background/50" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold text-foreground"
          >
            {t('services.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto"
          >
            {t('services.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Service detail blocks */}
      <section className="section-padding">
        <div className="container-custom space-y-24">
          {services.map(({ icon: Icon, key }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
            >
              <div className="flex-1 w-full">
                <div className="relative rounded-lg overflow-hidden group bg-surface">
                  <div className="aspect-video flex items-center justify-center"><Icon className="w-24 h-24 text-primary/40" /></div>
                </div>
              </div>
              <div className="flex-1">
                <div className="w-14 h-14 rounded-sm bg-primary/10 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">{t(key)}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{t(`${key}.desc`)}</p>
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  {t('hero.cta.secondary')} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Printing & Branding Materials */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <SectionHeader title={t('services.printing.title')} subtitle={t('services.printing.subtitle')} />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {capabilities.map((key, i) => { const Icon = capabilityIcons[i]; return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="relative glass-card p-5 flex flex-col items-center text-center hover-lift group overflow-hidden"
              >
                {/* Subtle transparent visual background */}
                <Icon
                  aria-hidden
                  className="pointer-events-none absolute -right-4 -bottom-4 w-24 h-24 text-primary/5 group-hover:text-primary/10 transition-colors duration-500"
                  strokeWidth={1}
                />
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center mb-3 shadow-[0_0_18px_hsl(var(--primary)/0.25)] group-hover:shadow-[0_0_28px_hsl(var(--primary)/0.55)] group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-5 h-5 text-primary drop-shadow-[0_0_6px_hsl(var(--primary)/0.7)]" />
                </div>
                <p className="relative text-foreground text-sm font-medium">{t(key)}</p>
              </motion.div>
            ); })}
          </div>
        </div>
      </section>

      {/* Packages */}
      <DigitalMarketingPackages />
      <EventPackages />
    </>
  );
};

export default ServicesPage;
