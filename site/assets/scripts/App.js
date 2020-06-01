import "../styles/styles.css"
import "lazysizes"
import MobileMenu from "./modules/mobile-menu"
import Accordion from "./modules/accordion"
import AudioPlayer from "./modules/audio-player"
import CopyText from "./modules/copy-text"
import ScrollUp from "./modules/scrollup"

let scrollUp = new ScrollUp();

let copyText = new CopyText();

let audioPlayer = new AudioPlayer();

let mobileMenu = new MobileMenu();

let accordion = new Accordion();

// CodeSplitting: Variable für modal definieren, aber zunächst keinem Objekt zuordnen
let contactForm;

// Eventhandler: Wenn ein Btn mit der cl open-modal geklickt wird, wird erstmal der Variable modal die entsprechende Klasse aus dem Modul zugeordnet und so geladen. Anschließend wird das Modal geöffnet.
document.querySelectorAll(".open-contact-form").forEach(el => {
    el.addEventListener("click", e => {
        e.preventDefault()
        if (typeof modal == "undefined") {
            import(/* webpackChunkName: "contactForm" */"./modules/contact-form").then(x => {
                contactForm = new x.default()
                setTimeout(() => contactForm.openTheContactForm(), 20)
            }).catch(() => console.log("There was a Problem"))
        } else {
            modal.openTheContactForm()
        }
    })
})

if(module.hot) {
        module.hot.accept();
    }