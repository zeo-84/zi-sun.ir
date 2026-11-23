"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import { slides } from "@/lib/data";
import { useApp } from "@/lib/store";

const N = slides.length;

const SPACING_PCT = 106;

function circularOffset(i: number, index: number) {
  let off = (i - index + N) % N;
  if (off > N / 2) off -= N;
  return off;
}

type SlideProps = {
  i: number;
  index: number;
  onSelect: (i: number) => void;
};

function Slide({ i, index, onSelect }: SlideProps) {
  const off = circularOffset(i, index);
  const active = off === 0;
  const { src, alt } = slides[i];

  return (
    <motion.div
      className={`hero-slide ${active ? "is-active" : ""}`}
      style={{ zIndex: 20 - Math.abs(off) * 5 }}
      initial={false}
      animate={{
        x: `${-off * SPACING_PCT}%`,
        scale: active ? 1 : 0.85,
        opacity: active ? 1 : Math.abs(off) === 1 ? 0.5 : 0,
      }}
      transition={{ type: "spring", stiffness: 240, damping: 30, mass: 0.9 }}
      role="group"
      aria-roledescription="اسلاید"
      aria-label={`${i + 1} از ${N}: ${alt}`}
      aria-hidden={!active && Math.abs(off) > 1}
      // ✅ onClick کاملاً حذف شد - فقط swipe کار می‌کند
    >
      <Image
        src={src}
        alt=""
        fill
        aria-hidden
        sizes="80px"
        draggable={false}
        className="hero-slide__bg"
      />
      <Image
        src={src}
        alt={alt}
        fill
        priority={i === 0}
        sizes="(max-width: 767px) 88vw, 660px"
        draggable={false}
        className="hero-slide__img"
      />
    </motion.div>
  );
}

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const next = useCallback(() => setIndex((v) => (v + 1) % N), []);
  const prev = useCallback(() => setIndex((v) => (v - 1 + N) % N), []);

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(next, 4000);
    return () => window.clearInterval(id);
  }, [paused, reduce, next]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    setPaused(false);
    const { offset, velocity } = info;
    if (offset.x > 50 || velocity.x > 400) next();
    else if (offset.x < -50 || velocity.x < -400) prev();
  };

  return (
    <div
      className="hero-slider"
      role="region"
      aria-roledescription="اسلایدشو"
      aria-label="اسلایدشو محصولات"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") next();
        if (e.key === "ArrowRight") prev();
      }}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <motion.div
        className="hero-slider__viewport"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragStart={() => setPaused(true)}
        onDragEnd={onDragEnd}
      >
        {slides.map((_, i) => (
          <Slide key={i} i={i} index={index} onSelect={setIndex} />
        ))}
      </motion.div>

      {/* نقطه‌های pagination */}
      <div
        className="hero-slider__dots"
        role="tablist"
        aria-label="انتخاب اسلاید"
      >
        {slides.map((s, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={index === i}
            aria-label={`اسلاید ${i + 1}: ${s.alt}`}
            className={`hero-slider__dot ${index === i ? "is-active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
