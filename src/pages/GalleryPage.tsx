import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { X, Play } from 'lucide-react';
import { portfolioItems } from '@/data/portfolio';
import { categoryKeys } from '@/data/workLabels';

const GalleryPage = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const masonrySizes = ['aspect-square', 'aspect-[3/4]', 'aspect-video', 'aspect-[4/3]', 'aspect-square', 'aspect-[3/4]'];
  return <>
    <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center"><div className="absolute inset-0 bg-surface"><div className="absolute inset-0 cinematic-overlay" /><div className="absolute inset-0 bg-background/50" /></div><div className="relative z-10 text-center px-4"><motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-display font-bold text-foreground">{t('gallery.title')}</motion.h1><motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-muted-foreground text-lg mt-4">{t('gallery.subtitle')}</motion.p></div></section>
    <section className="section-padding"><div className="container-custom"><div className="flex justify-center gap-4 mb-12">{(['photos','videos'] as const).map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2.5 rounded-sm text-xs tracking-widest uppercase transition-all ${activeTab === tab ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>{t(`gallery.${tab}`)}</button>)}</div>
      {activeTab === 'photos' ? <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">{portfolioItems.map((item, i) => <motion.div key={item.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="break-inside-avoid overflow-hidden rounded-lg cursor-pointer group relative bg-secondary" onClick={() => setSelectedImage(i)}><div className={`${masonrySizes[i % masonrySizes.length]} flex items-center justify-center text-muted-foreground text-sm`}>{t('gallery.pending')}</div><div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-300 flex items-end"><p className="text-foreground text-sm p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{t(categoryKeys[item.category])} · {item.title[language]}</p></div></motion.div>)}</div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{portfolioItems.map(item => <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="aspect-video relative rounded-lg overflow-hidden group bg-secondary flex items-center justify-center"><div className="w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center"><Play className="w-7 h-7 text-primary ml-1" /></div><p className="absolute bottom-0 left-0 right-0 p-4 text-foreground text-sm bg-gradient-to-t from-background/80 to-transparent">{item.title[language]} · {t('portfolio.mediaPending')}</p></motion.div>)}</div>}
    </div></section>
    <AnimatePresence>{selectedImage !== null && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-background/95 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}><button aria-label="Close" className="absolute top-6 right-6 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all"><X className="w-5 h-5" /></button><div className="w-full max-w-3xl aspect-video bg-secondary rounded-lg flex flex-col items-center justify-center gap-4 text-muted-foreground"><p>{portfolioItems[selectedImage]?.title[language]}</p><p>{t('gallery.pending')}</p></div></motion.div>}</AnimatePresence>
  </>;
};
export default GalleryPage;
