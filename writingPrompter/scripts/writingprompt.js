function promptMe_clicked(){
    
    fetch("https://www.reddit.com/r/writingprompts/hot.json")
    .then( function (resp) {return resp.json()} )
    .then(function (data) { 
        numberOfPrompts = data.data.children.length-1;
        ranNum = Math.floor(Math.random()*numberOfPrompts)
        wprompt = data.data.children[ranNum].data.title
        console.log(wprompt)
        wtype = wprompt.substring(0,4);
        if (wprompt.startsWith("[WP]")){
            wprompt = wprompt.substring(4)
            output = document.getElementById("prompt")
            output.innerText = wprompt
        } else {
            promptMe_clicked();
        }
    }) 
}