import React, { useState, useCallback } from 'react';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import ParallaxOrbs from './components/ParallaxOrbs';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Vision from './sections/Vision';
import B2B from './sections/B2B';
import Classified from './sections/Classified';
import Waitlist from './sections/Waitlist';
import Footer from './sections/Footer';
import useScrollReveal from './hooks/useScrollReveal';

const App: React.FC = () => {
  const [loaderDone, setLoaderDone] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setLoaderDone(true);
  }, []);

  // Activate scroll reveals after loader finishes
  useScrollReveal();

  return (
    <>
      <Loader onComplete={handleLoaderComplete} />
      <CustomCursor />
      
      <div className={`transition-opacity duration-700 ${loaderDone ? 'opacity-100' : 'opacity-0'}`}>
        <ParallaxOrbs />
        <Navigation />
        
        <main className="relative z-10">
          <Hero />
          <Vision />
          <B2B />
          <Classified />
          <Waitlist />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default App;

