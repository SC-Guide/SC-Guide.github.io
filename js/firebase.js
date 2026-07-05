// ===== FIREBASE CONFIG & INIT (COMPAT VERSION) =====
// Используем глобальный объект firebase (доступен из compat-скриптов)

const firebaseConfig = {
  apiKey: "AIzaSyBhAUTiDxTuaJ-QFx-Oirr0fY3dViKTSJM",
  authDomain: "sg-project-b13f4.firebaseapp.com",
  projectId: "sg-project-b13f4",
  storageBucket: "sg-project-b13f4.firebasestorage.app",
  messagingSenderId: "655859312735",
  appId: "1:655859312735:web:e5c26c9a989f8a246bd3ea",
  measurementId: "G-CWBCGB7LLS" // (можно оставить, не мешает)
};

// Инициализация Firebase (compat)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ===== АВТОРИЗАЦИЯ =====
function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider);
}

function signOut() {
  return auth.signOut();
}

// ===== ЧТЕНИЕ / ЗАПИСЬ В FIRESTORE =====
async function saveUserData(uid, data) {
  try {
    await db.collection('users').doc(uid).set(data, { merge: true });
  } catch (e) {
    console.error('Error saving user data:', e);
  }
}

async function loadUserData(uid) {
  try {
    const doc = await db.collection('users').doc(uid).get();
    if (doc.exists) {
      return doc.data();
    }
    return null;
  } catch (e) {
    console.error('Error loading user data:', e);
    return null;
  }
}