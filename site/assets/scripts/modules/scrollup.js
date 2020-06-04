import throttle from "lodash/throttle"
import smoothscroll from 'smoothscroll-polyfill';

class ScrollUp {
    constructor() {
        this.scrollUpButton = document.querySelector(".btn--scroll-up")
        this.scrollThrottle = throttle(this.showScrollButton, 500).bind(this)
        this.smoothScrolling = smoothscroll.polyfill(this.scrollToTop)
        this.scrollPos = 0;
        this.events()
    }

    events() {
        document.addEventListener("scroll", this.scrollThrottle)
        this.scrollUpButton.addEventListener("click", this.scrollToTop)

    }

    showScrollButton() {
    if ((document.body.getBoundingClientRect()).top > this.scrollPos) {
        // Direction Up
        this.scrollUpButton.classList.remove("btn--scroll-up--visible") 
    } else {
        // Direction Down
        this.scrollUpButton.classList.add("btn--scroll-up--visible")
    }
    this.scrollPos = (document.body.getBoundingClientRect()).top
    }

    scrollToTop() {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        // document.body.scrollTop = 0;
        // document.documentElement.scrollTop = 0;
    }
    
}

export default ScrollUp;