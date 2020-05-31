class CopyText {
    constructor() {
        this.copyText = document.querySelector('.biographie__link biographie__link--copy-text'); 
        this.copiedText = document.querySelector('.biographie__text');   
        this.range = document.createRange(); 
    }

    events() {
        this.copyText.addEventListener('click', e => this.copyText(e))
    }

    copyText(e) {
        e.preventDefault()
        // Select the email link anchor text  
        this.range.selectNode(this.copiedText);  
        window.getSelection().addRange(this.range);   
        
        try {  
            // Now that we've selected the anchor text, execute the copy command  
            var successful = document.execCommand('copy');  
            var msg = successful ? 'successful' : 'unsuccessful';  
            alert('Copy email command was ' + msg);  
            } catch(err) {  
            alert('Oops, unable to copy');  
            }  

        // Remove the selections - NOTE: Should use
        // removeRange(range) when it is supported  
        window.getSelection().removeAllRanges();  
    }
}

export default CopyText;