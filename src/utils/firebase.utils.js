import { initializeApp } from "firebase/app";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsne1M7RFbjU_YKuhlsd8UUlbnlhiAAEY",
  authDomain: "react-mango-shop.firebaseapp.com",
  projectId: "react-mango-shop",
  storageBucket: "react-mango-shop.appspot.com",
  messagingSenderId: "793502749735",
  appId: "1:793502749735:web:c8db0ba13dbfb39eefea02",
  measurementId: "G-51Z8ESCP1L",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const addCollectionAndDocuments = async (collectionKey, products) => {
  const collectionRef = collection(db, collectionKey);

  for (let product of products) {
    addDoc(collectionRef, product);
  }

  console.log("done");
};

export const getProductsAndDocument = async (collectionKey) => {
  const collectionRef = collection(db, collectionKey);
  const queryObj = query(collectionRef);

  const snapshot = await getDocs(queryObj);

  const productsMap = snapshot.docs.map((docSnapshot) => {
    return { id: docSnapshot.id, ...docSnapshot.data() };
  });
  return productsMap;
};

export const getSingleProduct = async (collectionKey, id) => {
  const documentRef = doc(db, collectionKey, id);

  const snapshot = await getDoc(documentRef);
  const product = { id: snapshot.id, ...snapshot.data() };

  if (snapshot.exists()) return product;
};
