import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDocFromServer,
  collection,
  onSnapshot,
  setDoc,
  deleteDoc,
  getDocs,
  writeBatch
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { 
  LoanApplicationRecord 
} from '../components/AdminDashboardModal';
import { 
  NewsArticle, 
  MemberAccountDemo, 
  GalleryMediaItem, 
  BusinessUnit 
} from '../types';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore with custom Database ID
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Initialize Auth
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.warn('Firestore Operation Info: ', JSON.stringify(errInfo));
  return errInfo;
}

// Test Connection on Boot
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firebase Firestore connection verified successfully.');
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or starting up.');
    } else {
      console.log('Firestore initialized and ready.');
    }
    return false;
  }
}

// Run initial connection test
testFirestoreConnection();

// FIRESTORE SYNC HELPERS

// 1. Loan Applications
export const syncLoanApplications = (
  onData: (data: LoanApplicationRecord[]) => void
) => {
  const colRef = collection(db, 'loan_applications');
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => d.data() as LoanApplicationRecord);
        onData(items);
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, 'loan_applications');
    }
  );
};

export const saveLoanApplicationToFirebase = async (loan: LoanApplicationRecord) => {
  try {
    const docRef = doc(db, 'loan_applications', loan.id);
    await setDoc(docRef, loan, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `loan_applications/${loan.id}`);
  }
};

export const deleteLoanApplicationFromFirebase = async (loanId: string) => {
  try {
    const docRef = doc(db, 'loan_applications', loanId);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `loan_applications/${loanId}`);
  }
};

// 2. News Articles
export const syncNewsArticles = (
  onData: (data: NewsArticle[]) => void
) => {
  const colRef = collection(db, 'news_articles');
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => d.data() as NewsArticle);
        onData(items);
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, 'news_articles');
    }
  );
};

export const saveNewsArticleToFirebase = async (article: NewsArticle) => {
  try {
    const docRef = doc(db, 'news_articles', article.id);
    await setDoc(docRef, article, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `news_articles/${article.id}`);
  }
};

export const deleteNewsArticleFromFirebase = async (articleId: string) => {
  try {
    const docRef = doc(db, 'news_articles', articleId);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `news_articles/${articleId}`);
  }
};

// 3. Member Accounts
export const syncMemberAccounts = (
  onData: (data: Record<string, MemberAccountDemo>) => void
) => {
  const colRef = collection(db, 'member_accounts');
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const map: Record<string, MemberAccountDemo> = {};
        snapshot.docs.forEach((d) => {
          const val = d.data() as MemberAccountDemo;
          if (val.memberNo) {
            map[val.memberNo] = val;
          }
        });
        onData(map);
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, 'member_accounts');
    }
  );
};

export const saveMemberAccountToFirebase = async (account: MemberAccountDemo) => {
  try {
    const docRef = doc(db, 'member_accounts', account.memberNo);
    await setDoc(docRef, account, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `member_accounts/${account.memberNo}`);
  }
};

export const deleteMemberAccountFromFirebase = async (memberNo: string) => {
  try {
    const docRef = doc(db, 'member_accounts', memberNo);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `member_accounts/${memberNo}`);
  }
};

// 4. Gallery Items
export const syncGalleryItems = (
  onData: (data: GalleryMediaItem[]) => void
) => {
  const colRef = collection(db, 'gallery_items');
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => d.data() as GalleryMediaItem);
        onData(items);
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, 'gallery_items');
    }
  );
};

export const saveGalleryItemToFirebase = async (item: GalleryMediaItem) => {
  try {
    const docRef = doc(db, 'gallery_items', item.id);
    await setDoc(docRef, item, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `gallery_items/${item.id}`);
  }
};

export const deleteGalleryItemFromFirebase = async (itemId: string) => {
  try {
    const docRef = doc(db, 'gallery_items', itemId);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `gallery_items/${itemId}`);
  }
};

// 5. Branding / Settings
export const syncAppSettings = (
  onData: (settings: { mainLogo?: string; unitLogos?: Record<number, string> }) => void
) => {
  const docRef = doc(db, 'app_settings', 'branding');
  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        onData(snapshot.data() as { mainLogo?: string; unitLogos?: Record<number, string> });
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, 'app_settings/branding');
    }
  );
};

export const saveAppSettingsToFirebase = async (settings: { mainLogo?: string; unitLogos?: Record<number, string> }) => {
  try {
    const docRef = doc(db, 'app_settings', 'branding');
    await setDoc(docRef, settings, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'app_settings/branding');
  }
};

// 6. Contact Form Messages
export const saveContactMessageToFirebase = async (msg: {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  message: string;
  createdAt: string;
}) => {
  try {
    const docRef = doc(db, 'contact_messages', msg.id);
    await setDoc(docRef, msg, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `contact_messages/${msg.id}`);
  }
};
