import { NextResponse } from 'next/server';
import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';

// Only initialize once
const firebaseConfig = {
  apiKey: "AIzaSyCzI_zuchEV_g6vJZFS9vP4EfbmUc8_Dhs",
  authDomain: "rajaram-a0aac.firebaseapp.com",
  databaseURL: "https://rajaram-a0aac-default-rtdb.firebaseio.com",
  projectId: "rajaram-a0aac",
  storageBucket: "rajaram-a0aac.appspot.com",
  messagingSenderId: "1006956776313",
  appId: "1:1006956776313:web:8a46834b8679d2c8bb7da8"
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const db = getDatabase();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, code, reason } = body;

    if (!name || !email || !code || !reason) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    const submissionsRef = ref(db, 'labyrinth_invites');
    await push(submissionsRef, {
      name,
      email,
      code,
      reason,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Firebase Error]', err);
    return NextResponse.json({ success: false, message: 'Internal error' }, { status: 500 });
  }
}
