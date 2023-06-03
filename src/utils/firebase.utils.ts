import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
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

export const signInWithGooglePopup = async () => {
  const result = await signInWithPopup(authInstance, googleProvider);
  console.log(result.user);
};

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
