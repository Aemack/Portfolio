//Get summary and create element with total global deaths
window.onload =async function(){
    fetch(`https://api.covid19api.com/summary`)
   .then(await function (resp) {return resp.json()} )
   .then(function (data) { 
       var totalGlobalDeaths = document.createElement("h4")
       totalGlobalDeaths.setAttribute("class","output")
       totalGlobalDeaths.setAttribute("id","totalGlobalDeaths")
       totalGlobalDeaths.innerHTML = "Total Global Deaths: "+data.Global.TotalDeaths
       output = document.getElementById("output")
       output.appendChild(totalGlobalDeaths)
   })
}

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
    outputList = document.getElementById("navbar").querySelectorAll(".navbar")
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
    search.setAttribute("class","navbar")
    search.setAttribute("placeholder","Country") 

    searchButton = document.createElement("button")
    searchButton.setAttribute("onclick","country_clicked()")
    searchButton.setAttribute("id","countryButton")
    searchButton.setAttribute("class","navbar")
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
        console.log(data)
        console.log(typeof data)
        if((data.message=="Not Found") || (typeof data === 'string')){
            cant_find()
        } else {
        display_country_data(data)
        }
    })
} catch(e){
    console.log(e)
}
}

function display_country_data(data){

    
    todaysData = data[data.length-1]
    output = document.getElementById("output")
    nameElement = document.createElement("h2")
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
    output.appendChild(deathElement)
    output.appendChild(activeElement)
    output.appendChild(confirmedElement)

    active = []
    date = []
    deaths = []

    console.log(todaysData)

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
                label: "Deaths",
                data:deaths,
                pointRadius:0,
                backgroundColor:'#9E2A2B',
                fill:true
            },{
                label: "Active Cases",
                data:active,
                pointRadius:0,
                backgroundColor:'#335C67'
            }],
        },
        options:{
        },
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
        type:'bar',
        data:{
            labels:countryLabels,
            datasets:[{
                label: "Deaths",
                data:countryDeaths,
                backgroundColor:countryColors,
                hoverBackgroundColor:'green'
            }],
        },
        options:{        }            
        
    
    });
    pieChart.minWidth="300px"


}

function by_date_clicked(){
    clear_page()
    clear_navbar()
    create_select()

}

function create_select(){
    navbar = document.getElementById("navbar")
    selectCountry = document.createElement("select")
    selectCountry.setAttribute("name","countries")
    selectCountry.setAttribute("id","countries")
    selectCountry.setAttribute("class","navbar")
    
    
    navbar.appendChild(selectCountry)
    fetch(`https://api.covid19api.com/summary`)
    .then(function (resp) { return resp.json() })
    .then(function (data){
        console.log(data)
        data.Countries.forEach(country=>{
            newOption = document.createElement("option")
            newOption.setAttribute("value",country.Country)
            newOption.setAttribute("class","navbar")
            newOption.innerHTML = country.Country
            selectCountry.appendChild(newOption)
        })
        
        return
    }).then(data => {
        selectOption = document.getElementById("countries")
        countryName = selectOption.value

        selectOption.setAttribute("onchange",`create_range()`)

        console.log(selectOption)
        create_range(countryName)})
        
}

function create_range(){
    clear_output()
    destroy_chart()
    selectedCountry = document.getElementById("countries").value
    fetch(`https://api.covid19api.com/total/dayone/country/${selectedCountry}`)
    .then(function(resp) {return resp.json() })
    .then(function(data) { 
        
        oldRange = document.getElementById("date")
        if (oldRange){
            oldRange.remove()
        }
        if (data.length===0) {
            cant_find()
            return
        } 
        console.log(data)
        name = data[0].Country
        navbar = document.getElementById("navbar")
        newRadio = document.createElement("input")
        newRadio.setAttribute("type","range")
        newRadio.setAttribute("id","date")
        newRadio.setAttribute("class","navbar")
        newRadio.setAttribute("min","0")
        newRadio.setAttribute("max",data.length-1)
        newRadio.setAttribute("onchange",`make_day_graph("${name}")`)
        navbar.appendChild(newRadio)
        console.log(data[1])
        daysSinceOutbreak = Math.floor(data.length/2)
        console.log(data[daysSinceOutbreak])
        return data[daysSinceOutbreak]
    }).then(function (data) {
        make_day_graph(data.Country)
    })
    }


function cant_find() {
    output = document.getElementById("output")
    err= document.createElement("h3")
    err.setAttribute("class","output")
    err.innerHTML = "Cannot locate country"
    output.appendChild(err)                
}
 
function make_day_graph(data){
    clear_page()
    destroy_chart()


    fetch(`https://api.covid19api.com/total/dayone/country/${data}`)
    .then(function(resp) {return resp.json() })
    .then(function(data) {
        
        datePosition = document.getElementById("date").value
        chartNumbers = [data[datePosition].Active,/*data[datePosition].Confirmed,*/data[datePosition].Deaths/*,data[datePosition].Recovered*/]
        
        
        output = document.getElementById("output")
        
        date = data[datePosition].Date.split("T")[0]
        dateElement = document.createElement("h2")
        dateElement.setAttribute("class","output")
        dateElement.innerHTML = date
        output.append(dateElement)

        activeElement = document.createElement("h3")
        activeElement.setAttribute("class","output")
        activeElement.innerHTML = `Active: ${data[datePosition].Active}`

        /*
        confirmedElement = document.createElement("h4")
        confirmedElement.setAttribute("class","output")
        confirmedElement.innerHTML = `Confirmed: ${data[datePosition].Confirmed}`
        */
        deathsElement = document.createElement("h5")
        deathsElement.setAttribute("class","output")
        deathsElement.innerHTML = `Deaths: ${data[datePosition].Deaths}`
        /*
        recoveredElement = document.createElement("h6")
        recoveredElement.setAttribute("class","output")
        recoveredElement.innerHTML = `Recovered: ${data[datePosition].Recovered}`
        */


        output.appendChild(activeElement)
        //output.appendChild(confirmedElement)
        output.appendChild(deathsElement)
        //output.appendChild(recoveredElement)
        
     console.log(chartNumbers)


        pieChart = new Chart(myChart, {
            type:'doughnut',
            data:{
                labels:["Active",/*"Confirmed"*/"Deaths"/*"Recovered"*/],
                datasets:[{
                    label: "Deaths",
                    data: chartNumbers,
                    backgroundColor:['#e9c46a','#e76f51']
                }],
            },
            options:{}  
     })
     console.log()
})
}