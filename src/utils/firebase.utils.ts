import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
  User,
  onAuthStateChanged,
  signOut,
  NextOrObserver,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
} from "firebase/firestore";
import { Product } from "src/store/products/products.types";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const authInstance = getAuth();

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGooglePopup = (): Promise<UserCredential> =>
  signInWithPopup(authInstance, googleProvider);

export const addCollectionAndDocuments = async (
  collectionKey: string,
  products: Product[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);

  for (let product of products) {
    addDoc(collectionRef, product);
  }

  console.log("done");
};

type AdditionalInformation = {
  displayName?: string;
};

interface UserDocument {
  user: User;
  doc: DocumentSnapshot<DocumentData>;
}

export const createUserDocument = async (
  userAuth: User | null,
  additionalInformation = {} as AdditionalInformation
): Promise<UserDocument | null> => {
  if (!userAuth) return null;

  const userDocRef = doc(db, "users", userAuth.uid);

  const snapshot = await getDoc(userDocRef);

  if (!snapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  const userDoc = await getDoc(userDocRef);
  return { user: userAuth, doc: userDoc };
};

export const signInUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential | undefined> =>
  await signInWithEmailAndPassword(authInstance, email, password);

export const createAuthWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential | undefined> => {
  if (!email && !password) return;

  return await createUserWithEmailAndPassword(authInstance, email, password);
};

export const signOutUser = async () => await signOut(authInstance);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(authInstance, callback);

export const getProductsAndDocument = async (
  collectionKey: string
): Promise<Product[]> => {
  const collectionRef = collection(db, collectionKey);
  const queryObj = query(collectionRef);

  const snapshot = await getDocs(queryObj);

  const productsMap = snapshot.docs.map((docSnapshot) => {
    return { id: docSnapshot.id, ...docSnapshot.data() };
  });
  return productsMap as Product[];
};

export const getSingleProduct = async (
  collectionKey: string,
  id: string
): Promise<Product | void> => {
  const documentRef = doc(db, collectionKey, id);

  const snapshot = await getDoc(documentRef);
  const product = { id: snapshot.id, ...snapshot.data() };

  if (snapshot.exists()) return product as Product;
};
