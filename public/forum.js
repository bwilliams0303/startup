function newMonster() {
	localStorage.setItem("loadCreature", "new");
}

const targetNode = document.querySelector("tbody");
const observer = new MutationObserver((mutationsList) => {
	for (const mutation of mutationsList) {
		if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
			handleNewPosts(mutation.addedNodes);
		}
	}
});

const observerConfig = {
	childList: true,
}

observer.observe(targetNode, observerConfig);

function handleNewPosts(newNodes) {
	for (const node of newNodes) {
		if (node.nodeName === "TR") {
			const username = getUsername();
			const level = node.querySelector("th")?.textContent || "";
			const creatureName = node.querySelector("td:first-child")?.textContent || "";
			showToast(username, level, creatureName);
			console.log("New Post on Forum: " + node);
		}
	}
}

function getUsername() {
	return localStorage.getItem('userName') || "Unknown";
}

function showToast(username, level, creatureName) {
	const toast = new bootstrap.Toast(document.getElementById("liveToast"));
	const popupUser = document.querySelector('#popupUser');
	popupUser.textContent = username;

	const popupLevel = document.querySelector('#popupLevel');
	popupLevel.textContent = level;

	const popupName = document.querySelector('#popupName');
	popupName.textContent = creatureName;

	toast.show();
}

function loadForum() {
	let forumCreatures = [];
	const creaturesText = localStorage.getItem('forum');
	if (creaturesText) {
		forumCreatures = JSON.parse(creaturesText);
	}
	const tableBody = document.querySelector("tbody");
	tableBody.innerHTML = "";

	forumCreatures.forEach((creature, i) => {
		try {
			parsedCreature = JSON.parse(creature);
		} catch (error) {
			console.error(`Error parsing creature at index ${i}:`, error);
			return; // Skip this iteration if the creature is not a valid JSON string
		}
		const tableRow = document.createElement("tr");
		tableRow.setAttribute("class", "table-light");

		const level = document.createElement("th");
		level.setAttribute("scope", "row");
		level.textContent = JSON.parse(creature).level;
		tableRow.appendChild(level);

		const name = document.createElement("td");
		name.textContent = JSON.parse(creature).name;
		tableRow.appendChild(name);

		const owner = document.createElement("td");
		owner.textContent = JSON.parse(creature).owner;
		tableRow.appendChild(owner);

		const date = document.createElement("td");
		date.textContent = JSON.parse(creature).createdDate;
		tableRow.appendChild(date);

		const view = document.createElement("td");
		const viewButton = document.createElement("button");
		viewButton.setAttribute("type", "button");
		viewButton.setAttribute("name", "download");
		viewButton.classList.add("fa", "fa-eye");
		view.appendChild(viewButton);
		viewButton.addEventListener("click", () => {
			localStorage.setItem("loadCreature", JSON.parse(creature).creatureId);
			window.location.href = "creature_creator.html";
		});

		tableRow.appendChild(view);
		tableBody.appendChild(tableRow);
	});

}

loadForum();