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
            var time = el.querySelector(".audio__time")
            var timeLine = el.querySelector(".audio__timeline")
            var timeProgress = el.querySelector(".audio__timeProgress") 
            var audioContent = el.querySelector(".audio__content")
            var canvas = el.querySelector(".audio__music-canvas")

            playBtn.addEventListener("click", e => this.playAudio(playBtn, pauseBtn, title, audio, audioDuration, audioContent, time)) 

            playBtn.addEventListener("click", e => this.visualizeAudio(audio, canvas))
            
            pauseBtn.addEventListener("click", e => this.pauseAudio(playBtn, pauseBtn, title, audio, audioContent, timeLine, canvas))  

            replayBtn.addEventListener("click", e => this.replayAudio(replayBtn, audio))  
            
            forwardBtn.addEventListener("click", e => this.forwardAudio(forwardBtn, audio)) 
            
            audio.addEventListener("timeupdate", e => this.shiftSeekbar(audio, timeLine, timeProgress))

            timeLine.addEventListener("mouseup", e => this.setCurrentTime(audio, timeLine))
        })

    }
    
    playAudio(playBtn, pauseBtn, title, audio, audioDuration, audioContent, time) {
        this.stopOtherAudio()
        audioDuration.innerHTML = this.fancyTimeFormat(audio.duration)
        playBtn.classList.remove("audio__control--active")
        pauseBtn.classList.add("audio__control--active")
        title.classList.add("audio__title--move")
        audioContent.classList.add("audio__content--active")
        time.classList.add("audio__time--active")
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
            el.querySelector(".audio__title").classList.remove("audio__title--move")
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


    // AUDIO KONTEXT

    visualizeAudio(audio, canvas) {
        // Set up audio context
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();

        /**
         * Retrieves audio from an external source, the initializes the drawing function
         * @param {String} url the url of the audio we'd like to fetch
         */
        const drawAudio = url => {
        fetch(url)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
            .then(audioBuffer => draw(normalizeData(filterData(audioBuffer))));
        };

        /**
         * Filters the AudioBuffer retrieved from an external source
         * @param {AudioBuffer} audioBuffer the AudioBuffer from drawAudio()
         * @returns {Array} an array of floating point numbers
         */
        const filterData = audioBuffer => {
        const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
        const samples = 140; // Number of samples we want to have in our final data set
        const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
        const filteredData = [];
        for (let i = 0; i < samples; i++) {
            let blockStart = blockSize * i; // the location of the first sample in the block
            let sum = 0;
            for (let j = 0; j < blockSize; j++) {
            sum = sum + Math.abs(rawData[blockStart + j]); // find the sum of all the samples in the block
            }
            filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
        }
        return filteredData;
        };

        /**
         * Normalizes the audio data to make a cleaner illustration 
         * @param {Array} filteredData the data from filterData()
         * @returns {Array} an normalized array of floating point numbers
         */
        const normalizeData = filteredData => {
            const multiplier = Math.pow(Math.max(...filteredData), -1);
            return filteredData.map(n => n * multiplier);
        }

        /**
         * Draws the audio file into a canvas element.
         * @param {Array} normalizedData The filtered array returned from filterData()
         * @returns {Array} a normalized array of data
         */
        const draw = normalizedData => {
        // set up the canvas
        // const canvas = canvas;
        const dpr = window.devicePixelRatio || 1;
        const padding = 10;
        canvas.width = canvas.offsetWidth * dpr;
        canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
        const ctx = canvas.getContext("2d");
        ctx.scale(dpr, dpr);
        ctx.translate(0, canvas.offsetHeight / 2 + padding); // set Y = 0 to be in the middle of the canvas

        // draw the line segments
        const width = canvas.offsetWidth / normalizedData.length;
        for (let i = 0; i < normalizedData.length; i++) {
            const x = width * i;
            let height = normalizedData[i] * canvas.offsetHeight - padding;
            if (height < 0) {
                height = 0;
            } else if (height > canvas.offsetHeight / 2) {
                height = height > canvas.offsetHeight / 2;
            }
            drawLineSegment(ctx, x, height, width, (i + 1) % 2);
        }
        };

        /**
         * A utility function for drawing our line segments
         * @param {AudioContext} ctx the audio context 
         * @param {number} x  the x coordinate of the beginning of the line segment
         * @param {number} height the desired height of the line segment
         * @param {number} width the desired width of the line segment
         * @param {boolean} isEven whether or not the segmented is even-numbered
         */
        const drawLineSegment = (ctx, x, height, width, isEven) => {
        ctx.lineWidth = 1; // how thick the line is
        ctx.strokeStyle = "#DCD0C0"; // what color our line is
        ctx.beginPath();
        height = isEven ? height : -height;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.arc(x + width / 2, height, width / 2, Math.PI, 0, isEven);
        ctx.lineTo(x + width, 0);
        ctx.stroke();
        };
        
        drawAudio(audio.getAttribute("src"));


    }











}

export default AudioPlayer;