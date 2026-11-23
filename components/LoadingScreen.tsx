'use client';

/**
 * ⏳ Loading screen — rotating sun, ZiSun wordmark, progress bar, tagline.
 * Mirrors the original loader, then lifts away with a smooth curtain exit.
 */
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { getLenis } from '@/lib/scroll';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => setLoading(false), reduce ? 350 : 2050);
    return () => window.clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    if (!loading) {
      document.body.style.overflow = '';
      getLenis()?.start();
    }
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="loader"
          aria-hidden="true"
          exit={{ y: '-100%', opacity: 0.6 }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.svg
            className="loader__sun"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.circle
              cx="12"
              cy="12"
              r="5"
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '12px 12px' }}
            />
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '12px 12px' }}
            >
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </motion.g>
          </motion.svg>

          <motion.h1
            className="loader__logo"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: 'easeOut' }}
          >
            ZiSun
          </motion.h1>

          <div className="loader__progress">
            <motion.div
              className="loader__progress-bar"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: reduce ? 0.3 : 1.7, ease: [0.65, 0, 0.35, 1], delay: 0.15 }}
            />
          </div>

          <motion.p
            className="loader__tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Made for sunny souls
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
