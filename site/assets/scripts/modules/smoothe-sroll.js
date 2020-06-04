import smoothscroll from 'smoothscroll-polyfill';

class SmoothScroll {
    constructor() {
        this.navLink = document.querySelectorAll(".primary-nav__link")
        this.events()
    }

    events() {
        this.navLink.forEach(el => {
            var target = document.querySelector(el.getAttribute("href"))
            el.addEventListener("click", e => this.scrollTo(e, target))
        })
    }

    scrollTo(e, target) {
        e.preventDefault()
        target.scrollIntoView({ behavior: 'smooth' });
    }

}

export default SmoothScroll;