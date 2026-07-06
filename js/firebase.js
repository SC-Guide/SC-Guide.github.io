// ============================================================
// firebase.js — Firebase Configuration & Auth
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyBhAUTiDxTuaJ-QFx-Oirr0fY3dViKTSJM",
  authDomain: "sg-project-b13f4.firebaseapp.com",
  projectId: "sg-project-b13f4",
  storageBucket: "sg-project-b13f4.firebasestorage.app",
  messagingSenderId: "655859312735",
  appId: "1:655859312735:web:7e9a9b8488654f696bd3ea",
  measurementId: "G-L4MCEVBDCN"
};

// Инициализация Firebase
firebase.initializeApp(firebaseConfig);

// Настройка аутентификации
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const authBtn = document.getElementById('authBtn');

// Обновление UI в зависимости от состояния пользователя
function updateAuthUI(user) {
  if (user) {
    const displayName = user.displayName || user.email || 'User';
    const photoURL = user.photoURL;
    let avatarHtml = '';
    if (photoURL) {
      avatarHtml = `<img src="${photoURL}" class="user-avatar" alt="avatar">`;
    }
    authBtn.innerHTML = `${avatarHtml} ${displayName} (Sign out)`;
    authBtn.onclick = () => {
      auth.signOut().then(() => updateAuthUI(null)).catch(console.error);
    };
  } else {
    authBtn.innerHTML = 'Sign in with Google';
    authBtn.onclick = () => {
      auth.signInWithPopup(provider).catch(console.error);
    };
  }
}

// Следим за состоянием авторизации
auth.onAuthStateChanged(updateAuthUI);