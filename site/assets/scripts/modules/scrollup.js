import throttle from "lodash/throttle"

class ScrollUp {
    constructor() {
        this.scrollUpButton = document.querySelector(".btn--scroll-up")
        this.scrollThrottle = throttle(this.showScrollButton, 500).bind(this)
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
        console.log("Up")
    } else {
        // Direction Down
        this.scrollUpButton.classList.add("btn--scroll-up--visible")
    }
    this.scrollPos = (document.body.getBoundingClientRect()).top
    }

    scrollToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    
}

export default ScrollUp;