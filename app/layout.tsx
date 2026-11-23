import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/store";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import LoadingScreen from "@/components/LoadingScreen";
import ChatModal from "@/components/ChatModal";
import Lightbox from "@/components/Lightbox";

export const metadata: Metadata = {
  metadataBase: new URL("https://zeo-84.github.io"),
  title: "زیسان - ZiSun Fashion | طراحی لباس سفارشی",
  description:
    "زیسان - طراحی لباس سفارشی با سبک منحصربه‌فرد. لباس‌های مجلسی، روزمره و عروس با کیفیت بالا",
  keywords: [
    "طراحی لباس",
    "زیسان",
    "لباس سفارشی",
    "لباس مجلسی",
    "مد و فشن",
    "طراحی مد",
  ],
  authors: [{ name: "ZiSun Fashion" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://zeo-84.github.io/ZiSun/",
    title: "زیسان - ZiSun Fashion",
    description: "طراحی لباس سفارشی با سبک منحصربه‌فرد",
    locale: "fa_IR",
    images: ["https://zeo-84.github.io/ZiSun/assets/images/s1.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "زیسان - ZiSun Fashion",
    description: "طراحی لباس سفارشی با سبک منحصربه‌فرد",
    images: ["https://zeo-84.github.io/ZiSun/assets/images/s1.webp"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eaf3fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0e27" },
  ],
};

/* ✅ اسکریپت اصلاح‌شده: دیفالت همیشه لایت است مگر اینکه کاربر قبلاً دارک را انتخاب کرده باشد */
const themeBoot = `(function(){
  try {
    var t = localStorage.getItem('zison-theme');
    if (!t) {
      t = 'light';
    }
    document.documentElement.setAttribute('data-theme', t);
  } catch(e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // ✅ تغییر data-theme به light
    <html lang="fa" dir="rtl" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body>
        <AppProvider>
          <SmoothScroll />
          <ScrollProgress />
          <LoadingScreen />
          {children}
          <ChatModal />
          <Lightbox />
        </AppProvider>
      </body>
    </html>
  );
}
