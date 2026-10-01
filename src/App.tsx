import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { MobileMenu } from './components/layout/MobileMenu';
import { StickyTicketBar } from './components/layout/StickyTicketBar';
import { Footer } from './components/layout/Footer';
import { ToastHost } from './components/ui/ToastHost';
import { LoadingIntro } from './components/common/LoadingIntro';

import { Home } from './pages/Home';
import { Festival } from './pages/Festival';
import { Tickets } from './pages/Tickets';
import { Partner } from './pages/Partner';
import { Visit } from './pages/Visit';
import { About } from './pages/About';
import { Confirmation } from './pages/Confirmation';
import { NotFound } from './pages/NotFound';

// Global Overlays & Devtools
import { CheckoutDrawer } from './components/features/checkout/CheckoutDrawer';
import { VendorDrawer } from './components/features/vendors/VendorDrawer';
import { UnderTheHood } from './components/features/devtools/UnderTheHood';
import { EditorToggle } from './components/features/devtools/EditorToggle';
import { EditorPanel } from './components/features/devtools/EditorPanel';
import { DemoGuide } from './components/features/devtools/DemoGuide';
import { SharePreviewModal } from './components/features/devtools/SharePreviewModal';

export const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      {/* 1. First-time loading brand entrance experience */}
      <LoadingIntro />

      <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[#1D1A17] font-sans relative selection:bg-[#B9502F] selection:text-white">
        {/* 2. Top Navigation */}
        <Navbar
          isMobileMenuOpen={isMobileMenuOpen}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        {/* 3. Full-screen Mobile Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* 4. Routed Pages */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/festival" element={<Festival />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/visit" element={<Visit />} />
            <Route path="/about" element={<About />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {/* 5. Comprehensive Footer & Pre-footer CTA */}
        <Footer />

        {/* 6. Mobile Conversion Sticky Bar */}
        <StickyTicketBar />

        {/* 7. Global Interactive Drawers & Overlays */}
        <CheckoutDrawer />
        <VendorDrawer />
        <ToastHost />
        <SharePreviewModal />

        {/* 8. Demo Experience Tools */}
        <UnderTheHood />
        <EditorToggle />
        <EditorPanel />
        <DemoGuide />
      </div>
    </BrowserRouter>
  );
};

export default App;
