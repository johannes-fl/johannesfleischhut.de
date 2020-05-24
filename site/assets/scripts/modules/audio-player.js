class AudioPlayer {
    constructor() {
        this.audioFile = document.querySelectorAll(".audio__audio-file")
        this.playButton = document.querySelectorAll(".audio__control--play")
        this.pauseButton = document.querySelectorAll(".audio__control--pause")
        this.replayButton = document.querySelectorAll(".audio__control--replay")
        this.forwardButton = document.querySelectorAll(".audio__control--forward")
        this.hasEnded = document.querySelectorAll("audio")
        this.events()
    }

    events() {
        this.playButton.forEach(el => {
            el.addEventListener("click", e => this.playAudio(el))
        })
        this.pauseButton.forEach(el => {
            el.addEventListener("click", e => this.pauseAudio(el))
        })
        this.replayButton.forEach(el => {
            el.addEventListener("click", e => this.replayAudio(el))
        })
        this.forwardButton.forEach(el => {
            el.addEventListener("click", e => this.forwardAudio(el))
        }) 
        this.hasEnded.forEach(el => {
            el.addEventListener("ended", e => this.stopAudio(el))
        })
    }

    playAudio(el) {
        var audio = el.parentElement.querySelector("audio")
        
        el.classList.remove("audio__control--active")
        el.parentElement.querySelector(".audio__control--pause").classList.add("audio__control--active")
        audio.play()
    }

    pauseAudio(el) {
        var audio = el.parentElement.querySelector("audio")

        el.classList.remove("audio__control--active")
        el.parentElement.querySelector(".audio__control--play").classList.add("audio__control--active")
        audio.pause()
    } 

    stopAudio(el) {
        el.parentElement.parentElement.querySelector(".audio__control--play").classList.add("audio__control--active")
        el.parentElement.parentElement.querySelector(".audio__control--pause").classList.remove("audio__control--active")
    }

    replayAudio(el) {
        var audio = el.parentElement.querySelector("audio")

        el.classList.remove("audio__control--replay--active")
        void el.offsetWidth
        el.classList.add("audio__control--replay--active")
        audio.currentTime -= 10;
    }

    forwardAudio(el) {
        var audio = el.parentElement.querySelector("audio")

        el.classList.remove("audio__control--forward--active")
        void el.offsetWidth
        el.classList.add("audio__control--forward--active")
        audio.currentTime += 10;
    }


}

export default AudioPlayer;