const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function setActiveNav() {
  const scrollPosition = window.scrollY + window.innerHeight * 0.35;
  let activeSection = sections[0];

  sections.forEach((section) => {
    if (section.offsetTop <= scrollPosition) {
      activeSection = section;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeSection.id}`;
    link.classList.toggle("is-active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

setActiveNav();
window.addEventListener("scroll", setActiveNav, { passive: true });
window.addEventListener("resize", setActiveNav);
