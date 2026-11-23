'use client';

/**
 * 🎨 Sticky glass header: logo + ZiSun wordmark, desktop anchor nav,
 * live product search and an animated sun/moon theme toggle.
 */
import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useApp } from '@/lib/store';
import { navItems } from '@/lib/data';
import { scrollToId, scrollToTop } from '@/lib/scroll';
import { CloseIcon, MoonIcon, SearchIcon, SunIcon } from './icons';

export default function Header() {
  const { theme, toggleTheme, searchQuery, setSearchQuery, activeSection } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 12));

  return (
    <motion.header
      className={`header ${scrolled ? 'is-scrolled' : ''}`}
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container header__inner">
        {/* Brand — right side in RTL */}
        <button className="header__brand" onClick={scrollToTop} aria-label="زیسان — بازگشت به بالا">
          <Image
            src="/images/logo.png"
            alt="لوگو زیسان"
            width={40}
            height={40}
            className="header__logo"
            priority
          />
          <span className="header__name font-en">ZiSun</span>
        </button>

        {/* Desktop anchor navigation */}
        <nav className="header__nav" aria-label="ناوبری اصلی">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`header__link ${activeSection === item.id ? 'is-active' : ''}`}
              onClick={() => scrollToId(item.id)}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.span layoutId="header-nav-underline" className="header__link-underline" />
              )}
            </button>
          ))}
        </nav>

        {/* Search + theme toggle — left side in RTL */}
        <div className="header__actions">
          <div className="header__search">
            <SearchIcon className="header__search-icon" aria-hidden="true" />
            <input
              type="search"
              className="header__search-input"
              placeholder="جستجو..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') scrollToId('products');
              }}
              aria-label="جستجوی محصولات"
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  className="header__search-clear"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  onClick={() => setSearchQuery('')}
                  aria-label="پاک کردن جستجو"
                >
                  <CloseIcon width={12} height={12} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="تغییر تم"
            whileHover={{ rotate: 18, scale: 1.08 }}
            whileTap={{ scale: 0.88, rotate: -12 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          >
            <span className="theme-toggle__icons" suppressHydrationWarning>
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="theme-toggle__icon theme-toggle__icon--sun"
                  >
                    <SunIcon width={18} height={18} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, scale: 0.4, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: -90, scale: 0.4, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="theme-toggle__icon theme-toggle__icon--moon"
                  >
                    <MoonIcon width={17} height={17} />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
