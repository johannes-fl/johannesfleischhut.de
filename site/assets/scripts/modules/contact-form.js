class ContactForm {
    constructor() {
        this.injectHTML()
        this.contactForm = document.querySelector(".contact-form")
        this.closeIcon = document.querySelector(".contact-form__close")
        this.events()
    }

    events() {
        // listen for close Click
        this.closeIcon.addEventListener("click", () => this.closeTheContactForm())

        // pushes any key
        document.addEventListener("keyup", e => this.keyPressHandler(e))
    }

    keyPressHandler(e) {
        if (e.keyCode == 27) {
            this.closeTheContactForm()
        }
    }
    
    openTheContactForm(e) {
        // e ist das aktuelle Event, also der Klick auf einen der Buttons. preventDefault verhindert, dass das "#" aus dem btn Link tatsächlich an die URL angehängt wird.
        this.contactForm.classList.add("contact-form--is-visible")
    }

    closeTheContactForm() {
        this.contactForm.classList.remove("contact-form--is-visible")
    }
    

    injectHTML() {
        document.body.insertAdjacentHTML("beforeend", `
        <div class="contact-form">
            <div class="contact-form__inner">
                <h2 class="section-title section-title--blue section-title--less-margin"><img src="assets/images/icons/mail.svg" class="section-title__icon"> Nehmen Sie <strong>Kontakt</strong> auf</h2>

                <div class="wrapper wrapper--narrow">
                    <p class="contact-form__description">Demnächst ist hier ein Kontaktformular. Bis dahin freue ich mich über Ihre Kontaktaufnahme über eine dieser Plattformen.</p>
                </div>
        
                <div class="social-icons--contact-form">
                    <a target="_blank" href="https://www.facebook.com/johannes.fleischhut" class="social-icons--contact-form__icon"><img src="assets/images/icons/facebook.svg" alt="Facebook"></a>
                    <a target="_blank" href="https://twitter.com/johWebDev" class="social-icons--contact-form__icon"><img src="assets/images/icons/twitter.svg" alt="Twitter"></a>
                    <a target="_blank" href="https://www.instagram.com/jo_hannes.fl/" class="social-icons--contact-form__icon"><img src="assets/images/icons/instagram.svg" alt="Instagram"></a>
                    <a target="_blank" href="https://www.youtube.com/channel/UCbM8d1rCmWZs0zO9eI_xYLA?view_as=subscriber" class="social-icons--contact-form__icon"><img src="assets/images/icons/youtube.svg" alt="YouTube"></a>
                </div>
            </div>
            <div class="contact-form__close">X</div>
        </div>
        `)
    }
}

export default ContactForm;