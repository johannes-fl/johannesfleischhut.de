class MobileMenu {
    constructor() {
        this.menuIcon = document.querySelector(".site-header__menu-icon")
        this.menuContent = document.querySelector(".site-header__menu-content")
        this.siteHeader = document.querySelector(".site-header")
        this.navLink = document.querySelectorAll(".primary-nav__link")
        this.events()
    }

    events() {
        /* Menü-Icon Klick*/
        this.menuIcon.addEventListener("click", ()=> this.toggleTheMenu())
        
        /* Jeglicher Klick auf Nav-Liste*/
        for (const link of this.navLink) {
            link.addEventListener("click", ()=> this.toggleTheMenu())
          }
    }

    // Methods
    toggleTheMenu() {
        this.menuContent.classList.toggle("site-header__menu-content--is-visible");
        this.siteHeader.classList.toggle("site-header--is-expanded");
        this.menuIcon.classList.toggle("site-header__menu-icon--close-x");
    }
}

export default MobileMenu;