// For speech recognition

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var message = document.querySelector('#message')

var grammer = "#JSGF V1.0";

var recognition = new SpeechRecognition();
var speechRecognitionGrammerList = new SpeechGrammarList();

speechRecognitionGrammerList.addFromString(grammer,1);

recognition.grammers = speechRecognitionGrammerList;
recognition.lang = 'en-US';
recognition.interimResults = false;


recognition.onresult = function(event) {
    var last = event.results.length -1;
    var command = event.results[last][0].transcript;
    answer = document.getElementById("answer");
    answer.innerText = command;
}

recognition.onspeechend = function() {
    recognition.stop();
}

recognition.onerror = function(event) {
    message.textContent = 'Error occured in recognition: '+ event.error;
}




function clear_output(){
    outputList = document.getElementById("main").querySelectorAll(".output")
    outputList.forEach((elem) => {
        elem.remove();
    })

    outputList = document.getElementById("subnav").querySelectorAll(".output")
    outputList.forEach((elem) => {
        elem.remove();
    })

}

function start_clicked(){
    

    inputElement = document.getElementById("inputBox")
    startButton = document.getElementById("start")
    resetButtons = document.getElementById("resetButtons")

    resetButton = document.createElement("button")
    resetButton.setAttribute("onclick","reset_button_clicked()")
    resetButton.setAttribute("id","reset")
    resetButton.setAttribute("class","output")
    resetButton.innerText = "Reset"

    newWords = document.createElement("button");
    newWords.setAttribute("onclick","new_words()");
    newWords.setAttribute("id","newWords");
    newWords.setAttribute("class","output");
    newWords.innerText = "New Words";

    resetButtons.appendChild(resetButton)
    resetButtons.appendChild(newWords)
    fullWords= inputElement.value;
    fill_aside(fullWords);
    inputElement.remove();
    startButton.remove();
    display_line(0);


}

function fill_aside(fullWords){
    fullWords=fullWords.replace(/(^\s+|\s+$)/g,'');
    fullWordsElement = document.getElementById("fullWords");
    fullWordsElement.innerText = fullWords
    asideElement = document.getElementById("aside")
    asideElement.style.display = "block";
}

function display_line(lineNum){
    aside = document.getElementById("aside")
    aside.style.display="block"
    clear_output();
    subtitle = document.getElementById("subtitle")
    subtitle.innerText = `You're on line ${lineNum+1}`
    lineText = get_line_text(lineNum)
    output = document.getElementById("main");
    newLine = document.createElement("h5");
    newLine.setAttribute("class","output")
    newLine.innerText = lineText
    output.appendChild(newLine )
    if (lineNum !== 0){
        backButton = document.createElement("button")
        backButton.setAttribute("class","output")
        backButton.innerText  = "Back"
        backButton.setAttribute("onclick",`back_button_clicked(${lineNum})`)
        output.appendChild(backButton)
    }
    nextButton = document.createElement("button")
    nextButton.setAttribute("onclick",`ask_for_line(${lineNum})`)
    nextButton.innerText = "Next"
    nextButton.setAttribute("class","output")
    output.appendChild(nextButton)
}

function display_up_to_line(lineNum){
    aside = document.getElementById("aside")
    aside.style.display="block"
    clear_output();
    subtitle = document.getElementById("subtitle")
    subtitle.innerText = `All together now!`

    output = document.getElementById("main");    
    for (i=0;i<=lineNum;i++){
        lineText = get_line_text(i)
        newLine = document.createElement("h5");
        newLine.setAttribute("class","output")
        newLine.innerText = lineText
        output.appendChild(newLine);
    }
    
    backButton = document.createElement("button")
    backButton.setAttribute("class","output")
    backButton.innerText  = "Back"
    output.appendChild(backButton)
    nextButton = document.createElement("button")
    nextButton.setAttribute("onclick",`ask_for_up_to_line(${lineNum})`)
    nextButton.innerText = "Next"
    nextButton.setAttribute("class","output")
    output.appendChild(nextButton)
}

function ask_for_line(lineNum){
    clear_output()
    aside = document.getElementById("aside");
    aside.style.display="none";

    output = document.getElementById("main");
    outputButtons = document.getElementById("subnav");
    newInput = document.createElement("textarea");
    newInput.setAttribute("class","output");
    newInput.setAttribute("id","answer");
    voiceButton = document.createElement("button");
    voiceButton.setAttribute("class","output");
    voiceButton.setAttribute("onclick","recognition.start()")
    voiceButton.innerText = "Voice";
    newButton = document.createElement("button");
    newButton.setAttribute("class","output")
    newButton.setAttribute("onclick",`next_line_clicked(${lineNum})`)
    newButton.innerText = "Submit"
    output.appendChild(newInput);
    outputButtons.appendChild(voiceButton);
    outputButtons.appendChild(newButton);
}

function ask_for_up_to_line(lineNum){
    clear_output()
    aside = document.getElementById("aside");
    aside.style.display="none";

    output = document.getElementById("main");
    outputButtons = document.getElementById("subnav");
    newInput = document.createElement("textarea");
    newInput.setAttribute("class","output");
    newInput.setAttribute("id","answer");
    newButton = document.createElement("button");
    newButton.setAttribute("class","output")
    newButton.setAttribute("onclick",`next_up_to_line_clicked(${lineNum})`)
    newButton.innerText = "Submit"
    output.appendChild(newInput);
    outputButtons.appendChild(newButton);
}

function next_line_clicked(lineNum){
    answerCorrect = check_answer(lineNum);
    if (answerCorrect){
        if(lineNum==0){
            lineNum = lineNum+1
            display_line(lineNum)
        } else {
        display_up_to_line(lineNum)
        }
        console.log("correct")
    } else {
        if (lineNum !== 0){
            lineNum = lineNum - 1
        }
        display_line(lineNum);
        console.log("wrong")
    }
}

function next_up_to_line_clicked(lineNum){
    answerCorrect = check_up_to_line_answer(lineNum);
    if (answerCorrect){
        lineNum = lineNum+1
        display_line(lineNum)
        console.log("correct")
    } else {
        if (lineNum !== 0){
            lineNum = lineNum - 1
        }
        display_line(lineNum);
        console.log("wrong")
    }
}

function check_answer(lineNum){
    answer = document.getElementById("answer").value
    answer = answer.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    answer = answer.replace(/\s/g,'');
    answer = answer.toLowerCase();
    lineText = get_line_text(lineNum);
    lineText = lineText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    lineText = lineText.replace(/\s/g,'');
    lineText = lineText.toLowerCase()

    console.log(`Your Answer: ${answer}`)
    console.log(`Actual Answer: ${lineText}`)
    heading = document.getElementById("header")

    if (answer == lineText){
        heading.style.background = "#1C3144"
        return true;
    } else {
        console.log("Wrong")
        heading.style.background = "#70161E"
        return false;
    }

}

function check_up_to_line_answer(lineNum){
    answer = document.getElementById("answer")
    answer = answer.value.split("\n").join(" ");
    answer = answer.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    answer = answer.replace(/\s/g,'');
    answer = answer.toLowerCase();
    lineText = get__up_to_line_text(lineNum);
    lineText = lineText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    lineText = lineText.replace(/\s/g,'');
    lineText = lineText.toLowerCase()
    

    console.log(`Your Answer: ${answer}`)
    console.log(`Actual Answer: ${lineText}`)
    heading = document.getElementById("header")

    if (answer == lineText){
        heading.style.background = "#1C3144"
        console.log("Correct")
        return true;
    } else {
        console.log("Wrong")
        heading.style.background = "#70161E"
        return false;
    }

}

function get__up_to_line_text(lineNum){
    fullWords = document.getElementById("fullWords");
    fullWords = fullWords.innerHTML;
    sentences = fullWords.split("<br>");
    newSentences = []
    for (i=0;i<=lineNum;i++){   
    while (sentences[i][0]===' '){
        console.log(sentences[i])
        sentences[i] = sentences[i].substr(1)
    }
        newSentences.push(sentences[i])
    }
    newSentences = newSentences.join(" ")
    console.log(newSentences)
    
    while (sentence[0]===' '){
        sentence = sentence.substr(1)
    }

    return newSentences
}

function get_line_text(lineNum){
    fullWords = document.getElementById("fullWords");
    fullWords = fullWords.innerHTML;
    sentences = fullWords.split("<br>");
    if(sentences[lineNum]){
        sentence = sentences[lineNum]
        while (sentence[0]===' '){
            sentence = sentence.substr(1)
        }
    
    return sentence
    } else {
        clear_output();
        
        return "You've Done It!"
    }

    
}

function back_button_clicked(lineNum){
    display_line(lineNum-1);
}

function reset_button_clicked(){
    display_line(0)
}

function new_words(){
    clear_output()
    aside = document.getElementById("aside");
    aside.style.display="none";

    subtitle = document.getElementById("subtitle");
    subtitle.innerText = ""
    
    resetButton = document.getElementById("reset");
    newWords = document.getElementById("newWords");
    reset.remove();
    newWords.remove();


    main = document.getElementById("main");
    textArea = document.createElement("textarea");
    textArea.setAttribute("id","inputBox");
    textArea.setAttribute("class","output");
    textArea.setAttribute("placeholder","Paste Text Here!");
    main.appendChild(textArea);

    subnav = document.getElementById("subnav");
    startButton = document.createElement("button");
    startButton.setAttribute("onclick","start_clicked()");
    startButton.setAttribute("id","start");
    startButton.setAttribute("class","output");
    startButton.innerText = "Start!";
    subnav.appendChild(startButton);

}

function start_listening(){

}