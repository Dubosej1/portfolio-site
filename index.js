
//Adds sticky navigation bar when user scrolls past the header section
const stickyNavObserver = {
    nav: document.querySelector(".nav"),
    navLogo: document.querySelector(".nav__logo"),
    header: document.querySelector("#header"),
    obsOptions: { root: null, threshold: 0 },

    //Factors the Nav Logo Height into the margins of the viewport, when the intersection
    //observer calculates
    get rootMargin () {
        let navHeight = this.navLogo.getBoundingClientRect().height;
        return `-${navHeight}px`;
    },

    obsCallback (entries) {
        const [entry] = entries;

        //toggles adding the sticky class to the nav bar
        if (!entry.isIntersecting) stickyNavObserver.nav.classList.add("sticky");
        else stickyNavObserver.nav.classList.remove("sticky");
    },

    executeObserver() {
        this.obsOptions.rootMargin = this.rootMargin;

        const stickyNavObserver = new IntersectionObserver(this.obsCallback, this.obsOptions);

        stickyNavObserver.observe(header);
    },
}

//Add functionality for the Mobile Nav Btn to toggle displaying the mobile nav menu
const mobileNavMenu = {
    menu: document.querySelector(".mobile-nav"),
    menuToggleBtn: document.querySelector(".btn__mobile-nav"),
    navLinks: Array.from(document.querySelectorAll(".mobile-nav__link")),
    

    displayMenu (e) {
        this.toggleDisplayMenu(true);

        this.menuToggleBtn.removeEventListener("click", this.displayMenuClbk);

        this.removeMenuClbk = this.removeMenu.bind(this);
        this.menuToggleBtn.addEventListener("click", this.removeMenuClbk);
    },

    removeMenu(e) {
        this.toggleDisplayMenu(false);

        this.menuToggleBtn.removeEventListener("click", this.removeMenuClbk);
        this.addDisplayMenuEventListener();
    },

    toggleDisplayMenu(toggle) {
        toggle ? this.menu.classList.remove(`display-none`) : this.menu.classList.add(`display-none`);
    },

    addDisplayMenuEventListener() {
        this.displayMenuClbk = this.displayMenu.bind(this);

        this.menuToggleBtn.addEventListener("click", this.displayMenuClbk);
    },

    //Adds Event Listeners so that when a mobile nav link is clicked, the menu closes
    addLinkEventListeners() {
        this.navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
              mobileNavMenu.toggleDisplayMenu(false);
            });
        });
    },
}

//Reveals sections of the page as the user scrolls towards them
const sectionRevealer = {
    allSections: document.querySelectorAll(".section"),

    //Callback for the intersection observer
    obsCallback (entries, observer) {
        const [entry] = entries;

        if (!entry.isIntersecting) return;
      
        //removes the class which hides the section, revealing the section
        entry.target.classList.remove("section--hidden");
        //removes the intersection observer from the section, making it one time use only
        observer.unobserve(entry.target);
    },

    executeObserver () {
        let obsOptions = {root: null, threshold: 0.15};

        const sectionObserver = new IntersectionObserver(this.obsCallback, obsOptions);
          
        this.allSections.forEach(function (section) {
            sectionObserver.observe(section);
            //Adds the class which hides the section from the page
            section.classList.add("section--hidden");
          });
    },
}

//Calculates and applies various CSS values by the Nav Bar dimensions
const navBarCalculator = {
    navBar: document.querySelector(".nav"),
    navLogo: document.querySelector(".nav__logo"),
    mobileNavMenu: document.querySelector(".mobile-nav"),
    aboutSection: document.querySelector("#about"),
    projectsSection: document.querySelector("#projects"),

    get navBarHeight () {
        let height = this.navBar.getBoundingClientRect().height;
        return `${height}px`;
    },

    //Calculates the padding-top value of certain sections, so that the sticky nav bar...
    //isn't blocking the section titles
    applySectionMarginsByNavBar () {
        let paddingValue = `calc(${this.navBarHeight} + 0.25rem)`;
        this.aboutSection.style.paddingTop = paddingValue;
        this.projectsSection.style.paddingTop = paddingValue;
    },

    //Calculates the padding-top value of the mobile nav menu, so that it's not to large...
    //and blocking the page elements
    calcMobileNavMenuHeightByNavBar () {
        this.mobileNavMenu.style.paddingTop = `calc(${this.navBarHeight} + 0.5rem)`;
    }
}

//Initializes the script
function init() {
    stickyNavObserver.executeObserver();
    mobileNavMenu.addLinkEventListeners();

    navBarCalculator.applySectionMarginsByNavBar();
    navBarCalculator.calcMobileNavMenuHeightByNavBar();

    mobileNavMenu.addDisplayMenuEventListener();
    sectionRevealer.executeObserver();
}

init();