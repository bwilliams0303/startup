function login() {
	const nameEl = document.querySelector("#floatingInput");
	localStorage.setItem("userName", nameEl.value);
	window.location.href = "user_database.html";
}

function newMonster() {
	localStorage.setItem("loadCreature", "new");
}