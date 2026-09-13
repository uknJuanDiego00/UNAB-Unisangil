/* ==========================================================================
   GESTIÓN HUMANA — main.js
   Componentes compartidos: navbar, footer, menú móvil, acordeones, tabs,
   scroll reveal, botón volver arriba, barra de progreso, encuesta demo.
   ========================================================================== */

(function () {
  "use strict";

  var NAV_LINKS = [
    { file: "index.html", label: "Inicio", isHome: true },
    { file: "competencias.html", label: "Competencias" },
    { file: "organizar-personas.html", label: "Organizar personas" },
    { file: "integrar-personas.html", label: "Integrar personas" },
    { file: "recompensar-personas.html", label: "Recompensar personas" },
    { file: "desarrollar-personas.html", label: "Desarrollar personas" },
    { file: "retener-personas.html", label: "Retener personas" },
    { file: "auditar-personas.html", label: "Auditar personas" },
    { file: "clima-laboral.html", label: "Clima Laboral" }
  ];

  function isPantalla() {
    var p = window.location.pathname.replace(/\\/g, "/");
    return p.indexOf("/pantalla/") !== -1 || p.slice(-9) === "/pantalla";
  }

  function currentPage() {
    var path = window.location.pathname.replace(/\\/g, "/").split("/").pop();
    return path === "" ? "index.html" : path;
  }

  function resolveLink(item) {
    var inSub = isPantalla();
    if (item.isHome) {
      return inSub ? "../index.html" : "index.html";
    }
    return inSub ? item.file : "pantalla/" + item.file;
  }

  function resolveRoot(path) {
    return (isPantalla() ? "../" : "") + path;
  }

  function renderHeader() {
    var mount = document.getElementById("site-header");
    if (!mount) return;
    var current = currentPage();

    var links = NAV_LINKS.map(function (link) {
      var isCurrent = link.file === current;
      var href = resolveLink(link);
      return (
        '<a href="' + href + '"' +
        (isCurrent ? ' aria-current="page"' : "") +
        ">" + link.label + "</a>"
      );
    }).join("");

    mount.innerHTML =
      '<div class="scroll-progress" id="scroll-progress"></div>' +
      '<div class="navbar">' +
      '<a class="brand" href="' + resolveRoot("index.html") + '">' +
      '<span class="brand-mark" aria-hidden="true">GH</span>' +
      '<span class="brand-text"><strong>Gestión Humana</strong><span>UNAB · EXT UNISANGIL</span></span>' +
      "</a>" +
      '<button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Abrir menú de navegación"><span></span></button>' +
      '<nav class="nav-menu" id="nav-menu" aria-label="Navegación principal">' +
      links +
      "</nav>" +
      "</div>";

    var toggle = document.getElementById("nav-toggle");
    var menu = document.getElementById("nav-menu");
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      menu.classList.toggle("is-open", !expanded);
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        menu.classList.remove("is-open");
      });
    });
  }

  function renderFooter() {
    var mount = document.getElementById("site-footer");
    if (!mount) return;
    var year = new Date().getFullYear();
    var current = currentPage();

    var quickLinks = NAV_LINKS.slice(0, 5).map(function (l) {
      return '<li><a href="' + resolveLink(l) + '"' + (l.file === current ? ' aria-current="page"' : '') + '>' + l.label + "</a></li>";
    }).join("");
    var moreLinks = NAV_LINKS.slice(5).map(function (l) {
      return '<li><a href="' + resolveLink(l) + '"' + (l.file === current ? ' aria-current="page"' : '') + '>' + l.label + "</a></li>";
    }).join("");

    mount.innerHTML =
      '<div class="footer-top container">' +
      '<div class="footer-grid">' +
      '<div class="footer-brand">' +
      "<strong>Gestión Humana</strong>" +
      "<p>Universidad Autónoma de Bucaramanga — EXT UNISANGIL<br>Programa de Psicología<br>Fundamento Campo de Aplicación Organizacional<br>Taller Evaluativo #1</p>" +
      '<div class="footer-logos">' +
      '<img src="' + resolveRoot("img/logo-unisangil.png") + '" alt="Logotipo UNISANGIL">' +
      '<img src="' + resolveRoot("img/logo-unab.jpeg") + '" alt="Logotipo Universidad Autónoma de Bucaramanga">' +
      "</div>" +
      "</div>" +
      '<div class="footer-col"><h4>Procesos</h4><ul>' + quickLinks + "</ul></div>" +
      '<div class="footer-col"><h4>Procesos</h4><ul>' + moreLinks + "</ul></div>" +
      '<div class="footer-col"><h4>Sección de autores</h4><ul>' +
      '<li><a href="' + resolveRoot("index.html#equipo") + '">Nuestro equipo</a></li>' +
      '<li><a href="' + resolveRoot("index.html#objetivo") + '">Objetivo general</a></li>' +
      '<li><a href="' + resolveRoot("index.html#mapa") + '">Mapa de navegación</a></li>' +
      "</ul></div>" +
      "</div>" +
      "</div>" +
      '<div class="footer-bottom container">' +
      "<span>© " + year + " Gestión Humana — Taller Evaluativo #1. Proyecto académico sin fines comerciales.</span>" +
      "<span>UNAB EXT UNISANGIL · Psicología</span>" +
      "</div>";
  }

  function initScrollProgress() {
    var bar = document.getElementById("scroll-progress");
    if (!bar) return;
    function update() {
      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - doc.clientHeight;
      var pct = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
      bar.style.width = pct + "%";
    }
    document.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function initBackToTop() {
    var btn = document.createElement("button");
    btn.className = "back-to-top";
    btn.setAttribute("aria-label", "Volver arriba");
    btn.innerHTML = "&#8593;";
    document.body.appendChild(btn);
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    document.addEventListener(
      "scroll",
      function () {
        btn.classList.toggle("is-visible", window.scrollY > 480);
      },
      { passive: true }
    );
  }

  function initScrollReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || items.length === 0) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach(function (el) { observer.observe(el); });
  }

  function initAccordions() {
    document.querySelectorAll(".accordion").forEach(function (accordion) {
      accordion.querySelectorAll(".accordion-trigger").forEach(function (trigger) {
        var panel = document.getElementById(trigger.getAttribute("aria-controls"));
        trigger.addEventListener("click", function () {
          var expanded = trigger.getAttribute("aria-expanded") === "true";
          trigger.setAttribute("aria-expanded", String(!expanded));
          if (!expanded) {
            panel.style.maxHeight = panel.scrollHeight + "px";
          } else {
            panel.style.maxHeight = "0px";
          }
        });
      });
    });
    // Recalculate on resize (text reflow changes height)
    window.addEventListener("resize", function () {
      document.querySelectorAll('.accordion-trigger[aria-expanded="true"]').forEach(function (trigger) {
        var panel = document.getElementById(trigger.getAttribute("aria-controls"));
        if (panel) panel.style.maxHeight = panel.scrollHeight + "px";
      });
    });
  }

  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach(function (group) {
      var buttons = group.querySelectorAll(".tab-btn");
      var panels = group.querySelectorAll(".tab-panel");
      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          buttons.forEach(function (b) { b.setAttribute("aria-selected", "false"); });
          panels.forEach(function (p) { p.classList.remove("is-active"); });
          btn.setAttribute("aria-selected", "true");
          document.getElementById(btn.getAttribute("aria-controls")).classList.add("is-active");
        });
      });
    });
  }

  function initSurveyDemo() {
    var form = document.getElementById("clima-survey");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var feedback = document.getElementById("survey-feedback");
      if (feedback) {
        feedback.classList.add("is-visible");
        feedback.focus();
      }
      form.reset();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderHeader();
    renderFooter();
    initScrollProgress();
    initBackToTop();
    initScrollReveal();
    initAccordions();
    initTabs();
    initSurveyDemo();
  });
})();
