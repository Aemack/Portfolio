async function get_image(age,gender) {
    
    searchQuery = get_search_query(age,gender); 
    pageNum = Math.floor(Math.random()*10);

    console.log(searchQuery)


    url = `https://api.unsplash.com/search/photos?&page=${pageNum}&query=${searchQuery}&client_id=ErskDIIODpKwPJi7UgyIwKv-wPHaQEgQszliGTr83xo`;
    imagesData = fetch(url)
    .then(response => {
        return response.json();
    })

    imageUrl = await imagesData;
    console.log(imageUrl)
    
    randNum = Math.floor(Math.random() * 10)
    return  imageUrl.results[randNum].urls.regular;

}

function get_search_query(age,gender){
    if (age > 59 && gender=="female"){
        return "grandmother"
    } else if (age > 59 && gender=="male"){
        return "grandfather" 
    } else if(age > 39 && gender=="male"){
        return "man"
    } else if (age > 39 && gender=="female"){
        return "mother"
    } else if (age > 25 && gender=="male"){
        return "young man"
    } else if (age > 25 && gender=="female"){
        return "young woman"
    } else if (age > 13 && gender=="male"){
        return "teenager man"
    } else if (age > 13 && gender=="female"){
        return "teenager woman"
    } else if  (age < 13 && gender=="male"){
        return "child boy"
    } else if (age < 13 && gender=="female"){
        return "child girl"
    } else {
        return `${gender} smiling`
    } 
}


async function get_fake_details() {
    url = "https://randomuser.me/api/";

    newData = fetch(url)
    .then(response => { return response.json()})

    return await newData
}

async function button_clicked(){
    details = await get_fake_details()
    age = Math.floor(Math.random()*97)+5
    gender = details.results[0].gender
    imagesData = await get_image(age,gender)
    

    imageUrl = imagesData//.results[randNum].urls.regular;
    document.getElementById("name").innerText =`${details.results[0].name.title} ${details.results[0].name.first} ${details.results[0].name.last}`
    document.getElementById("age").innerText = `Age: ${age}`
    document.getElementById("origin").innerText = `Origin: ${details.results[0].location.country}`
    document.getElementById("mainPicture").src=imageUrl;

}