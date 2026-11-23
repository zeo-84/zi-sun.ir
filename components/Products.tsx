'use client';

/**
 * 🛍️ Products — «لیست محصولات».
 * Staggered reveal, live search filtering, persistent likes with a heart-burst,
 * and a lightbox on click. Same six products / names / images as the original.
 */
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { normalizeFa, products, type Product } from '@/lib/data';
import { useApp } from '@/lib/store';
import SectionHeading from './SectionHeading';
import { HeartIcon, SearchIcon } from './icons';

const LIKES_KEY = 'zison-likes';

function useLikes() {
  const [likes, setLikes] = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LIKES_KEY);
      if (raw) setLikes(new Set(JSON.parse(raw) as number[]));
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = (id: number) =>
    setLikes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem(LIKES_KEY, JSON.stringify([...next]));
      } catch {
        /* ignore */
      }
      return next;
    });

  return { likes, toggle };
}

/* ——— heart button with pop + particle burst ——— */
function LikeButton({ liked, onToggle }: { liked: boolean; onToggle: () => void }) {
  const [burst, setBurst] = useState(0);

  return (
    <motion.button
      className={`like-btn ${liked ? 'is-liked' : ''}`}
      aria-label="افزودن به علاقه‌مندی‌ها"
      aria-pressed={liked}
      onClick={(e) => {
        e.stopPropagation();
        if (!liked) setBurst((b) => b + 1);
        onToggle();
      }}
      whileTap={{ scale: 0.82 }}
    >
      <motion.span
        className="like-btn__heart"
        animate={liked ? { scale: [1, 1.4, 1] } : { scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <HeartIcon width={17} height={17} />
      </motion.span>
      <AnimatePresence>
        {burst > 0 && liked && (
          <motion.span key={burst} className="like-btn__burst" aria-hidden="true">
            {Array.from({ length: 6 }).map((_, i) => {
              const angle = (i / 6) * Math.PI * 2;
              return (
                <motion.span
                  key={i}
                  className="like-btn__particle"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos(angle) * 22,
                    y: Math.sin(angle) * 22,
                    opacity: 0,
                    scale: 0.3,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                />
              );
            })}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function ProductCard({
  product,
  index,
  liked,
  onToggleLike,
}: {
  product: Product;
  index: number;
  liked: boolean;
  onToggleLike: () => void;
}) {
  const { openLightbox } = useApp();

  return (
    <motion.article
      className="product-card"
      layout
      initial={{ opacity: 0, y: 44, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.22 } }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ type: 'spring', stiffness: 120, damping: 17, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -6 }}
    >
      <button
        className="product-card__media"
        onClick={() => openLightbox({ src: product.image, alt: product.name })}
        aria-label={`نمایش بزرگ ${product.name}`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 340px"
          className="product-card__img"
        />
        <span className="product-card__shine" aria-hidden="true" />
      </button>
      <div className="product-card__row">
        <h3 className="product-card__name">{product.name}</h3>
        <LikeButton liked={liked} onToggle={onToggleLike} />
      </div>
    </motion.article>
  );
}

export default function Products() {
  const { searchQuery, setSearchQuery } = useApp();
  const { likes, toggle } = useLikes();

  const filtered = useMemo(() => {
    const q = normalizeFa(searchQuery);
    if (!q) return products;
    return products.filter((p) => normalizeFa(p.name).includes(q));
  }, [searchQuery]);

  return (
    <section className="products" id="products" aria-label="لیست محصولات">
      <div className="container">
        <SectionHeading title="لیست محصولات" subtitle="جدیدترین طراحی‌های زیسان" />

        <motion.div className="products__grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                index={i}
                liked={likes.has(p.id)}
                onToggleLike={() => toggle(p.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              className="products__empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <SearchIcon width={28} height={28} aria-hidden="true" />
              <p>محصولی با این نام پیدا نشد</p>
              <button className="products__empty-clear" onClick={() => setSearchQuery('')}>
                پاک کردن جستجو
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
