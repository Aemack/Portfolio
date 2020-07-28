const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link')


navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    })
})

function animate_gif(){
    console.log("hi")
    picture = document.getElementById("introPic")
    picture.setAttribute("src", "img/ratsmile.gif")
    picture.setAttribute("id","introPicAnim")
    
}

function stop_gif(){
    picture = document.getElementById("introPicAnim")
    picture.setAttribute("src","img/introPicture.jpg")
    

}

window.onscroll = function () {animate_gif()}