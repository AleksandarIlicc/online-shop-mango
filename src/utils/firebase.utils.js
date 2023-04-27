import { initializeApp } from "firebase/app";

import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  writeBatch,
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

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getProductsAndDocument = async (collectionKey) => {
  const collectionRef = collection(db, collectionKey);
  const queryObj = query(collectionRef);

  const snapshot = await getDocs(queryObj);

  const productsMap = snapshot.docs.map((docSnapshot) => docSnapshot.data());
  return productsMap;
};
