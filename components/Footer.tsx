'use client';

/** 🌙 Footer — brand sign-off reusing the site's own copy. */
import Image from 'next/image';
import { motion } from 'framer-motion';
import { socials } from '@/lib/data';
import { scrollToTop } from '@/lib/scroll';
import { InstagramIcon, PhoneIcon, SmsIcon, TelegramIcon } from './icons';

const miniIcons = {
  telegram: TelegramIcon,
  instagram: InstagramIcon,
  sms: SmsIcon,
  phone: PhoneIcon,
};

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <motion.div
        className="container footer__inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <button className="footer__brand" onClick={scrollToTop} aria-label="بازگشت به بالا">
          <Image src="/images/logo.png" alt="لوگو زیسان" width={46} height={46} className="footer__logo" />
          <span className="footer__name font-en">ZiSun</span>
        </button>
        <p className="footer__tagline font-en" dir="ltr">Made for sunny souls</p>
        <p className="footer__desc">طراحی لباس سفارشی با سبک منحصربه‌فرد</p>

        <div className="footer__socials">
          {socials.map((s) => {
            const Icon = miniIcons[s.id];
            return (
              <motion.a
                key={s.id}
                href={s.href}
                {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="footer__social"
                title={s.title}
                aria-label={s.aria}
                whileHover={{ y: -3, scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon width={16} height={16} />
              </motion.a>
            );
          })}
        </div>

        <p className="footer__copy">
          © 2026 <span className="font-en">ZiSun Fashion</span> — تمامی حقوق محفوظ است
        </p>
      </motion.div>
    </footer>
  );
}
