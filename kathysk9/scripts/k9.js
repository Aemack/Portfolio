function issue_changed(){
	clear_all()
	selectedOption = document.getElementById("issue").value;
	console.log(selectedOption);
	display_cause_options(selectedOption);
}

function display_cause_options(issue) {
	switch (issue) {
		case "biting":
			options = ["Frustration","Redirected Aggression","Fear","Pain","Puppy Biting"]
			break;
		case "chewing":
			options =["Pain","Teething"];
			break;
		case "humping":
			options=["In Heat","Male"]
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
			fixOptions=["Check the Enviroment","Check Daily Structure","Consider Exercise","Consider Boredom","Remove Cause","Consider Breed of Dog","Consider Dog training"];
			break;
		case "Fear":
			fixOptions=["Visit a Behaviourist","Establish Trigger","Multi Stacking Triggers","Counter-Condition","Desensitise to Trigger","Teach Calming Protocol"]
			break;
		case "Pain":
			fixOptions=["Visit a Vet","Treatment Needs","Keep Safe","Safe Haven"];
			break;
		case "Dominant Male to Male Aggression":
			fixOptions=["Nueter","Vet Approved Hormone Treatment","Consider Calming Diffuser","Consider a Safe Haven"];
			break;
		case "In Heat":
			fixOptions=["Vet Approved Hormone Treatment","Spay","Consider Calming Diffuser","Consider a Safe Haven"]
			break;
		case "Puppy Biting":
			fixOptions=["Puppy Training Classes","Remove Interaction","Distract and Reward","Mutually Exclusive Behaviour","Consider Enough Rest","Calming Protocols","Consider a Safe Haven","Spay"]
			break;
		case "Redirected Aggression":
			fixOptions = ["Visit a Behaviourist"]
			break;
		case "Teething":
			fixOptions=["Visit a Vet","Consider a Variety of Chews"]
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
	titleElement.setAttribute("class","output")
	titleElement.setAttribute("id","titleDescription")
	titleElement.innerText = fixTitle
	output.appendChild(titleElement)
	descripArray = fix_description(fixTitle).split(".")
	descripArray.forEach(sentence =>{
		newDescrip = document.createElement("p")
		newDescrip.setAttribute("class","output")
		newDescrip.innerText = sentence
		imageSource = fix_image("nan")
		imageElement = document.createElement("img")
		imageElement.setAttribute("src",`${imageSource}`)
		imageElement.setAttribute("class",`output`)

		output.appendChild(newDescrip)
		output.appendChild(imageElement)
	})
//	descriptionElement.innerText = descripArray[1]

//	output.appendChild(imageElement)
}

function fix_description(fix) {
	switch (fix){
		case "Check the Enviroment":
			return "Is your dog happy with the environment he is living in? Is there fresh water always available? Is there a noise or strong smell that might be uncomfortable, is he able to get peace or are there always people, pets etc busying around, does he have a place to sleep that is comfortable and away from distractions, is the music in the house too loud, TV volume or surround sound? Is he eating a good diet the best you can afford that suits him. Is he allowed out to the toilet regularly, is he left alone for long periods of time regularly? Does he live with or near something that frightens him ie another pet or child, the dog next door? Does he have enough enrichment in his environment?          Is the temperature within his living area set too high or low? It maybe that more than one of these things is increasing your dog’s anxiety levels and you should try and make sure that all the needs of your dog are met in his environment"
			break;
		case "Visit a Behaviourist":
			return "A canine behaviourist is someone who has trained to help dog guardians understand why their dog is behaving in the way it is. They will discuss the issues and do a lot of detective work to find out why your dog behaves the way it does. They will then suggest a programme for you and your dog and support you through it if necessary"
		case "Check Daily Structure":
			return "Dog's live their lives with very little choice, they rely on us to know their needs and meet them. It is important that dogs have daily schedules rather than routines. Schedules mean that mostly you will get walked twice a day, but sometimes 9-30 sometimes 10, it will happen but not at a precise time.  It is important that the dog knows his needs will be met, but he should not be pinned down to a routine so that when he cannot be fed at 5 O’clock on the dot, he will not get frustrated or anxious. However, routines are important for puppies and new dogs as they acclimatise themselves to living with you. Routines for toilet and feed times etc will be useful, but you will gradually want to loosen them into structures rather than routines"
			break;
		case "Consider Exercise":
			return "It is important to understand your dog breed and allow them the amount of exercise that they require. Each breed is different, but do not assume that a small breed will need less than a large breed. Without an outlet for their energy and an opportunity to engage in their natural behaviours, they may become frustrated and bored";
			break;
		case "Remove Cause":
			return "If you have managed to identify what is causing your dog’s frustration, do what you can to remove the cause. Seek professional help, if necessary, from a trained behaviourist. Consider if you are meeting your dog’s breed specific needs. Each breed of dog has been hard wired for thousands of years to complete certain tasks. The collie has eye stalk, rounding and chasing, herding motions, the spaniel to flush out birds, the greyhound to chase and kill small creatures, the terriers to hunt out vermin etc When we take these dogs into our home and treat them as lap dogs, they become frustrated as they cannot express their hardwired desires. It is necessary for guardians to find safe outlets for these behaviours. Ball sheep games for the collie, a fast run for the greyhounds, woodland adventures for the spaniel, a place to dig for a terrier etc"
			break;
		case "Manage the Situation":
			return "Manage the situation and be aware of your surroundings. If you are in a play park, the dog may maul a child"
			break;
		case "Consider Boredom":
			return "Most dogs are bred to do a job and many are hardwired to do this job. When there is no opportunity for the dog to use its brain boredom can set in. When this happens, the dog begins to create its own activities and these can often be the behaviours we least want. Make sure that your dog has enough company, dogs do not do well on their own, they are sociable animals. Consider enriching their environment with chews, interactive toys. Teach them tricks and brain games. Think about feeding their dinner from a snuffles rug or scatter feed. All these things can give your dog something to do when you cannot give him attention. However, play and interaction with you is always going to be the best boredom buster, so set aside time for your dog. Consider agility, scent work, training classes etc. to give you an opportunity to form a team together"
			break;
		case "Consider a Sport":
			return "Allowing your dog to have an outlet for their natural instincts can be hard, but if you join a club this can sometimes be easier. Train a gun dog to the gun (reward based training only, working dogs are no different to pet dogs and should be trained along the same principles, actual hunting and killing is not necessary) Train agility, most dogs love this activity, just make sure you get correct training so you do not damage your dog’s limbs. Scent work, all dogs love using their nose and most can be taught to do this extremely well. There are great competitions that can be done. Man-trailing is also a sport that your dog might enjoy. Have a look for anything that you think you and your dog might enjoy, just remember it is about both you and your dog"
			break;
		case "Establish Trigger":
			return "Observe your dog carefully and establish the potential triggers for the behaviour. There is often more than one. Make a note of what happens just before and just after an “event”. Look at ways that you might remove the triggers, desensitise the dog to them or counter-condition. A behaviourist can help with this"
			break;
		case "Stress Bucket":
			return "Dogs add either good stress or bad stress to their “stress bucket”. Either way, high stress levels are not good for them and so we need to work at “calming” to bring those stress levels down. Examples might be: dog gets out to toilet in the morning and chases the cat, (excitement and arousal), you recall him in and he is slow to come and you shout at him (negative stress ), the children come down and start to play raggy with him, (excitement and arousal), you get annoyed and shout at him and put him out of the room, (negative stress), whilst he is in the room on his own the door bell goes, (excited arousal and poss anxiety), you take him out for walk and the first dog who he sees he barks and lunges at. The previous stresses are stress sacks, the dog needed to empty the bucket of some stress before he went out. A calm chew time, sprinkle kibble in the grass etc. See calmness protocal"
			break;
		case "Spay":
			return "Make it have babies no more"
			break;
		case "Neuter":
			return "Take away its balls"
			break;
		default:
			return "Just some plefiller text. Dogs are indeed dogs, they bark, woof get sratches. Only if they're good boys. But these guys are just the goodest boys"
			break;
				

	}
	
}

function fix_image(fix){
	switch (fix){
		case "Check the enviroment":
			return "imgs/bitingDog.jpg"
			break;
		case "Check Daily Structure":
			return "imgs/dog-routine.jpg"
			break;
		default:
			ranNum = Math.floor(Math.random()*10)
			return `imgs/dogs${ranNum}.jpeg`
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
