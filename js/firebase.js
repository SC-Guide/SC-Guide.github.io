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

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const authBtn = document.getElementById('authBtn');
const logoutBtn = document.getElementById('logoutBtn');

function updateAuthUI(user) {
  if (user) {
    const displayName = user.displayName || user.email || 'User';
    const photoURL = user.photoURL;
    let avatarHtml = '';
    if (photoURL) avatarHtml = `<img src="${photoURL}" class="user-avatar" alt="avatar">`;
    authBtn.innerHTML = `${avatarHtml} ${displayName} (Sign out)`;
    authBtn.style.background = 'var(--accent-dark)';
    logoutBtn.style.display = 'inline-block';
    authBtn.onclick = () => auth.signOut().catch(console.error);
  } else {
    authBtn.innerHTML = '🔑 Sign in with Google';
    authBtn.style.background = '';
    logoutBtn.style.display = 'none';
    authBtn.onclick = () => auth.signInWithPopup(provider).catch(console.error);
  }
}

auth.onAuthStateChanged(updateAuthUI);
