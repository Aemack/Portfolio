function clearMain(){
    output = document.getElementById("output")
    output.classList.add("faded-out")
    outputElements = document.querySelectorAll(".output")
    outputElements.forEach(function(element){
        element.remove();
    })
}

function aside_product_clicked(product){
    clearMain();
    display_data(product);
}

function product_clicked(product){
    outputElements = document.querySelectorAll(".output");
    shouldRemove = false;
    outputElements.forEach(function (element){
        if(shouldRemove){
            element.remove();
        }
        console.log(element.innerText)
        if(element.innerText.includes(product.replace("_"," ").toUpperCase())){
            shouldRemove = true;
        }
    })
    display_data(product);
}


function display_data(product){
    mainOutput = document.getElementById("main")
    main = document.createElement("div");
    main.classList.add("output");
    mainOutput.appendChild(main);


    //Handle Errors
    if (!product){
        errorText = document.createElement("h2");
        errorText.classList.add("output");
        errorText.innerText = "Errurs dun 'appened"
        return;
    }
    
    //Create Heading
    mainHeading = document.createElement("h3");
    mainHeading.classList.add("productHeading");
    productName = product.replace("_"," ").toUpperCase();
    mainHeading.innerText = productName;
    main.appendChild(mainHeading);
    
    details = get_details(product);
    productDescription = details.shift();

    //Create Description
    descriptionElement = document.createElement("h5")
    descriptionElement.classList.add("productDescription");
    descriptionElement.innerText = productDescription;
    main.appendChild(descriptionElement);

    //Create Buttons
    recipe = document.createElement("div")
    recipe.setAttribute("id","recipe")
    main.appendChild(recipe)
    details.forEach(function(newProduct){
        newButton = document.createElement("button");
        //newButton.classList.add("output");
        newButton.innerText= newProduct.replace("_"," ").toUpperCase();
        newButton.setAttribute("onclick",`product_clicked("${newProduct}")`);
        recipe.appendChild(newButton)
        
    })


    //Remove faded-out class so it fades in
    output = document.getElementById("output")    

    output.classList.add("faded-in");
    output.classList.remove("faded-out")
}

function get_details(product){

    //Format ["Description","ingredients"]

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
            return ["Fusion Accelerant is a tradeable that is used for crafting. An advanced fuel source, made from a perfect blend of high potential energy organic materials.","organic_catalyst","n_salt"];
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
        case "dirty_bronze":
            return ["Dirty Bronze is a tradeable that can be crafted or purchased. A popular metal alloy with a wide variety of uses. 'Dirty Bronze' has shed its scientific name in favor of the popular term for its colour.","pyrite","pure_ferrite"]
            break;
        case "herox":
            return ["Herox is a tradeable that can be crafted, found in containers or purchased. Combined neutral alloy with uses that range from pharmacology all the way to heavy industry. Crafted from Chlorine and Ammonia. Forms the backbone of galactic alloy trading.","ammonia","ionised_cobalt"]
            break;
        case "lemmium":
            return ["Lemmium is a tradeable that can be crafted, found or purchased. Pure Ferrite alloy. Crafted from Pure Ferrite and Uranium. Used extensively in starship freighter construction due to its sheer strength. A hardcore material popular on the Galactic Trade Network.","uranium","pure_ferrite"]
            break;
        case "pyrite":
            return ["Pyrite (Py) is a resource and one of the localised earth elements. It is used as fuel for the starship's Pulse Engine. Local mineral extract, typically found in large deposits or extracted from common materials after inspection with an Analysis Visor. Typically found on planets with a desert environment.",50]
            break;
        case "pure_ferrite":
            return ["Pure Ferrite (Fe+) is a resource and one of the metal elements. Processed metal, free of dust and pebbles. Used to construct a wide variety of structures and technologies. Typically purified from Ferrite dust using a Refiner, but can occasionally be found in large deposits. Collection may require an Advanced Mining Laser.",100]
            break;
        case "ammonia":
            return ["Ammonia (NH3) is a resource and one of the localised earth elements. Local mineral extract, typically found in large deposits or extracted from common materials after inspection with an Analysis Visor. Typically found on planets with a toxic environment.",50]
            break;
        case "ionised_cobalt":
            return ["Ionised Cobalt (Co+) is a resource and one of the earth elements. A highly energised form of Cobalt, this processed metal can be used to create Advanced Ion Batteries, a conveniently portable source of energy for the Exosuit. In widespread use as a key component in the creation of advanced technologies and structures.",50];
            break;
        case "uranium":
            return ["Uranium (U) is a resource and one of the localised earth elements. It is used as fuel for the starship's Launch Thruster. Local mineral extract, typically found in large deposits or extracted from common minerals after inspection with an Analysis Visor. Typically found on planets with a radioactive environment.",50]
            break;
        case "mordite":
            return ["Mordite (Mo) is a resource and one of the earth elements. Despite much study, little is known about this haunting, crystalline compound. It is released from the cadavers of dying creatures, but can also be specifically cultivated and harvested from the Mordite Root plant.",25];
            break;
        case "fungal_mould":
            return ["Fungal Mould (Ml) is a resource and one of the Harvested Agricultural Substance flora elements. An oddly-glowing substance, harvested from the gills of Fungal Clusters. The host plant requires a toxic climate to thrive in the wild, but can be farmed in all environments with the aid of a Hydroponics Tray.",600];
            break;
        case "cactus_flesh":
            return ["Cactus Flesh (Cc) is a resource and one of the Harvested Agricultural Substance flora elements. Succulent, edible cactus flesh from the Echinocactus plant. As well as being juicy on the tongue, the flesh has many industrial uses. The Echinocactus thrives only on desert planets, but can be farmed in all environments with the aid of a Hydroponics Tray.",200]
            break;
        case "organic_catalyst":
            return ["Organic Catalyst is a tradeable.  catalytic material used in the creation of many organic fertilizers. Crafted from Thermic Condensate and Enriched Carbon.","thermic_condensate","enriched_carbon"];
            break;
        case "thermic_condensate":
            return ["Thermic Condensate is a tradeable that can also be used to craft certain products. A refined product, holding the energy potential of heated atmospheric gas in a stable state until required. Crafted from Sulphurine and Condensed Carbon.","sulphurine","condensed_carbon"];
            break;
        case "condensed_carbon":
            return ["Condensed Carbon (C+) is a resource and one of the fuel elements. Advanced material, processed from regular carbon in a Refiner. The increased molecule density offers a substantially improved energy-per-gram ratio. Occasionally found in crystalline form. Harvesting large crystals may require a [sic] Advanced Mining Laser.",50]
            break;
        case "sulphurine":
            return ["Sulphurine (Su) is a resource and one of the Compressed Atmospheric Gas earth elements. A pungent atmospheric gas. High concentrations are extremely hazardous to organic life. With the aid of specialised machinery, can be extracted from the atmospheres of Scorched and Desert planets.",50]
            break;
        case "enriched_carbon":
            return ["Enriched Carbon is a tradeable that can also be used to craft certain products. A refined product, taking ordinary carbon and boosting it with radioactive energy. Crafted from Radon and Condensed Carbon.","radon","condensed_carbon"];
            break;
        case "radon":
            return ["Radon (Rn) is a resource and one of the Compressed Atmospheric Gas earth elements. A colourless, odourless gas with a relatively short half-life. Found in both Radioactive and Frozen atmospheres, this gas is produced by the decay of other high-energy elements.",250]
            break;
        case "n_salt":
            return ["N. Salt is a tradeable that can also be used to craft certain products. A refined product, this is a powerful organic fertiliser in an easily distributed form. Crafted from Nitrogen and Condensed Carbon.", "nitrogen","condensed_carbon"]
            break;
        case "nitrogen":
            return ["Nitrogen (N) is a resource and one of the Compressed Atmospheric Gas earth elements. A reactive atmospheric gas found wherever there is organic life. Nitrogen is readily harvested from the atmospheres of Lush and Toxic planets.",250]
            default:
            return "N/A"

    }

}