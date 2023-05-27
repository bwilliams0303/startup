function loadCreatures() {
	let creatures = [];
	const creaturesText = localStorage.getItem('creatures');
	if (creaturesText) {
		creatures = JSON.parse(creaturesText);
	}
	const tableBody = document.querySelector("tbody");
	tableBody.innerHTML = "";

	creatures.forEach((creature, i) => {
		if (JSON.parse(creature).owner == getUsername()) {
			const tableRow = document.createElement("tr");
			tableRow.setAttribute("class", "table-light");

			const level = document.createElement("th");
			level.setAttribute("scope", "row");
			level.textContent = JSON.parse(creature).level;
			tableRow.appendChild(level);

			const name = document.createElement("td");
			name.textContent = JSON.parse(creature).name;
			tableRow.appendChild(name);

			const date = document.createElement("td");
			date.textContent = JSON.parse(creature).createdDate;
			tableRow.appendChild(date);

			const actions = document.createElement("td");
			const edit = document.createElement("button");
			edit.setAttribute("type", "button");
			edit.setAttribute("name", "edit");
			edit.classList.add("fa", "fa-edit");
			actions.appendChild(edit);
			edit.addEventListener("click", () => {
				localStorage.setItem("loadCreature", JSON.parse(creature).creatureId);
				window.location.href = "creature_creator.html";
			});

			const upload = document.createElement("button");
			upload.setAttribute("type", "button");
			upload.setAttribute("name", "upload");
			upload.classList.add("fa", "fa-upload");
			actions.appendChild(upload);
			upload.addEventListener("click", () => {
				let forum = [];
				const forumText = localStorage.getItem('forum');
				if (forumText) {
					forum = JSON.parse(forumText);
					for (var i = 0; i < forum.length; i++) {
						if (JSON.parse(forum[i]).creatureId == JSON.parse(creature).creatureId) {
							forum.splice(i, 1);
							break;
						}
					}
				}
				forum.push(creature);
				localStorage.setItem('forum', JSON.stringify(forum));


			});

			const trash = document.createElement("button");
			trash.setAttribute("type", "button");
			trash.setAttribute("name", "delete");
			trash.classList.add("fa", "fa-trash");
			actions.appendChild(trash);
			trash.addEventListener("click", () => {
				deleteCreature(i);
				tableRow.remove();
			});

			tableRow.appendChild(actions);
			tableBody.appendChild(tableRow);
		}
	});

}

function deleteCreature(i) {
	let creatures = [];
	const creaturesText = localStorage.getItem('creatures');
	if (creaturesText) {
		creatures = JSON.parse(creaturesText);
	}
	creatures.splice(i, 1);
	localStorage.setItem('creatures', JSON.stringify(creatures));
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
loadCreatures();