import { commandExamples, experiences, projects, sectionKeywords, skills } from "./data.js";
import { setupCommandBar, setupCommandTyping } from "./commandBar.js";
import { observeSections, setupMobileMenu } from "./navigation.js";
import { renderExperiences, renderProjects, renderSkills } from "./render.js";

renderExperiences(experiences);
renderProjects(projects);
renderSkills(skills);
observeSections();
setupMobileMenu();
setupCommandBar(sectionKeywords);
setupCommandTyping(commandExamples);
