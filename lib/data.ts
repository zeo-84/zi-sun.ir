/**
 * 📦 ZiSun — content data.
 * All texts, images, links and the chat Q&A database are carried over
 * verbatim from the original zeo-84.github.io/ZiSun site.
 */

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
};

/** Original js/data/products.json — rendered reversed, exactly like the site. */
export const products: Product[] = [
  {
    id: 6,
    name: "کت جین",
    price: 1500000,
    image: "/images/p06.webp",
    category: "بلوز",
  },
  {
    id: 5,
    name: "شومیز مانتویی",
    price: 1500000,
    image: "/images/p04.webp",
    category: "بلوز",
  },
  {
    id: 4,
    name: "دامن آفتاب",
    price: 1500000,
    image: "/images/p05.webp",
    category: "بلوز",
  },
  {
    id: 3,
    name: "پیراهن تابستانه",
    price: 2100000,
    image: "/images/p02.webp",
    category: "کت",
  },
  {
    id: 2,
    name: "وست و شلوار",
    price: 1800000,
    image: "/images/p03.webp",
    category: "دامن",
  },
  {
    id: 1,
    name: "وست عروسکی",
    price: 2400000,
    image: "/images/p01.webp",
    category: "پیراهن",
  },
];

/** Hero slideshow — same five images / alt texts as the original Swiper. */
export const slides = [
  { src: '/images/s1.webp', alt: 'کت جین' },
  { src: '/images/s2.webp', alt: 'وست و شلوار' },
  { src: '/images/s3.webp', alt: 'پیراهن تابستانه' },
  { src: '/images/s4.webp', alt: 'شومیز مانتویی' },
  { src: '/images/s5.webp', alt: 'وست عروسکی' },
];

export type Social = {
  id: 'telegram' | 'instagram' | 'sms' | 'phone';
  href: string;
  title: string;
  label: string;
  aria: string;
  external: boolean;
};

export const socials: Social[] = [
  {
    id: "telegram",
    href: "https://t.me/ziiisun",
    title: "Telegram",
    label: "تلگرام",
    aria: "تلگرام زیسان",
    external: true,
  },
  {
    id: "instagram",
    href: "https://instagram.com/ziii.sun",
    title: "Instagram",
    label: "اینستاگرام",
    aria: "اینستاگرام زیسان",
    external: true,
  },
  {
    id: "sms",
    href: "sms:+989929185417",
    title: "SMS",
    label: "پیامک",
    aria: "پیامک به زیسان",
    external: false,
  },
  {
    id: "phone",
    href: "tel:+989929185417",
    title: "Phone",
    label: "تماس",
    aria: "تماس با زیسان",
    external: false,
  },
];

/** 💬 ZiChat Q&A database — verbatim from js/data/chat-questions.js */
export type ChatQuestion = { id: string; question: string; answer: string };

export const chatQuestions: ChatQuestion[] = [
  {
    id: 'products',
    question: '🛍️ محصولات شما چیه؟',
    answer:
      'ما در زیسان انواع لباس‌های سفارشی طراحی می‌کنیم:\n• پیراهن مجلسی و روزمره\n• کت و شلوار\n• بلوز و شومیز\n• دامن‌های خاص\n• لباس عروس\n\nهمه با کیفیت بالا و طراحی منحصربه‌فرد ✨',
  },
  {
    id: 'size',
    question: '📏 راهنمای سایز دارید؟',
    answer:
      'بله! برای هر محصول جدول سایزبندی دقیق داریم. \n\nکافیه نام محصول رو به پشتیبانی ما پیام بدی تا جدول کامل رو برات بفرستیم 📏\n\nیا می‌تونی اندازه‌هات رو بفرستی تا ما سایز مناسب رو پیشنهاد بدیم.',
  },
  {
    id: 'order',
    question: '📦 چطور سفارش بدم؟',
    answer:
      'خیلی راحته! 😊\n\n1. از طریق واتس‌اپ، تلگرام یا اینستاگرام با ما در تماس باش\n2. عکس یا ایده‌ات رو بفرست\n3. ما راهنماییت می‌کنیم و قیمت رو می‌گیم\n4. بعد از تایید، سفارشت رو ثبت می‌کنیم 🎨',
  },
  {
    id: 'shipping',
    question: '🚚 هزینه ارسال چقدره؟',
    answer:
      'هزینه ارسال بسته به شهر و وزن محصول متغیره.\n\n✅ برای سفارش‌های بالای 2 میلیون تومان، ارسال رایگان داریم!\n\nبرای اطلاع از هزینه دقیق، آدرس‌ت رو بفرست تا محاسبه کنیم.',
  },
  {
    id: 'custom',
    question: '✂️ سفارش شخصی دارید؟',
    answer:
      'بله! تخصص ما طراحی لباس سفارشی است 🎨\n\nمی‌تونی:\n• عکس لباس مورد نظرت رو بفرستی\n• ایده یا طرح دستی بدی\n• حتی فقط بگی برای چه مراسمی می‌خوای\n\nما برات طراحی می‌کنیم و می‌سازیم! هر لباس یک اثر هنری منحصربه‌فرد خواهد بود ✨',
  },
  {
    id: 'price',
    question: '💰 قیمت‌ها چطوره؟',
    answer:
      'قیمت محصولات بسته به:\n• نوع طراحی\n• متریال و پارچه\n• پیچیدگی دوخت\n\nمتغیره. برای استعلام قیمت، لطفاً عکس یا توضیحات محصول مورد نظرت رو به پشتیبانی بفرست تا دقیق راهنماییت کنیم 💬',
  },
  {
    id: 'time',
    question: '⏰ زمان تحویل چقدره؟',
    answer:
      'زمان تحویل سفارشات:\n• سفارشات آماده: 2-3 روز کاری\n• سفارشات سفارشی: 7-14 روز کاری\n\nبرای سفارش‌های فوری با ما هماهنگ کن، سعی می‌کنیم زودتر تحویل بدیم ⚡',
  },
];

export const chatWelcome = [
  'سلام! من زی‌چت هستم، دستیار هوشمند زیسان!',
  'هر سوالی درباره محصولات، سایزبندی یا سفارش داری، از من بپرس! ✨',
];

export const chatDefaultAnswer =
  'ممنون از سوالت! 😊\n\nبرای پاسخ دقیق‌تر، لطفاً با پشتیبانی ما در واتس‌اپ یا تلگرام در تماس باش.\n\nهمکاران ما آماده راهنماییت هستن! 💬';

export const chatTooLongAnswer =
  '⚠️ پیام شما خیلی طولانی است. لطفاً حداکثر 50 کاراکتر وارد کنید.';

export const ziChatTypingText = 'سلام! من زی‌چت هستم ✨ هر سوالی داری از من بپرس!';

/** Smart keyword matching — ported 1:1 from the original getSmartAnswer(). */
export function getAnswerById(id: string): ChatQuestion | undefined {
  return chatQuestions.find((q) => q.id === id);
}

export function getSmartAnswer(userMessage: string): string | null {
  const message = userMessage.toLowerCase();
  if (message.includes('قیمت') || message.includes('هزینه') || message.includes('گرون'))
    return getAnswerById('price')?.answer ?? null;
  if (message.includes('زمان') || message.includes('تحویل') || message.includes('کی'))
    return getAnswerById('time')?.answer ?? null;
  if (message.includes('سفارش') || message.includes('خرید'))
    return getAnswerById('order')?.answer ?? null;
  if (message.includes('سایز') || message.includes('اندازه'))
    return getAnswerById('size')?.answer ?? null;
  if (message.includes('ارسال') || message.includes('پست'))
    return getAnswerById('shipping')?.answer ?? null;
  if (message.includes('سفارشی') || message.includes('طرح'))
    return getAnswerById('custom')?.answer ?? null;
  if (message.includes('محصول') || message.includes('چی'))
    return getAnswerById('products')?.answer ?? null;
  return null;
}

/** Normalize Persian/Arabic letter variants so search always matches. */
export function normalizeFa(text: string): string {
  return text
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/\u200c/g, ' ')
    .trim()
    .toLowerCase();
}

export const navItems = [
  { id: 'home', label: 'خانه' },
  { id: 'connect', label: 'ارتباط' },
  { id: 'products', label: 'محصولات' },
  { id: 'zichat', label: 'زی‌چت' },
] as const;

export type SectionId = (typeof navItems)[number]['id'];
