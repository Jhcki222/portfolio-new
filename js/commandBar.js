const showToast = (message) => {
  const toast = document.querySelector("[data-toast]");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 1600);
};

const findTargetPage = (value, sectionKeywords) =>
  Object.entries(sectionKeywords).find(([, keywords]) =>
    keywords.some((keyword) => value.includes(keyword.toLowerCase()))
  )?.[0] || "projects";

export const setupCommandBar = (sectionKeywords, pageRoutes) => {
  const form = document.querySelector("[data-command-form]");
  const input = document.querySelector("[data-command-input]");
  const suggestions = document.querySelector("[data-command-suggestions]");
  if (!form || !input || !suggestions) return;

  const showSuggestions = () => {
    suggestions.classList.add("is-visible");
  };

  const hideSuggestions = () => {
    suggestions.classList.remove("is-visible");
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input.value.trim().toLowerCase();

    if (!value) {
      showSuggestions();
      return;
    }

    const target = findTargetPage(value, sectionKeywords);
    showToast("페이지로 이동합니다.");
    window.setTimeout(() => {
      window.location.href = pageRoutes[target];
    }, 180);
  });

  input.addEventListener("click", showSuggestions);
  input.addEventListener("focus", showSuggestions);

  document.addEventListener("click", (event) => {
    if (form.contains(event.target) || suggestions.contains(event.target)) return;
    hideSuggestions();
  });
};

export const setupCommandTyping = (examples) => {
  const input = document.querySelector("[data-command-input]");
  if (!input) return;

  let exampleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  const type = () => {
    if (document.activeElement === input || input.value) {
      window.setTimeout(type, 500);
      return;
    }

    const currentText = examples[exampleIndex];
    input.placeholder = currentText.slice(0, charIndex);

    if (!isDeleting && charIndex === currentText.length) {
      isPaused = true;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      exampleIndex = (exampleIndex + 1) % examples.length;
    }

    const delay = isPaused ? 1200 : isDeleting ? 42 : 88;
    isPaused = false;
    charIndex += isDeleting ? -1 : 1;
    window.setTimeout(type, delay);
  };

  type();
};
