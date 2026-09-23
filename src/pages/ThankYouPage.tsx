import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const ThankYouPage = () => {
  const { t } = useLanguage();
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-32 pb-16">
      <div className="glass-card max-w-xl w-full text-center p-10 space-y-6">
        <p className="font-display text-3xl font-bold text-foreground">RUGSAN</p>
        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto" strokeWidth={1.5} />
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
          {t('contact.sent')}
        </h1>
        <p className="text-muted-foreground">
          {t('contact.sent.desc')}
        </p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          {t('nav.home')}
        </Link>
      </div>
    </section>
  );
};

export default ThankYouPage;
