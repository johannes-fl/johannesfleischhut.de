class AudioPlayer {
    constructor() {
        this.audioFile = document.querySelectorAll(".audio__audio-file")
        this.playButton = document.querySelectorAll(".audio__control--play")
        this.pauseButton = document.querySelectorAll(".audio__control--pause")
        this.events()
    }

    events() {
        this.playButton.forEach(el => {
            el.addEventListener("click", e => this.playAudio(el))
        })
        this.pauseButton.forEach(el => {
            el.addEventListener("click", e => this.pauseAudio(el))
        })
        
    }

    playAudio(el) {
            el.classList.remove("audio__control--active")
            el.parentElement.querySelector(".audio__control--pause").classList.add("audio__control--active")
    }

    pauseAudio(el) {
        el.classList.remove("audio__control--active")
        el.parentElement.querySelector(".audio__control--play").classList.add("audio__control--active")
}
}

export default AudioPlayer;