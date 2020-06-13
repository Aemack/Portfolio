function hide_buttons(){
    button1 = document.getElementById("btn1");
    button2 = document.getElementById("btn2");
    button3 = document.getElementById("btn3");
    button4 = document.getElementById("btn4");
    button5 = document.getElementById("btn5");
    button1.style.visibility = "hidden";
    button2.style.visibility = "hidden";
    button3.style.visibility = "hidden";
    button4.style.visibility = "hidden";
    button5.style.visibility = "hidden";

}


function cant_find_song(){
    lyricBlock = document.getElementById("lyrics")
    lyricBlock.innerHTML = "Could not locate lyrics!"
    
    hide_buttons()
}


function reqListener() {
    if (this.responseText.startsWith("<")){
            
        cant_find_song()

    } else {
        var data = JSON.parse(this.responseText);
            if(data.result == undefined){
                console.log("Hello world")
                cant_find_song();
            } else {
            lyricBlock = document.getElementById("lyrics");
            artistBlock = document.getElementById("subtitle");
            trackBlock = document.getElementById("title")
            console.log(data.result.track.name)
            artistBlock.innerHTML = "By "+data.result.artist.name
            trackBlock.innerHTML = data.result.track.name 
            lyricBlock.innerHTML = data.result.track.text
        button1 = document.getElementById("btn1");
        button2 = document.getElementById("btn2");
        button3 = document.getElementById("btn3");
        button4 = document.getElementById("btn4");
        button5 = document.getElementById("btn5");
        button1.style.visibility = "visible";
        button2.style.visibility = "visible";
        button3.style.visibility = "visible";
        button4.style.visibility = "visible";
        button5.style.visibility = "visible";
        }
    }

}

function reqError(err) {
    console.log("Fetch error",err)
}

function get_lyrics(artist, track){
    var oReq =new XMLHttpRequest()
    oReq.onload =reqListener;
    oReq.onerror = reqError;
    oReq.open('get', `https://orion.apiseeds.com/api/music/lyric/${artist}/${track}?apikey=weiQDrr5RRma5oRXJWj8CbHMgGRaDxVkcG8Zni2gnsJ6Y2XK9O1JPrpIwOCHp7M6`, true)
    oReq.send()
}

function get_words(){
    var lyrics = document.getElementById("lyrics").innerHTML;
    if (lyrics){
        return split_string(lyrics.toLowerCase());
    } else {
        return "Cannot find lyrics"
    }
}

function getOccurence(array, value) {
    if (array) {
        //console.log(array)
        var count = 0;
        array.forEach((v) => (v=== value && count++));
        return count;
    }
}

function split_string(str) {
    let re = /\[.*?\]/;
    str= str.split(re).join('')
    re = /\(.*?\)/;
    str= str.split(re).join('')
    //console.log(str)
    str  = str.split('\n').join(' ')
    str = str.split(/[?,.\-_:()]+/).join('')
    words = str.split(" ")
    return words
}

function find_original_words(words){
    origWords = []
    words.forEach(function(word){
        if (word) {
            if (!origWords.includes(word)){
                origWords.push(word)
            }
        }
    })
    return origWords
}

function clear_page(){
    var outputList = document.getElementById("outputList").querySelectorAll(".subList");
    outputList.forEach((elem) => {
        elem.remove();
    })
}

function unique_word_count() {
    clear_page();
    words = get_words();
    origWords = find_original_words(words);
    print_unique_word_count(origWords.length)
}

function unique_word_list() {
    clear_page();
    words = get_words();
    origWords = find_original_words(words);
    print_unique_words(origWords);
}

function most_used_word(){
    mostUsed = ""; 
    wordList = get_words();
    wordList.forEach(function(word){
        word_occurence = getOccurence(wordList, word)
        if (word_occurence > getOccurence(wordList, mostUsed)){
            mostUsed = word;
        }

    })
    return mostUsed;
}

function longest_word(){
    longestWord = " "
    wordList = get_words();
    console.log(wordList)
    wordList.forEach(function (word){
        if(word.length > longestWord.length){
            longestWord = word;
            console.log(word)
        }
    })
    return longestWord;
}

function average_word_length(){
    total = 0;
    words = get_words();
    words.forEach(function(word){
        total = total+word.length;
    })
    return Math.floor(total/words.length);
}

function display_lyrics(){
    clear_page()
    artist = document.getElementById("artist").value;
    track = document.getElementById("track").value;
    get_lyrics(artist,track)


}

function print_unique_words(wordList){
    outputList = document.getElementById('outputList');

    wordListElement = document.createElement("li");
    wordListElement.innerHTML = "Unique Words: ";
    wordListElement.setAttribute("class", "subList");
    outputList.appendChild(wordListElement);

    wordSubList = document.createElement("ul");
    wordSubList.setAttribute("class", "subList");
    outputList.appendChild(wordSubList)
    
    
    wordList.forEach(function(word){
        wordItem = document.createElement("li");
        wordAndCount = word+": "+getOccurence(get_words(),word);
        wordItem.innerHTML = wordAndCount;
        wordItem.setAttribute("class", "subList");
        wordSubList.appendChild(wordItem)
    })


}

function print_unique_word_count(wordCount){
    outputList = document.getElementById('outputList');
    wordCountElement = document.createElement("li");
    wordCountElement.setAttribute("class", "subList");
    wordCountElement.innerHTML = "Unique Word Count: "+ wordCount;
    outputList.appendChild(wordCountElement)
}

function print_most_used_word(){
    clear_page();
    wordList = get_words();
    mostUsedWord = most_used_word();
    wordOccurence = getOccurence(wordList, mostUsedWord);
    mostUsedElement = document.createElement("li");
    mostUsedElement.setAttribute("class", "subList");
    mostUsedElement.innerHTML = "Most used word: "+ mostUsedWord + " - "+ wordOccurence;
    outputList.appendChild(mostUsedElement)
}

function print_longest_word(){
    clear_page();
    longestWord = longest_word();    
    longestWordElement = document.createElement("li");
    longestWordElement.setAttribute("class", "subList");
    longestWordElement.innerHTML = "Longest Word: "+ longestWord + " - "+ longestWord.length;
    outputList.appendChild(longestWordElement)
}


function print_average_word_length(){
    clear_page();
    averageWordLength = average_word_length();
    averageLengthElement = document.createElement("li");
    averageLengthElement.setAttribute("class","subList");
    averageLengthElement.innerHTML = "Average word length: "+averageWordLength+" characters.";
    outputList.appendChild(averageLengthElement);

}