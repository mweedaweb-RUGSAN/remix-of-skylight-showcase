import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Building2, DraftingCompass, HardHat, ClipboardCheck, Ruler, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionHeader } from './MediaComponents';

export const DigitalMarketingPackages = () => {
  const { t } = useLanguage();

  const plans = [
    { name: t('packages.starter'), tagline: t('services.videoProduction.desc'), icon: Building2, featured: false, items: ['services.videoProduction', 'services.photography'] },
    { name: t('packages.standard'), tagline: t('services.promotional.desc'), icon: DraftingCompass, featured: false, items: ['services.promotional'] },
    { name: t('packages.premium'), tagline: t('services.socialMedia.desc'), icon: HardHat, featured: false, items: ['services.socialMedia'] },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Ambient background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[80%] h-[60%] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container-custom relative">
        <SectionHeader title={t('packages.title')} subtitle={t('packages.subtitle')} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch mt-10 pt-6">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`package-card group relative ${plan.featured ? 'package-card-featured md:scale-[1.05] md:-mt-2' : ''}`}
                style={{ overflow: 'visible' }}
              >
                <div className="relative z-10 flex flex-col flex-1">
                  {/* Icon header */}
                  <div className="flex items-center justify-center mb-5">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      plan.featured
                        ? 'bg-gradient-to-br from-primary to-accent shadow-[0_10px_30px_-8px_hsl(var(--primary)/0.6)]'
                        : 'bg-primary/10 ring-1 ring-primary/30 group-hover:bg-primary/20'
                    }`}>
                      <Icon className={`w-7 h-7 ${plan.featured ? 'text-primary-foreground' : 'text-primary'}`} />
                    </div>
                  </div>

                  <h3 className="text-foreground font-display text-2xl md:text-3xl font-semibold text-center tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-xs md:text-sm text-center mt-2 mb-6 leading-relaxed">
                    {plan.tagline}
                  </p>

                  <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-6" />

                  <ul className="space-y-3.5 flex-1 mb-8">
                    {plan.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-foreground/85">
                        <span className={`mt-0.5 flex items-center justify-center w-5 h-5 rounded-full shrink-0 transition-all duration-300 ${
                          plan.featured
                            ? 'bg-primary text-primary-foreground shadow-[0_4px_12px_-2px_hsl(var(--primary)/0.6)]'
                            : 'bg-primary/15 ring-1 ring-primary/30 text-primary group-hover:bg-primary/25'
                        }`}>
                          <Check className="w-3 h-3" strokeWidth={3} />
                        </span>
                        <span>{t(item)}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className={`group/btn inline-flex items-center justify-center gap-2 ${plan.featured ? 'btn-primary' : 'btn-outline'}`}
                  >
                    {t('packages.cta')}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const EventPackages = () => {
  const { t } = useLanguage();

  const plans = [
    { icon: ClipboardCheck, name: t('packages.school'), items: ['services.eventCoverage', 'services.eventCoverage.desc'] },
    { icon: Ruler, name: t('packages.university'), items: ['services.brandMedia', 'services.brandMedia.desc'] },
  ];

  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <SectionHeader title={t('packages.event.title')} subtitle={t('packages.event.subtitle')} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map(({ icon: Icon, name, items }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="package-card"
            >
              <div className="relative z-10 flex flex-col flex-1">
                <div className="w-16 h-16 rounded-xl bg-primary/10 ring-1 ring-primary/30 flex items-center justify-center mb-6 shadow-[0_0_24px_hsl(var(--primary)/0.25)]">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-foreground font-display text-2xl md:text-3xl font-semibold mb-6">{name}</h3>
                <ul className="space-y-3.5 flex-1 mb-8">
                  {items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-primary/15 ring-1 ring-primary/30 shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </span>
                      <span>{t(item)}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="btn-primary text-center">
                  {t('packages.cta')}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
