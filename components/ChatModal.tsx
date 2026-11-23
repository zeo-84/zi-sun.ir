'use client';

/**
 * 💬 ZiChat modal — a faithful port of the original chat.html:
 * welcome message, quick-question chips, smart keyword answers,
 * typing indicator, 50-char limit and fa-IR timestamps.
 */
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '@/lib/store';
import {
  chatDefaultAnswer,
  chatQuestions,
  chatTooLongAnswer,
  chatWelcome,
  getAnswerById,
  getSmartAnswer,
} from '@/lib/data';
import { CloseIcon, SendIcon, UserIcon } from './icons';

type Message = { id: number; sender: 'bot' | 'user'; text: string; time: string };

let uid = 1;
const now = () =>
  new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });

function BotAvatar() {
  return (
    <span className="chat__avatar chat__avatar--bot" aria-hidden="true">
      <Image src="/images/zichat.webp" alt="" width={30} height={30} />
    </span>
  );
}

export default function ChatModal() {
  const { chatOpen, closeChat } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState('');
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timersRef = useRef<number[]>([]);

  /* Reset the conversation each time the modal opens (like a fresh page visit). */
  useEffect(() => {
    if (chatOpen) {
      setMessages([
        { id: uid++, sender: 'bot', text: chatWelcome.join('\n'), time: 'الان' },
      ]);
      setTyping(false);
      setDraft('');
      const t = window.setTimeout(() => inputRef.current?.focus(), 450);
      timersRef.current.push(t);
    }
    return () => {
      timersRef.current.forEach((t) => window.clearTimeout(t));
      timersRef.current = [];
    };
  }, [chatOpen]);

  /* Esc to close. */
  useEffect(() => {
    if (!chatOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeChat();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [chatOpen, closeChat]);

  /* Keep the conversation pinned to the newest message. */
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const pushBot = (text: string, delay: number) => {
    setTyping(true);
    const t = window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: uid++, sender: 'bot', text, time: now() }]);
    }, delay);
    timersRef.current.push(t);
  };

  const askQuestion = (id: string) => {
    const qa = getAnswerById(id);
    if (!qa || typing) return;
    setMessages((m) => [...m, { id: uid++, sender: 'user', text: qa.question, time: now() }]);
    pushBot(qa.answer, 650);
  };

  const send = () => {
    const raw = draft.trim();
    if (!raw || typing) return;
    setDraft('');
    if (raw.length > 50) {
      setMessages((m) => [...m, { id: uid++, sender: 'user', text: raw, time: now() }]);
      pushBot(chatTooLongAnswer, 600);
      return;
    }
    setMessages((m) => [...m, { id: uid++, sender: 'user', text: raw, time: now() }]);
    pushBot(getSmartAnswer(raw) ?? chatDefaultAnswer, 850);
  };

  const remaining = 50 - draft.length;

  return (
    <AnimatePresence>
      {chatOpen && (
        <motion.div
          className="chat-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={closeChat}
        >
          <motion.div
            className="chat"
            role="dialog"
            aria-modal="true"
            aria-label="زی‌چت - دستیار هوشمند زیسان"
            initial={{ y: 60, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 40, scale: 0.97, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ——— header ——— */}
            <header className="chat__header">
              <div className="chat__profile">
                <span className="chat__header-avatar">
                  <Image src="/images/zichat.webp" alt="زی‌چت" width={42} height={42} />
                  <span className="chat__online-dot" aria-hidden="true" />
                </span>
                <div className="chat__header-info">
                  <h2 className="chat__header-title">زی‌چت</h2>
                  <span className="chat__header-status">
                    <span className="chat__status-dot" aria-hidden="true" />
                    آنلاین و آماده پاسخگویی
                  </span>
                </div>
              </div>
              <motion.button
                className="chat__close"
                onClick={closeChat}
                aria-label="بازگشت به صفحه اصلی"
                whileHover={{ scale: 1.12, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <CloseIcon width={16} height={16} />
              </motion.button>
            </header>

            {/* ——— messages ——— */}
            <div className="chat__body" ref={bodyRef}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  className={`chat__message chat__message--${m.sender}`}
                  initial={{ opacity: 0, y: 14, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                >
                  {m.sender === 'bot' ? (
                    <BotAvatar />
                  ) : (
                    <span className="chat__avatar chat__avatar--user" aria-hidden="true">
                      <UserIcon width={15} height={15} />
                    </span>
                  )}
                  <div className="chat__bubble">
                    {m.sender === 'bot' && m.id === 1 ? (
                      <>
                        <p>
                          سلام! من <strong>زی‌چت</strong> هستم، دستیار هوشمند زیسان!
                        </p>
                        <p>{chatWelcome[1]}</p>
                      </>
                    ) : (
                      <p className="chat__text">{m.text}</p>
                    )}
                    <span className="chat__time">{m.time}</span>
                  </div>
                </motion.div>
              ))}

              <AnimatePresence>
                {typing && (
                  <motion.div
                    className="chat__message chat__message--bot"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <BotAvatar />
                    <div className="chat__bubble chat__bubble--typing" aria-label="زی‌چت در حال تایپ">
                      <span className="chat__typing-dot" />
                      <span className="chat__typing-dot" />
                      <span className="chat__typing-dot" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ——— quick questions + input ——— */}
            <footer className="chat__footer">
              <div className="chat__questions" role="list" aria-label="سوالات متداول">
                {chatQuestions.map((q) => (
                  <motion.button
                    key={q.id}
                    role="listitem"
                    className="chat__question"
                    onClick={() => askQuestion(q.id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.94 }}
                  >
                    {q.question}
                  </motion.button>
                ))}
              </div>

              <div className={`chat__input-wrap ${remaining < 10 ? (remaining > 0 ? 'is-warn' : 'is-danger') : ''}`}>
                <input
                  ref={inputRef}
                  type="text"
                  className="chat__input"
                  placeholder="سوالت رو بنویس..."
                  autoComplete="off"
                  maxLength={50}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') send();
                  }}
                  aria-label="پیام شما"
                />
                <motion.button
                  className="chat__send"
                  onClick={send}
                  aria-label="ارسال پیام"
                  disabled={!draft.trim()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.85, rotate: -20 }}
                >
                  <SendIcon width={17} height={17} className="chat__send-icon" />
                </motion.button>
              </div>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
