function clear_page(){
    destroy_chart()
    clear_output()
}

function clear_output(){
    outputList = document.getElementById("output").querySelectorAll(".output")
    outputList.forEach((elem) => {
        elem.remove();
    })
}

function clear_navbar() {
    outputList = document.getElementById("navbar").querySelectorAll("#country")
    outputList.forEach((elem) => {
        elem.remove();
    })
}

function destroy_chart(){
    container = document.getElementById("container")
    chart =document.getElementById("myChart")
    chart.remove();
    newChart = document.createElement("canvas")
    newChart.setAttribute("id","myChart")
    container.appendChild(newChart)
}

function search_by_country_clicked(){

    clear_navbar()

    navbar = document.getElementById("navbar")
    
    search=document.createElement("input")
    search.setAttribute("type","text")
    search.setAttribute("id","country")
    search.setAttribute("placeholder","Country") 

    searchButton = document.createElement("button")
    searchButton.setAttribute("onclick","country_clicked()")
    searchButton.setAttribute("id","country")
    searchButton.innerHTML= "Search Country"

    navbar.appendChild(search)
    navbar.appendChild(searchButton)
}

function country_clicked() {
    clear_page()
    country = document.getElementById("country").value;
    try{
    fetch(`https://api.covid19api.com/total/country/${country}`)
    .then(function (resp) { return resp.json()})
    .then(function (data){
        console.log(data.err)
        if(data.message!="Not Found"){
            display_country_data(data)
        } else {
        output = document.getElementById("output")
        err= document.createElement("h3")
        err.setAttribute("class","output")
        err.innerHTML = "Cannot locate country"
        output.appendChild(err)
        }
    })
} catch(e){
    console.log(e)
}
}

function display_country_data(data){

    
    todaysData = data[data.length-1]
    output = document.getElementById("output")
    nameElement = document.createElement("h5")
    nameElement.setAttribute("class","output")
    nameElement.innerHTML = `${todaysData.Country}:`
    nameElement.setAttribute("id","nameElement")
    output.appendChild(nameElement)

    deathElement = document.createElement("h3")
    deathElement.setAttribute("class","output")
    deathElement.innerHTML = `Deaths: ${todaysData.Deaths}.`

    activeElement = document.createElement("h4")
    activeElement.setAttribute("class","output")
    activeElement.innerHTML = `Active: ${todaysData.Active}.`

    confirmedElement = document.createElement("h5")
    confirmedElement.setAttribute("class","output")
    confirmedElement.innerHTML = `Confirmed: ${todaysData.Confirmed}.`
    
    nameElement =document.getElementById("nameElement")
    nameElement.appendChild(deathElement)
    nameElement.appendChild(activeElement)
    nameElement.appendChild(confirmedElement)

    active = []
    date = []
    deaths = []

    data.forEach(dayData => {
        active.push(dayData.Active)
        date.push(dayData.Date.split("T")[0])
        deaths.push(dayData.Deaths)
    })
    

    let pieChart = new Chart(myChart, {
        type:'line',
        data:{
            labels:date,
            datasets:[{
                label: "Active Cases",
                data:active,
                backgroundColor:'yellow'
            },{
                label: "Deaths",
                data:deaths,
                backgroundColor:'red'
            }],
        },
        options:{},
    });
    
}

function world_graph_clicked(){
    clear_page();
    clear_navbar()
    
    fetch(`https://api.covid19api.com/summary`)
    .then(function (resp) {return resp.json()} )
    .then(function (data) { 
        world_graph(data)
     })
}

function world_graph (data) {
    let myChart = document.getElementById("myChart").getContext("2d")
    pieChart = new Chart(myChart)
    
    countryLabels = []
    countryDeaths =[]
    countryColors = []
    data.Countries.forEach(country =>{
        countryLabels.push(country.Country)
        countryDeaths.push(country.TotalDeaths)
        rand1 = Math.floor(Math.random()*255)
        rand2 = Math.floor(Math.random()*255)
        rand3 = Math.floor(Math.random()*255)
        countryColors.push(`rgba(${rand1},${rand2},${rand3})`)

    })
    
    pieChart = new Chart(myChart, {
        type:'bar',//'horizontalBar',
        data:{
            labels:countryLabels,
            datasets:[{
                label: "Deaths",
                data:countryDeaths,
                backgroundColor:countryColors,
                hoverBackgroundColor:'green'
            }],
        },
        options:{},
    });


}


//Get summary and create element with total global deaths
window.onload =async function(){
     fetch(`https://api.covid19api.com/summary`)
    .then(await function (resp) {return resp.json()} )
    .then(function (data) { 
        var totalGlobalDeaths = document.createElement("h3")
        totalGlobalDeaths.setAttribute("class","output")
        totalGlobalDeaths.setAttribute("id","totalGlobalDeaths")
        totalGlobalDeaths.innerHTML = "Total Global Deaths: "+data.Global.TotalDeaths
        output = document.getElementById("output")
        output.appendChild(totalGlobalDeaths)
    })
}