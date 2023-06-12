function newMonster() {
	localStorage.setItem("loadCreature", "new");
}

async function login() {
	endpointHandler(`/api/auth/login`);

	// if (endpointHandler(`/api/auth/create`));
	// else {
	// 	const nameEl = document.querySelector("#floatingInput");
	// 	localStorage.setItem("userName", nameEl.value);
	// 	window.location.href = "user_database.html";
	// }
}

async function create() {
	endpointHandler(`/api/auth/create`);

	// if (endpointHandler(`/api/auth/create`));
	// else {
	// 	const nameEl = document.querySelector("#floatingInput");
	// 	localStorage.setItem("userName", nameEl.value);
	// 	window.location.href = "user_database.html";
	// }
}

async function endpointHandler(endpoint) {
	const userName = document.querySelector('#floatingInput')?.value;
	const password = document.querySelector('#floatingPassword')?.value;
	const response = await fetch(endpoint, {
		method: 'post',
		body: JSON.stringify({ username: userName, password: password }),
		headers: {
		'Content-type': 'application/json; charset=UTF-8',
		},
	});

	if (response.ok) {
		localStorage.setItem('userName', userName);
		window.location.href = 'user_database.html';
	} else {
		const body = await response.json();
		const modalEl = document.querySelector('#msgModal');
		modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
		const msgModal = new bootstrap.Modal(modalEl, {});
		msgModal.show();
	}
}

function logout() {
	localStorage.removeItem('userName');
	fetch(`/api/auth/logout`, {
	  method: 'delete',
	}).then(() => (window.location.href = 'index.html'));
}