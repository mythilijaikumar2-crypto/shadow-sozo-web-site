import { useState } from 'react';
import { LenisProvider } from './components/LenisProvider';
import { Navbar } from './components/Navbar';
import { ScrollStory } from './components/ScrollStory';
import { NextSection } from './components/NextSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';

export function App() {
  const [masterProgress, setMasterProgress] = useState<number>(0);

  return (
    <LenisProvider>
      <div className="min-h-screen bg-black text-white selection:bg-gold selection:text-black">
        {/* Navigation Header */}
        <Navbar progress={masterProgress} />

        {/* Master Pinned Cinematic Scroll Story */}
        <main className="relative z-10">
          <ScrollStory onProgressUpdate={setMasterProgress} />
          <NextSection />
          <ServicesSection />
          <AboutSection />
          <ContactSection />
        </main>
      </div>
    </LenisProvider>
  );
}

export default App;
