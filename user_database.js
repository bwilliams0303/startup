function loadCreatures() {
	let creatures = [];
	const creaturesText = localStorage.getItem('creatures');
	if (creaturesText) {
		creatures = JSON.parse(creaturesText);
	}

}

function insertUsername() {
	document.getElementById("username").innerHTML = getUsername();
}

function getUsername() {
	return localStorage.getItem('userName') ?? 'Unknown';
}

function newMonster() {
	localStorage.setItem("loadCreature", "new");
	window.location.href = "creature_creator.html";
}

insertUsername();
loadCreatures();