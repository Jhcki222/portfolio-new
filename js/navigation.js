const setActiveTab = (id) => {
  document.querySelectorAll(".tab-link").forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
  });
};

export const observeSections = (selector = "[data-section]") => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveTab(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );

  document.querySelectorAll(selector).forEach((section) => observer.observe(section));
};

export const setupMobileMenu = () => {
  const button = document.querySelector("[data-menu-button]");
  const tabs = document.querySelector(".section-tabs");
  if (!button || !tabs) return;

  button.addEventListener("click", () => {
    tabs.classList.toggle("is-open");
  });

  tabs.addEventListener("click", (event) => {
    if (event.target.matches(".tab-link")) tabs.classList.remove("is-open");
  });
};
