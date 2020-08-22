/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */
const sections = document.querySelectorAll("section");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */
function getSectionTop(element) {
  var bodyRect = document.body.getBoundingClientRect(),
    sectionRect = element.getBoundingClientRect(),
    offset = sectionRect.top - bodyRect.top ;

  return offset;
}

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();

  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.left <
      (window.innerWidth ||
        document.documentElement.clientWidth) /* or $(window).width() */ &&
    rect.top <
      (window.innerHeight ||
        document.documentElement.clientHeight) /* or $(window).height() */
  );
}
//console.log(isElementInViewport(section3));
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const mainNav = document.querySelector("nav ul");

for (let i = 0; i < sections.length; i++) {
  let ancorTag = document.createElement("a");
  //create li element
  let liTag = document.createElement("li");
  //set li textNode
  let textOfLi = document.createTextNode(sections[i].getAttribute("data-nav"));
  liTag.appendChild(textOfLi);
  ancorTag.appendChild(liTag);
  //ancorTag.setAttribute("href", "#" + sections[i].getAttribute("id"));
  ancorTag.setAttribute("class", sections[i].getAttribute("id"));
  mainNav.appendChild(ancorTag);

  // ancorTag.classList.add('menu__link')
  //console.log(textOfLi);
}

// Add class 'active' to section when near top of viewport

let observer = new IntersectionObserver((entries) => {
  console.log(entries);
  // If intersectionRatio is 0, the target is out of view
  // and we do not need to do anything.
  entries.forEach((entry) => {
    const anchorClass=entry.target.getAttribute('id');
    //console.log(anchorClass) ;
     const activeAnchor=document.getElementsByClassName(anchorClass)[0];
     
    if (entry.intersectionRatio <= 0) {
      if (entry.target.classList.contains("your-active-class"))
        entry.target.classList.remove("your-active-class");
       
        activeAnchor.style.color="white";
      return;
    } else {
      entry.target.classList.add("your-active-class");    
      //console.log(activeAnchor);
      activeAnchor.style.color="red";
    }
  });
});
sections.forEach((section) => {
  observer.observe(section);
});

// Scroll to anchor ID using scrollTO event
let liTags = document.querySelectorAll("nav ul a");
//add click event to a tags
liTags.forEach((liTag) => {
  liTag.addEventListener("click", scrollfun);
});
function scrollfun(e) {
  //get section by attribute value
  let sectitle=e.target.textContent;
  let sectionElement=document.querySelector('[data-nav="'+sectitle+'"]');
  //console.log(section);
  //get section top to scroll to it 
 const sectionTop= getSectionTop(sectionElement);
  window.scrollTo({
    top: sectionTop+150,
    behavior: "smooth",
  });
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active
