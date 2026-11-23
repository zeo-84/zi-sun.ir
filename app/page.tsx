import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Connect from '@/components/Connect';
import Products from '@/components/Products';
import ZiChatSection from '@/components/ZiChatSection';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';

export default function Home() {
  return (
    <>
      <Header />
      <main role="main">
        <Hero />
        <Connect />
        <Products />
        <ZiChatSection />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
