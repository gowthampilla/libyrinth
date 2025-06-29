// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCzI_zuchEV_g6vJZFS9vP4EfbmUc8_Dhs",
  authDomain: "rajaram-a0aac.firebaseapp.com",
  databaseURL: "https://rajaram-a0aac-default-rtdb.firebaseio.com",
  projectId: "rajaram-a0aac",
  storageBucket: "rajaram-a0aac.appspot.com",
  messagingSenderId: "1006956776313",
  appId: "1:1006956776313:web:8a46834b8679d2c8bb7da8"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
