class AudioPlayer {
    constructor() {
        this.audioFile = document.querySelectorAll(".audio__audio-file")
        this.events()
    }

    events() {
        // Start Audio
        this.audioFile.forEach(el => {
            var playBtn = el.querySelector(".audio__control--play")
            var pauseBtn = el.querySelector(".audio__control--pause")
            var title = el.querySelector(".audio__title")
            var audio = el.querySelector("audio")
            var audioDuration = el.querySelector(".audio__duration")
            var forwardBtn = el.querySelector(".audio__control--forward")
            var replayBtn = el.querySelector(".audio__control--replay")
            var timeLine = el.querySelector(".audio__timeline")
            var timeProgress = el.querySelector(".audio__timeProgress") 
            var audioContent = el.querySelector(".audio__content")
            var canvas = el.querySelector(".audio__music-canvas")

            playBtn.addEventListener("click", e => this.playAudio(playBtn, pauseBtn, title, audio, audioDuration, audioContent)) 
            
            pauseBtn.addEventListener("click", e => this.pauseAudio(playBtn, pauseBtn, title, audio, audioContent, timeLine, canvas))  

            replayBtn.addEventListener("click", e => this.replayAudio(replayBtn, audio))  
            
            forwardBtn.addEventListener("click", e => this.forwardAudio(forwardBtn, audio)) 
            
            audio.addEventListener("timeupdate", e => this.shiftSeekbar(audio, timeLine, timeProgress))

            timeLine.addEventListener("mouseup", e => this.setCurrentTime(audio, timeLine))
        })

    }
    
    playAudio(playBtn, pauseBtn, title, audio, audioDuration, audioContent) {
        this.stopOtherAudio()
        audioDuration.innerHTML = this.fancyTimeFormat(audio.duration)
        playBtn.classList.remove("audio__control--active")
        pauseBtn.classList.add("audio__control--active")
        title.classList.add("audio__title--move")
        audioContent.classList.add("audio__content--active")
        audio.play()
    }

    pauseAudio(playBtn, pauseBtn, title, audio, audioContent) {
        playBtn.classList.add("audio__control--active")
        pauseBtn.classList.remove("audio__control--active")
        audioContent.classList.remove("audio__content--active")
        title.classList.remove("audio__title--move")  
        audio.pause()   
    }

    replayAudio(replayBtn, audio) {
        audio.currentTime -= 10;
        replayBtn.classList.remove("audio__control--replay--active")
        void replayBtn.offsetWidth
        replayBtn.classList.add("audio__control--replay--active")
    }

    forwardAudio(forwardBtn, audio) {
        audio.currentTime += 10;
        forwardBtn.classList.remove("audio__control--forward--active")
        void forwardBtn.offsetWidth
        forwardBtn.classList.add("audio__control--forward--active")
    }  
    
    shiftSeekbar(audio, timeLine, timeProgress) {
        let position = audio.currentTime / audio.duration;
  
        timeLine.value = position * 100;
        timeProgress.innerHTML = this.fancyTimeFormat(audio.currentTime)
    }

    setCurrentTime(audio, timeLine) {
        audio.currentTime = timeLine.value * audio.duration / 100
    }

    stopOtherAudio() {
        this.audioFile.forEach(el => {
            var canvas
            el.querySelector(".audio__control--play").classList.add("audio__control--active")
            el.querySelector(".audio__control--pause").classList.remove("audio__control--active")
            el.querySelector("audio").pause()
            el.querySelector(".audio__content").classList.remove("audio__content--active")
            setTimeout(function(el) {el.querySelector(".audio__timeline").value = 0}, 1, el)
        })
    }

    fancyTimeFormat(time) {   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
    }


}

export default AudioPlayer;