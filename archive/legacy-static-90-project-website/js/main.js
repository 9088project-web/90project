(() => {
  const whatsappNumber = "601110977166";
  const whatsappMessage = "你好，我想询问 90 PROJECT 的餐饮/活动服务。日期： 人数： 地点： 服务需求：";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const body = document.body;
  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");
  const year = document.querySelector("[data-year]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    link.setAttribute("href", whatsappUrl);
  });

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const closeNav = () => {
    body.classList.remove("nav-open");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "打开菜单");
    }
  };

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "关闭菜单" : "打开菜单");
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        closeNav();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeNav();
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;

      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });

      history.pushState(null, "", id);
    });
  });

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
})();
