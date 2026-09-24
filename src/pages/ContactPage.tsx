import { useState, FormEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { Mail, Phone, MapPin, Facebook, MessageCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';


const TiktokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M16.5 3a5.5 5.5 0 0 0 5.5 5.5v3a8.5 8.5 0 0 1-5-1.62V15a6 6 0 1 1-6-6c.34 0 .67.03 1 .09v3.18a3 3 0 1 0 2 2.83V3h2.5z" />
  </svg>
);

type FormState = {
  name: string;
  email: string;
  phone: string;
  location: string;
  service: string;
  subject: string;
  message: string;
};

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  location: '',
  service: '',
  subject: '',
  message: '',
};

// Submits to the Cloudflare Pages Function at /api/contact.
async function submitContact(payload: FormState): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    let data: { success?: boolean; error?: string } | null = null;
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      data = await res.json();
    }
    if (res.ok && data?.success) return { success: true };
    return { success: false, error: data?.error || `Failed to send message (HTTP ${res.status})` };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Network error' };
  }
}

const ContactPage = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    const result = await submitContact(formData);
    setSubmitting(false);
    if (result.success) {
      toast.success(t('contact.sent'));
      setFormData(initialState);
      setSent(true);
    } else {
      toast.error(t('contact.failed'));
    }
  };

  return (
    <>
      <section className="pt-32 pb-16 px-4">
        <div className="container-custom text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-display font-bold text-foreground">
            {t('contact.title')}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">
            {t('contact.subtitle')}
          </motion.p>
          <div className="w-20 h-0.5 bg-primary mx-auto mt-6" />
        </div>
      </section>

      <section className="section-padding pt-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 min-w-0">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3 min-w-0"
            >
              <div className="relative">
                <AnimatePresence>
                  {sent && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="glass-card p-10 md:p-14 text-center flex flex-col items-center gap-5"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.15 }}
                        className="relative"
                      >
                        <span className="absolute inset-0 rounded-full bg-primary/25 blur-2xl" />
                        <CheckCircle2 className="w-20 h-20 text-primary relative drop-shadow-[0_0_20px_hsl(var(--primary)/0.6)]" strokeWidth={1.5} />
                      </motion.div>
                      <h3 className="text-foreground font-display text-2xl md:text-3xl font-semibold">
                        {t('contact.sent')}
                      </h3>
                      <p className="text-muted-foreground max-w-sm">
                        {t('contact.sent.desc')}
                      </p>
                      <button
                        type="button"
                        onClick={() => setSent(false)}
                        className="btn-outline mt-2"
                      >
                        {t('contact.again')}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!sent && (
                  <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-foreground text-sm font-medium mb-2 block">{t('contact.name')}</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-secondary/60 border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.18)] transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-foreground text-sm font-medium mb-2 block">{t('contact.email')}</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-secondary/60 border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.18)] transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-foreground text-sm font-medium mb-2 block">{t('contact.phone')}</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-secondary/60 border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.18)] transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-foreground text-sm font-medium mb-2 block">{t('contact.location')}</label>
                        <input
                          type="text"
                          name="location"
                          required
                          value={formData.location}
                          onChange={handleChange}
                          className="w-full bg-secondary/60 border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.18)] transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-foreground text-sm font-medium mb-2 block">{t('contact.service')}</label>
                        <input
                          type="text"
                          name="service"
                          required
                          value={formData.service}
                          onChange={handleChange}
                          
                          className="w-full bg-secondary/60 border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.18)] transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-foreground text-sm font-medium mb-2 block">{t('contact.subject')}</label>
                        <input
                          type="text"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full bg-secondary/60 border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.18)] transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-foreground text-sm font-medium mb-2 block">{t('contact.message')}</label>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-secondary/60 border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.18)] transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> {t('contact.sending')}
                        </>
                      ) : (
                        t('contact.send')
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-8 min-w-0 w-full overflow-hidden"
            >
              <div className="glass-card p-8">
                <h3 className="text-foreground font-display text-xl font-semibold mb-6">{t('contact.info.title')}</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-foreground font-medium text-sm">{t('contact.address')}</p>
                      <p className="text-muted-foreground text-sm break-words">{t('contact.info.address')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-foreground font-medium text-sm">{t('contact.phone.label')}</p>
                      <div className="flex items-center gap-3 text-muted-foreground text-sm flex-wrap">
                        <a href="tel:+252615969854" className="hover:text-primary transition-colors">+252-615969854</a>
                        <a href="tel:+252614044302" className="hover:text-primary transition-colors">+252-614044302</a>
                        <a
                          href="https://wa.me/252615969854"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:drop-shadow-[0_0_10px_hsl(var(--primary)/0.7)] transition"
                        >
                          <MessageCircle className="w-4 h-4" /> WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-foreground font-medium text-sm">Email</p>
                      <a href="mailto:info@rugsancco.com" className="text-muted-foreground text-sm hover:text-primary transition-colors break-all">
                        info@rugsancco.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="glass-card p-8">
                <h3 className="text-foreground font-display text-xl font-semibold mb-4">{t('footer.connect')}</h3>
                <div className="flex gap-3">
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
                      className="w-12 h-12 rounded-sm bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="glass-card aspect-video rounded-lg overflow-hidden">
                <iframe
                  title="Rugsan Construction Company Location"
                  src="https://www.google.com/maps?q=Waaberi+Mall+Waabari+Mogadishu&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
