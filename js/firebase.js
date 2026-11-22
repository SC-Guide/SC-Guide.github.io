// ============================================================
// firebase.js — Guest-first Firebase Authentication MVP
// Guests can use the planner locally. Authentication is optional.
// Cloud sync is intentionally not enabled until Firestore rules
// and the user-data migration flow are implemented.
// ============================================================

(() => {
  if (!window.firebase) {
    console.error('[SkinCare Guide] Firebase SDK did not load.');
    return;
  }

  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: "AIzaSyD69IYM5HhxA3taphALXVlGZs5llkNYRQ",
      authDomain: "skincare-guide-e6fcb.firebaseapp.com",
      projectId: "skincare-guide-e6fcb",
      storageBucket: "skincare-guide-e6fcb.firebasestorage.app",
      messagingSenderId: "192131587322",
      appId: "1:192131587322:web:d1f5ec2919cbd41fe13d43",
      measurementId: "G-1P31KHWCVN"
    });
  }

  const auth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  let authMode = 'signin';

  const copy = {
    en: {
      signIn: 'Sign in', create: 'Create account', guest: 'Continue as guest',
      google: 'Continue with Google', email: 'Email address', password: 'Password',
      confirm: 'Create account', submit: 'Sign in', forgot: 'Forgot password?',
      switchCreate: 'New here? Create an account', switchSignIn: 'Already have an account? Sign in',
      resetSent: 'Password reset email sent. Check your inbox.',
      resetPrompt: 'Enter your email address first, then choose “Forgot password?”.',
      guestNote: 'You can use SkinCare Guide without an account. Your guest data stays in this browser.',
      accountNote: 'Sign in to access your account. Cloud sync will be enabled after the secure database setup.',
      googleError: 'Google sign-in could not be completed. Please try again.',
      emailInUse: 'This email is already registered. Try signing in instead.',
      invalidEmail: 'Please enter a valid email address.',
      weakPassword: 'Choose a password with at least 6 characters.',
      wrongPassword: 'Email or password is incorrect.',
      userNotFound: 'No account was found with this email.',
      tooMany: 'Too many attempts. Please wait and try again.',
      network: 'Network error. Check your connection and try again.',
      generic: 'Something went wrong. Please try again.',
      signOut: 'Sign out', account: 'Account', close: 'Close'
    },
    ru: {
      signIn: 'Войти', create: 'Создать аккаунт', guest: 'Продолжить без аккаунта',
      google: 'Продолжить с Google', email: 'Электронная почта', password: 'Пароль',
      confirm: 'Создать аккаунт', submit: 'Войти', forgot: 'Забыли пароль?',
      switchCreate: 'Впервые здесь? Создать аккаунт', switchSignIn: 'Уже есть аккаунт? Войти',
      resetSent: 'Письмо для сброса пароля отправлено. Проверьте почту.',
      resetPrompt: 'Сначала введите email, затем нажмите «Забыли пароль?».',
      guestNote: 'SkinCare Guide можно использовать без аккаунта. Гостевые данные остаются в этом браузере.',
      accountNote: 'Войдите, чтобы открыть аккаунт. Облачная синхронизация появится после настройки защищённой базы.',
      googleError: 'Не удалось войти через Google. Попробуйте ещё раз.',
      emailInUse: 'Этот email уже зарегистрирован. Попробуйте войти.',
      invalidEmail: 'Введите корректный email.',
      weakPassword: 'Пароль должен содержать не менее 6 символов.',
      wrongPassword: 'Неверный email или пароль.',
      userNotFound: 'Аккаунт с таким email не найден.',
      tooMany: 'Слишком много попыток. Подождите и попробуйте снова.',
      network: 'Ошибка сети. Проверьте подключение.',
      generic: 'Что-то пошло не так. Попробуйте ещё раз.',
      signOut: 'Выйти', account: 'Аккаунт', close: 'Закрыть'
    }
  };

  const lang = () => (localStorage.getItem('lang') === 'ru' ? 'ru' : 'en');
  const t = key => copy[lang()][key] || copy.en[key] || key;
  const authBtn = document.getElementById('authBtn');
  let logoutBtn = document.getElementById('logoutBtn');

  function ensureLogoutButton() {
    if (logoutBtn || !authBtn) return;
    logoutBtn = document.createElement('button');
    logoutBtn.type = 'button';
    logoutBtn.id = 'logoutBtn';
    logoutBtn.className = 'pill-toggle';
    logoutBtn.hidden = true;
    authBtn.insertAdjacentElement('afterend', logoutBtn);
  }

  function ensureModal() {
    if (document.getElementById('sgAuthOverlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'sgAuthOverlay';
    overlay.className = 'sg-auth-overlay';
    overlay.hidden = true;
    overlay.innerHTML = `
      <section class="sg-auth-dialog" role="dialog" aria-modal="true" aria-labelledby="sgAuthTitle">
        <button class="sg-auth-close" type="button" id="sgAuthClose" aria-label="Close">×</button>
        <p class="sg-auth-eyebrow">SKINCARE GUIDE</p>
        <h2 id="sgAuthTitle"></h2>
        <p class="sg-auth-note" id="sgAuthNote"></p>
        <button class="sg-auth-google" type="button" id="sgGoogleBtn"></button>
        <div class="sg-auth-divider"><span>OR</span></div>
        <form id="sgAuthForm" novalidate>
          <label for="sgAuthEmail" id="sgEmailLabel"></label>
          <input id="sgAuthEmail" name="email" type="email" autocomplete="email" required>
          <label for="sgAuthPassword" id="sgPasswordLabel"></label>
          <input id="sgAuthPassword" name="password" type="password" autocomplete="current-password" minlength="6" required>
          <button class="sg-auth-submit" id="sgAuthSubmit" type="submit"></button>
        </form>
        <button class="sg-auth-link" id="sgForgotBtn" type="button"></button>
        <button class="sg-auth-link" id="sgAuthSwitch" type="button"></button>
        <p class="sg-auth-message" id="sgAuthMessage" role="status" aria-live="polite"></p>
        <button class="sg-auth-guest" id="sgGuestBtn" type="button"></button>
      </section>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', event => {
      if (event.target === overlay) closeModal();
    });
    document.getElementById('sgAuthClose').addEventListener('click', closeModal);
    document.getElementById('sgGuestBtn').addEventListener('click', closeModal);
    document.getElementById('sgAuthSwitch').addEventListener('click', () => {
      authMode = authMode === 'signin' ? 'signup' : 'signin';
      renderModal();
    });
    document.getElementById('sgGoogleBtn').addEventListener('click', signInWithGoogle);
    document.getElementById('sgForgotBtn').addEventListener('click', resetPassword);
    document.getElementById('sgAuthForm').addEventListener('submit', submitEmailAuth);
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeModal();
    });
  }

  function renderModal() {
    const title = document.getElementById('sgAuthTitle');
    if (!title) return;
    const isSignup = authMode === 'signup';
    title.textContent = isSignup ? t('create') : t('signIn');
    document.getElementById('sgAuthNote').textContent = t('accountNote');
    document.getElementById('sgGoogleBtn').textContent = t('google');
    document.getElementById('sgEmailLabel').textContent = t('email');
    document.getElementById('sgPasswordLabel').textContent = t('password');
    document.getElementById('sgAuthPassword').autocomplete = isSignup ? 'new-password' : 'current-password';
    document.getElementById('sgAuthSubmit').textContent = isSignup ? t('confirm') : t('submit');
    document.getElementById('sgForgotBtn').textContent = t('forgot');
    document.getElementById('sgForgotBtn').hidden = isSignup;
    document.getElementById('sgAuthSwitch').textContent = isSignup ? t('switchSignIn') : t('switchCreate');
    document.getElementById('sgGuestBtn').textContent = t('guest');
    document.getElementById('sgAuthMessage').textContent = '';
  }

  function openModal() {
    ensureModal();
    authMode = 'signin';
    renderModal();
    const overlay = document.getElementById('sgAuthOverlay');
    overlay.hidden = false;
    document.body.classList.add('sg-auth-open');
    document.getElementById('sgAuthEmail').focus();
  }

  function closeModal() {
    const overlay = document.getElementById('sgAuthOverlay');
    if (overlay) overlay.hidden = true;
    document.body.classList.remove('sg-auth-open');
  }

  function setMessage(message, isError = false) {
    const el = document.getElementById('sgAuthMessage');
    if (!el) return;
    el.textContent = message;
    el.classList.toggle('is-error', isError);
  }

  function friendlyError(error) {
    const map = {
      'auth/email-already-in-use': 'emailInUse',
      'auth/invalid-email': 'invalidEmail',
      'auth/weak-password': 'weakPassword',
      'auth/wrong-password': 'wrongPassword',
      'auth/invalid-credential': 'wrongPassword',
      'auth/user-not-found': 'userNotFound',
      'auth/too-many-requests': 'tooMany',
      'auth/network-request-failed': 'network',
      'auth/popup-blocked': 'googleError',
      'auth/popup-closed-by-user': 'googleError'
    };
    return t(map[error.code] || 'generic');
  }

  async function signInWithGoogle() {
    const button = document.getElementById('sgGoogleBtn');
    button.disabled = true;
    setMessage('');
    try {
      await auth.signInWithPopup(googleProvider);
      closeModal();
    } catch (error) {
      setMessage(friendlyError(error), true);
    } finally {
      button.disabled = false;
    }
  }

  async function submitEmailAuth(event) {
    event.preventDefault();
    const email = document.getElementById('sgAuthEmail').value.trim();
    const password = document.getElementById('sgAuthPassword').value;
    const button = document.getElementById('sgAuthSubmit');
    if (!email || !password) {
      setMessage(t('generic'), true);
      return;
    }
    button.disabled = true;
    setMessage('');
    try {
      if (authMode === 'signup') {
        await auth.createUserWithEmailAndPassword(email, password);
      } else {
        await auth.signInWithEmailAndPassword(email, password);
      }
      closeModal();
    } catch (error) {
      setMessage(friendlyError(error), true);
    } finally {
      button.disabled = false;
    }
  }

  async function resetPassword() {
    const email = document.getElementById('sgAuthEmail').value.trim();
    if (!email) {
      setMessage(t('resetPrompt'), true);
      document.getElementById('sgAuthEmail').focus();
      return;
    }
    try {
      await auth.sendPasswordResetEmail(email);
      setMessage(t('resetSent'));
    } catch (error) {
      setMessage(friendlyError(error), true);
    }
  }

  function updateAuthUI(user) {
    ensureLogoutButton();
    if (authBtn) {
      authBtn.textContent = user ? (user.displayName || user.email || t('account')) : t('signIn');
      authBtn.setAttribute('aria-label', user ? t('account') : t('signIn'));
      authBtn.onclick = user ? null : openModal;
      authBtn.hidden = false;
    }
    if (logoutBtn) {
      logoutBtn.textContent = t('signOut');
      logoutBtn.hidden = !user;
      // Existing markup on some pages has inline display:none; override it
      // explicitly so the button becomes visible after a successful sign-in.
      logoutBtn.style.display = user ? 'inline-flex' : 'none';
      logoutBtn.onclick = () => auth.signOut().catch(error => console.error('[SkinCare Guide] Sign out failed', error));
    }
    window.dispatchEvent(new CustomEvent('skinguide:auth-state', {
      detail: { user: user ? { uid: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL } : null }
    }));
  }

  ensureLogoutButton();
  if (authBtn) ensureModal();
  auth.onAuthStateChanged(updateAuthUI, error => console.error('[SkinCare Guide] Auth state error', error));
  window.addEventListener('skinguide:language-changed', () => {
    if (authBtn) authBtn.textContent = auth.currentUser ? (auth.currentUser.displayName || auth.currentUser.email || t('account')) : t('signIn');
    if (logoutBtn) logoutBtn.textContent = t('signOut');
    if (document.getElementById('sgAuthOverlay') && !document.getElementById('sgAuthOverlay').hidden) renderModal();
  });

  window.SkinCareGuideAuth = {
    getCurrentUser: () => auth.currentUser,
    openSignIn: openModal,
    signOut: () => auth.signOut(),
    onAuthStateChanged: callback => auth.onAuthStateChanged(callback)
  };
})();
