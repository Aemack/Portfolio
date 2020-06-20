function issue_changed(){
	clear_all()
	selectedOption = document.getElementById("issue").value;
	console.log(selectedOption);
	display_cause_options(selectedOption);
}

function display_cause_options(issue) {
	switch (issue) {
		case "biting":
			options = ["frustration","redirected agression","fear","pain"]
			break;
		case "humping":
			options=["In Heat","Domminance"]
			break;
		default:
			options = "err"
	}
	subnav = document.getElementById("subnav")
	options.forEach(option => {
		newOption = document.createElement("button")
		newOption.setAttribute("onclick",`display_fix_options("${option}")`)
		newOption.setAttribute("class","option")
		newOption.innerHTML = option;
		subnav.appendChild(newOption);
		
	})
	console.log(options)
}

function display_fix_options(cause){
	clear_output()
	
	console.log("hi")
	mainBody = document.getElementById("main")
	switch (cause) {
		case "frustration":
			fixOptions=["Check the enviroment","Check Routines","Remove Cause","Manage the Situation"];
			break;
		case "In Heat":
			fixOptions=["Spay","Neuter"];
			break;
		default:
			fixOptions=["Just","a","bit of placefilling"]
	}
	fixOptions.forEach(option => {
		fixHeading= document.createElement("button")
		fixHeading.innerHTML = option
		fixHeading.setAttribute("id",`${option.split(" ").join("")}Heading`)
		fixHeading.setAttribute("data-toggle",`collapse`)
		fixHeading.setAttribute("class","btn btn-primary output")
		fixHeading.setAttribute("aria-expanded","false")
		fixHeading.setAttribute("aria-controls",`fix`)
		fixHeading.setAttribute("onclick",`change_description("${option}")`)

		fixHeading.setAttribute("type","button")
		fixHeading.setAttribute("data-target",`#fix`)
		mainBody.appendChild(fixHeading)
		
	})
}

function change_description(fixTitle){
	console.log(fixTitle)
	oldFix = document.getElementById("fix")
	if (oldFix){
		oldFix.remove()
	}
	main = document.getElementById("main")
	output = document.createElement("div")
	output.setAttribute("id","fix")
	main.appendChild(output)
	titleElement = document.createElement("h5")
	descriptionElement = document.createElement("p")
	descriptionElement.setAttribute("id","fixDescription")
	descriptionElement.setAttribute("class","output")
	titleElement.setAttribute("class","output")
	titleElement.setAttribute("id","titleDescription")
	titleElement.innerText = fixTitle
	imageSource = fix_image(fixTitle)
	imageElement = document.createElement("img")
	imageElement.setAttribute("src",`imgs/${imageSource}`)
	imageElement.setAttribute("class",`output`)
	descriptionElement.innerText = fix_description(fixTitle)
	output.appendChild(titleElement)
	output.appendChild(descriptionElement)
	output.appendChild(imageElement)
}

function fix_description(fix) {
	switch (fix){
		case "Check the enviroment":
			return "Dogs are sensitive to their environment in many ways, look out for what might be triggering them. Like horses, vacum cleaners "
			break;
		case "Check Routines":
			return "Dogs rely on routine so when they don't get their food or walk at the right time they may maul a child"
			break;
		case "Remove Cause":
			return "See if you can remove whatever is causing the dog to be upset or it may maul a child"
			break;
		case "Manage the Situation":
			return "Manage the situation and be aware of your surroundings. If you are in a play park, the dog may maul a child"
			break;
		case "Spay":
			return "Make it have babies no more"
			break;
		case "Neuter":
			return "Take away its balls"
			break;
		default:
			return "Dogs rely on routine so when they don't get their food or walk at the right time they may maul a child"
			break;
				

	}
	
}

function fix_image(fix){
	switch (fix){
		case "Check the enviroment":
			return "bitingDog.jpg"
			break;
		case "Check Routines":
			return "dog-routine.jpg"
			break;
		case "Remove Cause":
			return "See if you can remove whatever is causing the dog to be upset or it may maul a child"
			break;
		case "Manage the Situation":
			return "Manage the situation and be aware of your surroundings. If you are in a play park, the dog may maul a child"
			break;
		case "Spay":
			return "Make it have babies no more"
			break;
		case "Neuter":
			return "Take away its balls"
			break;
		default:
			return "Dogs rely on routine so when they don't get their food or walk at the right time they may maul a child"
			break;
	}	
}

function clear_all(){
	clear_subnav()
	clear_output()
}

function clear_subnav(){
    outputList = document.getElementById("subnav").querySelectorAll(".option")
    outputList.forEach((elem) => {
        elem.remove();
    })
}

function clear_output(){
    outputList = document.getElementById("main").querySelectorAll(".output")
    outputList.forEach((elem) => {
        elem.remove();
    })
}