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
    // Always load in DARK, every refresh, on web & mobile. The toggle still
    // switches the theme for the current session, but a reload returns to dark.
    applyTheme("dark");
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

  var scrollTicking = false;
  function updateScroll() {
    scrollTicking = false;
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    if (nav) nav.classList.toggle("is-scrolled", y > 8);
    if (backToTop) backToTop.classList.toggle("is-visible", y > 600);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  }
  function onScroll() { if (!scrollTicking) { scrollTicking = true; requestAnimationFrame(updateScroll); } }
  window.addEventListener("scroll", onScroll, { passive: true });
  updateScroll();

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
        var active = null;
        links.forEach(function (l) {
          var on = l.getAttribute("href") === "#" + id;
          l.classList.toggle("is-active", on);
          if (on) active = l;
        });
        // On the mobile strip, slide the bar so the active header stays visible.
        if (active && navLinks && navLinks.scrollWidth > navLinks.clientWidth + 2) {
          var lr = active.getBoundingClientRect(), cr = navLinks.getBoundingClientRect();
          var target = navLinks.scrollLeft + (lr.left - cr.left) - (cr.width - lr.width) / 2;
          navLinks.scrollTo({ left: target, behavior: prefersReduced ? "auto" : "smooth" });
        }
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
    var vOpen = document.getElementById("viewer-open");
    var lastTrigger = null;
    var imgExt = /\.(jpe?g|png|gif|webp|svg|avif)(\?|#|$)/i;
    // Mobile browsers (iOS Safari, Android Chrome) won't render a PDF inside an
    // <iframe> — they show a blank frame. On touch devices we route PDFs through
    // Google's inline viewer so they display in the overlay like on desktop.
    var isTouch = window.matchMedia("(pointer: coarse)").matches;

    function clearBody() { while (vBody.firstChild) vBody.removeChild(vBody.firstChild); }

    // Local PDFs/images open in this overlay with Open-in-new-tab + Download actions.
    function openViewer(href, title) {
      lastTrigger = document.activeElement;
      clearBody();
      vTitle.textContent = title || "Document";
      vDownload.hidden = false;
      vDownload.href = href;
      vDownload.setAttribute("download", href.split("/").pop().split(/[?#]/)[0]);
      vOpen.href = href;                                 // native full-screen fallback

      if (imgExt.test(href)) {
        var img = document.createElement("img");
        img.src = href; img.alt = title || "Image";
        vBody.appendChild(img);
      } else {
        var frame = document.createElement("iframe");
        frame.src = isTouch
          ? "https://docs.google.com/gview?embedded=true&url=" + encodeURIComponent(href)
          : href;
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

    // Local assets (PDFs/images) open in the overlay viewer. External links
    // open in a NEW TAB — third-party sites (LinkedIn, GitHub, Credly, etc.)
    // block iframe embedding ("refused to connect"), so they can't render in
    // the overlay. In-page anchors and mailto:/tel:/javascript: stay native.
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a) return;
      if (a.closest("#viewer")) return;                 // viewer's own buttons
      var raw = a.getAttribute("href");
      if (!raw || raw.charAt(0) === "#") return;        // in-page anchors
      if (/^(mailto:|tel:|javascript:)/i.test(raw)) return;
      var url = a.href;                                  // resolved absolute
      var isLocal = false;
      try { isLocal = new URL(url).origin === window.location.origin; } catch (err) { isLocal = false; }
      e.preventDefault();
      if (isLocal) {
        var title = (a.textContent || "").replace(/[→↗]/g, "").trim() || a.title || "Document";
        openViewer(url, title);
      } else {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    });

    viewer.addEventListener("click", function (e) {
      if (e.target.hasAttribute("data-viewer-close")) closeViewer();
    });
    document.addEventListener("keydown", function (e) {
      if (viewer.hidden) return;
      if (e.key === "Escape") { closeViewer(); return; }
      if (e.key === "Tab") {                          // keep focus inside the modal (a11y)
        var f = Array.prototype.filter.call(
          viewer.querySelectorAll('a[href],button,iframe,[tabindex]:not([tabindex="-1"])'),
          function (el) { return !el.hidden && el.offsetParent !== null; }
        );
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
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
      { test: /amazon web services|aws/i, type: "img", src: "assets/img/logos/aws_logo.png", alt: "Amazon Web Services", cls: "cert__logo--aws" },
      { test: /skillsoft/i, type: "img", src: "assets/img/logos/skillsoft_logo.png", alt: "Skillsoft" },
      { test: /nvidia/i, type: "txt", label: "NVIDIA" },
      { test: /nielit/i, type: "txt", label: "NIELIT" }
    ];
    document.querySelectorAll(".cert").forEach(function (card) {
      var issuer = card.querySelector(".cert__issuer");
      if (!issuer || card.querySelector(".cert__logo")) return;
      var m = map.find(function (x) { return x.test.test(issuer.textContent); });
      if (!m) return;
      var logo = document.createElement("span");
      logo.className = "cert__logo" + (m.type === "txt" ? " cert__logo--txt" : "") + (m.cls ? " " + m.cls : "");
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

  /* ---------- Career timeline: slow forward, fast rewind, repeat ---------- */
  (function timelineScroll() {
    var sc = document.querySelector(".ctl-scroll");
    var track = sc && sc.querySelector(".ctl");
    if (!sc || !track) return;

    var raf = null, paused = false, resumeT = null, visible = true;
    var dir = 1, holdUntil = 0;

    function ensureRunning() { if (!raf) raf = requestAnimationFrame(loop); }

    function loop() {
      if (!visible) { raf = null; return; }   // stop the rAF chain while off-screen (perf)
      var now = (window.performance && performance.now) ? performance.now() : Date.now();
      if (!paused && now >= holdUntil) {
        var max = sc.scrollWidth - sc.clientWidth;
        if (max > 1) {
          if (dir === 1) {
            // gentle forward scroll; per-frame step capped so it never feels
            // fast on long (mobile) timelines — same calm pace on web & mobile
            sc.scrollLeft += Math.min(1.4, Math.max(0.5, max / 700));
            if (sc.scrollLeft >= max - 0.5) { sc.scrollLeft = max; dir = -1; holdUntil = now + 600; }
          } else {
            // very fast rewind right -> start (~0.4s)
            sc.scrollLeft -= Math.max(12, max / 24);
            if (sc.scrollLeft <= 0.5) { sc.scrollLeft = 0; dir = 1; holdUntil = now + 700; }
          }
        }
      }
      raf = requestAnimationFrame(loop);
    }
    function pauseFor(ms) { paused = true; if (resumeT) clearTimeout(resumeT); resumeT = setTimeout(function () { paused = false; }, ms || 2500); }

    // Run only while the timeline is in view; pause the rAF when scrolled away.
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { visible = en.isIntersecting; if (visible) ensureRunning(); });
      }, { threshold: 0.05 });
      io.observe(sc);
    } else { ensureRunning(); }

    // Keep it going when the pointer enters (per request).
    sc.addEventListener("mouseenter", function () { visible = true; paused = false; ensureRunning(); });

    // Manual drag (mouse/pen) temporarily pauses, then the loop resumes.
    var down = false, startX = 0, startLeft = 0, moved = false;
    sc.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "touch") { pauseFor(4000); return; }
      down = true; moved = false; startX = e.clientX; startLeft = sc.scrollLeft;
      paused = true;
    });
    window.addEventListener("pointermove", function (e) {
      if (!down) return;
      if (Math.abs(e.clientX - startX) > 5) { moved = true; sc.classList.add("is-dragging"); }
      sc.scrollLeft = startLeft - (e.clientX - startX);
    });
    window.addEventListener("pointerup", function () {
      if (down) { down = false; sc.classList.remove("is-dragging"); pauseFor(2500); }
    });
    // Click a timeline card -> jump to that role in Experience (precise offset
    // for the fixed nav) and flash it. A drag must NOT trigger navigation.
    var flashT = null;
    sc.addEventListener("click", function (e) {
      var link = e.target.closest && e.target.closest('a.ctl__card[href^="#"]');
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; return; }
      if (!link) return;
      e.preventDefault();
      var target = document.getElementById(link.getAttribute("href").slice(1));
      if (!target) return;
      var navH = parseFloat(getComputedStyle(docEl).getPropertyValue("--nav-h")) || 64;
      var y = target.getBoundingClientRect().top + (window.pageYOffset || 0) - (navH + 34);
      window.scrollTo({ top: Math.max(0, y), behavior: prefersReduced ? "auto" : "smooth" });
      document.querySelectorAll(".tl.is-flash").forEach(function (el) { el.classList.remove("is-flash"); });
      target.classList.add("is-flash");
      if (flashT) clearTimeout(flashT);
      flashT = setTimeout(function () { target.classList.remove("is-flash"); }, 2200);
    }, true);
  })();

  /* ---------- Flash/pop section cards as they cross the viewport center ---------- */
  (function scrollFlash() {
    if (!("IntersectionObserver" in window)) return;
    var sel = "#experience .tl__card, #skills .skill-group, #certifications .cert," +
              " #awards .award, #education .edu, #publications .pub," +
              " #contact .contact__card, #about .about__lead, #about .about__points";
    var cards = document.querySelectorAll(sel);
    if (!cards.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        en.target.classList.toggle("is-active", en.isIntersecting);
      });
    }, { rootMargin: "-42% 0px -42% 0px", threshold: 0 });
    cards.forEach(function (c) { io.observe(c); });
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
    // Always start collapsed to a slim tab — never auto-open on page load.
    setOpen(false);
    // Click toggles it (works for touch / keyboard).
    btn.addEventListener("click", function () {
      setOpen(ra.classList.contains("is-collapsed"));
    });
    // Desktop pointers: slide open on hover, slide back closed when the mouse
    // leaves (unless the user is actively selecting text inside the panel).
    if (window.matchMedia("(hover: hover)").matches) {
      ra.addEventListener("mouseenter", function () { setOpen(true); });
      ra.addEventListener("mouseleave", function () {
        var sel = window.getSelection && window.getSelection();
        var selectingInside = sel && !sel.isCollapsed && ra.contains(sel.anchorNode);
        if (!selectingInside) setOpen(false);
      });
    }
  })();

  /* ---------- Nav link background icons (flash bigger on hover) ---------- */
  (function navIcons() {
    document.querySelectorAll(".nav__link").forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href || href.charAt(0) !== "#") return;
      var sec = document.querySelector(href);
      var svg = sec && sec.querySelector(".section__ic svg");
      if (!svg) return;
      var ic = document.createElement("span");
      ic.className = "nav__link-ic";
      ic.setAttribute("aria-hidden", "true");
      ic.appendChild(svg.cloneNode(true));
      link.insertBefore(ic, link.firstChild);
    });
  })();

  /* ---------- Section header background watermark icons ---------- */
  (function sectionWatermarks() {
    document.querySelectorAll(".section__title .section__ic svg").forEach(function (svg) {
      var section = svg.closest("section");
      if (!section || section.querySelector(".section__watermark")) return;
      var wm = document.createElement("div");
      wm.className = "section__watermark";
      wm.setAttribute("aria-hidden", "true");
      wm.appendChild(svg.cloneNode(true));
      section.appendChild(wm);
    });

    // Flash the header watermark when its section is centred in the viewport.
    // This drives the effect on touch devices (no hover) and as you scroll.
    var wmSections = document.querySelectorAll(".section");
    if (wmSections.length && "IntersectionObserver" in window) {
      var wmIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          e.target.classList.toggle("is-inview", e.isIntersecting);
        });
      }, { rootMargin: "-35% 0px -35% 0px", threshold: 0 });
      wmSections.forEach(function (s) { wmIO.observe(s); });
    }
  })();

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
