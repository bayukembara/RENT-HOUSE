const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
const modal = document.querySelector("#image-modal");
const modalImage = document.querySelector("#modal-image");
const modalCaption = document.querySelector("#modal-caption");
let activeImageIndex = 0;

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

function showModalImage(index) {
  const item = galleryItems[index];
  const image = item.querySelector("img");

  activeImageIndex = index;
  modalImage.src = item.getAttribute("href");
  modalImage.alt = image.alt;
  modalCaption.textContent = item.dataset.title || image.alt;
}

function openImageModal(index) {
  showModalImage(index);
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeImageModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  modalImage.src = "";
}

function moveModalImage(direction) {
  const nextIndex =
    (activeImageIndex + direction + galleryItems.length) % galleryItems.length;
  showModalImage(nextIndex);
}

galleryItems.forEach((item, index) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    openImageModal(index);
  });
});

document.querySelectorAll("[data-modal-close]").forEach((button) => {
  button.addEventListener("click", closeImageModal);
});

document
  .querySelector("[data-modal-prev]")
  .addEventListener("click", () => moveModalImage(-1));

document
  .querySelector("[data-modal-next]")
  .addEventListener("click", () => moveModalImage(1));

window.addEventListener("keydown", (event) => {
  if (!modal.classList.contains("is-open")) {
    return;
  }

  if (event.key === "Escape") {
    closeImageModal();
  }

  if (event.key === "ArrowLeft") {
    moveModalImage(-1);
  }

  if (event.key === "ArrowRight") {
    moveModalImage(1);
  }
});
