apiKey = "c0a8cf4628667898c6a3d913189f3596";
lat = 0;
long = 0;

function getGeoLocation(){
    // Check if geolocation is supported by browser
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        console.log("Not Supported")
    }
}
function onSuccess(position){
    const {latitude, longitude} =position.coords;
    lat = latitude
    long = longitude
    console.log(lat,long)

    get_Weather(lat,long)

}
function onError(error){
    console.log(error)
}


function get_Weather( lat,long ) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {

    console.log(data);
    displayLocation(data.name)
    displayTemp(data.main.temp)
    displayWeather(data.weather[0].main)
    change_background()
    })

    .catch(function() {
      // catch any errors
    });
  }



function displayLocation(location){
    locationElement = document.getElementById("location")
    locationElement.innerHTML = location;
}

function displayTemp(temp){
    celcius = Math.floor(temp - 273.15);
    locationElement = document.getElementById("temp");
    locationElement.innerHTML = celcius+"c";
}

function change_background(){
    weatherElement = document.getElementById("weather")
    console.log(weatherElement.innerHTML)
    document.getElementById("planetPicture").style.position="fixed";
    document.getElementById("main").style.position='absolute';
    switch (weatherElement.innerHTML){
        case("Clouds"):
            document.getElementById("planetPicture").src="img/bespin.jpg"
            document.getElementById("quote").innerHTML = "It's as cloudy as Cloud City"
            document.getElementById("main").style.color="black"
            break;
        case("Clear"):
            document.getElementById("planetPicture").src="img/tatooine.jpeg"
            document.getElementById("quote").innerHTML = "It's as clear as Tatooine"
            break;
        case("Snow"):
            document.getElementById("planetPicture").src="img/hoth.jpeg"
            document.getElementById("quote").innerHTML = "It's as cold as Hoth"
            break;
        case("Rain"):
            document.getElementById("planetPicture").src="img/kamino.jpg"
            document.getElementById("quote").innerHTML = "It's as wet as Kamino"
            break;
        case("Thunderstorm"):
            document.getElementById("planetPicture").src="img/lightning.jpeg"
            document.getElementById("quote").innerHTML = "It's thunder and force lightning out there!"
            break;
        case("Mist"):
            document.getElementById("planetPicture").src="img/dagobah.jpeg"
            document.getElementById("quote").innerHTML = "It's as misty as Dagobah out there!"
            break;
        default:
            document.getElementById("planetPicture").src="img/deathStar.jpeg"
            



    }
}

function displayWeather(weather) {
    weatherElement = document.getElementById("weather");
    weatherElement.innerHTML = weather;
}

window.onload = function() {
    main()
}

function main(){
    getGeoLocation()
}