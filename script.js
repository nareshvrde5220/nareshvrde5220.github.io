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

    // Intercept clicks on RELATIVE asset links (local PDFs/images) only.
    // Anything with an explicit scheme (http:, https:, mailto:, tel:) or a
    // protocol-relative // prefix navigates normally. This is origin-independent
    // so it works the same on https and on a local file:// preview.
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a) return;
      if (a.closest("#viewer")) return;                 // viewer's own buttons
      var raw = a.getAttribute("href");
      if (!raw) return;
      if (raw.charAt(0) === "#") return;                // in-page anchors
      if (raw.indexOf("//") === 0) return;              // protocol-relative -> external
      if (/^[a-z][a-z0-9+.\-]*:/i.test(raw)) return;    // has a scheme -> navigate (http/mailto/tel/...)
      e.preventDefault();                                // relative path -> local asset -> overlay
      var url = a.href;                                  // resolved absolute
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

  /* ---------- Live "Present" durations ---------- */
  (function liveDurations() {
    var els = document.querySelectorAll("[data-since]");
    var now = new Date();
    els.forEach(function (el) {
      var s = el.getAttribute("data-since");
      var start = new Date(s + (s.length <= 7 ? "-01" : ""));
      if (isNaN(start)) return;
      var months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
      // Round UP to the next month once any extra days into the current month have elapsed.
      if (now.getDate() > start.getDate()) months += 1;
      if (months < 0) months = 0;
      var yrs = Math.floor(months / 12), mos = months % 12, parts = [];
      if (yrs) parts.push(yrs + " yr" + (yrs > 1 ? "s" : ""));
      parts.push((mos || !yrs ? mos : 0) + " mos");
      el.textContent = el.textContent + " · " + parts.join(" ");
    });
  })();

  /* ---------- Certification issuer logos ---------- */
  (function certLogos() {
    var map = [
      { test: /amazon web services|aws/i, type: "img", src: "assets/img/logos/aws.png", alt: "Amazon Web Services" },
      { test: /skillsoft/i, type: "img", src: "assets/img/logos/skillsoft.png", alt: "Skillsoft" },
      { test: /nvidia/i, type: "txt", label: "NVIDIA" },
      { test: /nielit/i, type: "txt", label: "NIELIT" }
    ];
    document.querySelectorAll(".cert").forEach(function (card) {
      var issuer = card.querySelector(".cert__issuer");
      if (!issuer || card.querySelector(".cert__logo")) return;
      var m = map.find(function (x) { return x.test.test(issuer.textContent); });
      if (!m) return;
      var logo = document.createElement("span");
      logo.className = "cert__logo" + (m.type === "txt" ? " cert__logo--txt" : "");
      if (m.type === "img") {
        var img = document.createElement("img");
        img.src = m.src; img.alt = m.alt; img.loading = "lazy";
        logo.appendChild(img);
      } else {
        logo.textContent = m.label;
      }
      // Place the logo at the end of the certificate title.
      var nameEl = card.querySelector(".cert__name");
      if (nameEl) nameEl.appendChild(logo); else card.insertBefore(logo, card.firstChild);
    });
  })();

  /* ---------- Career timeline stagger ---------- */
  (function ctlStagger() {
    document.querySelectorAll(".ctl__item").forEach(function (item, i) {
      item.style.setProperty("--i", i);
    });
  })();

  /* ---------- Floating Recent Activities panel ---------- */
  (function recentActivities() {
    var ra = document.getElementById("recent-activities");
    var btn = document.getElementById("ra-toggle");
    if (!ra || !btn) return;
    function setOpen(open) {
      ra.classList.toggle("is-collapsed", !open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    }
    // Expanded by default on wider viewports; collapsed on small screens.
    setOpen(window.innerWidth >= 980);
    btn.addEventListener("click", function () {
      setOpen(ra.classList.contains("is-collapsed"));
    });
  })();

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
