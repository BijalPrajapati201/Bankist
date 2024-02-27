"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollToo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

/////////////////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
// Button scrolling
btnScrollToo.addEventListener("click", function (e) {
  // e.preventDefault();
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log("Current score", window.pageXOffset, window.pageYOffset);

  console.log(
    "Height/width",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  section1.scrollIntoView({ behavior: "smooth" });
});

////////////////////////////////////
// Page Navigation
// event delegation is used events bubble up
// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     console.log(id);
//     // read the ID at the section to first select id after than scrollIntoView
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

// 1. add element listener to commen parent element
// 2. Determine what element originated the event
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    // console.log(id);
    // Each element id to target
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Tabbed

// if all buttons are add to addEvent so first select in forEach and after then the select
// tabs.forEach((t) => t.addEventListener("click", () => console.log("TAB")));

tabsContainer.addEventListener("click", function (e) {
  // e.preventDefault();
  const click = e.target.closest(".operations__tab");
  // console.log(click);

  // Guard clause
  if (!click) return;

  // Remove active classes
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));
  // Acttive tab
  click.classList.add("operations__tab--active");

  // console.log(click.dataset.tab);
  document
    .querySelector(`.operations__content--${click.dataset.tab}`)
    .classList.add("operations__content--active");
});

//////////////////////////////////////////////////
//// Menu fade animation
// const handleHover = function (e, opacity) {
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const sibling = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    // console.log(sibling);
    // change the opacity to select a link\
    sibling.forEach((el) => {
      // console.log(el);
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// Sticky navigation  // it is not efficiant
// const initialCoorder = section1.getBoundingClientRect();
// // console.log(initialCoorder);

// window.addEventListener("scroll", function () {
//   // console.log(window.scrollY);
//   if (window.scrollY > initialCoorder.top) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// });

// Sticky navigation  // InterSection observ API
// it contain two parameters

/// it taken a two argument
// const obsCallback = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// };

// const obsOption = {
//   root: null,
//   threshold: [0, 1, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOption);
// observer.observe(section1);

const header = document.querySelector(".header");

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

////////////////////////////////////////////////////////////
// Reveal section
const allSection = document.querySelectorAll("section");

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
allSection.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

////////////////////////////////////////////////////////////
// Lazy Loding Image
const imgtarget = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace ser with data-src
  entry.target.src = entry.target.dataset.src;
  // console.log(entry.target.dataset.src);

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "-200px",
});

imgtarget.forEach((img) => {
  imgObserver.observe(img);
});

// Slider
const slide = function () {
  const slides = document.querySelectorAll(".slide");

  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");
  let curSlide = 0;

  const maxSlide = slides.length - 1;

  // slides.forEach((s, i) => {
  //   s.style.transform = `translateX(${100 * i})`;
  //   // 0%, 100%, 200%
  // });

  const creteDot = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforebegin",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activeDots = function (slide) {
    document.querySelectorAll("dots__dot").forEach((dot) => {
      dot.classList.remove("dots__dot--active");
    });

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)})`;
    });
  };

  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activeDots(curSlide);
  };

  const preSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activeDots(curSlide);
  };

  const int = function () {
    goToSlide(0);
    creteDot();
    activeDots(0);
  };

  int();

  // Event Handler
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", preSlide);
  // curSlide = 1; -100%, 0%, 100% 200%

  document.addEventListener("keydown", function (e) {
    // console.log(e);
    if (e.key === "ArrowLeft") preSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      console.log({ slide });
      goToSlide(slide);
      activeDots(slide);
    }
  });
};
slide();

// Bind method Example
// const f = {
//   f: "bijal",
//   d: "disha",
//   a() {
//     return this.f + this.d;
//   },
// };

// const q = {
//   f: "bijal",
//   d: "Fenny",
// };

// const s = f.a.bind(q);
// console.log(s());

// nav.addEventListener("mouseover", function (e) {
//   handleHover(e, 0.5);
// });
// nav.addEventListener("mouseout", function (e) {
//   handleHover(e, 1);
// });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// Selecting ELement
/*
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector(".header");
const allSection = document.querySelectorAll(".section");
console.log(allSection);

document.querySelector(".section--1");
const allButton = document.getElementsByTagName("button");
console.log(allButton);

console.log(document.getElementsByClassName("btn"));

// Creating and inserting
// insertAdjacentHTML

const message = document.createElement("div");
message.classList.add("cookie--message");
message.innerHTML =
  'We use cookie functionality,<button class="btn btn--cookie-message">Got it! </button>';

// add to first child
// header.prepend(message);
// last child it is not inset element it move and it exist only one place at the time
header.append(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

//// Delete element
document.querySelector(".btn").addEventListener("click", function () {
  // message.remove();
  message.parentElement.removeChild(message);
});

// Style
// it is work inline style
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

// content all property and value
console.log(getComputedStyle(message));

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

// root is document element
document.documentElement.style.setProperty("--color-primary", "orange");

// Attribute
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.className);

logo.alt = "Beautiful log";

// Non standard
console.log(logo.designer);
console.log(logo.getAttribute("designer"));
logo.setAttribute("company", "Bankist");
console.log(logo.src);
console.log(logo.getAttribute("src"));

const link = document.querySelector(".nav__link--btn");
console.log(link.href);
console.log(link.getAttribute("href"));

// Data Attribute
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add("c");
logo.classList.remove("c");
logo.classList.contains("c");
logo.classList.toggle("c"); // not includes

// DOnt use
// logo.className = "jonas";


const btnScrollToo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollToo.addEventListener("click", function (e) {
  // e.preventDefault();
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log("Current score", window.pageXOffset, window.pageYOffset);

  console.log(
    "Height/width",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  section1.scrollIntoView({ behavior: "smooth" });
});

// Listener Events , Mouse Event
const h1 = document.querySelector("h1");

const alertH1 = function (e) {
  alert("You are looking the heading");
};
h1.addEventListener("mouseenter", alertH1);

setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000);

// simple multiple event
// h1.onmouseenter = function (e) {
//   alert("You are looking the heading");
// };

////// Event propagation : Bubbling and capturing
////// Event propagation : Bubbling and capturing
// it means one place to another palce it call event propaagtion

// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// console.log(randomColor(0, 255)); it is work all only one event
// Bubbling method is child element event to change parent element if it stop than stopPropagation() function
document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("LINK", e.target, e.currentTarget);
  console.log(e.currentTarget === this);
  e.stopPropagation();
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("LINK", e.target, e.currentTarget);

  e.stopPropagation();
});

document.querySelector(".nav").addEventListener(
  "click",
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log("LINK", e.target, e.currentTarget);
    e.stopPropagation();
  },
  true
);
// if it true than bubbling event to upper running to element


/////////////////////////////
/////////// DOM TRAVERSING
const h1 = document.querySelector("h1");

// Going downward: child element
console.log(h1);
console.log(h1.querySelectorAll(".highlight"));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = "white";
h1.lastElementChild.style.color = "orangered";

// Going Upwards : parent access to the parent
console.log(h1.parentElement);
console.log(h1.parentNode);

// closest is target a every element to the page
// it is opposite off querySelector
// h1.closest(".header").style.background = "yellow";
// h1.closest("h1").style.background = "yellow";

//// Going to the sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = "scale(0.5)";
});
*/

document.addEventListener("DOMContentLoaded", function (e) {
  console.log("HTML Loaded", e);
});

window.addEventListener("load", function (e) {
  console.log("Page fully loaded", e);
});

// window.addEventListener("beforeunload", function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = "";
// });
