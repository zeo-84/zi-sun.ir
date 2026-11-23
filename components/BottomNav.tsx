'use client';

/**
 * 🧭 Bottom navigation (mobile) — خانه / زی‌چت / محصولات,
 * with a raised golden ZiChat button, exactly like the original.
 */
import { motion } from 'framer-motion';
import { useApp } from '@/lib/store';
import { scrollToId } from '@/lib/scroll';
import { BagIcon, HomeIcon, SmsIcon } from './icons';

export default function BottomNav() {
  const { activeSection, openChat } = useApp();

  const homeActive = activeSection === 'home' || activeSection === 'connect';
  const productsActive = activeSection === 'products' || activeSection === 'zichat';

  return (
    <motion.nav
      className="bottom-nav"
      aria-label="ناوبری اصلی"
      initial={{ y: 110 }}
      animate={{ y: 0 }}
      transition={{ delay: 2.4, type: 'spring', stiffness: 160, damping: 20 }}
    >
      <motion.button
        className={`bottom-nav__item ${homeActive ? 'is-active' : ''}`}
        onClick={() => scrollToId('home')}
        aria-current={homeActive ? 'page' : undefined}
        whileTap={{ scale: 0.85 }}
      >
        <HomeIcon width={22} height={22} aria-hidden="true" />
        <span className="bottom-nav__label">خانه</span>
        {homeActive && <motion.span layoutId="bottom-nav-dot" className="bottom-nav__dot" />}
      </motion.button>

      <motion.button
        className="bottom-nav__item bottom-nav__item--zichat"
        onClick={openChat}
        aria-label="زی‌چت"
        whileTap={{ scale: 0.88 }}
      >
        <motion.span
          className="bottom-nav__zichat"
          whileHover={{ scale: 1.08, rotate: -6 }}
          transition={{ type: 'spring', stiffness: 350, damping: 16 }}
        >
          <SmsIcon width={22} height={22} aria-hidden="true" />
        </motion.span>
        <span className="bottom-nav__label">زی‌چت</span>
      </motion.button>

      <motion.button
        className={`bottom-nav__item ${productsActive ? 'is-active' : ''}`}
        onClick={() => scrollToId('products')}
        aria-current={productsActive ? 'page' : undefined}
        whileTap={{ scale: 0.85 }}
      >
        <BagIcon width={22} height={22} aria-hidden="true" />
        <span className="bottom-nav__label">محصولات</span>
        {productsActive && <motion.span layoutId="bottom-nav-dot" className="bottom-nav__dot" />}
      </motion.button>
    </motion.nav>
  );
}
