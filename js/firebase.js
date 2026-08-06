// ============================================================
// firebase.js — Firebase Configuration & Auth
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyD69IYGM5HhxA3taphALXVlGZs5llkNYRQ",
  authDomain: "skincare-guide-e6fcb.firebaseapp.com",
  projectId: "skincare-guide-e6fcb",
  storageBucket: "skincare-guide-e6fcb.firebasestorage.app",
  messagingSenderId: "192131587322",
  appId: "1:192131587322:web:d1f5ec2919cbd41fe13d43",
  measurementId: "G-1P31KHWCVN"
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
