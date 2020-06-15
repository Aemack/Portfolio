function clear_ouput(){
    outputList = document.getElementById("output").querySelectorAll(".output")
    outputList.forEach((elem) => {
        elem.remove();
    })
}

function clear_options() {
    outputList = document.getElementById("subMenu").querySelectorAll("#subList")
    outputList.forEach((elem) => {
        elem.remove();
        console.log("hi")
    })
}

function rockets_clicked() {
    clear_options();
    clear_ouput();
    get_rocket_data();
}

function latest_launch_clicked(){
    clear_ouput()
    launchData = get_latest_launch_data()
    

}

function upcoming_launch_clicked(){
    clear_ouput()
    get_upcoming_launch_data()
    

}
function past_launch_clicked(){
    clear_ouput();
    get_past_launch_data();

}

function get_rocket_data(){
    fetch(`https://api.spacexdata.com/v4/rockets`)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
        data.forEach(data => {
            display_rocket_data(data);
        })
    })    
    .catch(function() {
        // catch any errors
      });
}

function get_latest_launch_data(){
    fetch(`https://api.spacexdata.com/v4/launches/latest`)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
    display_launch_data(data)
    })    
    .catch(function() {
        // catch any errors
      });
}

function get_upcoming_launch_data(){
    fetch(`https://api.spacexdata.com/v4/launches/upcoming`)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
    display_launch_data(data[0])
    display_launch_data(data[1])
    
    })    
    .catch(function() {
        // catch any errors
      });
}

function get_past_launch_data(){
    fetch(`https://api.spacexdata.com/v4/launches/past`)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
        data.forEach(data => {
            display_launch_data(data)
        })
    
    })    
    .catch(function() {
        // catch any errors
      });
}

function display_launch_data(data){
    console.log(data);
    outputElement = document.getElementById("output");

    launchTitle = document.createElement("h4");
    launchTitle.innerHTML = data.name;
    launchTitle.setAttribute("id","launchTitle");
    launchTitle.setAttribute("class","output");

    launchDate = document.createElement("h5");
    date = data.date_local.split("T")[0];

    launchDate.innerHTML = date;
    launchDate.setAttribute("class","output")
    launchDate.setAttribute("id","launch_date")

    launchDescription = document.createElement("p");
    launchDescription.setAttribute("id","launch_description");
    launchDescription.setAttribute("class","output") 
    launchDescription.innerHTML = data.details;

    if (data.links.youtube_id){
        launchVideo = document.createElement("iframe")
        launchVideo.setAttribute("src",`https://www.youtube.com/embed/${data.links.youtube_id}`)
        launchVideo.setAttribute("class","output")
        outputElement.appendChild(launchVideo)
    }

    outputElement.appendChild(launchTitle);
    outputElement.appendChild(launchDate);
    outputElement.appendChild(launchDescription);
}

function display_rocket_data(data){
    
    outputList = document.getElementById("output");

    nameElement = document.createElement("h3");
    nameElement.setAttribute("id", "rocketTitle")
    nameElement.setAttribute("class", "output")
    nameElement.innerHTML = data.name;

    firstFlightElement =document.createElement("h5");
    firstFlightElement.setAttribute("id","rocketfirstFlight");
    firstFlightElement.setAttribute("class","output");
    firstFlightElement.innerHTML = `First Flight: ${data.first_flight}`;

    descriptionElement = document.createElement("p");
    descriptionElement.setAttribute("id","rocketDescription");
    descriptionElement.setAttribute("class","output");
    descriptionElement.innerHTML = data.description;

    imageElement = document.createElement("img");
    imageElement.setAttribute("id", `${data.name}_image`);
    imageElement.setAttribute("class","output");
    imageElement.setAttribute("src",`${data.image}`);
    

    console.log(data)
    outputList.appendChild(nameElement)
    outputList.appendChild(firstFlightElement)
    outputList.appendChild(descriptionElement)

}

function launches_clicked(){
    clear_options()
    clear_ouput()
    subMenu = document.getElementById("subMenu")
    subList = document.createElement("ul")
    subList.setAttribute("id", "subList")
    subMenu.appendChild(subList);

    latestElement = document.createElement("button")
    latestElement.setAttribute("onclick","latest_launch_clicked()")
    latestElement.setAttribute("class","optionButton")
    latestElement.innerHTML = "Latest"

    upcomingElement = document.createElement("button")
    upcomingElement.setAttribute("onclick","upcoming_launch_clicked()")
    upcomingElement.setAttribute("class","optionButton")
    upcomingElement.innerHTML = "Upcoming"

    pastElement = document.createElement("button")
    pastElement.setAttribute("onclick","past_launch_clicked()")
    pastElement.setAttribute("class","optionButton")
    pastElement.innerHTML = "Past Launches"
    
    subList.appendChild(latestElement)
    subList.appendChild(upcomingElement)
    subList.appendChild(pastElement)
}

