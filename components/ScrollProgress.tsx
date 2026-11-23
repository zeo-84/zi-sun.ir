'use client';

/** 📊 Golden scroll-progress bar pinned to the top of the page (RTL origin). */
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
