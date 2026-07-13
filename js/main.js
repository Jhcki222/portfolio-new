import { albums, commandExamples, experiences, pageRoutes, projects, sectionKeywords, skills } from "./data.js";
import { setupCommandBar, setupCommandTyping } from "./commandBar.js";
import { setActivePageLinks, setupBackToTop, setupMobileMenu } from "./navigation.js";
import { renderAlbums, renderExperiences, renderProjects, renderSkills } from "./render.js";

renderExperiences(experiences);
renderProjects(projects);
renderSkills(skills);
renderAlbums(albums);
setActivePageLinks();
setupMobileMenu();
setupBackToTop();
setupCommandBar(sectionKeywords, pageRoutes);
setupCommandTyping(commandExamples);
