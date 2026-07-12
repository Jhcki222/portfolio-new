const renderTags = (tags) => tags.map((tag) => `<li>${tag}</li>`).join("");

const renderLinks = (links = []) => {
  if (!links.length) return "";

  return `
    <div class="project-links">
      ${links
        .map(
          (link) =>
            `<a class="project-link" href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>`
        )
        .join("")}
    </div>
  `;
};

export const renderExperiences = (experiences, selector = "[data-experience-list]") => {
  const list = document.querySelector(selector);
  if (!list) return;

  list.innerHTML = experiences
    .map(
      (item) => `
        <article class="timeline-card">
          <span class="timeline-date">${item.date}</span>
          <div class="timeline-copy">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
          ${
            item.image
              ? `<figure class="timeline-photo">
                  <img src="${item.image}" alt="${item.imageAlt || item.title}" />
                </figure>`
              : ""
          }
        </article>
      `
    )
    .join("");
};

export const renderProjects = (projects, selector = "[data-project-list]") => {
  const list = document.querySelector(selector);
  if (!list) return;

  list.innerHTML = projects
    .map(
      (project, index) => `
        <article class="project-card">
          <span class="project-number">${String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3>${project.name}</h3>
            <p>${project.summary}</p>
          </div>
          <div class="project-meta">
            <ul class="project-tags">${renderTags(project.tags)}</ul>
            ${renderLinks(project.links)}
          </div>
        </article>
      `
    )
    .join("");
};

export const renderSkills = (skills, selector = "[data-skill-list]") => {
  const list = document.querySelector(selector);
  if (!list) return;

  list.innerHTML = skills
    .map(
      ([category, items]) => `
        <article class="skill-card">
          <h3>${category}</h3>
          <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
        </article>
      `
    )
    .join("");
};
