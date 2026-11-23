'use client';

/** ✨ Shared section heading: title + golden divider + optional subtitle. */
import { motion } from 'framer-motion';

type Props = { title: string; subtitle?: string };

export default function SectionHeading({ title, subtitle }: Props) {
  return (
    <motion.div
      className="section-heading"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ show: { transition: { staggerChildren: 0.12 } } }}
    >
      <motion.h2
        className="section-heading__title"
        variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}
      >
        {title}
      </motion.h2>
      <motion.div
        className="section-heading__divider"
        aria-hidden="true"
        variants={{ hidden: { scaleX: 0, opacity: 0 }, show: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
      />
      {subtitle && (
        <motion.p
          className="section-heading__subtitle"
          variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } } }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
