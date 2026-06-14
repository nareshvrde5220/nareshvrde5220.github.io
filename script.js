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

  /* ---------- In-page viewer (overlay) ---------- */
  var viewer = document.getElementById("viewer");
  if (viewer) {
    var vBody = document.getElementById("viewer-body");
    var vTitle = document.getElementById("viewer-title");
    var vDownload = document.getElementById("viewer-download");
    var lastTrigger = null;
    var imgExt = /\.(jpe?g|png|gif|webp|svg|avif)(\?|#|$)/i;

    function clearBody() { while (vBody.firstChild) vBody.removeChild(vBody.firstChild); }

    // Only local assets (PDFs/images) open here; external links navigate directly.
    function openViewer(href, title) {
      lastTrigger = document.activeElement;
      clearBody();
      vTitle.textContent = title || "Document";
      vDownload.href = href;
      vDownload.setAttribute("download", href.split("/").pop().split(/[?#]/)[0]);

      if (imgExt.test(href)) {
        var img = document.createElement("img");
        img.src = href; img.alt = title || "Image";
        vBody.appendChild(img);
      } else {
        var frame = document.createElement("iframe");
        frame.src = href;
        frame.title = title || "Embedded document";
        frame.setAttribute("loading", "eager");
        vBody.appendChild(frame);
      }

      viewer.hidden = false;
      document.body.classList.add("viewer-open");
      vDownload.focus();
    }

    function closeViewer() {
      viewer.hidden = true;
      document.body.classList.remove("viewer-open");
      clearBody();
      if (lastTrigger && lastTrigger.focus) lastTrigger.focus();
    }

    // Intercept eligible anchor clicks anywhere in the page
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a) return;
      if (a.closest("#viewer")) return;                 // viewer's own buttons
      var raw = a.getAttribute("href");
      if (!raw || raw.charAt(0) === "#") return;        // in-page anchors
      if (/^(mailto:|tel:|javascript:)/i.test(raw)) return;
      var url = a.href;                                  // resolved absolute
      var isLocal = false;
      try { isLocal = new URL(url).origin === window.location.origin; } catch (err) { return; }
      if (!isLocal) return;                              // external links navigate directly
      e.preventDefault();
      var title = (a.textContent || "").replace(/[→↗]/g, "").trim() || a.title || "Document";
      openViewer(url, title);
    });

    viewer.addEventListener("click", function (e) {
      if (e.target.hasAttribute("data-viewer-close")) closeViewer();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !viewer.hidden) closeViewer();
    });
  }

  /* ---------- Stat count-up ---------- */
  var stats = Array.prototype.slice.call(document.querySelectorAll(".stat__num[data-count]"));
  function runCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    if (prefersReduced) { el.textContent = target + suffix; return; }
    var start = null, dur = 1100;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (stats.length) {
    if (!("IntersectionObserver" in window)) {
      stats.forEach(runCount);
    } else {
      var countObs = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { runCount(entry.target); obs.unobserve(entry.target); }
        });
      }, { threshold: 0.5 });
      stats.forEach(function (s) { countObs.observe(s); });
    }
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
