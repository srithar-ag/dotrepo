import React, { useState } from 'react';
import { PageId } from '../types';

// 17 Cloud Sections in strict order
import { CloudAnnouncementBar } from './cloud/components/CloudAnnouncementBar';
import { CloudNavbar } from './cloud/components/CloudNavbar';
import { CloudHero } from './cloud/components/CloudHero';
import { CloudSubNav } from './cloud/components/CloudSubNav';
import { CloudOverview } from './cloud/components/CloudOverview';
import { CloudLayerDiagram } from './cloud/components/CloudLayerDiagram';
import { CloudServices } from './cloud/components/CloudServices';
import { CloudPerformanceStrip } from './cloud/components/CloudPerformanceStrip';
import { CloudConfigurator, CloudConfiguration } from './cloud/components/CloudConfigurator';
import { CloudRegionMap } from './cloud/components/CloudRegionMap';
import { CloudSolutions } from './cloud/components/CloudSolutions';
import { CloudDevTabs } from './cloud/components/CloudDevTabs';
import { CloudSecurity } from './cloud/components/CloudSecurity';
import { CloudNews } from './cloud/components/CloudNews';
import { CloudFAQ } from './cloud/components/CloudFAQ';
import { CloudContactForm } from './cloud/components/CloudContactForm';
import { CloudFooter } from './cloud/components/CloudFooter';

interface CloudPageProps {
  onNavigate: (page: PageId) => void;
  onOpenContactModal: (topic?: string) => void;
  onOpenInternship?: () => void;
}

export const CloudPage: React.FC<CloudPageProps> = ({
  onNavigate,
  onOpenContactModal,
  onOpenInternship,
}) => {
  // State bridge: Configurator -> Contact Form quote pre-fill
  const [configuredQuote, setConfiguredQuote] = useState<CloudConfiguration | null>(null);

  const handleApplyIntern = () => {
    if (onOpenInternship) {
      onOpenInternship();
    } else {
      onNavigate('internship');
    }
  };

  const handleContactSales = () => {
    const el = document.getElementById('next-steps');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenContactModal('Cloud Infrastructure Enterprise Engagement');
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-[#22C55E] selection:text-black">
      {/* 1. Announcement bar */}
      <CloudAnnouncementBar onApplyNow={handleApplyIntern} />

      {/* 2. Sticky main navbar */}
      <CloudNavbar
        onNavigate={onNavigate}
        onOpenContactSales={handleContactSales}
        onOpenSearch={() => {
          // Trigger search modal if available
          window.dispatchEvent(
            new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true })
          );
        }}
      />

      <main>
        {/* 3. HERO (dark, full-bleed, dynamic SVG per tab, 6-item rail with 6s progress) */}
        <CloudHero />

        {/* 4. Sticky sub-navigation bar (Overview · How It Works · Services · Performance · Configure · Regions · Developers · Next Steps) */}
        <CloudSubNav />

        {/* 5. OVERVIEW (white) */}
        <CloudOverview />

        {/* 6. HOW IT WORKS (dark, interactive stacked architecture diagram) */}
        <CloudLayerDiagram />

        {/* 7. SERVICES (white, 8 service blocks, left navigation list) */}
        <CloudServices />

        {/* 8. PERFORMANCE STRIP (black, 4 large counters) */}
        <CloudPerformanceStrip />

        {/* 9. CONFIGURE (white, interactive environment sizing tool) */}
        <CloudConfigurator onConfigureQuote={setConfiguredQuote} />

        {/* 10. REGIONS (dark, SVG dot-map of India & World with PoP markers) */}
        <CloudRegionMap />

        {/* 11. SOLUTIONS BY INDUSTRY (white, 4 cards with green top border on hover) */}
        <CloudSolutions />

        {/* 12. DEVELOPERS (dark, tabbed code window with copy button & ecosystem links) */}
        <CloudDevTabs />

        {/* 13. SECURITY & COMPLIANCE (white, capability tiles + compliance badge row) */}
        <CloudSecurity />

        {/* 14. NEWS AND BLOGS (white, 3 article cards with thin top rules) */}
        <CloudNews />

        {/* 15. FAQ (6 accessible accordion items) */}
        <CloudFAQ />

        {/* 16. NEXT STEPS (black, full-bleed, contact sales form pre-filled from configurator) */}
        <CloudContactForm
          prefilledConfig={configuredQuote}
          onOpenInternship={handleApplyIntern}
        />
      </main>

      {/* 17. FOOTER (dark, 5 link columns, Bangalore headquarters address) */}
      <CloudFooter onNavigate={onNavigate} onOpenInternship={handleApplyIntern} />
    </div>
  );
};
