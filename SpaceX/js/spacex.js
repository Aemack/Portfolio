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
    })
}

function latest_launch_clicked(){
    clear_ouput()
    launchData = get_latest_launch_data()
    

}

function upcoming_launch_clicked(){
    clear_ouput()
    launchData = get_upcoming_launch_data()
    

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

function display_launch_data(data){
    console.log(data);
    outputElement = document.getElementById("output");
    launchTitle = document.createElement("h4");
    launchTitle.innerHTML = data.name;
    launchTitle.setAttribute("id","launchTitle")
    launchTitle.setAttribute("class","output")
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
    outputElement.appendChild(launchDescription);
}

function launches_clicked(){
    clear_options()
    subMenu = document.getElementById("subMenu")
    subList = document.createElement("ul")
    subList.setAttribute("id", "subList")
    subMenu.appendChild(subList);

    latestElement = document.createElement("button")
    latestElement.setAttribute("onclick","latest_launch_clicked()")
    latestElement.innerHTML = "Latest"

    upcomingElement = document.createElement("button")
    upcomingElement.setAttribute("onclick","upcoming_launch_clicked()")
    upcomingElement.innerHTML = "Upcoming"
    
    subList.appendChild(latestElement)
    subList.appendChild(upcomingElement)
}
