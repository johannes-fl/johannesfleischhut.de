import "../styles/styles.css"
import MobileMenu from "./modules/mobile-menu"
import Accordion from "./modules/accordion"

let mobileMenu = new MobileMenu();
let accordion = new Accordion();

if(module.hot) {
        module.hot.accept();
    }
    