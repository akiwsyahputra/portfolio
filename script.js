/* ===========================================
   script.js — Portofolio Fullstack Developer
   Isi:
   1. Custom Cursor
   2. Navbar scroll effect
   3. Scroll Reveal Animation
=========================================== */


/* ==========================================
   1. CUSTOM CURSOR
   Menggantikan cursor default browser dengan
   dua elemen: titik kecil + lingkaran luar
========================================== */

// Ambil elemen cursor dari HTML
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

// Posisi mouse saat ini
let mouseX = 0;
let mouseY = 0;

// Posisi lingkaran (bergerak lambat mengikuti mouse)
let ringX = 0;
let ringY = 0;

// Update posisi titik cursor langsung mengikuti mouse
document.addEventListener('mousemove', function(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;

  // Titik kecil langsung pindah ke posisi mouse
  cursor.style.left = mouseX - 5 + 'px';
  cursor.style.top  = mouseY - 5 + 'px';
});

// Lingkaran bergerak lambat mengikuti mouse (efek lag)
function animateRing() {
  // Interpolasi: geser 12% jarak menuju posisi mouse setiap frame
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;

  cursorRing.style.left = ringX - 18 + 'px';
  cursorRing.style.top  = ringY - 18 + 'px';

  // Jalankan terus setiap frame
  requestAnimationFrame(animateRing);
}

// Mulai animasi lingkaran
animateRing();

// Efek cursor membesar saat hover di atas link/tombol
document.querySelectorAll('a, button').forEach(function(element) {
  element.addEventListener('mouseenter', function() {
    cursor.style.transform     = 'scale(2.5)';
    cursorRing.style.transform = 'scale(1.5)';
  });

  element.addEventListener('mouseleave', function() {
    cursor.style.transform     = 'scale(1)';
    cursorRing.style.transform = 'scale(1)';
  });
});


/* ==========================================
   2. NAVBAR SCROLL EFFECT
   Tambahkan border bawah navbar saat user scroll
========================================== */

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
  // Jika sudah scroll lebih dari 50px, tambah class 'scrolled'
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


/* ==========================================
   3. SCROLL REVEAL ANIMATION
   Elemen dengan class .reveal akan muncul
   saat masuk viewport saat di-scroll
========================================== */

// Ambil semua elemen yang perlu di-reveal
const revealElements = document.querySelectorAll('.reveal');

// IntersectionObserver: pantau kapan elemen masuk layar
const revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry, index) {

    // Jika elemen sudah masuk viewport
    if (entry.isIntersecting) {

      // Tambahkan delay bertahap agar animasi berurutan (stagger)
      setTimeout(function() {
        entry.target.classList.add('visible');
      }, index * 80); // setiap elemen delay 80ms lebih lama

    }
  });
}, {
  threshold: 0.1 // trigger saat 10% elemen terlihat
});

// Daftarkan semua elemen ke observer
revealElements.forEach(function(element) {
  revealObserver.observe(element);
});
