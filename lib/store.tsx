'use client';

/**
 * 🧠 Global client state: theme (dark / light), search query,
 * chat modal, lightbox and the active section for scroll-spy.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { getLenis } from './scroll';
import type { SectionId } from './data';

type Theme = 'dark' | 'light';
type LightboxItem = { src: string; alt: string } | null;

type AppState = {
  theme: Theme;
  toggleTheme: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  chatOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  lightbox: LightboxItem;
  openLightbox: (item: NonNullable<LightboxItem>) => void;
  closeLightbox: () => void;
  activeSection: SectionId;
  setActiveSection: (s: SectionId) => void;
};

const AppContext = createContext<AppState | null>(null);

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [lightbox, setLightbox] = useState<LightboxItem>(null);
  const [activeSection, setActiveSection] = useState<SectionId>('home');

  /* Sync theme with the attribute applied by the pre-hydration boot script. */
  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'light' || current === 'dark') setTheme(current);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try {
        localStorage.setItem('zison-theme', next);
      } catch {
        /* private mode — ignore */
      }
      return next;
    });
  }, []);

  const openChat = useCallback(() => setChatOpen(true), []);
  const closeChat = useCallback(() => setChatOpen(false), []);
  const openLightbox = useCallback((item: NonNullable<LightboxItem>) => setLightbox(item), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  /* Lock page scrolling while an overlay (chat / lightbox) is open. */
  useEffect(() => {
    const locked = chatOpen || lightbox !== null;
    const lenis = getLenis();
    if (locked) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [chatOpen, lightbox]);

  /* Scroll-spy: highlight the section currently in the viewport. */
  useEffect(() => {
    const ids: SectionId[] = ['home', 'connect', 'products', 'zichat'];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id as SectionId);
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const value = useMemo<AppState>(
    () => ({
      theme,
      toggleTheme,
      searchQuery,
      setSearchQuery,
      chatOpen,
      openChat,
      closeChat,
      lightbox,
      openLightbox,
      closeLightbox,
      activeSection,
      setActiveSection,
    }),
    [theme, toggleTheme, searchQuery, chatOpen, openChat, closeChat, lightbox, openLightbox, closeLightbox, activeSection]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
