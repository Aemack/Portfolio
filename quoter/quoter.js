const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link')
console.log(navToggle)

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    })
})

function generate_clicked(){
    
    fetch("https://www.reddit.com/r/quotes/hot.json")
    .then( function (resp) {return resp.json()} )
    .then(function (data) {

        randNum = Math.floor(Math.random()*25);
        quote=data.data.children[randNum].data.title;
        console.log(data)
        quoteray = quote.split('"');
        console.log(quoteray)
        document.getElementById("quote").innerText=quote;
    }) 
}
