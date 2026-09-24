import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const upsert = (selector: string, create: () => HTMLElement) => {
  let el = document.head.querySelector(selector) as HTMLElement | null;
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
};

const CanonicalTags = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
    const url = `https://rugsancco.com${path}`;

    const canonical = upsert('link[rel="canonical"]', () => {
      const l = document.createElement('link');
      l.setAttribute('rel', 'canonical');
      return l;
    }) as HTMLLinkElement;
    canonical.setAttribute('href', url);

    const ogUrl = upsert('meta[property="og:url"]', () => {
      const m = document.createElement('meta');
      m.setAttribute('property', 'og:url');
      return m;
    }) as HTMLMetaElement;
    ogUrl.setAttribute('content', url);
  }, [pathname]);
  return null;
};

export default CanonicalTags;
