function issue_changed(){
	clear_all()
	selectedOption = document.getElementById("issue").value;
	console.log(selectedOption);
	display_cause_options(selectedOption);
}

function display_cause_options(issue) {
	switch (issue) {
		case "biting":
			options = ["Frustration","Redirected Aggression","Fear","Pain"]
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
	display_cause_details(cause)
	mainBody = document.getElementById("causeDescription")
	switch (cause) {
		case "Frustration":
			fixOptions=["Check the enviroment","Check Routines","Consider Exercise","Consider Boredom","Remove Cause","Consider breed of dog","Consider dog training"];
			break;
		case "Fear":
			fixOptions=["Visit a behaviourist","Establish trigger","Consider multi stacking triggers","Counter -condition","Desensitise to trigger","Teach calming protocol"]
			break;
		case "Pain":
			fixOptions=["Visit a Vet","Meet treatment needs","Keep safe","Safe Haven"];
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

function display_cause_details(cause){
	description = cause_description(cause)
	console.log(cause)
	navbar = document.getElementById("main")
	causeElement = document.createElement("div")
	causeElement.setAttribute("id","causeDescription")
	causeElement.setAttribute("class","output")
	causeTitle = document.createElement("h5")
	causeTitle.innerHTML = cause
	causeTitle.setAttribute("class","output")
	causeDescription = document.createElement("p")
	causeDescription.innerHTML = description
	causeDescription.setAttribute("class","output")
	navbar.appendChild(causeElement)
	causeElement.appendChild(causeTitle)
	causeElement.appendChild(causeDescription)
}

function cause_description(cause){
	switch (cause){
		case "Frustration":
			return "Frustration is when a dog gets real mad about stuff"
			break;
		case "Redirected Aggression":
			return "Sometimes a dog is mad and they cant control who at"
			break;
		default:
			return "This is some default";
			break;
	}
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
	imageElement.setAttribute("src",`${imageSource}`)
	imageElement.setAttribute("class",`output`)
	descriptionElement.innerText = fix_description(fixTitle)
	output.appendChild(titleElement)
	output.appendChild(descriptionElement)
	output.appendChild(imageElement)
}

function fix_description(fix) {
	switch (fix){
		case "Check the enviroment":
			return "Is your dog happy with the environment he is living in? Is there fresh water always available? Is there a noise or strong smell that might be uncomfortable, is he able to get peace or are there always people, pets etc busying around, does he have a place to sleep that is comfortable and away from distractions, is the music in the house too loud, TV volume or surround sound? Is he eating a good diet the best you can afford that suits him. Is he allowed out to the toilet regularly, is he left alone for long periods of time regularly? Does he live with or near something that frightens him i.e. another pet or child, the dog next door? Does he have enough enrichment in his environment?          Is the temperature within his living area set too high or low? It maybe that more than one of these things is increasing your dog’s anxiety levels and you should try and make sure that all the needs of your dog are met in his environment."
			break;
		case "Visit a behaviourist":
			return "A canine behaviourist is someone who has trained to help dog guardians understand why their dog is behaving in the way it is. They will discuss the issues and do a lot of detective work to find out why your dog behaves the way it does. They will then suggest a programme for you and your dog and support you through it if necessary."
		case "Check Routines":
			return "Dog's live their lives with very little choice, they rely on us to know their needs and meet them. It is important that dogs have daily schedules rather than routines. Schedules mean that mostly you will get walked twice a day, but sometimes 9.30 sometimes 10, it will happen but not at a precise time.  It is important that the dog knows his needs will be met, but he should not be pinned down to a routine so that when he cannot be fed at 5 O’clock on the dot, he will not get frustrated or anxious. However, routines are important for puppies and new dogs as they acclimatise themselves to living with you. Routines for toilet and feed times etc will be useful, but you will gradually want to loosen them into structures rather than routines."
			break;
		case "Consider Exercise":
			return "It is important to understand your dog breed and allow them the amount of exercise that they require. Each breed is different, but do not assume that a small breed will need less than a large breed. Without an outlet for their energy and an opportunity to engage in their natural behaviours, they may become frustrated and bored.";
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
			return "Just some plefiller text. Dogs are indeed dogs, they bark, woof get sratches. Only if they're good boys."
			break;
				

	}
	
}

function fix_image(fix){
	switch (fix){
		case "Check the enviroment":
			return "imgs/bitingDog.jpg"
			break;
		case "Check Routines":
			return "imgs/dog-routine.jpg"
			break;
		default:
			ranNum = Math.floor(Math.random()*3)
			dogImages = ["imgs/dogs.jpg","imgs/bitingDog.jpg","imgs/dog-routine.jpg"]
			return dogImages[ranNum]
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
