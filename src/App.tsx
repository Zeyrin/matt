import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import AmbientCanvas from './components/AmbientCanvas';
import Preloader from './components/Preloader';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Manifesto from './components/Manifesto';
import Gallery from './components/Gallery';
import DepthSection from './components/DepthSection';
import Process from './components/Process';
import Packages from './components/Packages';
import Booking from './components/Booking';
import DepthGauge from './components/DepthGauge';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => { setLoading(false); document.body.style.overflow = ''; }, 2300);
    return () => { clearTimeout(t); document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="relative min-h-screen bg-abyss text-foam">
      <CustomCursor />
      <AmbientCanvas />
      <AnimatePresence>{loading && <Preloader />}</AnimatePresence>
      <Nav />
      <DepthGauge />
      <main>
        <Hero ready={!loading} />
        <Marquee items={['Underwater videography', 'Sail Rock · Koh Tao', 'Red Sea · Sharm El Sheikh', 'Same-day gallery', 'You, weightless']} />
        <Manifesto />
        <Gallery />
        <DepthSection />
        <Marquee fast outline items={['Dive', 'Drift', 'Keep it forever', 'Dive', 'Drift', 'Keep it forever']} />
        <Process />
        <Packages selected={selectedPackage} onSelect={setSelectedPackage} />
        <Booking selectedPackage={selectedPackage} />
      </main>
      <Footer />
    </div>
  );
}
