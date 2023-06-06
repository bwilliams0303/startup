async function loadCurrentUserCreatures() {
	let creatures = [];

	try {
		// Get the latest creature from the service
		const response = await fetch('/api/creatures');
		const responseData = await response.json();
		console.log('Response data:', responseData); // Log the response data for debugging
		creatures = responseData;
	
		// Save the currentUserCreatures in case we go offline in the future
		localStorage.setItem('allCreatures', JSON.stringify(creatures));
	  } catch {
		// If there was an error then just use the last saved currentUserCreatures
		const creaturesText = localStorage.getItem('allCreatures');
		if (creaturesText) {
		  creatures = JSON.parse(creaturesText);
		}
	  }

	const tableBody = document.querySelector("tbody");
	tableBody.innerHTML = "";

	// Display each creature that is associated with the current user's username
	creatures.forEach((creature, i) => {
		if (creature.owner == getUsername()) {
			const tableRow = document.createElement("tr");
			tableRow.setAttribute("class", "table-light");

			const level = document.createElement("th");
			level.setAttribute("scope", "row");
			level.textContent = creature.level;
			tableRow.appendChild(level);

			const name = document.createElement("td");
			name.textContent = creature.name;
			tableRow.appendChild(name);

			const date = document.createElement("td");
			date.textContent = creature.createdDate;
			tableRow.appendChild(date);

			const actions = document.createElement("td");
			const edit = document.createElement("button");
			edit.setAttribute("type", "button");
			edit.setAttribute("name", "edit");
			edit.classList.add("fa", "fa-edit");
			actions.appendChild(edit);
			edit.addEventListener("click", () => {
				localStorage.setItem("loadCreature", creature.creatureId);
				window.location.href = "creature_creator.html";
			});

			const upload = document.createElement("button");
			upload.setAttribute("type", "button");
			upload.setAttribute("name", "upload");
			upload.classList.add("fa", "fa-upload");
			actions.appendChild(upload);
			upload.addEventListener("click", async () => {

				try {
					const response = await fetch('/api/upload', {
					method: 'POST',
					headers: {'content-type': 'application/json'},
					body: JSON.stringify(creature),
					});
			
					// Store what the service gave us as the forum
					const forum = await response.json();
					localStorage.setItem('forum', JSON.stringify(forum));
				} catch {
					// If there was an error then just track the forum locally
					this.uploadCreatureLocal(creature);
				}

			});

			const trash = document.createElement("button");
			trash.setAttribute("type", "button");
			trash.setAttribute("name", "delete");
			trash.classList.add("fa", "fa-trash");
			actions.appendChild(trash);
			trash.addEventListener("click", async () => {

				try {
					const response = await fetch('/api/delete', {
					method: 'POST',
					headers: {'content-type': 'application/json'},
					body: JSON.stringify(creature.creatureId),
					});

					const deleteMessage = await response.json();
					console.log(deleteMessage);
				} catch {
					deleteCreatureLocal(i);
				}
				
				tableRow.remove();
			});

			tableRow.appendChild(actions);
			tableBody.appendChild(tableRow);
		}
	});

}

function uploadCreatureLocal(creature) {
	let forum = [];
	const forumText = localStorage.getItem('forum');
	if (forumText) {
		forum = JSON.parse(forumText);
		for (var i = 0; i < forum.length; i++) {
			if (forum[i].creatureId == creature.creatureId) {
				forum.splice(i, 1);
				break;
			}
		}
	}
	forum.push(creature);
	localStorage.setItem('forum', JSON.stringify(forum));
}

function deleteCreatureLocal(i) {
	let creatures = [];
	const creaturesText = localStorage.getItem('allCreatures');
	if (creaturesText) {
		creatures = JSON.parse(creaturesText);
	}
	creatures.splice(i, 1);
	localStorage.setItem('allCreatures', JSON.stringify(creatures));
}

function insertUsername() {
	const usernameElement = document.getElementById("username");
	const username = getUsername();

	if (username && username !== 'Unknown') {
		usernameElement.innerHTML = username;
	} else {
		usernameElement.innerHTML = 'Unknown';
	}
}

function getUsername() {
	return localStorage.getItem('userName') || "Unknown";
}

function newMonster() {
	localStorage.setItem("loadCreature", "new");
	window.location.href = "creature_creator.html";
}

insertUsername();
loadCurrentUserCreatures();


// async function loadCurrentUserCreatures() {
// 	let creatures = [];

// 	try {
// 		// Get the latest creature from the service
// 		const response = await fetch('/api/creatures');
// 		const responseData = await response.json();
// 		console.log('Response data:', responseData); // Log the response data for debugging
// 		creatures = JSON.parse(responseData);
	
// 		// Save the currentUserCreatures in case we go offline in the future
// 		localStorage.setItem('allCreatures', JSON.stringify(creatures));
// 	  } catch {
// 		// If there was an error then just use the last saved currentUserCreatures
// 		const creaturesText = localStorage.getItem('allCreatures');
// 		if (creaturesText) {
// 		  creatures = JSON.parse(creaturesText);
// 		}
// 	  }

// 	const tableBody = document.querySelector("tbody");
// 	tableBody.innerHTML = "";

// 	// Display each creature that is associated with the current user's username
// 	creatures.forEach((creature, i) => {
// 		if (JSON.parse(creature).owner == getUsername()) {
// 			const tableRow = document.createElement("tr");
// 			tableRow.setAttribute("class", "table-light");

// 			const level = document.createElement("th");
// 			level.setAttribute("scope", "row");
// 			level.textContent = JSON.parse(creature).level;
// 			tableRow.appendChild(level);

// 			const name = document.createElement("td");
// 			name.textContent = JSON.parse(creature).name;
// 			tableRow.appendChild(name);

// 			const date = document.createElement("td");
// 			date.textContent = JSON.parse(creature).createdDate;
// 			tableRow.appendChild(date);

// 			const actions = document.createElement("td");
// 			const edit = document.createElement("button");
// 			edit.setAttribute("type", "button");
// 			edit.setAttribute("name", "edit");
// 			edit.classList.add("fa", "fa-edit");
// 			actions.appendChild(edit);
// 			edit.addEventListener("click", () => {
// 				localStorage.setItem("loadCreature", JSON.parse(creature).creatureId);
// 				window.location.href = "creature_creator.html";
// 			});

// 			const upload = document.createElement("button");
// 			upload.setAttribute("type", "button");
// 			upload.setAttribute("name", "upload");
// 			upload.classList.add("fa", "fa-upload");
// 			actions.appendChild(upload);
// 			upload.addEventListener("click", async () => {

// 				try {
// 					const response = await fetch('/api/forum', {
// 					method: 'POST',
// 					headers: {'content-type': 'application/json'},
// 					body: creature,
// 					});
			
// 					// Store what the service gave us as the forum
// 					const forum = await response.json();
// 					localStorage.setItem('forum', JSON.stringify(forum));
// 				} catch {
// 					// If there was an error then just track the forum locally
// 					this.uploadCreatureLocal(creature);
// 				}

// 			});

// 			const trash = document.createElement("button");
// 			trash.setAttribute("type", "button");
// 			trash.setAttribute("name", "delete");
// 			trash.classList.add("fa", "fa-trash");
// 			actions.appendChild(trash);
// 			trash.addEventListener("click", async () => {

// 				try {
// 					const response = await fetch('/api/delete', {
// 					method: 'POST',
// 					headers: {'content-type': 'application/json'},
// 					body: i,
// 					});

// 				} catch {
// 					deleteCreatureLocal(i);
// 				}
				
// 				tableRow.remove();
// 			});

// 			tableRow.appendChild(actions);
// 			tableBody.appendChild(tableRow);
// 		}
// 	});

// }

// function uploadCreatureLocal(creature) {
// 	let forum = [];
// 	const forumText = localStorage.getItem('forum');
// 	if (forumText) {
// 		forum = JSON.parse(forumText);
// 		for (var i = 0; i < forum.length; i++) {
// 			if (JSON.parse(forum[i]).creatureId == JSON.parse(creature).creatureId) {
// 				forum.splice(i, 1);
// 				break;
// 			}
// 		}
// 	}
// 	forum.push(creature);
// 	localStorage.setItem('forum', JSON.stringify(forum));
// }

// function deleteCreatureLocal(i) {
// 	let creatures = [];
// 	const creaturesText = localStorage.getItem('allCreatures');
// 	if (creaturesText) {
// 		creatures = JSON.parse(creaturesText);
// 	}
// 	creatures.splice(i, 1);
// 	localStorage.setItem('allCreatures', JSON.stringify(creatures));
// }

// function insertUsername() {
// 	const usernameElement = document.getElementById("username");
// 	const username = getUsername();

// 	if (username && username !== 'Unknown') {
// 		usernameElement.innerHTML = username;
// 	} else {
// 		usernameElement.innerHTML = 'Unknown';
// 	}
// }

// function getUsername() {
// 	return localStorage.getItem('userName') || "Unknown";
// }

// function newMonster() {
// 	localStorage.setItem("loadCreature", "new");
// 	window.location.href = "creature_creator.html";
// }

// insertUsername();
// loadCurrentUserCreatures();