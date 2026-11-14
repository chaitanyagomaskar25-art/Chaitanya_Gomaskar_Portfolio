import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { ScrollToTop } from '@/components/ScrollToTop';
import { HeroSection } from '@/sections/HeroSection';
import { AboutSection } from '@/sections/AboutSection';
import { SkillsSection } from '@/sections/SkillsSection';
import { ProjectsSection } from '@/sections/ProjectsSection';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { EducationSection } from '@/sections/EducationSection';
import { CertificatesSection } from '@/sections/CertificatesSection';
import { ResumeSection } from '@/sections/ResumeSection';
import { ContactSection } from '@/sections/ContactSection';
import { Footer } from '@/sections/Footer';
import { AdminMessagesModal } from '@/components/AdminMessagesModal';
import { InteractiveTerminal } from '@/components/InteractiveTerminal';
import { LiveApiSandbox } from '@/components/LiveApiSandbox';
import { CommandPalette } from '@/components/CommandPalette';
import { api } from '@/services/api';

function App() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [apiTesterOpen, setApiTesterOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    // Record page view in MERN analytics
    api.trackPageView();
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary text-fg-primary selection:bg-accent-primary selection:text-white">
      {/* Clean Navigation */}
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <TestimonialsSection />
        <EducationSection />
        <CertificatesSection />
        <ResumeSection />
        <ContactSection />
      </main>

      <Footer />
      <ScrollToTop />

      {/* Interactive Modals & Consoles */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={setPaletteOpen}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenApiTester={() => setApiTesterOpen(true)}
      />

      <InteractiveTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      <LiveApiSandbox
        isOpen={apiTesterOpen}
        onClose={() => setApiTesterOpen(false)}
      />

      <AdminMessagesModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />
    </div>
  );
}

export default App;
