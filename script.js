/**
 * Progetto Teatro — Shared Script
 * Gestisce: sidebar, theme toggle, active link, reveal animations
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ── Theme Toggle ── */
    const root  = document.documentElement;
    const tBtn  = document.getElementById('themeToggle');
    const tIcon = document.getElementById('toggleIcon');
    const tLbl  = document.getElementById('toggleLabel');

    function applyTheme(theme) {
      root.setAttribute('data-theme', theme);
      if (tIcon) tIcon.textContent  = theme === 'light' ? '☀' : '☽';
      if (tLbl)  tLbl.textContent   = theme === 'light' ? 'Scuro' : 'Chiaro';
      localStorage.setItem('pt-theme', theme);
    }

    const saved = localStorage.getItem('pt-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved || (prefersDark ? 'dark' : 'light'));

    if (tBtn) {
      tBtn.addEventListener('click', function () {
        applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
      });
    }

    /* ── Sidebar ── */
    const sidebar        = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarToggle  = document.getElementById('sidebarToggle');
    const sidebarClose   = document.getElementById('sidebarClose');

    function openSidebar() {
      if (!sidebar) return;
      sidebar.classList.add('open');
      sidebarOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeSidebar() {
      if (!sidebar) return;
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (sidebarToggle)  sidebarToggle.addEventListener('click',  openSidebar);
    if (sidebarClose)   sidebarClose.addEventListener('click',   closeSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click',  closeSidebar);

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeSidebar();
    });

    // Close sidebar when a link is clicked
    if (sidebar) {
      sidebar.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeSidebar);
      });
    }

    /* ── Active Nav Link ── */
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.sidebar-nav a').forEach(function (a) {
      if (a.getAttribute('href') === page) a.classList.add('active');
    });

    /* ── Scroll Reveal ── */
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });

  });
})();
