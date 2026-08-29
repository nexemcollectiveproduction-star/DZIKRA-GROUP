export interface BusinessUnit {
  id: number;
  name: string;
  shortName: string;
  category: string;
  bidang: string;
  slogan?: string;
  description: string;
  longDescription: string;
  logoUrl: string;
  defaultIconName: string;
  badge: string;
  highlights: string[];
  products: {
    name: string;
    description: string;
    price?: string;
    tag?: string;
    imageUrl?: string;
  }[];
  services: string[];
  contact: {
    manager?: string;
    phone?: string;
    email?: string;
    location?: string;
  };
}

export interface SavingsProduct {
  id: number;
  name: string;
  type: string;
  nature: string;
  benefits: string;
  minDeposit: string;
  interestRate: string; // e.g. "Bagi Hasil SHU s.d 8-12% p.a"
  withdrawalTerms: string;
  description: string;
}

export interface LoanProduct {
  id: number;
  name: string;
  purpose: string;
  tenure: string;
  advantages: string;
  interestRate: string; // e.g. "0.8% - 1.2% per bulan"
  maxAmount: string;
  requirements: string[];
}

export interface GalleryMediaItem {
  id: string;
  unitId?: number;
  unitName?: string;
  title: string;
  type: 'image' | 'video';
  url: string;
  caption?: string;
  uploadedAt: string;
}

export interface DigitalFeature {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  status: 'Aktif' | 'Segera Hadir' | 'Baru';
}

export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  unitTag: string;
  readTime: string;
  summary: string;
  content: string;
  imageUrl: string;
  isPinned?: boolean;
  tags: string[];
}

export interface MemberAccountDemo {
  memberNo: string;
  fullName: string;
  joinedDate: string;
  status: string;
  totalSimpananPokok: number;
  totalSimpananWajib: number;
  totalSimpananSukarela: number;
  totalSimpananBerjangka: number;
  pinjamanAktif: {
    id: string;
    jenis: string;
    plafon: number;
    sisaPokok: number;
    angsuranBulanan: number;
    sisaBulan: number;
  } | null;
  estimasiSHU: number;
  transaksiTerakhir: {
    id: string;
    tanggal: string;
    keterangan: string;
    jenis: 'debit' | 'kredit';
    nominal: number;
  }[];
}
