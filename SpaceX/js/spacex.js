function latest_launch_clicked(){
    launchData = get__latest_launch_data()
    

}

function get__latest_launch_data(){
    fetch(`https://api.spacexdata.com/v4/launches/latest`)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
    display_launch_data(data)
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
    launchDescription = document.createElement("p");
    launchDescription.setAttribute("id","launch_description"); 
    launchDescription.innerHTML = data.details;
    launchVideo = document.createElement("iframe")
    launchVideo.setAttribute("src",`https://www.youtube.com/embed/${data.links.youtube_id}`)
    outputElement.appendChild(launchTitle);
    outputElement.appendChild(launchDescription);
    outputElement.appendChild(launchVideo)
}

function launches_clicked(){
    subMenu = document.getElementById("subMenu")
    subList = document.createElement("ul")
    subMenu.appendChild(subList);

    latestElement = document.createElement("button")
    latestElement.setAttribute("onclick","latest_launch_clicked()")
    latestElement.innerHTML = "Latest"
    
    subList.appendChild(latestElement)
}
