'use client';

/**
 * 🎯 Connect — «ارتباط با زیسان».
 * Magnetic glass icons with draw-in strokes, brand-color hover and tooltips.
 */
import { useRef, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type MotionStyle,
  type Variant,
} from 'framer-motion';
import { socials, type Social } from '@/lib/data';
import SectionHeading from './SectionHeading';

/* ——— magnetic wrapper: the icon leans gently toward the cursor ——— */
function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.5 });
  const y = useSpring(my, { stiffness: 260, damping: 18, mass: 0.5 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 14);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="magnetic"
      style={{ x, y } as MotionStyle}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}

/* ——— animated icons: strokes draw themselves in, telegram pops ——— */
const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (d: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { delay: d, duration: 1.1, ease: 'easeInOut' as const }, opacity: { delay: d, duration: 0.2 } },
  }),
};

function IconArt({ id }: { id: Social['id'] }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.9,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'connect__svg',
    'aria-hidden': true,
  };
  if (id === 'telegram')
    return (
      <motion.svg viewBox="0 0 24 24" fill="currentColor" className="connect__svg" aria-hidden
        variants={{ hidden: { scale: 0.4, opacity: 0, rotate: -30 }, show: { scale: 1, opacity: 1, rotate: 0, transition: { delay: 0.15, type: 'spring', stiffness: 200, damping: 14 } } }}>
        <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
      </motion.svg>
    );
  if (id === 'instagram')
    return (
      <svg {...common}>
        <motion.rect x="2" y="2" width="20" height="20" rx="5" ry="5" variants={draw} custom={0.25} />
        <motion.path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" variants={draw} custom={0.55} />
        <motion.line x1="17.5" y1="6.5" x2="17.51" y2="6.5" variants={draw} custom={0.95} />
      </svg>
    );
  if (id === 'sms')
    return (
      <svg {...common}>
        <motion.path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" variants={draw} custom={0.35} />
        <motion.line x1="8" y1="9" x2="16" y2="9" variants={draw} custom={0.85} />
        <motion.line x1="8" y1="13" x2="13" y2="13" variants={draw} custom={1.05} />
      </svg>
    );
  return (
    <svg {...common}>
      <motion.path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
        variants={draw}
        custom={0.45}
      />
    </svg>
  );
}

const wiggle: Record<Social['id'], Variant> = {
  telegram: { rotate: [0, -12, 10, 0], scale: 1.15 },
  instagram: { rotate: [0, -8, 8, 0], scale: 1.15 },
  sms: { y: [0, -4, 0, -2, 0], scale: 1.12 },
  phone: { rotate: [0, -14, 12, -8, 0], scale: 1.15 },
};

export default function Connect() {
  return (
    <section className="connect" id="connect" aria-label="راه‌های ارتباطی">
      <div className="container">
        <SectionHeading title="ارتباط با زیسان" />

        <motion.div
          className="connect__row"
          role="list"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ show: { transition: { staggerChildren: 0.14 } } }}
        >
          {socials.map((s) => (
            <motion.div
              key={s.id}
              role="listitem"
              variants={{ hidden: { opacity: 0, y: 30, scale: 0.8 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 160, damping: 16 } } }}
            >
              <Magnetic>
                <motion.a
                  href={s.href}
                  {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`connect__link connect__link--${s.id}`}
                  title={s.title}
                  aria-label={s.aria}
                  whileHover="hover"
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.span className="connect__icon-wrap" variants={{ hover: wiggle[s.id] }} transition={{ duration: 0.55 }}>
                    <IconArt id={s.id} />
                  </motion.span>
                  <span className="connect__tooltip" aria-hidden="true">{s.label}</span>
                </motion.a>
              </Magnetic>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
