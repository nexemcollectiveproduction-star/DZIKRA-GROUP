import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsSection } from './components/StatsSection';
import { AboutSection } from './components/AboutSection';
import { NewsSection } from './components/NewsSection';
import { NewsEditorModal } from './components/NewsEditorModal';
import { UnitsGrid } from './components/UnitsGrid';
import { UnitDetailView } from './components/UnitDetailView';
import { SimpanPinjamSection } from './components/SimpanPinjamSection';
import { DigitalFinanceSection } from './components/DigitalFinanceSection';
import { ProductsSection } from './components/ProductsSection';
import { CokusiAdventureSection } from './components/CokusiAdventureSection';
import { InnovationSection } from './components/InnovationSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LoanApplicationModal } from './components/LoanApplicationModal';
import { MemberPortalModal } from './components/MemberPortalModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { EditLogoModal } from './components/EditLogoModal';

import { 
  BUSINESS_UNITS, 
  SAVINGS_PRODUCTS, 
  LOAN_PRODUCTS, 
  DIGITAL_FEATURES, 
  INITIAL_GALLERY_MEDIA,
  DEMO_MEMBER_ACCOUNTS,
  INITIAL_NEWS_ARTICLES
} from './data/dzikraData';
import { BusinessUnit, GalleryMediaItem, MemberAccountDemo, NewsArticle } from './types';
import { DZIKRA_OFFICIAL_LOGO_SVG } from './assets/dzikraLogo';
import {
  syncLoanApplications,
  saveLoanApplicationToFirebase,
  deleteLoanApplicationFromFirebase,
  syncNewsArticles,
  saveNewsArticleToFirebase,
  deleteNewsArticleFromFirebase,
  syncMemberAccounts,
  saveMemberAccountToFirebase,
  deleteMemberAccountFromFirebase,
  syncGalleryItems,
  saveGalleryItemToFirebase,
  deleteGalleryItemFromFirebase,
  syncAppSettings,
  saveAppSettingsToFirebase
} from './lib/firebase';

interface LoanApplicationRecord {
  id: string;
  fullName: string;
  nik: string;
  phone: string;
  loanType: string;
  amount: number;
  tenure: number;
  purpose: string;
  date: string;
  status: 'Menunggu Persetujuan' | 'Disetujui' | 'Ditolak';
}

const INITIAL_DEMO_LOANS: LoanApplicationRecord[] = [
  {
    id: 'LOAN-88210',
    fullName: 'Budi Santoso',
    nik: '3201123456780001',
    phone: '081298765432',
    loanType: 'Pinjaman Modal Usaha',
    amount: 15000000,
    tenure: 12,
    purpose: 'Ekspansi kios kelontong dan stok sembako grosir',
    date: '28 Agu 2026',
    status: 'Disetujui',
  },
  {
    id: 'LOAN-88215',
    fullName: 'Siti Rahmawati',
    nik: '3201987654320002',
    phone: '085712345678',
    loanType: 'Pinjaman Investasi Pertanian',
    amount: 25000000,
    tenure: 24,
    purpose: 'Pengadaan bibit kakao unggul dan pupuk organik',
    date: '29 Agu 2026',
    status: 'Menunggu Persetujuan',
  },
];

export default function App() {
  // Admin Authentication State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('dzikra_is_admin') === 'true';
    } catch {
      return false;
    }
  });

  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState<boolean>(false);
  const [adminPromptMessage, setAdminPromptMessage] = useState<string | undefined>(undefined);

  // Main Dzikra Group Logo (base64 or SVG or URL)
  const [mainLogo, setMainLogo] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('dzikra_main_logo');
      return saved && saved.trim() !== '' ? saved : DZIKRA_OFFICIAL_LOGO_SVG;
    } catch {
      return DZIKRA_OFFICIAL_LOGO_SVG;
    }
  });

  // News Articles State
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(() => {
    try {
      const saved = localStorage.getItem('dzikra_news_articles');
      return saved ? JSON.parse(saved) : INITIAL_NEWS_ARTICLES;
    } catch {
      return INITIAL_NEWS_ARTICLES;
    }
  });

  // News Editor Modal state (for admin adding/editing news directly)
  const [isNewsEditorOpen, setIsNewsEditorOpen] = useState<boolean>(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);

  // Logo Editor Modal state (direct edit & replace logo modal)
  const [isEditLogoOpen, setIsEditLogoOpen] = useState<boolean>(false);

  // 10 Business Units state
  const [units, setUnits] = useState<BusinessUnit[]>(BUSINESS_UNITS);
  const [selectedUnitId, setSelectedUnitId] = useState<number>(1);

  // Custom Logo Map: unitId -> base64/url
  const [unitLogos, setUnitLogos] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem('dzikra_unit_logos');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Gallery Media Items state
  const [galleryItems, setGalleryItems] = useState<GalleryMediaItem[]>(() => {
    try {
      const saved = localStorage.getItem('dzikra_gallery_media');
      return saved ? JSON.parse(saved) : INITIAL_GALLERY_MEDIA;
    } catch {
      return INITIAL_GALLERY_MEDIA;
    }
  });

  // Koperasi Member Accounts State (for Admin & Member Portal)
  const [memberAccounts, setMemberAccounts] = useState<Record<string, MemberAccountDemo>>(() => {
    try {
      const saved = localStorage.getItem('dzikra_member_accounts');
      return saved ? JSON.parse(saved) : DEMO_MEMBER_ACCOUNTS;
    } catch {
      return DEMO_MEMBER_ACCOUNTS;
    }
  });

  // Loan Applications Queue State
  const [loanApplications, setLoanApplications] = useState<LoanApplicationRecord[]>(() => {
    try {
      const saved = localStorage.getItem('dzikra_loan_apps');
      return saved ? JSON.parse(saved) : INITIAL_DEMO_LOANS;
    } catch {
      return INITIAL_DEMO_LOANS;
    }
  });

  // Modals state
  const [isLoanModalOpen, setIsLoanModalOpen] = useState<boolean>(false);
  const [loanModalDefaultType, setLoanModalDefaultType] = useState<string>('Pinjaman Modal Usaha');
  const [isMemberModalOpen, setIsMemberModalOpen] = useState<boolean>(false);

  // Firebase Real-Time Firestore Sync
  useEffect(() => {
    const unsubLoans = syncLoanApplications((remoteLoans) => {
      if (remoteLoans && remoteLoans.length > 0) {
        setLoanApplications(remoteLoans);
      }
    });

    const unsubNews = syncNewsArticles((remoteNews) => {
      if (remoteNews && remoteNews.length > 0) {
        setNewsArticles(remoteNews);
      }
    });

    const unsubMembers = syncMemberAccounts((remoteMembers) => {
      if (remoteMembers && Object.keys(remoteMembers).length > 0) {
        setMemberAccounts(remoteMembers);
      }
    });

    const unsubGallery = syncGalleryItems((remoteGallery) => {
      if (remoteGallery && remoteGallery.length > 0) {
        setGalleryItems(remoteGallery);
      }
    });

    const unsubBranding = syncAppSettings((settings) => {
      if (settings?.mainLogo) {
        setMainLogo(settings.mainLogo);
      }
      if (settings?.unitLogos) {
        setUnitLogos(settings.unitLogos);
      }
    });

    return () => {
      unsubLoans();
      unsubNews();
      unsubMembers();
      unsubGallery();
      unsubBranding();
    };
  }, []);

  // Persist Admin State
  useEffect(() => {
    try {
      localStorage.setItem('dzikra_is_admin', isAdmin ? 'true' : 'false');
    } catch (e) {
      console.warn('Could not persist admin state:', e);
    }
  }, [isAdmin]);

  // Persist Main Logo
  useEffect(() => {
    try {
      localStorage.setItem('dzikra_main_logo', mainLogo);
    } catch (e) {
      console.warn('Could not save main logo to localStorage:', e);
    }
  }, [mainLogo]);

  // Persist News Articles
  useEffect(() => {
    try {
      localStorage.setItem('dzikra_news_articles', JSON.stringify(newsArticles));
    } catch (e) {
      console.warn('Could not save news articles to localStorage:', e);
    }
  }, [newsArticles]);

  // Persist logos to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dzikra_unit_logos', JSON.stringify(unitLogos));
    } catch (e) {
      console.warn('Could not save logos to localStorage:', e);
    }
  }, [unitLogos]);

  // Persist gallery to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dzikra_gallery_media', JSON.stringify(galleryItems));
    } catch (e) {
      console.warn('Could not save gallery to localStorage:', e);
    }
  }, [galleryItems]);

  // Persist member accounts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dzikra_member_accounts', JSON.stringify(memberAccounts));
    } catch (e) {
      console.warn('Could not save member accounts to localStorage:', e);
    }
  }, [memberAccounts]);

  // Persist loan applications to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dzikra_loan_apps', JSON.stringify(loanApplications));
    } catch (e) {
      console.warn('Could not save loan applications to localStorage:', e);
    }
  }, [loanApplications]);

  // Helper for admin gating
  const handleRequireAdmin = (actionReason: string) => {
    setAdminPromptMessage(`Akses Khusus Administrator: Silakan login sebagai pengurus untuk ${actionReason}.`);
    setIsAdminLoginOpen(true);
  };

  const handleAdminLoginSuccess = () => {
    setIsAdmin(true);
    setAdminPromptMessage(undefined);
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setIsAdminDashboardOpen(false);
  };

  // Main Dzikra Group Logo Handlers
  const handleUploadMainLogo = (file: File) => {
    if (!isAdmin) {
      handleRequireAdmin('mengubah logo resmi Dzikra Group');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const logoData = e.target.result as string;
        setMainLogo(logoData);
        saveAppSettingsToFirebase({ mainLogo: logoData, unitLogos });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSetMainLogoDataUrl = (dataUrl: string) => {
    if (!isAdmin) {
      handleRequireAdmin('mengubah logo resmi Dzikra Group');
      return;
    }
    setMainLogo(dataUrl);
    saveAppSettingsToFirebase({ mainLogo: dataUrl, unitLogos });
  };

  const handleResetMainLogo = () => {
    if (!isAdmin) {
      handleRequireAdmin('mereset logo Dzikra Group');
      return;
    }
    setMainLogo(DZIKRA_OFFICIAL_LOGO_SVG);
    saveAppSettingsToFirebase({ mainLogo: DZIKRA_OFFICIAL_LOGO_SVG, unitLogos });
  };

  // Handler for uploading/changing a unit's logo
  const handleUploadLogo = (unitId: number, file: File) => {
    if (!isAdmin) {
      handleRequireAdmin('mengubah logo resmi unit usaha');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const dataUrl = e.target.result as string;
        const updated = {
          ...unitLogos,
          [unitId]: dataUrl,
        };
        setUnitLogos(updated);
        saveAppSettingsToFirebase({ mainLogo, unitLogos: updated });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetLogo = (unitId: number) => {
    if (!isAdmin) {
      handleRequireAdmin('mereset logo unit');
      return;
    }
    const copy = { ...unitLogos };
    delete copy[unitId];
    setUnitLogos(copy);
    saveAppSettingsToFirebase({ mainLogo, unitLogos: copy });
  };

  // Handler to select unit and scroll to its dedicated section
  const handleSelectUnit = (unitId: number) => {
    setSelectedUnitId(unitId);
    const element = document.getElementById('halaman-unit');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Gallery Handlers
  const handleAddMedia = (item: Omit<GalleryMediaItem, 'id' | 'uploadedAt'>) => {
    if (!isAdmin) {
      handleRequireAdmin('menambahkan foto atau video produk baru');
      return;
    }
    const newItem: GalleryMediaItem = {
      ...item,
      id: `media-${Date.now()}`,
      uploadedAt: new Date().toISOString(),
    };
    setGalleryItems((prev) => [newItem, ...prev]);
    saveGalleryItemToFirebase(newItem);
  };

  const handleRemoveMedia = (mediaId: string) => {
    if (!isAdmin) {
      handleRequireAdmin('menghapus media dari galeri');
      return;
    }
    setGalleryItems((prev) => prev.filter((m) => m.id !== mediaId));
    deleteGalleryItemFromFirebase(mediaId);
  };

  const handleUpdateMediaUrl = (id: string, newUrl: string, newType?: 'image' | 'video') => {
    if (!isAdmin) {
      handleRequireAdmin('mengubah URL atau berkas media produk');
      return;
    }
    const targetItem = galleryItems.find((m) => m.id === id);
    if (targetItem) {
      const updatedItem: GalleryMediaItem = {
        ...targetItem,
        url: newUrl,
        type: newType || targetItem.type,
      };
      setGalleryItems((prev) =>
        prev.map((item) => (item.id === id ? updatedItem : item))
      );
      saveGalleryItemToFirebase(updatedItem);
    }
  };

  // News Handlers (Full CRUD with Firestore persistence)
  const handleAddNewsArticle = (article: NewsArticle) => {
    if (!isAdmin) {
      handleRequireAdmin('menambahkan berita atau kegiatan baru');
      return;
    }
    setNewsArticles((prev) => [article, ...prev]);
    saveNewsArticleToFirebase(article);
  };

  const handleDeleteNewsArticle = (articleId: string) => {
    if (!isAdmin) {
      handleRequireAdmin('menghapus berita');
      return;
    }
    setNewsArticles((prev) => prev.filter((a) => a.id !== articleId));
    deleteNewsArticleFromFirebase(articleId);
  };

  const handleUpdateNewsArticle = (article: NewsArticle) => {
    if (!isAdmin) {
      handleRequireAdmin('mengubah rincian berita');
      return;
    }
    setNewsArticles((prev) =>
      prev.map((a) => (a.id === article.id ? article : a))
    );
    saveNewsArticleToFirebase(article);
  };

  const handleSaveNewsFromEditor = (articleData: NewsArticle) => {
    const exists = newsArticles.some((a) => a.id === articleData.id);
    if (exists) {
      handleUpdateNewsArticle(articleData);
    } else {
      handleAddNewsArticle(articleData);
    }
    setIsNewsEditorOpen(false);
    setEditingArticle(null);
  };

  // Member Management Handlers (Cooperative recruitment and savings)
  const handleUpdateMemberAccount = (memberNo: string, updated: Partial<MemberAccountDemo>) => {
    if (!isAdmin) return;
    const current = memberAccounts[memberNo];
    if (current) {
      const fullUpdated: MemberAccountDemo = {
        ...current,
        ...updated,
      };
      setMemberAccounts((prev) => ({
        ...prev,
        [memberNo]: fullUpdated,
      }));
      saveMemberAccountToFirebase(fullUpdated);
    }
  };

  const handleAddMemberAccount = (account: MemberAccountDemo) => {
    if (!isAdmin) return;
    setMemberAccounts((prev) => ({
      ...prev,
      [account.memberNo]: account,
    }));
    saveMemberAccountToFirebase(account);
  };

  const handleDeleteMemberAccount = (memberNo: string) => {
    if (!isAdmin) return;
    setMemberAccounts((prev) => {
      const copy = { ...prev };
      delete copy[memberNo];
      return copy;
    });
    deleteMemberAccountFromFirebase(memberNo);
  };

  // Loan Management Handlers
  const handleRegisterLoanApplication = (appRecord: LoanApplicationRecord) => {
    setLoanApplications((prev) => [appRecord, ...prev]);
    saveLoanApplicationToFirebase(appRecord);
  };

  const handleUpdateLoanStatus = (appId: string, newStatus: 'Menunggu Persetujuan' | 'Disetujui' | 'Ditolak') => {
    if (!isAdmin) return;
    setLoanApplications((prev) =>
      prev.map((l) => {
        if (l.id === appId) {
          const updated = { ...l, status: newStatus };
          saveLoanApplicationToFirebase(updated);
          return updated;
        }
        return l;
      })
    );
  };

  const handleDeleteLoanApplication = (appId: string) => {
    if (!isAdmin) return;
    setLoanApplications((prev) => prev.filter((l) => l.id !== appId));
    deleteLoanApplicationFromFirebase(appId);
  };

  const selectedUnit = units.find((u) => u.id === selectedUnitId) || units[0];
  const unitSpecificGallery = galleryItems.filter((m) => m.unitId === selectedUnitId);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4efe8] font-sans antialiased selection:bg-[#ffd700] selection:text-[#09090b]">
      {/* 1. Header & Navigation */}
      <Navbar
        isAdmin={isAdmin}
        mainLogo={mainLogo}
        onOpenMemberModal={() => setIsMemberModalOpen(true)}
        onOpenLoanModal={() => {
          setLoanModalDefaultType('Pinjaman Modal Usaha');
          setIsLoanModalOpen(true);
        }}
        onSelectUnit={handleSelectUnit}
        onOpenAdminLogin={() => {
          setAdminPromptMessage(undefined);
          setIsAdminLoginOpen(true);
        }}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
        onAdminLogout={handleAdminLogout}
      />

      {/* Main Content Sections */}
      <main>
        {/* 2. Hero Section */}
        <HeroSection
          mainLogo={mainLogo}
          isAdmin={isAdmin}
          onOpenEditLogo={() => setIsEditLogoOpen(true)}
          onOpenLoanModal={() => {
            setLoanModalDefaultType('Pinjaman Modal Usaha');
            setIsLoanModalOpen(true);
          }}
          onOpenMemberModal={() => setIsMemberModalOpen(true)}
        />

        {/* 3. Statistics & Quick Data Table */}
        <StatsSection />

        {/* 4. About Us & 5 Service Sectors */}
        <AboutSection />

        {/* 5. Berita & Kegiatan Publik Dzikra Group */}
        <NewsSection
          articles={newsArticles}
          isAdmin={isAdmin}
          onSelectUnit={handleSelectUnit}
          onOpenAddNews={() => {
            if (!isAdmin) {
              handleRequireAdmin('menambahkan berita baru');
              return;
            }
            setEditingArticle(null);
            setIsNewsEditorOpen(true);
          }}
          onOpenEditNews={(article) => {
            if (!isAdmin) {
              handleRequireAdmin('mengedit berita');
              return;
            }
            setEditingArticle(article);
            setIsNewsEditorOpen(true);
          }}
          onDeleteNews={handleDeleteNewsArticle}
          onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
        />

        {/* 6. 10 Business Units Grid (Clean, strictly in-dashboard logo editing) */}
        <UnitsGrid
          units={units}
          unitLogos={unitLogos}
          selectedUnitId={selectedUnitId}
          isAdmin={isAdmin}
          onSelectUnit={handleSelectUnit}
          onUploadLogo={handleUploadLogo}
          onRequireAdmin={handleRequireAdmin}
        />

        {/* 7. Dedicated Unit Page (Halaman Unit Rinci with Custom Logo & Unit Gallery) */}
        <UnitDetailView
          unit={selectedUnit}
          allUnits={units}
          customLogo={unitLogos[selectedUnit.id]}
          unitGallery={unitSpecificGallery}
          isAdmin={isAdmin}
          onUploadLogo={handleUploadLogo}
          onAddGalleryMedia={(unitId, item) => handleAddMedia(item)}
          onRemoveGalleryMedia={handleRemoveMedia}
          onSelectUnit={handleSelectUnit}
          onRequireAdmin={handleRequireAdmin}
        />

        {/* 8. Savings & Loans (Simpan Pinjam, 8 Simpanan, 6 Pinjaman, Loan Calculator) */}
        <SimpanPinjamSection
          savingsList={SAVINGS_PRODUCTS}
          loansList={LOAN_PRODUCTS}
          onOpenApplyLoanModal={(loanName) => {
            setLoanModalDefaultType(loanName || 'Pinjaman Modal Usaha');
            setIsLoanModalOpen(true);
          }}
        />

        {/* 9. Digital Finance & Member Portal Live Simulation */}
        <DigitalFinanceSection
          features={DIGITAL_FEATURES}
          onOpenMemberModal={() => setIsMemberModalOpen(true)}
        />

        {/* 10. Products & Brands Catalogue */}
        <ProductsSection
          units={units}
          onSelectUnit={handleSelectUnit}
        />

        {/* 11. Cokusi Adventure Cafe & Tourism Showcase */}
        <CokusiAdventureSection
          onSelectUnit={handleSelectUnit}
        />

        {/* 12. Technology & Digital Innovations */}
        <InnovationSection
          onSelectUnit={handleSelectUnit}
        />

        {/* 13. Full Media Gallery with Upload & Lightbox */}
        <GallerySection
          galleryItems={galleryItems}
          units={units}
          isAdmin={isAdmin}
          onAddMedia={handleAddMedia}
          onRemoveMedia={handleRemoveMedia}
          onUpdateMediaUrl={handleUpdateMediaUrl}
          onRequireAdmin={handleRequireAdmin}
        />

        {/* 14. Contact, Partnerships & FAQ */}
        <ContactSection units={units} />
      </main>

      {/* 15. Official Corporate Footer */}
      <Footer
        units={units}
        mainLogo={mainLogo}
        onSelectUnit={handleSelectUnit}
      />

      {/* Loan Application Modal */}
      <LoanApplicationModal
        isOpen={isLoanModalOpen}
        defaultLoanType={loanModalDefaultType}
        onClose={() => setIsLoanModalOpen(false)}
        onSubmitLoan={handleRegisterLoanApplication}
      />

      {/* Member e-KTA & Account Portal Modal */}
      <MemberPortalModal
        isOpen={isMemberModalOpen}
        memberAccounts={memberAccounts}
        mainLogo={mainLogo}
        onClose={() => setIsMemberModalOpen(false)}
      />

      {/* Dedicated News Editor Modal */}
      <NewsEditorModal
        isOpen={isNewsEditorOpen}
        onClose={() => {
          setIsNewsEditorOpen(false);
          setEditingArticle(null);
        }}
        articleToEdit={editingArticle}
        units={units}
        onSave={handleSaveNewsFromEditor}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
        initialPromptMessage={adminPromptMessage}
      />

      {/* Admin Management Dashboard Modal */}
      <AdminDashboardModal
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        onLogout={handleAdminLogout}
        mainLogo={mainLogo}
        onUploadMainLogo={handleUploadMainLogo}
        onSetMainLogoDataUrl={handleSetMainLogoDataUrl}
        onResetMainLogo={handleResetMainLogo}
        newsArticles={newsArticles}
        onAddNewsArticle={handleAddNewsArticle}
        onDeleteNewsArticle={handleDeleteNewsArticle}
        onUpdateNewsArticle={handleUpdateNewsArticle}
        units={units}
        unitLogos={unitLogos}
        galleryItems={galleryItems}
        memberAccounts={memberAccounts}
        loanApplications={loanApplications}
        onUploadLogo={handleUploadLogo}
        onResetLogo={handleResetLogo}
        onAddGalleryMedia={handleAddMedia}
        onRemoveGalleryMedia={handleRemoveMedia}
        onUpdateMemberAccount={handleUpdateMemberAccount}
        onAddMemberAccount={handleAddMemberAccount}
        onDeleteMemberAccount={handleDeleteMemberAccount}
        onUpdateLoanStatus={handleUpdateLoanStatus}
        onDeleteLoanApplication={handleDeleteLoanApplication}
      />

      {/* Direct Quick Edit Logo Modal */}
      <EditLogoModal
        isOpen={isEditLogoOpen}
        onClose={() => setIsEditLogoOpen(false)}
        isAdmin={isAdmin}
        onRequireAdmin={handleRequireAdmin}
        mainLogo={mainLogo}
        onUploadMainLogo={handleUploadMainLogo}
        onSetMainLogoDataUrl={handleSetMainLogoDataUrl}
        onResetMainLogo={handleResetMainLogo}
        units={units}
        unitLogos={unitLogos}
        onUploadUnitLogo={handleUploadLogo}
        onResetUnitLogo={handleResetLogo}
      />
    </div>
  );
}

