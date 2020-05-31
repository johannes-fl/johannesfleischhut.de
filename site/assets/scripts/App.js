import "../styles/styles.css"
import "lazysizes"
import MobileMenu from "./modules/mobile-menu"
import Accordion from "./modules/accordion"
import AudioPlayer from "./modules/audio-player"
import "./modules/audio-visualizer"
import CopyText from "./modules/copy-text"

let copyText = new CopyText();

let audioPlayer = new AudioPlayer();

let mobileMenu = new MobileMenu();

let accordion = new Accordion();

if(module.hot) {
        module.hot.accept();
    }