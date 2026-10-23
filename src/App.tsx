import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { UdacityTopBanner } from './components/UdacityTopBanner';
import { EnterpriseNavbar } from './components/EnterpriseNavbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { ContactModal } from './components/ContactModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { AIPage } from './pages/AIPage';
import { CloudPage } from './pages/CloudPage';
import { DevelopersPage } from './pages/DevelopersPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { AboutPage } from './pages/AboutPage';
import { CareersPage } from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage';
import { InternshipPage } from './pages/InternshipPage';
import { AdminPage } from './pages/AdminPage';
import { InternshipOnboardingModal } from './components/InternshipOnboardingModal';
import { ToastNotification, ToastData } from './components/ToastNotification';
import { SpawnPage } from './pages/SpawnPage';

type AppPageId = PageId | 'spawn';

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPageId>('home');
  const [subId, setSubId] = useState<string | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [contactModalTopic, setContactModalTopic] = useState<string | null>(null);
  const [isZohoCheckoutOpen, setIsZohoCheckoutOpen] = useState(false);
  const [checkoutTrackTitle, setCheckoutTrackTitle] = useState<string | undefined>(undefined);
  const [activeToast, setActiveToast] = useState<ToastData | null>(null);

  // Sync with window.location.pathname (/spawn) and window.location.hash
  useEffect(() => {
    const syncRouteFromLocation = () => {
      // 1. Check pathname (e.g. /spawn or /spawn/)
      const pathPart = window.location.pathname.replace(/^\//, '').split('/')[0]?.toLowerCase();
      if (pathPart === 'spawn') {
        setCurrentPage('spawn');
        return;
      }

      // 2. Check hash (e.g. #spawn, #/spawn or #products)
      const hash = window.location.hash.replace(/^#\/?/, '').trim();
      if (!hash) {
        setCurrentPage('home');
        return;
      }
      const parts = hash.split('/');
      const pageCandidate = parts[0] as AppPageId;
      const validPages: AppPageId[] = [
        'home',
        'products',
        'solutions',
        'ai',
        'cloud',
        'developers',
        'resources',
        'about',
        'careers',
        'contact',
        'internship',
        'admin',
        'spawn',
      ];
      if (validPages.includes(pageCandidate)) {
        setCurrentPage(pageCandidate);
        setSubId(parts[1]);
      }
    };

    syncRouteFromLocation();
    window.addEventListener('hashchange', syncRouteFromLocation);
    window.addEventListener('popstate', syncRouteFromLocation);
    return () => {
      window.removeEventListener('hashchange', syncRouteFromLocation);
      window.removeEventListener('popstate', syncRouteFromLocation);
    };
  }, []);

  const handleNavigate = (page: PageId | 'spawn', newSubId?: string) => {
    setCurrentPage(page);
    setSubId(newSubId);

    if (page === 'spawn') {
      window.history.pushState({}, '', '/spawn');
      window.location.hash = '';
    } else {
      if (window.location.pathname === '/spawn' || window.location.pathname === '/spawn/') {
        window.history.pushState({}, '', '/');
      }
      if (newSubId) {
        window.location.hash = `${page}/${newSubId}`;
      } else if (page === 'home') {
        window.location.hash = '';
      } else {
        window.location.hash = page;
      }
    }

    // Smooth scroll to top of window
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenContactModal = (topic?: string) => {
    setContactModalTopic(topic || 'Enterprise Engagement');
  };

  const handleCloseContactModal = () => {
    setContactModalTopic(null);
  };

  const handlePaymentSuccess = (trackTitle?: string) => {
    setActiveToast({
      id: 'toast-' + Date.now(),
      title: 'Internship Application Received!',
      message:
        'Your payment transaction has been confirmed via Zoho Checkout. Your DotRepo Corp. Engineering Internship application details have been officially registered.',
      trackTitle: trackTitle || 'DotRepo 2026 Batch',
      duration: 8000,
    });
  };

  // Detect payment return via query params, hash or custom events
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash;
    if (
      params.get('payment') === 'success' ||
      params.get('status') === 'success' ||
      params.get('zoho_status') === 'success' ||
      params.get('payment_status') === 'success' ||
      hash.includes('payment-success')
    ) {
      handlePaymentSuccess(params.get('track') || undefined);
      const cleanUrl =
        window.location.pathname +
        (hash.includes('payment-success') ? '#internship' : hash);
      window.history.replaceState({}, document.title, cleanUrl);
    }

    const handleCustomPaymentEvent = (e: any) => {
      handlePaymentSuccess(e.detail?.trackTitle);
    };

    window.addEventListener('dotrepo:payment_success', handleCustomPaymentEvent);
    return () =>
      window.removeEventListener('dotrepo:payment_success', handleCustomPaymentEvent);
  }, []);

  const handleOpenRegistration = (trackId?: string) => {
    setCheckoutTrackTitle(trackId);
    setIsZohoCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Promotional Announcement Bar */}
      {currentPage !== 'spawn' && currentPage !== 'cloud' && (
        <UdacityTopBanner
          onExploreInternship={() => handleNavigate('internship')}
          onOpenRegistration={() => handleOpenRegistration()}
        />
      )}

      {/* DotRepo Corp. Ease & Elegant Enterprise Navigation Bar (Mobile Adaptable) */}
      {currentPage !== 'spawn' && currentPage !== 'cloud' && (
        <EnterpriseNavbar
          currentPage={currentPage as PageId}
          onNavigate={(p, s) => handleNavigate(p as PageId, s)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenContact={handleOpenContactModal}
          onOpenRegistration={handleOpenRegistration}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'spawn' && (
          <SpawnPage
            onNavigate={handleNavigate}
            onOpenContactModal={handleOpenContactModal}
          />
        )}

        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenContactModal={handleOpenContactModal}
            onOpenRegistration={handleOpenRegistration}
          />
        )}

        {currentPage === 'internship' && (
          <InternshipPage
            onNavigate={handleNavigate}
            onOpenRegistration={handleOpenRegistration}
          />
        )}

        {currentPage === 'admin' && <AdminPage />}

        {currentPage === 'products' && (
          <ProductsPage
            initialProductId={subId}
            onNavigate={handleNavigate}
            onOpenContactModal={handleOpenContactModal}
          />
        )}

        {currentPage === 'solutions' && (
          <SolutionsPage
            initialIndustryId={subId}
            onNavigate={handleNavigate}
            onOpenContactModal={handleOpenContactModal}
          />
        )}

        {currentPage === 'ai' && (
          <AIPage
            onNavigate={handleNavigate}
            onOpenContactModal={handleOpenContactModal}
          />
        )}

        {currentPage === 'cloud' && (
          <CloudPage
            onNavigate={handleNavigate}
            onOpenContactModal={handleOpenContactModal}
            onOpenInternship={() => handleOpenRegistration()}
          />
        )}

        {currentPage === 'developers' && (
          <DevelopersPage
            onNavigate={handleNavigate}
            onOpenContactModal={handleOpenContactModal}
          />
        )}

        {currentPage === 'resources' && (
          <ResourcesPage
            onNavigate={handleNavigate}
            onOpenContactModal={handleOpenContactModal}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenContactModal={handleOpenContactModal}
          />
        )}

        {currentPage === 'careers' && (
          <CareersPage
            onNavigate={handleNavigate}
            onOpenContactModal={handleOpenContactModal}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            initialTopic={subId}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Enterprise Global Footer */}
      {currentPage !== 'spawn' && currentPage !== 'cloud' && (
        <Footer onNavigate={(p, s) => handleNavigate(p as PageId, s)} />
      )}

      {/* Global Search Palette (Cmd+K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Global Contact / Sales Modal */}
      <ContactModal
        isOpen={Boolean(contactModalTopic)}
        topic={contactModalTopic || undefined}
        onClose={handleCloseContactModal}
      />

      {/* Embedded Internship Onboarding Form Modal (Elfsight) */}
      <InternshipOnboardingModal
        isOpen={isZohoCheckoutOpen}
        trackTitle={checkoutTrackTitle}
        onClose={() => setIsZohoCheckoutOpen(false)}
      />

      {/* Global Payment & Application Success Toast Notification */}
      <ToastNotification
        toast={activeToast}
        onDismiss={() => setActiveToast(null)}
        onViewInternship={() => handleNavigate('internship')}
      />
    </div>
  );
}
