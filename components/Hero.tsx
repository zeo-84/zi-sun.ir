'use client';

/**
 * 🎬 Hero — "Made for sunny souls".
 * Dark: galaxy gradient + twinkling stars + shooting star.
 * Light: soft blue sky + drifting clouds + warm sun glow.
 */
import { useMemo, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import HeroSlider from './HeroSlider';
import { ChevronDownIcon } from './icons';
import { scrollToId } from '@/lib/scroll';

/* Deterministic PRNG → identical star field on server & client (no hydration drift). */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Star = { x: number; y: number; s: number; delay: number; dur: number; o: number };

function makeStars(count: number, seed: number, maxSize: number): Star[] {
  const rnd = mulberry32(seed);
  return Array.from({ length: count }, () => ({
    x: rnd() * 100,
    y: rnd() * 100,
    s: 0.8 + rnd() * maxSize,
    delay: rnd() * 5,
    dur: 2.2 + rnd() * 3.5,
    o: 0.25 + rnd() * 0.65,
  }));
}

const titleWords = [
  { text: 'Made', gold: false },
  { text: 'for', gold: false },
  { text: 'sunny', gold: true },
  { text: 'souls', gold: false },
];

const wordVariants = {
  hidden: { opacity: 0, y: 34, rotate: 5 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: 'spring' as const, stiffness: 120, damping: 16 },
  },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.05]);
  const skyY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  const farStars = useMemo(() => makeStars(46, 84, 1.2), []);
  const nearStars = useMemo(() => makeStars(26, 137, 2), []);

  const parallax = reduce ? {} : { y: contentY, opacity: contentOpacity };

  return (
    <section className="hero" id="home" ref={ref} aria-label="معرفی برند زیسان">
      {/* ——— atmosphere layers ——— */}
      <motion.div className="hero__sky" style={reduce ? undefined : { y: skyY }} aria-hidden="true">
        <div className="hero__nebula hero__nebula--a" />
        <div className="hero__nebula hero__nebula--b" />
        <div className="hero__sunglow" />
        <div className="hero__stars">
          {farStars.map((st, i) => (
            <span
              key={`f${i}`}
              className="star"
              style={{
                left: `${st.x}%`,
                top: `${st.y}%`,
                width: st.s,
                height: st.s,
                ['--o' as string]: st.o,
                ['--dur' as string]: `${st.dur}s`,
                ['--delay' as string]: `${st.delay}s`,
              }}
            />
          ))}
        </div>
        <div className="hero__stars hero__stars--near">
          {nearStars.map((st, i) => (
            <span
              key={`n${i}`}
              className="star"
              style={{
                left: `${st.x}%`,
                top: `${st.y}%`,
                width: st.s,
                height: st.s,
                ['--o' as string]: st.o,
                ['--dur' as string]: `${st.dur}s`,
                ['--delay' as string]: `${st.delay}s`,
              }}
            />
          ))}
        </div>
        <span className="hero__shooting-star" />
        <div className="hero__cloud hero__cloud--1" />
        <div className="hero__cloud hero__cloud--2" />
        <div className="hero__cloud hero__cloud--3" />
      </motion.div>

      {/* ——— content ——— */}
      <motion.div className="hero__content" style={parallax}>
        <motion.h1
          className="hero__title font-en"
          dir="ltr"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 2.3 } } }}
        >
          {titleWords.map((w) => (
            <motion.span
              key={w.text}
              className={`hero__word ${w.gold ? 'hero__word--gold' : ''}`}
              variants={wordVariants}
            >
              {w.text}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          className="hero__divider"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 2.85, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.05, duration: 0.9, ease: 'easeOut' }}
        >
          طراحی لباس سفارشی با سبک منحصربه‌فرد
        </motion.p>

        <motion.div
          /* ✅ عرض کامل — بدون این، آیتمِ فلکس به عرض محتوا جمع می‌شود و اسلایدر له می‌شود */
          style={{ width: '100%' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.25, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroSlider />
        </motion.div>
      </motion.div>

      {/* ——— scroll cue ——— */}
      <motion.button
        className="hero__scroll-cue"
        onClick={() => scrollToId('connect')}
        aria-label="اسکرول به بخش بعدی"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.9, duration: 1 }}
      >
        <span className="hero__mouse">
          <motion.span
            className="hero__mouse-dot"
            animate={reduce ? undefined : { y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="hero__scroll-chevron"
        >
          <ChevronDownIcon width={14} height={14} />
        </motion.span>
      </motion.button>
    </section>
  );
}
