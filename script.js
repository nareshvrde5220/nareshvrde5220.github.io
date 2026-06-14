/* ============================================================
   Jampala Naresh — Portfolio  |  Interaction layer
   M1 scaffold: theme toggle, mobile menu, scrollspy,
   scroll progress, back-to-top, reveal-on-scroll.
   ============================================================ */
(function () {
  "use strict";

  var docEl = document.documentElement;
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Theme (persisted) ---------- */
  var THEME_KEY = "jn-theme";
  var toggle = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    docEl.setAttribute("data-theme", theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  }
  (function initTheme() {
    var saved;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
    if (saved) {
      applyTheme(saved);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      applyTheme("light");
    }
  })();
  if (toggle) {
    toggle.addEventListener("click", function () {
      applyTheme(docEl.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }

  /* ---------- Mobile menu ---------- */
  var hamburger = document.getElementById("nav-hamburger");
  var navLinks = document.getElementById("nav-links");

  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove("is-open");
    if (hamburger) {
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.setAttribute("aria-label", "Open menu");
    }
  }
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      hamburger.setAttribute("aria-expanded", open ? "true" : "false");
      hamburger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.closest(".nav__link")) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- Nav: scrolled state + scroll progress ---------- */
  var nav = document.getElementById("nav");
  var progress = document.getElementById("nav-progress");
  var backToTop = document.getElementById("back-to-top");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle("is-scrolled", y > 8);
    if (backToTop) backToTop.classList.toggle("is-visible", y > 600);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    });
  }

  /* ---------- Scrollspy (active nav link) ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
  var sections = links
    .map(function (l) { return document.querySelector(l.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        links.forEach(function (l) {
          l.classList.toggle("is-active", l.getAttribute("href") === "#" + id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
