// ================= TYPING EFFECT =================
const text = [
  "IT Infrastructure Engineer",
  "Linux & Network Specialist",
  "Cyber Security Professional"
];
let count = 0, index = 0, currentText = "", letter = "";
(function type() {
  if (count === text.length) { count = 0; }
  currentText = text[count];
  letter = currentText.slice(0, ++index);
  document.querySelector(".typing").textContent = letter;
  if (letter.length === currentText.length) {
    count++; index = 0; setTimeout(type, 1500);
  } else { setTimeout(type, 100); }
})();

// ================= SCROLL REVEAL =================
document.querySelectorAll(".reveal").forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(50px)";
  el.style.transition = "all 1s ease";
});
window.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }
  });
});

// ================= SECTION OVERLAY =================
const sectionMeta = {
  '#about':    { icon: '<i class="fa-solid fa-user"></i>',           title: 'About <span class="ov-grad-text">Me</span>',            subtitle: 'IT Infrastructure Engineer',         badge: '' },
  '#skills':   { icon: '<i class="fa-solid fa-graduation-cap"></i>', title: 'Technical <span class="ov-grad-text">Courses</span>',   subtitle: '8 Professional Courses · All Levels', badge: '<i class="fa-solid fa-layer-group"></i> 8 Courses' },
  '#projects': { icon: '<i class="fa-solid fa-diagram-project"></i>',title: 'Major <span class="ov-grad-text">Projects</span>',      subtitle: 'Real-world Infrastructure Projects',  badge: '' },
  '#contact':  { icon: '<i class="fa-solid fa-envelope"></i>',       title: 'Contact <span class="ov-grad-text">Me</span>',          subtitle: 'Get in touch',                        badge: '' }
};

function openSection(sectionId) {
  const section = document.querySelector(sectionId);
  document.getElementById("overlayBody").innerHTML = section.innerHTML;

  const meta = sectionMeta[sectionId] || {};
  document.getElementById("overlayIcon").innerHTML     = meta.icon     || '';
  document.getElementById("overlayTitle").innerHTML    = meta.title    || '';
  document.getElementById("overlaySubtitle").innerHTML = meta.subtitle || '';
  document.getElementById("overlayBadge").innerHTML    = meta.badge    || '';

  const badgeEl = document.getElementById("overlayBadge");
  badgeEl.innerHTML = meta.badge || '';
  badgeEl.style.display = meta.badge ? '' : 'none';

  document.querySelectorAll("#overlayBody .reveal").forEach(el => {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
    el.style.transition = "none";
  });
  document.getElementById("overlayBody").style.opacity = "1";
  document.getElementById("overlayBody").style.transform = "none";

  document.getElementById("sectionOverlay").style.display = "block";
  document.getElementById("sectionOverlay").setAttribute("data-section", sectionId.replace('#', ''));
   document.documentElement.style.overflow = "hidden";
   document.body.style.overflow = "hidden";

}

function closeSection() {
  document.getElementById("sectionOverlay").style.display = "none";
    document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
}
document.addEventListener("keydown", e => { if (e.key === "Escape") closeSection(); });
document.getElementById("sectionOverlay")?.addEventListener("click", e => {
  if (e.target.id === "sectionOverlay") closeSection();
});

// ================= INDIVIDUAL COURSE MODALS =================
function openLinuxCourse() {
  document.getElementById("linux-course").style.display = "block";
   document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
}
function openCCNACourse() {
  document.getElementById("ccna-course").style.display = "block";
    document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
}
function openWindowsCourse() {
  document.getElementById("windows-course").style.display = "block";
    document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
}
function openCyberCourse() {
  document.getElementById("cyber-course").style.display = "block";
    document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
}
function closeLinuxCourse() {
  document.querySelectorAll(".linux-course-section").forEach(sec => sec.style.display = "none");
  if (document.getElementById("sectionOverlay").style.display !== "block") {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }
}

// the 4 course Ai, Python, Programming Fundamentals, Web Development
function openAICourse(){
  document.getElementById("ai-course").style.display="block";
    document.documentElement.style.overflow="hidden";
  document.body.style.overflow="hidden";
}

function openPythonCourse(){
  document.getElementById("python-course").style.display="block";
   document.documentElement.style.overflow="hidden";
  document.body.style.overflow="hidden";
}

function openProgrammingCourse(){
  document.getElementById("programming-course").style.display="block";
   document.documentElement.style.overflow="hidden";
  document.body.style.overflow="hidden";
}

function openWebCourse(){
  document.getElementById("web-course").style.display="block";
   document.documentElement.style.overflow="hidden";
  document.body.style.overflow="hidden";
}









// ================= AUTH SYSTEM =================
let pendingCourse = null;

function openCourseWithAuth(courseFn) {
  const user = JSON.parse(localStorage.getItem('zain_user'));
  if (user && user.loggedIn) {
    courseFn();
  } else {
    pendingCourse = courseFn;
    showAuthModal('login');
  }
}

function showAuthModal(tab) {
  document.getElementById('authModal').style.display = 'flex';
    document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  switchAuthTab(tab || 'login');
}

function hideAuthModal() {
  document.getElementById('authModal').style.display = 'none';
  if (document.getElementById('sectionOverlay').style.display !== 'block') {
      document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }
  document.getElementById('registerForm').reset();
  document.getElementById('loginForm').reset();
  document.getElementById('authRegisterMsg').textContent = '';
  document.getElementById('authLoginMsg').textContent = '';
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form-panel').forEach(p => p.style.display = 'none');
  document.querySelector(`.auth-tab[data-tab="${tab}"]`).classList.add('active');
  document.getElementById(`${tab}Panel`).style.display = 'block';
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const pass = document.getElementById('regPass').value;
  const confirm = document.getElementById('regConfirm').value;
  const msg = document.getElementById('authRegisterMsg');
  if (!name || !email || !pass || !confirm) {
    msg.style.color = '#f87171'; msg.textContent = 'Please fill in all fields.'; return;
  }
  if (pass.length < 6) {
    msg.style.color = '#f87171'; msg.textContent = 'Password must be at least 6 characters.'; return;
  }
  if (pass !== confirm) {
    msg.style.color = '#f87171'; msg.textContent = 'Passwords do not match.'; return;
  }
  const users = JSON.parse(localStorage.getItem('zain_users') || '[]');
  if (users.find(u => u.email === email)) {
    msg.style.color = '#f87171'; msg.textContent = 'An account with this email already exists.'; return;
  }
  users.push({ name, email, pass });
  localStorage.setItem('zain_users', JSON.stringify(users));
  localStorage.setItem('zain_user', JSON.stringify({ name, email, loggedIn: true }));
  msg.style.color = '#4ade80';
  msg.textContent = `Welcome, ${name}! Account created successfully.`;
  updateAuthNav();
  setTimeout(() => { hideAuthModal(); if (pendingCourse) { pendingCourse(); pendingCourse = null; } }, 1200);
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const pass = document.getElementById('loginPass').value;
  const msg = document.getElementById('authLoginMsg');
  if (!email || !pass) {
    msg.style.color = '#f87171'; msg.textContent = 'Please enter email and password.'; return;
  }
  const users = JSON.parse(localStorage.getItem('zain_users') || '[]');
  const user = users.find(u => u.email === email && u.pass === pass);
  if (!user) {
    msg.style.color = '#f87171'; msg.textContent = 'Invalid email or password.'; return;
  }
  localStorage.setItem('zain_user', JSON.stringify({ name: user.name, email, loggedIn: true }));
  msg.style.color = '#4ade80';
  msg.textContent = `Welcome back, ${user.name}!`;
  updateAuthNav();
  setTimeout(() => { hideAuthModal(); if (pendingCourse) { pendingCourse(); pendingCourse = null; } }, 1000);
}

function logoutUser() {
  localStorage.removeItem('zain_user');
  updateAuthNav();
}

function updateAuthNav() {
  const user = JSON.parse(localStorage.getItem('zain_user'));
  const navAuth = document.getElementById('navAuth');
  if (!navAuth) return;
  if (user && user.loggedIn) {
    navAuth.innerHTML = `<span class="nav-user"><i class="fa-solid fa-circle-user"></i> ${user.name}</span>&nbsp;<a href="javascript:void(0)" onclick="logoutUser()" class="nav-logout">Logout</a>`;
  } else {
    navAuth.innerHTML = `<a href="javascript:void(0)" onclick="showAuthModal('login')" class="nav-login-btn"><i class="fa-solid fa-right-to-bracket"></i> Login</a>`;
  }
}
document.addEventListener('DOMContentLoaded', updateAuthNav);

// ================= HAMBURGER MENU Responsive=================
function toggleNav() {
  const navList = document.getElementById('navList');
  const hamburger = document.getElementById('hamburger');
  navList.classList.toggle('nav-open');
  hamburger.classList.toggle('active');
  document.body.style.overflow = navList.classList.contains('nav-open') ? 'hidden' : '';
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('#navList a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('navList').classList.remove('nav-open');
      document.getElementById('hamburger').classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  document.addEventListener('click', function (e) {
    const navList = document.getElementById('navList');
    const hamburger = document.getElementById('hamburger');
    if (navList.classList.contains('nav-open') &&
        !navList.contains(e.target) &&
        !hamburger.contains(e.target)) {
      navList.classList.remove('nav-open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});