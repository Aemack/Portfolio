function clearMain(){
    output = document.getElementById("output")
    output.classList.add("faded-out")
    outputElements = document.querySelectorAll(".output")
    outputElements.forEach(function(element){
        element.remove();
    })
}

function product_clicked(product){
    clearMain();
    display_data(product);
}


function display_data(product){
    main = document.getElementById("main")

    //Handle Errors
    if (!product){
        errorText = document.createElement("h2");
        errorText.classList.add("output");
        errorText.innerText = "Errurs dun 'appened"
        return;
    }
    
    //Create Heading
    mainHeading = document.createElement("h3");
    mainHeading.classList.add("output","productHeading");
    productName = product.replace("_"," ").toUpperCase();
    mainHeading.innerText = productName;
    main.appendChild(mainHeading);
    
    details = get_details(product);
    productDescription = details.shift();

    //Create Description
    descriptionElement = document.createElement("h5")
    descriptionElement.classList.add("output","productDescription");
    descriptionElement.innerText = productDescription;
    main.appendChild(descriptionElement);

    //Create Buttons
    recipe = document.getElementById("recipe")
    details.forEach(function(newProduct){
        console.log(newProduct.replace("_"," ").toUpperCase());
        newButton = document.createElement("button");
        newButton.classList.add("output");
        newButton.innerText= newProduct.replace("_"," ").toUpperCase();
        console.log(newProduct);
        newButton.setAttribute("onclick",`product_clicked("${newProduct}")`);
        recipe.appendChild(newButton)
        
    })


    //Remove faded-out class so it fades in
    output = document.getElementById("output")    

    output.classList.add("faded-in");
    output.classList.remove("faded-out")
}

function get_details(product){
    switch (product){
        case "fusion_ignitor":
            return ["Fusion Ignitor is a tradeable that can be crafted. The blueprint can be acquired from Manufacturing Facilites.","portable_reactor","quantum_processor","geodesite"]
            break;
        case "portable_reactor":
            return ["Portable Reactor is a tradeable that can be crafted or purchased. A miniature self-controlled nuclear reactor. Generates sub-stellar levels of energy in a hassle-free, widely compatible fuel module.","fusion_accelerant","liquid_explosive"]
            break;
        case "quantum_processor":
            return ["Quantum Processor is a tradeable that can be crafted or purchased. A highly advanced computational device, essential for the complex calculations involved in warp travel.","super_conductor","circuit_board"]
            break;
        case "geodesite":
            return ["Geodesite is a tradeable that is used for crafting. Advanced and durable alloy primarily used in starship hull construction and deep-space exploration drone technology.","dirty_bronze","lemmium","herox"]
            break;
        case "liquid_explosive":
            return ["Liquid Explosive is an advanced agricultural product. A general purpose high explosive, offered in liquid form for convenience of transport and deployment. Do not drink.","acid","unstable_gel"]
            break;
        case "fusion_accelerant":
            return ["Fusion Accelerant is a tradeable that is used for crafting. An advanced fuel source, made from a perfect blend of high potential energy organic materials.","organic_catalyst","nitrogen_salt"];
            break;
        case "super_conductor":
            return ["Superconductor is a tradeable that is used for crafting. An advanced conductive material, the superconductor further enriches the field-warping power of the Semiconductor.","enriched_carbon","semi_conductor"]
            break;
        case "acid":
            return ["Acid is an tradeable and one of the advanced agricultural products.Dilute acid for high current generation in diverse power cells.","mordite","fungal_mould"];
            break;
        case "unstable_gel":
            return ["Unstable Gel is a tradeable that is used in crafting. A highly reactive gel, this substance is both energy-rich and dangerous to touch.","cactus_flesh"]
            break;
        default:
            return "N/A"

    }

}