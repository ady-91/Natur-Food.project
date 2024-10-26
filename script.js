"use strict";

// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// ************************
// APPEAR AND DISSAPEAR THE MOBIBLE NAVIGATION
// ***********************
const navMob = document.querySelector(".nav__box");
const nav = document.querySelector(".nav__container");
const layer = document.querySelector(".layer");
const clickMobNav = document.querySelector(".mobile__nav");
const body = document.querySelector("body");
const closeNav = document.querySelector(".mobile__nav");
const sticky = document.querySelector(".sticky");

const toggleNav = function () {
  navMob.classList.toggle("nav__open");
  body.classList.toggle("no-scroll");

  if (navMob.classList.contains("nav__open")) {
    layer.classList.remove("hiddenn");
    layer.style.display = "block";
  } else {
    layer.style.display = "none";
  }
};

clickMobNav.addEventListener("click", toggleNav);
layer.addEventListener("click", function () {
  if (navMob.classList.contains("nav__open")) {
    toggleNav();
  }
});

// ************************
// APPEAR AND DISSAPEAR THE INFOR MORE-ABOUT-ME
// ***********************

const openModal = document.querySelector(".about__learn--more");
const modal = document.querySelector(".more__about--me");
const overlay = document.querySelector(".overlay");
const btnClose = document.querySelector(".more__about--me-close");

const openingModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  body.classList.add("no-scroll");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  body.classList.remove("no-scroll"); //
};
openModal.addEventListener("click", openingModal);
btnClose.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden"));
  closeModal();
});

//LINKS
document.querySelector("a").addEventListener("click", function (event) {
  event.preventDefault();
});

// ************************
// SHOW MORE BTN FUNCTIONALITY ABOUT THE PROJECTS I'VE BUILD
// ***********************
const showMoreBtn = document.querySelectorAll(".card__details--btn-more");

const showLessBtn = document.querySelectorAll(".card__details--btn-less");
const cardDetHidden = document.querySelectorAll(".card__details--text-hidden");

showMoreBtn.forEach(function (btn, i) {
  btn.addEventListener("click", function () {
    cardDetHidden[i].classList.remove("card__details--text-hidden");
    showMoreBtn[i].style.display = "none";
  });
});
showLessBtn.forEach(function (btn, i) {
  btn.addEventListener("click", function () {
    cardDetHidden[i].classList.add("card__details--text-hidden");
    showMoreBtn[i].style.display = "inline-block";
  });
});

// ************************
// SMOOTH SCROLLING
// ***********************

const links = document.querySelectorAll(
  ".nav__links--link, .footer__links--link, .nav__talk--href, .nav__logo--cont"
);

links.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const h = link.getAttribute("href");

    if (h === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    if (h !== "#" && h.startsWith("#")) {
      const sections = document.querySelector(h);
      sections.scrollIntoView({
        top: 0,
        behavior: "smooth",
      });
    }

    if (link.classList.contains("nav__links--link"))
      navMob.classList.toggle("nav__open");
    if (link.classList.contains("nav__talk--href"))
      navMob.classList.toggle("nav__open");
    layer.style.display = "none";
    layer.classList.toggle("hiddenn");
    body.classList.remove("no-scroll");
  });
});

// ************************
// Sticky navigation . Intesection Observer API
// *********************
const headerCont = document.querySelector(".header__container");

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
});

headerObserver.observe(headerCont);

// ************************
// VIEW ALL PROJECTS BTN FUNCTION
// *********************
const cardContainer = document.querySelector(".card__all--cont");
const viewAllBtn = document.querySelector(".card__btn--view-all");
const projHid = document.querySelectorAll(".card--hidden");

viewAllBtn.addEventListener("click", function () {
  projHid.forEach(function (card) {
    card.classList.toggle("card--hidden");
    cardContainer.style.display = "none";
  });
});

// ************************
// SECTION INTERSECTION OBSERVER
// *********************
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".section");
  let lastScrollY = window.scrollY;

  const options = {
    threshold: 0.02,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      const currentScrollY = window.scrollY;

      if (entry.isIntersecting && currentScrollY > lastScrollY) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });

    lastScrollY = window.scrollY;
  }, options);

  sections.forEach((section) => {
    observer.observe(section);
  });
});

// ************************
// APPEAR AND DISSAPEAR THE CERTIFICATES
// *********************
const fullScreen = document.querySelector("#fullscreen");
const fullscreenImage = document.querySelector(".fullscreen__image");
const fullScreenCont = document.querySelector(".fullscreen__container");
const btnCloseImg = document.querySelector(".btn__close");
const btnShowImg = document.querySelectorAll(".btn__show");

btnShowImg.forEach((button) => {
  button.addEventListener("click", function () {
    const imageNumber = this.getAttribute("data-image");
    const imageSrc = document.querySelector(`#image${imageNumber}`).src;
    fullscreenImage.src = imageSrc;
    fullScreen.classList.remove("hidden__container");
    body.classList.add("no-scroll");
  });
});

btnCloseImg.addEventListener("click", function () {
  fullScreen.classList.add("hidden__container");
  fullscreenImage.src = "";
  body.classList.remove("no-scroll");
});

fullScreenCont.addEventListener("click", function (event) {
  if (event.target === this) {
    fullScreen.classList.add("hidden__container");
    fullscreenImage.src = "";
    body.classList.remove("no-scroll");
  }
});
