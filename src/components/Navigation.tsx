import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { Language } from '@/i18n/translations';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const languages: { code: Language; label: string }[] = [
  { code: 'so', label: 'Soomaali' },
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
];

const Navigation = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const navLinks = [
    { key: 'nav.home', path: '/' },
    { key: 'nav.about', path: '/about' },
    { key: 'nav.services', path: '/services' },
    { key: 'nav.portfolio', path: '/portfolio' },
    { key: 'nav.caseStudies', path: '/case-studies' },
    { key: 'nav.gallery', path: '/gallery' },
    { key: 'nav.testimonials', path: '/testimonials' },
    { key: 'nav.blog', path: '/blog' },
    { key: 'nav.contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-background/85 backdrop-blur-2xl border-b border-primary/20 py-3 shadow-[0_8px_30px_-10px_hsl(var(--primary)/0.3)]' : 'bg-background/40 backdrop-blur-md py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between px-4 md:px-8 gap-4">
        {/* Company wordmark placeholder until an approved Rugsan logo is available */}
        <Link to="/" className="flex items-center gap-3 group shrink-0" aria-label="Rugsan Construction Company">
          <span className="flex flex-col"><span className="font-display font-bold text-foreground text-xl">RUGSAN</span><span className="text-[9px] text-primary">Architecture · Engineering · Construction</span></span>
        </Link>

        {/* Desktop Nav — translucent pill bar with brand-tinted links */}
        <div className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-full bg-foreground/[0.04] backdrop-blur-md border border-primary/15 shadow-inner">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3.5 py-2 text-[11px] font-semibold tracking-[0.18em] uppercase rounded-full transition-all duration-300 ${
                  active
                    ? 'text-primary-foreground bg-primary shadow-[0_6px_18px_-6px_hsl(var(--primary)/0.7)]'
                    : 'text-foreground/80 hover:text-primary-foreground hover:bg-primary/80'
                }`}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </div>

        {/* Language Switcher + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              aria-label="Language"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{language.toUpperCase()}</span>
            </button>
            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-full mt-2 glass-card py-2 min-w-[140px]"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                        language === lang.code ? 'text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden text-foreground p-2"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/98 backdrop-blur-xl border-b border-border"
          >
            <div className="container-custom py-6 px-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 text-sm tracking-widest uppercase transition-colors ${
                    location.pathname === link.path
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
