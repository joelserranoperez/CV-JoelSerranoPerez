/* =========================================================
   Joel Serrano Pérez · Portfolio
   Pinta todas las secciones a partir de window.CONTENT (content.js),
   gestiona idioma y tema, y añade las animaciones.
   ========================================================= */
(function () {
  "use strict";

  var C = window.CONTENT;
  var root = document.documentElement;
  var lang = root.getAttribute("lang") === "en" ? "en" : "es";
  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var PAGE = document.body.getAttribute("data-page") || "home"; // "home" | "project"
  var HOME = PAGE === "home" ? "" : "index.html";
  var NAV = ["home", "about", "experience", "projects", "stack", "education", "contact"];

  /* ---------- utilidades ---------- */
  function $(id) { return document.getElementById(id); }
  function t(v) {
    if (v == null) return "";
    if (typeof v === "object" && !Array.isArray(v)) return v[lang] != null ? v[lang] : (v.es != null ? v.es : "");
    return String(v);
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function tx(v) { return esc(t(v)); }
  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* modo privado */ } }
  function fmtDate(ym) {
    if (!ym) return t(C.ui.present);
    var p = String(ym).split("-");
    if (p.length < 2) return p[0];
    var d = new Date(Number(p[0]), Number(p[1]) - 1, 1);
    return d.toLocaleDateString(lang === "es" ? "es-ES" : "en-GB", { month: "short", year: "numeric" }).replace(".", "");
  }
  function duration(start, end) {
    var a = String(start).split("-"), b = end ? String(end).split("-") : null;
    var now = new Date();
    var y2 = b ? Number(b[0]) : now.getFullYear(), m2 = b ? Number(b[1] || 12) : now.getMonth() + 1;
    var months = (y2 - Number(a[0])) * 12 + (m2 - Number(a[1] || 1)) + 1;
    var y = Math.floor(months / 12), m = months % 12, out = [];
    if (y) out.push(y + (lang === "es" ? (y === 1 ? " año" : " años") : (y === 1 ? " yr" : " yrs")));
    if (m) out.push(m + (lang === "es" ? (m === 1 ? " mes" : " meses") : (m === 1 ? " mo" : " mos")));
    return out.join(" ");
  }

  /* ---------- logos de tecnologías (devicon) ---------- */
  var DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/";
  // "nombre en minúsculas": "carpeta/archivo.svg" (+ "|invert" si es negro y hay que aclararlo en modo oscuro)
  var LOGOS = {
    "java": "java/java-original.svg",
    "spring": "spring/spring-original.svg",
    "spring boot": "spring/spring-original.svg",
    "spring security": "spring/spring-original.svg",
    "spring/canigó": "spring/spring-original.svg",
    "angular": "angular/angular-original.svg",
    "typescript": "typescript/typescript-original.svg",
    "oracle": "oracle/oracle-original.svg",
    "oracle sql": "oracle/oracle-original.svg",
    "postgresql": "postgresql/postgresql-original.svg",
    "postgresql/postgis": "postgresql/postgresql-original.svg",
    "hibernate": "hibernate/hibernate-original.svg",
    "maven": "maven/maven-original.svg",
    "docker": "docker/docker-original.svg",
    "azure devops": "azuredevops/azuredevops-original.svg",
    "azure": "azure/azure-original.svg",
    "git": "git/git-original.svg",
    "junit": "junit/junit-original.svg",
    "tomcat": "tomcat/tomcat-original.svg",
    "jira": "jira/jira-original.svg",
    "python": "python/python-original.svg",
    "mariadb": "mariadb/mariadb-original.svg",
    "sql server": "microsoftsqlserver/microsoftsqlserver-original.svg",
    "c#": "csharp/csharp-original.svg",
    ".net/c#": "dotnetcore/dotnetcore-original.svg",
    "vb.net": "dot-net/dot-net-original.svg",
    "salesforce": "salesforce/salesforce-original.svg",
    "next.js": "nextjs/nextjs-original.svg|invert",
    "react": "react/react-original.svg",
    "vitest": "vitest/vitest-original.svg",
  };
  function logo(name) {
    var key = String(name).toLowerCase().replace(/\s+\d+(\/\d+)?$/, "");
    var v = LOGOS[key];
    if (!v) return '<span class="tl tl-mono" aria-hidden="true">' + esc(String(name).replace(/[^A-Za-z#+.]/g, "").slice(0, 2)) + "</span>";
    var parts = v.split("|");
    return '<img class="tl' + (parts[1] ? " tl-invert" : "") + '" src="' + DEVICON + parts[0] + '" alt="" width="20" height="20" loading="lazy" decoding="async" />';
  }

  /* ---------- iconos (trazo 24x24) ---------- */
  function svg(d) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + d + "</svg>"; }
  var ICON = {
    arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    back: svg('<path d="M19 12H5M11 18l-6-6 6-6"/>'),
    up: svg('<path d="M12 19V5M6 11l6-6 6 6"/>'),
    download: svg('<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'),
    mail: svg('<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/>'),
    github: svg('<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>'),
    linkedin: svg('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>'),
    copy: svg('<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/>'),
    tick: svg('<path d="m5 12.5 4.5 4.5L19 7.5"/>'),
    pin: svg('<path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'),
    external: svg('<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>'),
    globe: svg('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'),
    server: svg('<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/>'),
    db: svg('<ellipse cx="12" cy="5.5" rx="7.5" ry="2.8"/><path d="M4.5 5.5v13c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-13M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8"/>'),
    ws: svg('<path d="M8 6 3 12l5 6M16 6l5 6-5 6M13.5 4l-3 16"/>'),
    screen: svg('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>'),
    cart: svg('<path d="M3 4h2l2.4 11h10.2L20 8H6.2"/><circle cx="9" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/>'),
    store: svg('<path d="M4 9.5 5.5 4h13L20 9.5M4 9.5h16M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0M5.5 12v8h13v-8M10 20v-4.5h4V20"/>'),
    cap: svg('<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c0 1.2 2.7 3 6 3s6-1.8 6-3v-5M22 9v6"/>'),
    lang: svg('<path d="M4 5h9M8.5 3v2M6 5c.5 3.5 3 6.5 6 8M11 5c-.8 4-3.3 7-7 9M13 21l4.5-10L22 21M14.5 17.5h6"/>'),
    star: svg('<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'),
    left: svg('<path d="m15 6-6 6 6 6"/>'),
    right: svg('<path d="m9 6 6 6-6 6"/>'),
    close: svg('<path d="M6 6l12 12M18 6 6 18"/>'),
    zoom: svg('<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2M11 8.5v5M8.5 11h5"/>'),
    pause: svg('<path d="M9 6v12M15 6v12"/>').replace("<svg ", '<svg class="i-pause" '),
    play: svg('<path d="M8 5.5v13l10.5-6.5z"/>').replace("<svg ", '<svg class="i-play" '),
  };
  // Pausa de animaciones (WCAG 2.2.2): se recuerda entre visitas
  var paused = false;
  try { paused = localStorage.getItem("motion") === "paused"; } catch (e) { /* sin almacenamiento */ }
  root.classList.toggle("paused", paused);
  function newTab() { return '<span class="sr-only"> (' + tx(C.ui.newTab) + ")</span>"; }
  function newTabLabel(label) { return esc(label) + " (" + tx(C.ui.newTab) + ")"; }

  function chips(list) {
    if (!list || !list.length) return "";
    return '<ul class="chips">' + list.map(function (x) { return "<li>" + logo(x) + "<span>" + esc(x) + "</span></li>"; }).join("") + "</ul>";
  }
  function head(id) {
    var s = C.ui.sections[id];
    return '<header class="sec-head reveal"><p class="kicker">' + tx(s.kicker) + '</p><h2 id="' + id + '-title">' + tx(s.title) + "</h2></header>";
  }
  function cvLink() {
    var cv = C.profile.cv || {};
    var href = cv[lang] || cv[lang === "es" ? "en" : "es"];
    if (!href) return null;
    return { href: href, other: !cv[lang] };
  }
  function cvLabel(cv) { return tx(C.ui.ctaCv) + (cv.other && t(C.ui.cvOther) ? ' <span class="cv-other">' + tx(C.ui.cvOther) + "</span>" : ""); }
  function photo() { return C.profile.photo || "assets/img/joel.jpg"; }

  /* ---------- barra de navegación ---------- */
  function renderNav() {
    var li = function (id) { return '<li><a href="' + HOME + "#" + id + '" data-nav="' + id + '">' + tx(C.ui.nav[id]) + "</a></li>"; };
    var items = NAV.slice(1).map(li).join("");
    $("nav-list").innerHTML = items;
    $("mobile-list").innerHTML = items;
    var cv = cvLink(), b = $("nav-cv");
    if (cv) { b.href = cv.href; b.innerHTML = ICON.download + "<span>CV</span>"; b.setAttribute("aria-label", t(C.ui.ctaCv)); }
    else b.hidden = true;
  }

  /* ---------- portada ---------- */
  function renderHero() {
    var p = C.profile, h = C.hero, cv = cvLink();
    var beltItems = (h.belt || []).map(function (s) { return "<li>" + logo(s) + "<span>" + esc(s) + "</span></li>"; }).join("");
    $("home").innerHTML =
      '<div class="container hero-inner">' +
        '<div class="hero-copy">' +
          '<p class="badge reveal"><span class="dot" aria-hidden="true"></span>' + tx(h.status) + "</p>" +
          '<h1 class="hero-name reveal" style="--d:1">' + esc(p.firstName) + '<span class="l2">' + esc(p.lastName) + "</span></h1>" +
          '<p class="typed reveal" style="--d:2"><span class="sr-only">' + esc((h.roles || []).map(t).join(", ")) + '</span><span class="prompt" aria-hidden="true">$</span><span id="typed" aria-hidden="true">' + tx((h.roles || [""])[0]) + '</span><span class="caret" aria-hidden="true"></span></p>' +
          '<p class="lead reveal" style="--d:3">' + tx(h.tagline) + "</p>" +
          '<div class="hero-ctas reveal" style="--d:4">' +
            '<a class="btn btn-primary" href="#projects">' + tx(C.ui.ctaProjects) + ICON.arrow + "</a>" +
            (cv ? '<a class="btn btn-outline" href="' + esc(cv.href) + '" download>' + ICON.download + cvLabel(cv) + "</a>" : "") +
          "</div>" +
          '<ul class="hero-social reveal" style="--d:5">' +
            '<li><a href="' + esc(p.github) + '" target="_blank" rel="noopener" aria-label="' + newTabLabel("GitHub") + '">' + ICON.github + "</a></li>" +
            '<li><a href="' + esc(p.linkedin) + '" target="_blank" rel="noopener" aria-label="' + newTabLabel("LinkedIn") + '">' + ICON.linkedin + "</a></li>" +
            '<li><a href="mailto:' + esc(p.email) + '" aria-label="Email">' + ICON.mail + "</a></li>" +
          "</ul>" +
        "</div>" +
        '<div class="hero-visual reveal" style="--d:2">' +
          '<div class="photo-ring" aria-hidden="true"></div>' +
          '<div class="photo-frame"><img class="photo" src="' + esc(photo()) + '" alt="' + esc(p.name) + '" width="800" height="1059" fetchpriority="high" /></div>' +
          (h.years ? '<p class="sticker s1"><b>' + tx(h.years.value) + "</b><span>" + tx(h.years.text) + "</span></p>" : "") +
          '<p class="sticker s2"><span class="term" aria-hidden="true">@</span><span>Spring Boot</span></p>' +
        "</div>" +
      "</div>" +
      (beltItems ? '<div class="belt" role="region" aria-label="' + tx(C.ui.stackTitle) + '"><div class="belt-track"><ul class="belt-set">' + beltItems + '</ul><ul class="belt-set" aria-hidden="true">' + beltItems + "</ul></div>" +
        '<button type="button" class="motion-btn" id="motion-toggle" aria-pressed="' + paused + '">' + ICON.pause + ICON.play + '<span class="sr-only">' + tx(C.ui.pause) + "</span></button></div>" : "");
    var mb = $("motion-toggle");
    if (mb) {
      mb.title = t(C.ui.pause);
      mb.addEventListener("click", function () {
        paused = !paused;
        store("motion", paused ? "paused" : "on");
        root.classList.toggle("paused", paused);
        mb.setAttribute("aria-pressed", String(paused));
        if (paused) clearTimeout(typedTimer); else setupTyped();
      });
    }
  }

  /* ---------- sobre mí ---------- */
  var API = [
    { path: "/profile", data: function () {
      var p = C.profile;
      return { name: p.name, role: t(C.ui.cardRole), location: t(p.location), available: true, yearsOfExperience: "5+",
        languages: (C.languages || []).map(function (l) { return t(l.name) + " (" + t(l.level) + ")"; }) };
    } },
    { path: "/experience", data: function () {
      return C.experience.map(function (e) { return { company: e.company, client: e.client ? t(e.client) : null, role: t(e.role), from: e.start, to: e.end || null }; });
    } },
    { path: "/stack", data: function () {
      var o = {}; C.stack.forEach(function (g) { o[g.code === "+" ? "other" : g.code.toLowerCase()] = g.items; }); return o;
    } },
    { path: "/contact", data: function () {
      var p = C.profile; return { email: p.email, linkedin: p.linkedin, github: p.github };
    } },
  ];
  function jsonHtml(v, ind) {
    ind = ind || "";
    var next = ind + "  ";
    if (v === null) return '<span class="j-null">null</span>';
    if (typeof v === "boolean") return '<span class="j-bool">' + v + "</span>";
    if (typeof v === "number") return '<span class="j-num">' + v + "</span>";
    if (typeof v === "string") return '<span class="j-str">' + esc(JSON.stringify(v)) + "</span>";
    if (Array.isArray(v)) {
      if (!v.length) return "[]";
      return "[\n" + v.map(function (x) { return next + jsonHtml(x, next); }).join(",\n") + "\n" + ind + "]";
    }
    var keys = Object.keys(v);
    return "{\n" + keys.map(function (k) { return next + '<span class="j-key">"' + esc(k) + '"</span>: ' + jsonHtml(v[k], next); }).join(",\n") + "\n" + ind + "}";
  }
  function renderAbout() {
    var a = C.about, U = C.ui.api;
    $("about").innerHTML = '<div class="container">' + head("about") +
      '<div class="about-grid">' +
        '<div class="about-text">' + a.paragraphs.map(function (x, i) { return '<p class="reveal" style="--d:' + i + '">' + tx(x) + "</p>"; }).join("") +
          '<dl class="stats reveal" style="--d:2">' + (C.hero.stats || []).map(function (st) {
            return "<div><dt>" + tx(st.label) + "</dt><dd><span class=\"count\" data-to=\"" + st.value + "\">" + (REDUCED ? st.value : 0) + "</span>" + esc(st.suffix || "") + "</dd></div>";
          }).join("") + "</dl>" +
        "</div>" +
        '<div class="journey-wrap reveal" style="--d:1"><h3 class="mini-title">' + tx(C.ui.journey) + "</h3>" +
          '<ol class="journey">' + (a.journey || []).map(function (j) {
            return '<li class="' + (j.now ? "is-now" : "") + '"><span class="j-dot" aria-hidden="true"></span>' +
              '<span class="j-years">' + tx(j.years) + "</span>" +
              "<div><h4>" + tx(j.title) + "</h4><p>" + tx(j.text) + "</p></div></li>";
          }).join("") + "</ol>" +
        "</div>" +
      "</div>" +
      '<div class="api reveal">' +
        '<div class="api-copy"><h3>' + tx(U.title) + "</h3><p>" + tx(U.lead) + "</p>" +
          '<div class="api-endpoints" role="group" aria-label="Endpoints">' + API.map(function (e, i) {
            return '<button type="button" class="api-ep' + (i === 0 ? " is-on" : "") + '" aria-pressed="' + (i === 0) + '" data-i="' + i + '"><span class="m">GET</span>' + esc(e.path) + "</button>";
          }).join("") + "</div>" +
          '<p class="api-note">' + tx(U.note) + "</p>" +
        "</div>" +
        '<div class="api-term">' +
          '<div class="api-bar"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>' +
            '<code class="api-url"><span class="m">GET</span> <span id="api-path">/api/joel' + esc(API[0].path) + "</span></code>" +
            '<button type="button" class="btn btn-primary btn-xs" id="api-send">' + tx(U.send) + ICON.arrow + "</button></div>" +
          '<div class="api-status" id="api-status" role="status"><span class="ok">200 OK</span><span>application/json</span></div>' +
          '<pre class="api-out" id="api-out" tabindex="0" role="region" aria-label="JSON">' + jsonHtml(API[0].data()) + "</pre>" +
        "</div>" +
      "</div>" +
    "</div>";

    var cur = 0, out = $("api-out"), stat = $("api-status"), apiT = 0;
    function run() {
      var e = API[cur], t0 = performance.now();
      clearTimeout(apiT);
      out.classList.add("is-loading");
      stat.innerHTML = '<span class="wait">…</span>';
      apiT = setTimeout(function () {
        out.innerHTML = jsonHtml(e.data());
        out.classList.remove("is-loading");
        stat.innerHTML = '<span class="ok">200 OK</span><span>' + Math.max(8, Math.round(performance.now() - t0)) + " ms</span><span>application/json</span>";
      }, REDUCED ? 0 : 260 + Math.random() * 180);
    }
    document.querySelectorAll(".api-ep").forEach(function (b) {
      b.addEventListener("click", function () {
        cur = Number(b.getAttribute("data-i"));
        document.querySelectorAll(".api-ep").forEach(function (o) { var on = o === b; o.classList.toggle("is-on", on); o.setAttribute("aria-pressed", String(on)); });
        $("api-path").textContent = "/api/joel" + API[cur].path;
        run();
      });
    });
    $("api-send").addEventListener("click", run);
  }

  /* ---------- experiencia (pestañas) ---------- */
  function renderExperience() {
    var list = C.experience || [];
    function yr(ym) { return String(ym).split("-")[0]; }
    var tabs = list.map(function (e, i) {
      var span = yr(e.start) + (e.end ? (yr(e.end) !== yr(e.start) ? " – " + yr(e.end) : "") : " – " + tx(C.ui.now));
      return '<button class="xp-tab" role="tab" id="xp-tab-' + i + '" aria-controls="xp-panel-' + i + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' +
        '<span class="xp-co">' + esc(e.company) + '</span><span class="xp-yr">' + span + "</span></button>";
    }).join("");
    var panels = list.map(function (e, i) {
      return '<div class="xp-panel" role="tabpanel" tabindex="0" id="xp-panel-' + i + '" aria-labelledby="xp-tab-' + i + '"' + (i === 0 ? "" : " hidden") + ">" +
        '<p class="xp-dates">' + esc(fmtDate(e.start)) + " – " + esc(fmtDate(e.end)) + ' <span class="xp-dur">· ' + esc(duration(e.start, e.end)) + "</span></p>" +
        '<h3 class="xp-role">' + tx(e.role) + ' <span class="at">@ ' + esc(e.company) + "</span></h3>" +
        (e.client ? '<p class="xp-client"><span>' + tx(C.ui.client) + "</span>" + tx(e.client) + "</p>" : "") +
        (e.note ? '<p class="xp-note">' + tx(e.note) + "</p>" : "") +
        '<ul class="xp-points">' + e.points.map(function (pt, k) { return '<li style="--i:' + k + '">' + ICON.tick + "<span>" + tx(pt) + "</span></li>"; }).join("") + "</ul>" +
        chips(e.tech) +
      "</div>";
    }).join("");
    $("experience").innerHTML = '<div class="container">' + head("experience") +
      '<div class="xp reveal"><div class="xp-tabs" role="tablist" aria-label="' + tx(C.ui.nav.experience) + '">' + tabs + '</div><div class="xp-panels">' + panels + "</div></div></div>";

    var tl = document.querySelector(".xp-tabs"), wide = window.matchMedia("(min-width: 900px)");
    function orient() { tl.setAttribute("aria-orientation", wide.matches ? "vertical" : "horizontal"); }
    orient();
    if (!xpOrientBound) { xpOrientBound = true; wide.addEventListener("change", function () { var x = document.querySelector(".xp-tabs"); if (x) x.setAttribute("aria-orientation", wide.matches ? "vertical" : "horizontal"); }); }
    var btns = [].slice.call(document.querySelectorAll(".xp-tab"));
    function select(i, focus) {
      btns.forEach(function (b, k) {
        var on = k === i;
        b.setAttribute("aria-selected", String(on));
        b.tabIndex = on ? 0 : -1;
        $("xp-panel-" + k).hidden = !on;
      });
      if (focus) btns[i].focus();
    }
    btns.forEach(function (b, i) {
      b.addEventListener("click", function () { select(i); });
      b.addEventListener("keydown", function (ev) {
        var n = btns.length, k = ev.key, j = -1;
        if (k === "ArrowDown" || k === "ArrowRight") j = (i + 1) % n;
        else if (k === "ArrowUp" || k === "ArrowLeft") j = (i - 1 + n) % n;
        else if (k === "Home") j = 0;
        else if (k === "End") j = n - 1;
        if (j >= 0) { ev.preventDefault(); select(j, true); }
      });
    });
  }

  /* ---------- proyectos ---------- */
  function projUrl(p) { return "proyecto.html?p=" + encodeURIComponent(p.slug); }
  function projImg(src) { return /^(https?:)?\/\//.test(src) ? src : (C.projectImages || "assets/img/projects/") + src; }
  function flowArt(nodes) {
    return '<div class="flow">' + nodes.map(function (n, k) {
      return (k ? '<span class="fl-arrow" aria-hidden="true"><i></i></span>' : "") +
        '<div class="fl-node" style="--k:' + k + '">' + (ICON[n[0]] || ICON.server) + "<span>" + tx(n[1]) + "</span></div>";
    }).join("") + "</div>";
  }
  function shot(p, eager) {
    var inner;
    if (p.cover && typeof p.cover === "object") inner = '<div class="shot-flow">' + flowArt(p.cover.flow || []) + "</div>";
    else inner = '<img src="' + esc(projImg(p.cover)) + '" alt="' + tx(p.title) + '" width="1280" height="900"' + (eager ? "" : ' loading="lazy"') + ' decoding="async" />';
    return '<div class="shot"><div class="shot-bar" aria-hidden="true"><i></i><i></i><i></i><span>' + esc(p.demo ? p.demo.replace(/^https?:\/\//, "") : p.slug) + "</span></div>" + inner + "</div>";
  }
  function projLinks(p, withView) {
    var u = C.ui.project;
    return '<div class="pj-links">' +
      (withView ? '<a class="btn btn-primary btn-sm" href="' + projUrl(p) + '">' + tx(u.view) + ICON.arrow + "</a>" : "") +
      (p.repo ? '<a class="btn btn-outline btn-sm" href="' + esc(p.repo) + '" target="_blank" rel="noopener">' + ICON.github + "GitHub" + newTab() + "</a>" : "") +
      (p.demo ? '<a class="btn btn-outline btn-sm" href="' + esc(p.demo) + '" target="_blank" rel="noopener">' + ICON.globe + "Demo" + newTab() + "</a>" : "") +
      (!p.repo && p.note ? '<span class="pj-note">' + tx(p.note) + "</span>" : "") +
    "</div>";
  }
  function renderProjects() {
    $("projects").innerHTML = '<div class="container">' + head("projects") +
      '<div class="pj-list">' + C.projects.map(function (p, i) {
        return '<article class="pj-row reveal' + (i % 2 ? " flip" : "") + '">' +
          '<a class="pj-shot" href="' + projUrl(p) + '" tabindex="-1" aria-hidden="true">' + shot(p) + "</a>" +
          '<div class="pj-copy"><p class="pj-type"><span class="num">0' + (i + 1) + "</span>" + tx(p.type) + "</p>" +
            '<h3><a href="' + projUrl(p) + '">' + tx(p.title) + "</a></h3>" +
            "<p>" + tx(p.description) + "</p>" + chips(p.tech) + projLinks(p, true) +
          "</div></article>";
      }).join("") + "</div></div>";
  }

  /* ---------- página de un proyecto (proyecto.html?p=slug) ---------- */
  var current = null;
  function findProject() {
    var slug = new URLSearchParams(location.search).get("p");
    for (var i = 0; i < C.projects.length; i++) if (C.projects[i].slug === slug) return C.projects[i];
    return null;
  }
  function renderProjectPage() {
    var p = current, u = C.ui.project, info = p.info || {};
    var list = function (items, cls) {
      return '<ul class="' + cls + '">' + items.map(function (x, k) { return '<li style="--i:' + k + '">' + ICON.tick + "<span>" + tx(x) + "</span></li>"; }).join("") + "</ul>";
    };
    var block = function (title, body) { return '<section class="pj-block reveal"><h2>' + tx(title) + "</h2>" + body + "</section>"; };
    var facts = ["kind", "year", "team", "status"].filter(function (k) { return info[k]; }).map(function (k) {
      return "<div><dt>" + tx(u[k]) + "</dt><dd>" + tx(info[k]) + "</dd></div>";
    }).join("");
    var gal = (p.gallery || []).map(function (g, k) {
      return '<li><button type="button" class="gal-item" data-k="' + k + '" aria-label="' + tx(u.open) + ": " + tx(g.caption) + '">' +
        '<img src="' + esc(projImg(g.src)) + '" alt="" loading="lazy" decoding="async" width="1280" height="900" /><span class="gal-zoom" aria-hidden="true">' + ICON.zoom + "</span></button>" +
        "<p>" + tx(g.caption) + "</p></li>";
    }).join("");
    var others = C.projects.filter(function (o) { return o !== p; }).map(function (o) {
      return '<a class="pj-card" href="' + projUrl(o) + '"><span class="pj-type">' + tx(o.type) + "</span><h3>" + tx(o.title) + "</h3><span class=\"go\">" + tx(u.view) + ICON.arrow + "</span></a>";
    }).join("");

    $("main").innerHTML =
      '<article class="container pj-page">' +
        '<a class="pj-back reveal" href="index.html#projects">' + ICON.back + tx(u.back) + "</a>" +
        '<header class="pj-head reveal"><p class="kicker">' + tx(p.type) + "</p><h1>" + tx(p.title) + '</h1><p class="pj-sub">' + tx(p.subtitle) + "</p>" + projLinks(p, false) + "</header>" +
        '<div class="pj-cover reveal">' + shot(p, true) + (p.cover && typeof p.cover === "object" ? '<p class="pj-caption">' + tx(u.flowCaption) + "</p>" : "") + "</div>" +
        '<div class="pj-body">' +
          '<div class="pj-main">' +
            block(u.overview, (p.intro || []).map(function (x) { return "<p>" + tx(x) + "</p>"; }).join("")) +
            (p.features && p.features.length ? block(p.featuresTitle === "tasks" ? u.tasks : u.features, list(p.features, "pj-checks")) : "") +
            (p.results && p.results.length ? block(u.results, list(p.results, "pj-checks")) : "") +
            (p.challenges && p.challenges.length ? block(u.challenges, list(p.challenges, "pj-checks is-alt")) : "") +
            (gal ? block(u.gallery, '<ul class="gallery">' + gal + "</ul>") : "") +
          "</div>" +
          '<aside class="pj-side reveal"><div class="pj-facts"><h2>' + tx(u.details) + "</h2>" + (facts ? "<dl>" + facts + "</dl>" : "") + chips(p.tech) + "</div></aside>" +
        "</div>" +
        (others ? '<section class="pj-more reveal"><h2>' + tx(u.more) + '</h2><div class="pj-cards">' + others + "</div></section>" : "") +
        '<section class="pj-cta reveal"><h2>' + tx(u.cta) + "</h2><p>" + tx(u.ctaText) + '</p><a class="btn btn-primary" href="mailto:' + esc(C.profile.email) + '">' + ICON.mail + tx(C.ui.ctaEmail) + "</a></section>" +
      "</article>" +
      '<dialog class="lightbox" id="lightbox" aria-label="' + tx(u.gallery) + '">' +
        '<button type="button" class="lb-btn lb-close" id="lb-close" aria-label="' + tx(u.close) + '">' + ICON.close + "</button>" +
        '<button type="button" class="lb-btn lb-prev" id="lb-prev" aria-label="' + tx(u.prev) + '">' + ICON.left + "</button>" +
        '<figure><img id="lb-img" alt="" /><figcaption id="lb-cap" aria-live="polite"></figcaption></figure>' +
        '<button type="button" class="lb-btn lb-next" id="lb-next" aria-label="' + tx(u.next) + '">' + ICON.right + "</button>" +
      "</dialog>";
    if (gal) setupLightbox();
  }
  function setupLightbox() {
    var box = $("lightbox"), items = current.gallery || [], k = 0;
    if (typeof box.showModal !== "function") return;
    function show(i) {
      k = (i + items.length) % items.length;
      $("lb-img").src = projImg(items[k].src);
      $("lb-cap").textContent = t(items[k].caption) + " · " + (k + 1) + "/" + items.length;
    }
    var many = items.length > 1;
    $("lb-prev").hidden = !many; $("lb-next").hidden = !many;
    document.querySelectorAll(".gal-item").forEach(function (b) {
      b.addEventListener("click", function () { show(Number(b.getAttribute("data-k"))); box.showModal(); });
    });
    $("lb-close").addEventListener("click", function () { box.close(); });
    $("lb-prev").addEventListener("click", function () { show(k - 1); });
    $("lb-next").addEventListener("click", function () { show(k + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) box.close(); });
    box.addEventListener("keydown", function (e) {
      if (!many) return;
      if (e.key === "ArrowLeft") show(k - 1);
      if (e.key === "ArrowRight") show(k + 1);
    });
    var sx = null;
    box.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", function (e) {
      if (sx == null || !many) return;
      var dx = e.changedTouches[0].clientX - sx; sx = null;
      if (Math.abs(dx) > 50) show(dx < 0 ? k + 1 : k - 1);
    });
  }

  /* ---------- habilidades (capas) ---------- */
  function renderStack() {
    var n = C.stack.length;
    $("stack").innerHTML = '<div class="container">' + head("stack") +
      '<ol class="layers">' + C.stack.map(function (g, i) {
        return '<li class="layer reveal" style="--d:' + (i % 3) + '">' +
          '<h3 class="layer-name"><span class="layer-code" aria-hidden="true">' + esc(g.code) + "</span>" + tx(g.group) + "</h3>" +
          '<ul class="layer-items">' + g.items.map(function (x) { return "<li>" + logo(x) + "<span>" + esc(x) + "</span></li>"; }).join("") + "</ul>" +
          (i < n - 1 ? '<span class="layer-link" aria-hidden="true"></span>' : "") +
        "</li>";
      }).join("") + "</ol>" +
      '<p class="layers-note reveal">' + tx(C.ui.stackNote) + "</p></div>";
  }

  /* ---------- formación e idiomas ---------- */
  function renderEducation() {
    var edu = (C.education || []).map(function (e, i) {
      return '<article class="edu-card reveal" style="--d:' + (i % 2) + '">' +
        '<span class="edu-icon" aria-hidden="true">' + ICON.cap + "</span>" +
        '<div><p class="edu-meta"><span>' + esc(fmtDate(e.start)) + " – " + esc(fmtDate(e.end)) + '</span><span class="edu-tag">' + (e.end ? ICON.tick + tx(C.ui.eduDone) : tx(C.ui.present)) + "</span></p>" +
        "<h3>" + tx(e.title) + "</h3><p>" + tx(e.place) + "</p></div></article>";
    }).join("");
    var langs = (C.languages || []).map(function (l) {
      return '<li><div class="lg-top"><span>' + tx(l.name) + '</span><span class="lg-lvl">' + tx(l.level) + '</span></div><span class="lg-bar" style="--p:' + (l.pct || 0) + '%" aria-hidden="true"><i></i></span></li>';
    }).join("");
    var extras = (C.extras || []).map(function (x) { return "<li>" + ICON.tick + "<span>" + tx(x) + "</span></li>"; }).join("");
    $("education").innerHTML = '<div class="container">' + head("education") +
      '<div class="edu-layout"><div class="edu-grid">' + edu + "</div>" +
      '<aside class="lang-card reveal" style="--d:1"><h3>' + ICON.lang + tx(C.ui.languages) + '</h3><ul class="langs">' + langs + "</ul>" +
        (extras ? '<ul class="extras">' + extras + "</ul>" : "") + "</aside></div></div>";
  }

  /* ---------- contacto ---------- */
  function renderContact() {
    var p = C.profile, cv = cvLink();
    var row = function (icon, label, href) {
      return "<li><a href=\"" + esc(href) + '" target="_blank" rel="noopener"><span class="cc-ic">' + icon + "</span><span>" + esc(label) + newTab() + '</span><span class="cc-go" aria-hidden="true">' + ICON.external + "</span></a></li>";
    };
    $("contact").innerHTML = '<div class="container"><div class="contact-wrap">' +
      '<div class="contact-info reveal">' +
        '<p class="kicker">' + tx(C.ui.sections.contact.kicker) + '</p><h2 id="contact-title">' + tx(C.ui.sections.contact.title) + "</h2>" +
        '<p class="contact-text">' + tx(C.ui.contactText) + "</p>" +
        '<div class="contact-ctas">' +
          '<a class="btn btn-primary" href="mailto:' + esc(p.email) + '">' + ICON.mail + tx(C.ui.ctaEmail) + "</a>" +
          (cv ? '<a class="btn btn-outline" href="' + esc(cv.href) + '" download>' + ICON.download + cvLabel(cv) + "</a>" : "") +
        "</div>" +
      "</div>" +
      '<div class="contact-card reveal" style="--d:2">' +
        '<div class="cc-who"><img src="' + esc(photo()) + '" alt="" width="800" height="1059" loading="lazy" /><div><p class="cc-name">' + esc(p.name) + '</p><p class="cc-role">' + tx(C.ui.cardRole) + "</p></div></div>" +
        '<ul class="cc-rows">' +
          '<li class="cc-mail"><a href="mailto:' + esc(p.email) + '"><span class="cc-ic">' + ICON.mail + "</span><span>" + esc(p.email) + "</span></a>" +
            '<button class="copy" id="copy-email" type="button" aria-label="' + tx(C.ui.copy) + '" title="' + tx(C.ui.copy) + '">' + ICON.copy + ICON.tick + "</button></li>" +
          row(ICON.linkedin, p.linkedin.replace(/^https?:\/\/(www\.)?/, ""), p.linkedin) +
          row(ICON.github, p.github.replace(/^https?:\/\//, ""), p.github) +
          '<li><span class="cc-static"><span class="cc-ic">' + ICON.pin + "</span><span>" + tx(p.location) + ", " + tx(p.country) + "</span></span></li>" +
        "</ul>" +
        '<span class="sr-only" id="copy-status" role="status"></span>' +
      "</div>" +
    "</div></div>";

    $("copy-email").addEventListener("click", function () {
      var b = this;
      function done() {
        b.classList.add("is-done"); b.title = t(C.ui.copied); $("copy-status").textContent = t(C.ui.copied);
        setTimeout(function () { b.classList.remove("is-done"); b.title = t(C.ui.copy); $("copy-status").textContent = ""; }, 1600);
      }
      function fallback() { // sin API de portapapeles: copia con un textarea temporal
        var ta = document.createElement("textarea");
        ta.value = p.email; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        var ok = false; try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
        document.body.removeChild(ta); b.focus();
        if (ok) done(); else $("copy-status").textContent = p.email;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(p.email).then(done, fallback);
      else fallback();
    });
  }

  /* ---------- pie ---------- */
  function renderFooter() {
    var p = C.profile, F = C.ui.footerCols;
    var col = function (title, items) {
      return '<div class="f-col"><h2>' + tx(title) + "</h2><ul>" + items.map(function (x) { return '<li><a href="' + x[0] + '">' + x[1] + "</a></li>"; }).join("") + "</ul></div>";
    };
    $("footer").innerHTML = '<div class="container">' +
      '<div class="f-top">' +
        '<div class="f-brand"><a class="logo" href="' + HOME + '#home"><span class="logo-mark" aria-hidden="true">' + esc(p.initials) + '</span><span class="logo-text">' + esc(p.name) + "</span></a>" +
          "<p>" + tx(C.ui.footerTag) + "</p>" +
          '<ul class="footer-social">' +
            '<li><a href="' + esc(p.github) + '" target="_blank" rel="noopener" aria-label="' + newTabLabel("GitHub") + '">' + ICON.github + "</a></li>" +
            '<li><a href="' + esc(p.linkedin) + '" target="_blank" rel="noopener" aria-label="' + newTabLabel("LinkedIn") + '">' + ICON.linkedin + "</a></li>" +
            '<li><a href="mailto:' + esc(p.email) + '" aria-label="Email">' + ICON.mail + "</a></li>" +
          "</ul></div>" +
        col(F.sections, NAV.slice(1).map(function (id) { return [HOME + "#" + id, tx(C.ui.nav[id])]; })) +
        col(F.projects, C.projects.map(function (o) { return [projUrl(o), tx(o.short)]; })) +
      "</div>" +
      '<div class="f-bottom"><p>© ' + new Date().getFullYear() + " " + esc(p.name) + ". " + tx(C.ui.rights) + " " + tx(C.ui.footer) + "</p>" +
        '<a class="to-top" href="#top" id="to-top">' + tx(C.ui.backTop) + ICON.up + "</a></div>" +
    "</div>";
    $("to-top").addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" });
      var first = document.querySelector(".skip-link"); if (first) first.focus({ preventScroll: true });
    });
  }

  /* ---------- animaciones ---------- */
  var revealIO, navIO, typedTimer, xpOrientBound = false;
  function setupReveal() {
    var els = document.querySelectorAll(".reveal:not(.in)");
    if (REDUCED || !("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("in"); }); runCounters(); return; }
    if (revealIO) revealIO.disconnect();
    revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        revealIO.unobserve(en.target);
        if (en.target.classList.contains("stats")) runCounters();
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (el) { revealIO.observe(el); });
  }
  function runCounters() {
    document.querySelectorAll(".count[data-to]").forEach(function (el) {
      var to = Number(el.getAttribute("data-to")), start = null;
      el.removeAttribute("data-to");
      if (REDUCED) { el.textContent = to; return; }
      function step(ts) {
        if (start === null) start = ts;
        var k = Math.min((ts - start) / 1200, 1);
        el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  function setupTyped() {
    clearTimeout(typedTimer);
    var el = $("typed"), roles = (C.hero.roles || []).map(t);
    if (!el || REDUCED || paused || roles.length < 2) return;
    var r = 0, i = roles[0].length, del = true;
    function tick() {
      var word = roles[r];
      if (del) { i--; if (i <= 0) { del = false; r = (r + 1) % roles.length; } }
      else { i++; if (i >= roles[r].length) { del = true; el.textContent = roles[r]; typedTimer = setTimeout(tick, 1900); return; } }
      word = roles[r];
      el.textContent = word.slice(0, Math.max(0, i));
      typedTimer = setTimeout(tick, del ? 32 : 68);
    }
    typedTimer = setTimeout(tick, 2200);
  }
  function setupActiveNav() {
    if (!("IntersectionObserver" in window)) return;
    if (navIO) navIO.disconnect();
    navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        document.querySelectorAll("[data-nav]").forEach(function (a) {
          var on = a.getAttribute("data-nav") === en.target.id;
          a.classList.toggle("is-active", on);
          if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    NAV.forEach(function (id) { if ($(id)) navIO.observe($(id)); });
  }

  /* Efectos con ratón (solo puntero fino y sin "reducir movimiento"):
     luz de fondo que sigue al cursor, brillo dentro de tarjetas,
     inclinación de capturas y botones con efecto imán. */
  var FX = window.matchMedia("(hover: hover) and (pointer: fine)").matches && !REDUCED;
  function setupFx() {
    if (!FX) return;
    var spot = $("spotlight"), pos = { x: -999, y: -999 }, cur = { x: -999, y: -999 }, raf = 0;
    var magEl = null, tiltEl = null;
    function frame() {
      cur.x += (pos.x - cur.x) * 0.12; cur.y += (pos.y - cur.y) * 0.12;
      if (spot) spot.style.transform = "translate3d(" + cur.x + "px," + cur.y + "px,0)";
      raf = Math.abs(pos.x - cur.x) < 0.3 && Math.abs(pos.y - cur.y) < 0.3 ? 0 : requestAnimationFrame(frame);
    }
    function release(el, a, b) { if (el) { el.style.removeProperty(a); el.style.removeProperty(b); } }
    document.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      var tg = e.target && e.target.closest ? e.target : null;
      var g = tg && tg.closest(".glow");
      if (g) { var r = g.getBoundingClientRect(); g.style.setProperty("--mx", (e.clientX - r.left) + "px"); g.style.setProperty("--my", (e.clientY - r.top) + "px"); }
      if (spot && !spot.classList.contains("on")) { cur.x = e.clientX; cur.y = e.clientY; spot.classList.add("on"); }
      pos.x = e.clientX; pos.y = e.clientY;
      var sh = tg && tg.closest(".pj-row, .pj-cover");
      sh = sh && sh.querySelector(".shot");
      if (sh !== tiltEl) { release(tiltEl, "--rx", "--ry"); tiltEl = null; }
      if (sh) {
        var sr = sh.getBoundingClientRect(), px = (e.clientX - sr.left) / sr.width - 0.5, py = (e.clientY - sr.top) / sr.height - 0.5;
        sh.style.setProperty("--ry", (Math.max(-0.5, Math.min(0.5, px)) * 6).toFixed(2) + "deg");
        sh.style.setProperty("--rx", (Math.max(-0.5, Math.min(0.5, py)) * -6).toFixed(2) + "deg");
        tiltEl = sh;
      }
      var m = tg && tg.closest(".btn-primary, .btn-outline, .hero-social a, .footer-social a");
      if (m !== magEl) { release(magEl, "--tx", "--ty"); magEl = null; }
      if (m) {
        var mr = m.getBoundingClientRect();
        m.style.setProperty("--tx", (((e.clientX - mr.left) / mr.width - 0.5) * 8).toFixed(1) + "px");
        m.style.setProperty("--ty", (((e.clientY - mr.top) / mr.height - 0.5) * 6).toFixed(1) + "px");
        magEl = m;
      }
      if (!raf) raf = requestAnimationFrame(frame);
    }, { passive: true });
    root.addEventListener("pointerleave", function () {
      if (spot) spot.classList.remove("on");
      release(magEl, "--tx", "--ty"); release(tiltEl, "--rx", "--ry"); magEl = tiltEl = null;
    });
  }
  function setupGlow() {
    document.querySelectorAll(".xp-panels, .layer, .edu-card, .lang-card, .pj-facts, .pj-card, .contact-card").forEach(function (el) { el.classList.add("glow"); });
  }

  /* ---------- idioma, tema y metadatos ---------- */
  function applyMeta() {
    if (PAGE === "project" && current) document.title = t(current.title) + " · " + C.profile.name;
    else document.title = t(C.ui.meta.title);
    var d = document.querySelector('meta[name="description"]');
    if (d) d.setAttribute("content", PAGE === "project" && current ? t(current.description) : t(C.ui.meta.description));
    var skip = document.querySelector(".skip-link"); if (skip) skip.textContent = t(C.ui.skip);
    $("lang-toggle").setAttribute("aria-label", t(C.ui.langSwitch));
    $("lang-toggle").setAttribute("lang", lang === "es" ? "en" : "es");
    $("lang-toggle").title = t(C.ui.langSwitch);
    $("menu-toggle").setAttribute("aria-label", t(C.ui.menu));
    $("nav-links").setAttribute("aria-label", t(C.ui.navMain));
    $("mobile-menu").setAttribute("aria-label", t(C.ui.navMobile));
    if ($("home")) $("home").setAttribute("aria-label", t(C.ui.nav.home));
    if (PAGE === "project" && current) {
      var base = location.origin + location.pathname, url = base + "?p=" + encodeURIComponent(current.slug);
      setHead("link", "rel", "canonical", "href", url);
      setHead("meta", "property", "og:url", "content", url);
      setHead("meta", "property", "og:title", "content", document.title);
      setHead("meta", "property", "og:description", "content", t(current.description));
    }
    updateThemeLabel();
  }
  function setHead(tag, key, val, attr, content) {
    var el = document.head.querySelector(tag + "[" + key + '="' + val + '"]');
    if (!el) { el = document.createElement(tag); el.setAttribute(key, val); document.head.appendChild(el); }
    el.setAttribute(attr, content);
  }
  function updateThemeLabel() {
    var dark = root.getAttribute("data-theme") === "dark";
    var lbl = t(dark ? C.ui.themeToLight : C.ui.themeToDark);
    $("theme-toggle").setAttribute("aria-label", lbl);
    $("theme-toggle").title = lbl;
    var mc = document.querySelector('meta[name="theme-color"]:not([media])');
    if (mc) mc.setAttribute("content", dark ? "#0a0f1a" : "#ffffff");
  }
  $("theme-toggle").addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.classList.add("theme-anim");
    root.setAttribute("data-theme", next);
    store("theme", next);
    updateThemeLabel();
    setTimeout(function () { root.classList.remove("theme-anim"); }, 400);
  });
  $("lang-toggle").addEventListener("click", function () {
    lang = lang === "es" ? "en" : "es";
    root.setAttribute("lang", lang);
    store("lang", lang);
    var u = new URL(location.href);
    if (u.searchParams.has("lang")) { u.searchParams.set("lang", lang); history.replaceState(null, "", u); }
    renderAll();
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  });

  /* ---------- menú móvil y barra al hacer scroll ---------- */
  var nav = $("navbar"), menuBtn = $("menu-toggle");
  function setMenu(open) { nav.classList.toggle("menu-open", open); menuBtn.setAttribute("aria-expanded", String(open)); }
  menuBtn.addEventListener("click", function () { setMenu(!nav.classList.contains("menu-open")); });
  $("mobile-menu").addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("menu-open")) { setMenu(false); menuBtn.focus(); } });
  window.matchMedia("(min-width: 1040px)").addEventListener("change", function (m) { if (m.matches) setMenu(false); });
  function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 10); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function renderAll() {
    renderNav();
    if (PAGE === "project") {
      renderProjectPage(); renderFooter(); applyMeta(); setupReveal(); setupGlow();
      return;
    }
    renderHero(); renderAbout(); renderExperience(); renderProjects();
    renderStack(); renderEducation(); renderContact(); renderFooter();
    applyMeta(); setupReveal(); setupTyped(); setupGlow(); setupActiveNav();
  }

  if (PAGE === "project") {
    current = findProject();
    if (!current) { location.replace("index.html#projects"); return; }
  }
  renderAll();
  setupFx();
})();
