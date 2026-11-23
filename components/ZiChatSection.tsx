'use client';

/**
 * 🤖 ZiChat section — the golden robot mascot.
 * Eyes follow the cursor, antenna glows, speech bubble types on a loop,
 * and the CTA opens the ZiChat assistant modal.
 */
import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { useApp } from '@/lib/store';
import { ziChatTypingText } from '@/lib/data';
import { SmsIcon, SparkleIcon } from './icons';

/* ——— looping typewriter (pauses on hover, like the original) ——— */
function useTypewriter(text: string) {
  const [output, setOutput] = useState('');
  const pausedRef = useRef(false);

  useEffect(() => {
    let i = 0;
    let timer: number;

    const tick = () => {
      if (pausedRef.current) {
        timer = window.setTimeout(tick, 220);
        return;
      }
      if (i < text.length) {
        i += 1;
        setOutput(text.slice(0, i));
        timer = window.setTimeout(tick, text[i - 1] === ' ' ? 80 : 52);
      } else {
        timer = window.setTimeout(() => {
          i = 0;
          setOutput('');
          timer = window.setTimeout(tick, 420);
        }, 3000);
      }
    };
    timer = window.setTimeout(tick, 1200);
    return () => window.clearTimeout(timer);
  }, [text]);

  return { output, pause: (v: boolean) => (pausedRef.current = v) };
}

export default function ZiChatSection() {
  const { openChat } = useApp();
  const reduce = useReducedMotion();
  const robotRef = useRef<HTMLButtonElement>(null);
  const { output, pause } = useTypewriter(ziChatTypingText);

  /* Pupils gently track the pointer. */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const pupilX = useSpring(px, { stiffness: 300, damping: 22 });
  const pupilY = useSpring(py, { stiffness: 300, damping: 22 });

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = robotRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / 260));
        const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / 260));
        px.set(dx * 3.4);
        py.set(dy * 2.6);
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [px, py, reduce]);

  return (
    <section className="zichat" id="zichat" aria-label="زی‌چت دستیار هوشمند">
      {/* decorative orbiting sparkles */}
      <div className="zichat__sparkles" aria-hidden="true">
        <motion.span
          className="zichat__sparkle zichat__sparkle--1"
          animate={reduce ? undefined : { y: [0, -12, 0], opacity: [0.4, 1, 0.4], rotate: [0, 40, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <SparkleIcon width={16} height={16} />
        </motion.span>
        <motion.span
          className="zichat__sparkle zichat__sparkle--2"
          animate={reduce ? undefined : { y: [0, 10, 0], opacity: [1, 0.35, 1], rotate: [0, -50, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        >
          <SparkleIcon width={11} height={11} />
        </motion.span>
        <motion.span
          className="zichat__sparkle zichat__sparkle--3"
          animate={reduce ? undefined : { y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
        >
          <SparkleIcon width={9} height={9} />
        </motion.span>
      </div>

      <motion.div
        className="zichat__stage"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ——— the robot ——— */}
        <motion.div
          className="zichat__character"
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.button
            ref={robotRef}
            className="zichat__body"
            onClick={openChat}
            aria-label="باز کردن چت با زی‌چت"
            whileHover={{ scale: 1.07, rotate: -3 }}
            whileTap={{ scale: 0.93, rotate: 3 }}
            onHoverStart={() => pause(true)}
            onHoverEnd={() => pause(false)}
          >
            <span className="zichat__antenna" aria-hidden="true">
              <span className="zichat__antenna-ball" />
            </span>
            <span className="zichat__eyes" aria-hidden="true">
              <span className="zichat__eye">
                <motion.span className="zichat__pupil" style={{ x: pupilX, y: pupilY }} />
              </span>
              <span className="zichat__eye">
                <motion.span className="zichat__pupil" style={{ x: pupilX, y: pupilY }} />
              </span>
            </span>
            <span className="zichat__cheek zichat__cheek--left" aria-hidden="true" />
            <span className="zichat__cheek zichat__cheek--right" aria-hidden="true" />
            <span className="zichat__mouth" aria-hidden="true" />
          </motion.button>

          {/* ——— typing speech bubble ——— */}
          <div className="zichat__bubble" aria-live="polite">
            <p className="zichat__typing">{output}</p>
            <span className="zichat__cursor" aria-hidden="true">|</span>
          </div>
        </motion.div>

        <h3 className="zichat__title">زی‌چت - دستیار هوشمند زیسان</h3>
        <p className="zichat__subtitle">هر سوالی داری، از من بپرس!</p>

        <motion.button
          className="zichat__cta"
          onClick={openChat}
          aria-label="باز کردن چت با زی‌چت"
          whileHover={{ y: -3, scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 350, damping: 18 }}
        >
          <span className="zichat__cta-pulse" aria-hidden="true" />
          <span className="zichat__cta-shine" aria-hidden="true" />
          <SmsIcon width={18} height={18} aria-hidden="true" />
          <span>شروع گفتگو</span>
        </motion.button>
      </motion.div>
    </section>
  );
}
