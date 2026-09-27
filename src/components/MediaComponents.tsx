import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  title?: string;
}

export const VideoPlayerModal = ({ isOpen, onClose, videoUrl, title }: VideoPlayerModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-5xl aspect-video bg-card rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            {videoUrl ? (
              videoUrl.match(/\.(mp4|webm|mov)/i) ? (
                <video
                  src={videoUrl}
                  className="w-full h-full object-contain bg-background"
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                />
              ) : (
                <iframe
                  src={videoUrl}
                  className="w-full h-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  title={title || 'Video Player'}
                />
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">{title || 'Project media'}</p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface ProjectCardProps {
  title: string;
  category: string;
  image?: string;
  videoUrl?: string;
  onClick?: () => void;
  placeholderLabel?: string;
}

export const ProjectCard = ({ title, category, image, videoUrl, onClick, placeholderLabel }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleLeave = () => {
    setIsHovered(false);
    if (videoRef.current) videoRef.current.pause();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="group relative aspect-video overflow-hidden rounded-lg cursor-pointer bg-secondary shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_25px_60px_-10px_hsl(var(--primary)/0.45)] ring-1 ring-border/40 hover:ring-primary/50"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={onClick}
    >
      {image ? <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" decoding="async" /> : <div className="absolute inset-0 flex items-center justify-center text-primary/40"><span className="text-xs uppercase tracking-widest">{placeholderLabel}</span></div>}
      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-70'}`} />
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <p className="text-primary text-xs tracking-widest uppercase mb-1">{category}</p>
        <h3 className="text-foreground font-display text-xl font-semibold">{title}</h3>
      </div>
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 z-10 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
        <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-[0_0_30px_hsl(var(--primary)/0.7)] ring-2 ring-primary-foreground/20 animate-pulse">
          <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
        </div>
      </div>
    </motion.div>
  );
};

export const SectionHeader = ({ title, subtitle, className = '' }: { title: string; subtitle: string; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`text-center mb-16 ${className}`}
  >
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">{title}</h2>
    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>
    <div className="w-20 h-0.5 bg-primary mx-auto mt-6" />
  </motion.div>
);
