import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';

const SITE_NAME = 'Rugsan Construction Company';
const ORIGIN = 'https://rugsancco.com';

// Route -> existing approved translation keys (no new copy is introduced here).
const routeMeta: Record<string, { title: string; description?: string }> = {
  '/': { title: 'hero.cta.primary', description: 'hero.subheadline' },
  '/about': { title: 'about.title', description: 'about.journey.subtitle' },
  '/services': { title: 'services.title', description: 'services.subtitle' },
  '/portfolio': { title: 'portfolio.title', description: 'portfolio.subtitle' },
  '/case-studies': { title: 'caseStudies.title', description: 'caseStudies.subtitle' },
  '/gallery': { title: 'gallery.title', description: 'gallery.subtitle' },
  '/testimonials': { title: 'testimonials.title', description: 'testimonials.subtitle' },
  '/blog': { title: 'blog.title', description: 'blog.subtitle' },
  '/contact': { title: 'contact.title', description: 'contact.subtitle' },
};

const upsert = (selector: string, create: () => HTMLElement) => {
  let el = document.head.querySelector(selector) as HTMLElement | null;
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
};

const setMetaByName = (name: string, content: string) => {
  const el = upsert(`meta[name="${name}"]`, () => {
    const m = document.createElement('meta');
    m.setAttribute('name', name);
    return m;
  }) as HTMLMetaElement;
  el.setAttribute('content', content);
};

const setMetaByProperty = (property: string, content: string) => {
  const el = upsert(`meta[property="${property}"]`, () => {
    const m = document.createElement('meta');
    m.setAttribute('property', property);
    return m;
  }) as HTMLMetaElement;
  el.setAttribute('content', content);
};

const setLink = (rel: string, href: string, hreflang?: string) => {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  const el = upsert(selector, () => {
    const l = document.createElement('link');
    l.setAttribute('rel', rel);
    if (hreflang) l.setAttribute('hreflang', hreflang);
    return l;
  }) as HTMLLinkElement;
  el.setAttribute('href', href);
};

const CanonicalTags = () => {
  const { pathname } = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const path = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
    const url = `${ORIGIN}${path}`;
    const meta = routeMeta[path];

    const pageTitle = meta && path !== '/' ? `${t(meta.title)} | ${SITE_NAME}` : `${SITE_NAME} | ${t('footer.description')}`;
    const pageDescription = meta?.description ? t(meta.description) : t('hero.subheadline');

    document.title = pageTitle;
    setMetaByName('description', pageDescription);

    setMetaByProperty('og:title', pageTitle);
    setMetaByProperty('og:description', pageDescription);
    setMetaByProperty('og:url', url);
    setMetaByProperty('og:site_name', SITE_NAME);
    setMetaByProperty('og:type', 'website');

    setMetaByName('twitter:card', 'summary_large_image');
    setMetaByName('twitter:title', pageTitle);
    setMetaByName('twitter:description', pageDescription);

    setLink('canonical', url);
    setLink('alternate', url, 'so');
    setLink('alternate', url, 'en');
    setLink('alternate', url, 'ar');
    setLink('alternate', url, 'x-default');
  }, [pathname, t]);

  return null;
};

export default CanonicalTags;
