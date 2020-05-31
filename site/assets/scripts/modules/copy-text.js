class CopyText {
    constructor() {
        this.range = document.createRange();
        this.copyButton = document.querySelector(".biographie__link--copy-text")
        this.containerId = document.querySelector(".biographie__text")
        this.previewText = document.querySelector(".biographie__grey-box")
        this.events()
        
    }

    events() {
        this.copyButton.addEventListener("click", e => this.copyDivToClipboard(e))
    }

    copyDivToClipboard(e) {
        e.preventDefault()
        this.range.selectNode(this.previewText);
        window.getSelection().removeAllRanges(); // clear current selection
        let test = window.getSelection().addRange(this.range); // to select text
        console.log(test)
        this.range.selectNode(this.containerId);
        let test2 = window.getSelection().addRange(this.range); // to select text
        console.log(test2)
        document.execCommand("copy");
        window.getSelection().removeAllRanges();// to deselect
        this.copyButton.classList.add("biographie__link--copy-text--copied")
    }

}

export default CopyText