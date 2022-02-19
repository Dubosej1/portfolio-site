("use strict");

//////////Selectors//////////

const header = document.querySelector("#header");
const aboutSection = document.querySelector("#about");
const projectsSection = document.querySelector("#projects");
const contactSection = document.querySelector("#contact");
const homeLink = document.querySelector(".header");
const aboutLink = document.querySelector(".about");
const projectsLink = document.querySelector(".projects");
const contactLink = document.querySelector(".contact");
const nav = document.querySelector(".nav");
const navLogo = document.querySelector(".nav__logo");
const mobileNav = document.querySelector(".mobileNav");
const mobileNavBtn = document.querySelector(".mobileNav__img");
const mobileNavLinks = Array.from(
  document.querySelectorAll(".mobileNav__link")
);

console.log(mobileNavLinks);

//////////Global Variables//////////

let obsOptions = { root: null, threshold: 0 };

//////////Sticky Navigation Bar//////////

function stickyNav(obsOptions) {
  const navHeight = navLogo.getBoundingClientRect().height;
  obsOptions.rootMargin = `-${navHeight}px`;

  const stickyNavCB = function (entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
  };

  const stickyNavObserver = new IntersectionObserver(stickyNavCB, obsOptions);

  stickyNavObserver.observe(header);
}

stickyNav(obsOptions);

//////////Mobile Nav Menu Functionality//////////

function displayNavMenu() {
  mobileNav.style.display = "block";
  mobileNavBtn.removeEventListener("click", displayNavMenu);
  mobileNavBtn.addEventListener("click", removeNavMenu);
}

function removeNavMenu() {
  mobileNav.style.display = "none";
  mobileNavBtn.removeEventListener("click", removeNavMenu);
  mobileNavBtn.addEventListener("click", displayNavMenu);
}

mobileNavLinks.forEach(function (mov) {
  mov.addEventListener("click", function () {
    mobileNav.style.display = "none";
  });
});

mobileNavBtn.addEventListener("click", displayNavMenu);

//////////Scrolling Elements//////////

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//////////Nav Bar: Active Link Highlighting//////////

// const highlightNavLink = function(entries) {
//   const [entry] = entries;
//   console.log(entry);
//   console.log(entry.target.id);
//
//   if (entry.isIntersecting) document.querySelector(`.${entry.target.id}`).classList.add('nav__link-active');
//   else document.querySelector(`.${entry.target.id}`).classList.remove('nav__link-active');
// };
//
// const navLinkObserver = new IntersectionObserver(highlightNavLink, obsOptions);
//
// navLinkObserver.observe(header);
// navLinkObserver.observe(about);
// navLinkObserver.observe(projects);
// navLinkObserver.observe(contact);

// const headerCoord = header.getBoundingClientRect();
// const aboutCoord = aboutSection.getBoundingClientRect();
// const projectsCoord = projectsSection.getBoundingClientRect();
// const contactCoord = contactSection.getBoundingClientRect();
//
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   if(window.scrollY > headerCoord.top && window.scrollY < aboutCoord.top) {
//     homeLink.classList.add('nav__link-active');
//     aboutLink.classList.remove('nav__link-active');
//   } else if(window.scrollY > aboutCoord.top && window.scrollY < projectsCoord.top) {
//     homeLink.classList.remove('nav__link-active');
//     aboutLink.classList.add('nav__link-active');
//     projectsLink.classList.remove('nav__link-active');
//   } else if(window.scrollY > projectsCoord.top && window.scrollY < contactCoord.top) {
//     aboutLink.classList.remove('nav__link-active');
//     projectsLink.classList.add('nav__link-active');
//     contactLink.classList.remove('nav__link-active');
//   } else if(window.scrollY > contactCoord.top) {
//     projectsLink.classList.remove('nav__link-active');
//     contactLink.classList.add('nav__link-active');
//   }
// });
// console.log(aboutCoord.top);
// console.log(projectsCoord.top);
// console.log(contactCoord.top);
