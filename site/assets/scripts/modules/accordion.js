class Accordion {
    constructor() {
        this.openButton = document.querySelector(".biographie__link--further-content")
        this.closeButton = document.querySelector(".biographie__link--close")
        this.furtherContent = document.querySelector(".biographie__further-content")
        this.events()
    }

    events() {
        /* Open Click */
        this.openButton.addEventListener("click", ()=> this.openFurtherContent())

        /* Close Click */
        this.closeButton.addEventListener("click", ()=> this.closeFurtherContent())
    }

    /* Methods */

    openFurtherContent() {
        this.furtherContent.classList.add("biographie__further-content--active");
        this.furtherContent.style.maxHeight = (this.furtherContent.scrollHeight + 60) + "px";
    }

    closeFurtherContent() {
        this.furtherContent.classList.remove("biographie__further-content--active");
        this.furtherContent.style.maxHeight = null;
    }


}

export default Accordion;