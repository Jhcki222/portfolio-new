export const setActivePageLinks = () => {
  const currentPage = document.body.dataset.page;
  if (!currentPage) return;

  document.querySelectorAll("[data-page-link]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.pageLink === currentPage);
  });
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

export const setupBackToTop = () => {
  const button = document.querySelector("[data-back-to-top]");
  if (!button) return;

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};
