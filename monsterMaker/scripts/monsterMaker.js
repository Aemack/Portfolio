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

function make_monster_clicked(){
    
    fetch("https://www.reddit.com/r/ImaginaryBehemoths/hot.json")
    .then( function (resp) {return resp.json()} )
    .then(function (data) { 
        randNum= Math.floor(Math.random()*25)
        imageUrl = data.data.children[randNum].data.url;
        monsterTitle = data.data.children[randNum].data.title;
        document.getElementById("monsterImage").src=imageUrl;
        document.getElementById("monsterDescription").innerText=monsterTitle;
        
    }) 
}