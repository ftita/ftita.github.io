(function () {
  "use strict";

  const header = document.getElementById("header");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const searchInput = document.getElementById("search");
  const searchBtn = document.getElementById("searchBtn");
  const stackChips = document.querySelectorAll(".stack-chip");
  const stackPanels = document.querySelectorAll(".stack-list[data-panel]");

  // Sticky header shadow
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      navMenu.classList.toggle("is-open", !open);
      document.body.style.overflow = open ? "" : "hidden";
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  // Carousel
  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    const prev = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");
    if (!track) return;

    const scrollAmount = () => {
      const card = track.querySelector(".card");
      return card ? card.offsetWidth + 8 : 400;
    };

    prev?.addEventListener("click", () => {
      track.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
    });

    next?.addEventListener("click", () => {
      track.scrollBy({ left: scrollAmount(), behavior: "smooth" });
    });
  });

  // Stack picker tabs
  stackChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const stack = chip.dataset.stack;
      stackChips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");

      stackPanels.forEach((panel) => {
        panel.classList.toggle("hidden", panel.dataset.panel !== stack);
      });
    });
  });

  // Project search filter
  function filterProjects(query) {
    const cards = document.querySelectorAll(".card[data-category]");
    const q = query.trim().toLowerCase();

    cards.forEach((card) => {
      const category = (card.dataset.category || "").toLowerCase();
      const title = card.querySelector(".card__title")?.textContent?.toLowerCase() || "";
      const desc = card.querySelector(".card__desc")?.textContent?.toLowerCase() || "";
      const match = !q || category.includes(q) || title.includes(q) || desc.includes(q);
      card.classList.toggle("is-hidden", !match);
    });
  }

  searchInput?.addEventListener("input", (e) => filterProjects(e.target.value));

  searchBtn?.addEventListener("click", () => {
    if (window.innerWidth < 960) {
      navToggle?.click();
    }
    searchInput?.focus();
  });

  // Smooth reveal on scroll (subtle)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".exp-card, .promo").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
})();
