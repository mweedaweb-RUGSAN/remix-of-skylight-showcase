import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { Facebook, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

// Inline TikTok icon (lucide doesn't ship one)
const TiktokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M16.5 3a5.5 5.5 0 0 0 5.5 5.5v3a8.5 8.5 0 0 1-5-1.62V15a6 6 0 1 1-6-6c.34 0 .67.03 1 .09v3.18a3 3 0 1 0 2 2.83V3h2.5z"/>
  </svg>
);
import { useState } from 'react';

const Footer = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:info@rugsancco.com?subject=${encodeURIComponent('Updates enquiry')}&body=${encodeURIComponent(email)}`;
  };

  return (
    <footer className="relative bg-surface border-t border-primary/20 overflow-hidden">
      {/* Brand color accent glows (replaces watermark) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
      />
      {/* Top brand-color hairline */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
      />

      <div className="relative container-custom px-4 md:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" aria-label="Rugsan Construction Company" className="inline-flex items-center gap-3 group">
              <span className="flex flex-col"><span className="font-display font-bold text-foreground text-xl">RUGSAN</span><span className="text-[9px] text-primary">{t('footer.description')}</span></span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex gap-2.5">
              {[
                { icon: Facebook, href: 'https://www.facebook.com/Rugsancco', label: 'Facebook' },
                { icon: TiktokIcon, href: 'https://www.tiktok.com/@rugsancco', label: 'TikTok' },
              ].map(({ icon: Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-[0_0_20px_hsl(var(--primary)/0.6)] hover:-translate-y-0.5 hover:scale-110 transition-all duration-300 ease-out will-change-transform"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-display text-base mb-4 relative inline-block">
              {t('footer.quickLinks')}
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-primary rounded-full" />
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: t('nav.home'), path: '/' },
                { label: t('nav.about'), path: '/about' },
                { label: t('nav.portfolio'), path: '/portfolio' },
                { label: t('nav.blog'), path: '/blog' },
                { label: t('nav.contact'), path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary group-hover:shadow-[0_0_8px_hsl(var(--primary))] transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-foreground font-display text-base mb-4 relative inline-block">
              {t('footer.services')}
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-primary rounded-full" />
            </h4>
            <ul className="space-y-2.5">
              {[
                'services.videoProduction',
                'services.promotional',
                'services.socialMedia',
                'services.photography',
                'services.eventCoverage',
                'services.brandMedia',
              ].map((key) => (
                <li key={key}>
                  <Link
                    to="/services"
                    className="text-muted-foreground text-sm hover:text-primary transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary group-hover:shadow-[0_0_8px_hsl(var(--primary))] transition-all" />
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Contact */}
          <div className="space-y-5">
            <div>
              <h4 className="text-foreground font-display text-base mb-4 relative inline-block">
                {t('footer.newsletter')}
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-primary rounded-full" />
              </h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  aria-label={t('footer.newsletter')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.newsletter.placeholder')}
                  className="flex-1 min-w-0 bg-secondary/60 border border-primary/20 rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.15)] transition-all"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 hover:shadow-[0_0_18px_hsl(var(--primary)/0.5)] transition-all"
                >
                  {t('footer.newsletter.button')}
                </button>
              </form>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <span className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                </span>
                <span>{t('contact.info.address')}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <span className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  <a href="tel:+252615969854" className="hover:text-primary transition-colors">+252-615969854</a>
                  <span className="opacity-40">·</span>
                  <a href="tel:+252614044302" className="hover:text-primary transition-colors">+252-614044302</a>
                  <span className="opacity-40">·</span>
                  <a
                    href="https://wa.me/252615969854"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:drop-shadow-[0_0_10px_hsl(var(--primary)/0.7)] transition"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <span className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                </span>
                <a href="mailto:info@rugsancco.com" className="hover:text-primary transition-colors break-all">
                  info@rugsancco.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-primary/15">
        <div className="container-custom px-4 md:px-8 py-4 text-center">
          <p className="text-muted-foreground text-xs tracking-wider">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
