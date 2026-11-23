'use client';

/** 🔍 Lightbox — full-size product / slider photo in a blurred overlay. */
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '@/lib/store';
import { CloseIcon } from './icons';

export default function Lightbox() {
  const { lightbox, closeLightbox } = useApp();

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, closeLightbox]);

  return (
    <AnimatePresence>
      {lightbox && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={closeLightbox}
        >
          <motion.figure
            className="lightbox__figure"
            initial={{ scale: 0.88, y: 26, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 12, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Plain img: mixed aspect ratios (square products / wide slides) fit naturally. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lightbox.src} alt={lightbox.alt} className="lightbox__img" />
            <figcaption className="lightbox__caption">{lightbox.alt}</figcaption>
            <motion.button
              className="lightbox__close"
              onClick={closeLightbox}
              aria-label="بستن"
              whileHover={{ scale: 1.12, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <CloseIcon width={16} height={16} />
            </motion.button>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
