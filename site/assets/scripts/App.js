import "../styles/styles.css"
import "lazysizes"
import MobileMenu from "./modules/mobile-menu"
import Accordion from "./modules/accordion"
import AudioPlayer from "./modules/audio-player"

let audioPlayer = new AudioPlayer();

let mobileMenu = new MobileMenu();
// let accordion = new Accordion();

// CodeSplitting: Variable für modal definieren, aber zunächst keinem Objekt zuordnen
let accordion;

// Eventhandler: Wenn ein Btn mit der cl open-modal geklickt wird, wird erstmal der Variable modal die entsprechende Klasse aus dem Modul zugeordnet und so geladen. Anschließend wird das Modal geöffnet.
document.querySelector(".biographie__link--further-content").addEventListener("click", e => {
        e.preventDefault()
        if (typeof accordion == "undefined") {
            import(/* webpackChunkName: "accordion" */"./modules/accordion").then(x => {
                accordion = new x.default()
                setTimeout(() => accordion.openFurtherContent(), 20)
            }).catch(() => console.log("There was a Problem"))
        } else {
            accordion.openFurtherContent()
        }
    })


if(module.hot) {
        module.hot.accept();
    }