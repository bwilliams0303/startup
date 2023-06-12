class Creature {
	owner;
	createdDate;
	creatureId;
	overallAdjustment;
	name;
	level;
	alignment;
	size;
	otherTraits;
	languages;
	speed;
	strength;
	dexterity;
	constitution;
	intelligence;
	wisdom;
	charisma;
	health;
	armorClass;
	perception;
	fortitude;
	reflex;
	will;

	weaknesses;
	immunities;
	resistances;
	skills;
	actions;
	inventory;
	notes;

	strengthAdjustment;
	dexterityAdjustment;
	constitutionAdjustment;
	intelligenceAdjustment;
	wisdomAdjustment;
	charismaAdjustment;
	healthAdjustment;
	armorClassAdjustment;
	perceptionAdjustment;
	fortitudeAdjustment;
	reflexAdjustment;
	willAdjustment;

	isSaving;

	constructor() {
		this.owner = this.getOwnerName();
		this.createdDate = new Date().toLocaleDateString();
		this.creatureId = this.createId();
		this.overallAdjustment = () => {
			document.querySelector('input[name="creatureAdjust"][value="normal"]').checked = true;
			// document.creatureSheet.creatureAdjust[1].checked = true;
			return document.querySelector('input[name="creatureAdjust"]:checked').value;
		}
		this.name = () => {
			document.getElementById("name").value = "";
			return document.getElementById("name").value;
		}
		this.level = () => {
			document.getElementById("typeNumber").value = "0";
			return document.getElementById("typeNumber").value;
		}
		this.alignment = () => {
			document.getElementById("alignment").value = "neutral";
			return document.getElementById("alignment").value;
		}
		this.size = () => {
			document.getElementById("size").value = "medium";
			return document.getElementById("size").value;
		}
		this.speed = () => {
			document.getElementById("speedInput").value = "25";
			return document.getElementById("size").value;
		}
		this.strength = () => {
			document.getElementById("abilityStr").value = "0";
			return document.getElementById("abilityStr").value;
		}
		this.dexterity = () => {
			document.getElementById("abilityDex").value = "0";
			return document.getElementById("abilityDex").value;
		}
		this.constitution = () => {
			document.getElementById("abilityCon").value = "0";
			return document.getElementById("abilityCon").value;
		}
		this.intelligence = () => {
			document.getElementById("abilityInt").value = "0";
			return document.getElementById("abilityInt").value;
		}
		this.wisdom = () => {
			document.getElementById("abilityWis").value = "0";
			return document.getElementById("abilityWis").value;
		}
		this.charisma = () => {
			document.getElementById("abilityCha").value = "0";
			return document.getElementById("abilityCha").value;
		}
		this.health = () => {
			document.getElementById("health").value = "15";
			return document.getElementById("health").value;
		}
		this.armorClass = () => {
			document.getElementById("armorClass").value = "15";
			return document.getElementById("armorClass").value;
		}
		this.perception = () => {
			document.getElementById("perception").value = "2";
			return document.getElementById("perception").value;
		}
		this.fortitude = () => {
			document.getElementById("fortitude").value = "0";
			return document.getElementById("fortitude").value;
		}
		this.reflex = () => {
			document.getElementById("reflex").value = "0";
			return document.getElementById("reflex").value;
		}
		this.will = () => {
			document.getElementById("will").value = "0";
			return document.getElementById("will").value;
		}
		this.strengthAdjustment = () => {
			document.getElementById("strScaling").value = "none";
			return document.getElementById("strScaling").value;
		}
		this.dexterityAdjustment = () => {
			document.getElementById("dexScaling").value = "none";
			return document.getElementById("dexScaling").value;
		}
		this.constitutionAdjustment = () => {
			document.getElementById("conScaling").value = "none";
			return document.getElementById("conScaling").value;
		}
		this.intelligenceAdjustment = () => {
			document.getElementById("intScaling").value = "none";
			return document.getElementById("intScaling").value;
		}
		this.wisdomAdjustment = () => {
			document.getElementById("wisScaling").value = "none";
			return document.getElementById("wisScaling").value;
		}
		this.charismaAdjustment = () => {
			document.getElementById("chaScaling").value = "none";
			return document.getElementById("chaScaling").value;
		}
		this.healthAdjustment = () => {
			document.getElementById("healthScaling").value = "none";
			return document.getElementById("healthScaling").value;
		}
		this.armorClassAdjustment = () => {
			document.getElementById("acScaling").value = "none";
			return document.getElementById("acScaling").value;
		}
		this.perceptionAdjustment = () => {
			document.getElementById("percepScaling").value = "none";
			return document.getElementById("percepScaling").value;
		}
		this.fortitudeAdjustment = () => {
			document.getElementById("fortScaling").value = "none";
			return document.getElementById("fortScaling").value;
		}
		this.reflexAdjustment = () => {
			document.getElementById("refScaling").value = "none";
			return document.getElementById("refScaling").value;
		}
		this.willAdjustment = () => {
			document.getElementById("willScaling").value = "none";
			return document.getElementById("willScaling").value;
		}
		this.inventory = () => {
			document.getElementById("inventory").value = "";
			return document.getElementById("inventory").value;
		}
		this.notes = () => {
			document.getElementById("notes").value = "";
			return document.getElementById("notes").value;
		}

		this.otherTraits = [];
		this.languages = [];
		this.weaknesses = [];
		this.immunities = [];
		this.resistances = [];
		this.skills = [];
		this.actions = [];
	}

	getOwnerName() {
		return localStorage.getItem('userName') || 'Unknown';
	}

	createId() {
		// 8 digits min and max
		const min = 10000000;
		const max = 99999999;
		const randomID = Math.floor(Math.random() * (max - min + 1)) + min;
		return randomID.toString();
	}

	async loadCreature(stringId) {
		let creatures = [];

		try {
			// Get the latest creature from the service
			const response = await fetch('/api/creatures');
			creatures = await response.json();
		
			// Save the creatures in case we go offline in the future
			localStorage.setItem('allCreatures', JSON.stringify(creatures));
		  } catch {
			// If there was an error then just use the last saved creatures
			const creaturesText = localStorage.getItem('allCreatures');
			if (creaturesText) {
			  creatures = JSON.parse(creaturesText);
			}
		  }

		let foundCreature = null;
		creatures.forEach((creature) => {
			if (creature.creatureId == stringId) {
				this.transferData(creature);
				this.reflectData();
				console.log(creature);
				foundCreature = creature;
				return;
			}
		});
	}

	transferData(loadedCreature) {
		this.creatureId = loadedCreature.creatureId;
		this.overallAdjustment = loadedCreature.overallAdjustment;
		this.name = loadedCreature.name;
		this.level = loadedCreature.level;
		this.alignment = loadedCreature.alignment;
		this.size = loadedCreature.size;
		this.speed = loadedCreature.speed;
		this.strength = loadedCreature.strength;
		this.dexterity = loadedCreature.dexterity;
		this.constitution = loadedCreature.constitution;
		this.intelligence = loadedCreature.intelligence;
		this.wisdom = loadedCreature.wisdom;
		this.charisma = loadedCreature.charisma;
		this.health = loadedCreature.health;
		this.armorClass = loadedCreature.armorClass;
		this.perception = loadedCreature.perception;
		this.fortitude = loadedCreature.fortitude;
		this.reflex = loadedCreature.reflex;
		this.will = loadedCreature.will;
		this.strengthAdjustment = loadedCreature.strengthAdjustment;
		this.dexterityAdjustment = loadedCreature.dexterityAdjustment;
		this.constitutionAdjustment = loadedCreature.constitutionAdjustment;
		this.intelligenceAdjustment = loadedCreature.intelligenceAdjustment;
		this.wisdomAdjustment = loadedCreature.wisdomAdjustment;
		this.charismaAdjustment = loadedCreature.charismaAdjustment;
		this.healthAdjustment = loadedCreature.healthAdjustment;
		this.armorClassAdjustment = loadedCreature.armorClassAdjustment;
		this.perceptionAdjustment = loadedCreature.perceptionAdjustment;
		this.fortitudeAdjustment = loadedCreature.fortitudeAdjustment;
		this.reflexAdjustment = loadedCreature.reflexAdjustment;
		this.willAdjustment = loadedCreature.willAdjustment;
		this.inventory = loadedCreature.inventory;
		this.notes = loadedCreature.notes;
		this.loadArrays(loadedCreature);
	}

	reflectData() {
		document.querySelector('input[name="creatureAdjust"][value="' + this.overallAdjustment + '"]').checked = true;
		document.getElementById("name").value = this.name;
		document.getElementById("typeNumber").value = this.level;
		document.getElementById("alignment").value = this.alignment;
		document.getElementById("size").value = this.size;
		document.getElementById("speedInput").value = this.speed;
		document.getElementById("abilityStr").value = this.strength;
		document.getElementById("abilityDex").value = this.dexterity;
		document.getElementById("abilityCon").value = this.constitution;
		document.getElementById("abilityInt").value = this.intelligence;
		document.getElementById("abilityWis").value = this.wisdom;
		document.getElementById("abilityCha").value = this.charisma;
		document.getElementById("health").value = this.health;
		document.getElementById("armorClass").value = this.armorClass;
		document.getElementById("perception").value = this.perception;
		document.getElementById("fortitude").value = this.fortitude;
		document.getElementById("reflex").value = this.reflex;
		document.getElementById("will").value = this.will;
		document.getElementById("strScaling").value = this.strengthAdjustment;
		document.getElementById("dexScaling").value = this.dexterityAdjustment;
		document.getElementById("conScaling").value = this.constitutionAdjustment;
		document.getElementById("intScaling").value = this.intelligenceAdjustment;
		document.getElementById("wisScaling").value = this.wisdomAdjustment;
		document.getElementById("chaScaling").value = this.charismaAdjustment;
		document.getElementById("healthScaling").value = this.healthAdjustment;
		document.getElementById("acScaling").value = this.armorClassAdjustment;
		document.getElementById("percepScaling").value = this.perceptionAdjustment;
		document.getElementById("fortScaling").value = this.fortitudeAdjustment;
		document.getElementById("refScaling").value = this.reflexAdjustment;
		document.getElementById("willScaling").value = this.willAdjustment;
		document.getElementById("inventory").value = this.inventory;
		document.getElementById("notes").value = this.notes;
		this.reflectArrays();
	}

	async saveCreature() {
		const savedCreature = JSON.stringify(this.updateCreature());
		try {
			const response = await fetch('/api/creature', {
			  method: 'POST',
			  headers: {'content-type': 'application/json'},
			  body: savedCreature,
			});
	  
			// Store what the service gave us as the creatures
			const creatures = await response.json();
			localStorage.setItem('allCreatures', JSON.stringify(creatures));
		  } catch {
			// If there was an error then just track creatures locally
			this.saveCreatureLocal(savedCreature);
		  }
	}

	saveCreatureLocal(savedCreature) {
		let creatures = [];
		const creaturesText = localStorage.getItem('allCreatures');
		if (creaturesText) {
			creatures = JSON.parse(creaturesText);
			// Check to see if this creature already exists and deletes it if it does
			for (var i = 0; i < creatures.length; i++) {
				if (JSON.parse(creatures[i]).creatureId == this.creatureId) {
					creatures.splice(i, 1);
					break;
				}
			}
		}
		creatures.push(savedCreature);
		localStorage.setItem('allCreatures', JSON.stringify(creatures));
		// console.log(JSON.stringify(creatures));
	}

	updateCreature() {
		this.overallAdjustment = document.querySelector('input[name="creatureAdjust"]:checked').value;
		this.name = document.getElementById("name").value;
		this.level = document.getElementById("typeNumber").value;
		this.alignment = document.getElementById("alignment").value;
		this.size = document.getElementById("size").value;
		this.speed = document.getElementById("speedInput").value;
		this.strength = document.getElementById("abilityStr").value;
		this.dexterity = document.getElementById("abilityDex").value;
		this.constitution = document.getElementById("abilityCon").value;
		this.intelligence = document.getElementById("abilityInt").value;
		this.wisdom = document.getElementById("abilityWis").value;
		this.charisma = document.getElementById("abilityCha").value;
		this.health = document.getElementById("health").value;
		this.armorClass = document.getElementById("armorClass").value;
		this.perception = document.getElementById("perception").value;
		this.fortitude = document.getElementById("fortitude").value;
		this.reflex = document.getElementById("reflex").value;
		this.will = document.getElementById("will").value;
		this.strengthAdjustment = document.getElementById("strScaling").value;
		this.dexterityAdjustment = document.getElementById("dexScaling").value;
		this.constitutionAdjustment = document.getElementById("conScaling").value;
		this.intelligenceAdjustment = document.getElementById("intScaling").value;
		this.wisdomAdjustment = document.getElementById("wisScaling").value;
		this.charismaAdjustment = document.getElementById("chaScaling").value;
		this.healthAdjustment = document.getElementById("healthScaling").value;
		this.armorClassAdjustment = document.getElementById("acScaling").value;
		this.perceptionAdjustment = document.getElementById("percepScaling").value;
		this.fortitudeAdjustment = document.getElementById("fortScaling").value;
		this.reflexAdjustment = document.getElementById("refScaling").value;
		this.willAdjustment = document.getElementById("willScaling").value;
		this.inventory = document.getElementById("inventory").value;
		this.notes = document.getElementById("notes").value;
		this.updateArrays();
		return this;
	}

	updateArrays() {
		this.updateTraits();
		this.updateLanguages();
		this.updateWeaknesses()
		this.updateImmunities();
		this.updateResistances();
		this.updateSkills();
		this.updateActions();
	}

	updateTraits() {
		this.otherTraits = [];
		const traitsList = document.getElementById("traits-list");
		const traitInputs = traitsList.querySelectorAll("li");
		Array.from(traitInputs).forEach((li) => {
			const input = li.querySelector("input[type='text']");
			this.otherTraits.push(input.value);
		});
	}

	updateLanguages() {
		this.languages = [];
		const languagesList = document.getElementById("languages-list");
		const languageInputs = languagesList.querySelectorAll("li");
		Array.from(languageInputs).forEach((li) => {
			const input = li.querySelector("input[type='text']");
			this.languages.push(input.value);
		});
	}

	updateWeaknesses() {
		this.weaknesses = [];
		const weaknessList = document.getElementById("weaknesses-list");
		const weaknessInputs = weaknessList.querySelectorAll("li");
		Array.from(weaknessInputs).forEach((li) => {
			const input = li.querySelector("input[type='text']");
			this.weaknesses.push(input.value);
		});
	}

	updateImmunities() {
		this.immunities = [];
		const immunitiesList = document.getElementById("immunities-list");
		const immunityInputs = immunitiesList.querySelectorAll("li");
		Array.from(immunityInputs).forEach((li) => {
			const input = li.querySelector("input[type='text']");
			this.immunities.push(input.value);
		});
	}

	updateResistances() {
		this.resistances = [];
		const resistancesList = document.getElementById("resistances-list");
		const resistanceInputs = resistancesList.querySelectorAll("li");
		Array.from(resistanceInputs).forEach((li) => {
			const input = li.querySelector("input[type='text']");
			this.resistances.push(input.value);
		});
	}

	updateSkills() {
		this.skills = [];
		const skillsList = document.getElementById("resistances-list");
		const skillInputs = skillsList.querySelectorAll("li");
		Array.from(skillInputs).forEach((li) => {
			const input = li.querySelector("input[type='text']");
			this.skills.push(input.value);
		});
	}

	updateActions() {
		this.actions = [];
		const actionsList = document.getElementById("resistances-list");
		const actionInputs = actionsList.querySelectorAll("li");
		Array.from(actionInputs).forEach((li) => {
			const input = li.querySelector("input[type='text']");
			this.actions.push(input.value);
		});
	}

	loadArrays(loadedCreature) {
		this.otherTraits = loadedCreature.otherTraits || [];
		this.languages = loadedCreature.languages || [];
		this.weaknesses = loadedCreature.weaknesses || [];
		this.immunities = loadedCreature.immunities || [];
		this.resistances = loadedCreature.resistances || [];
		this.skills = loadedCreature.skills || [];
		this.actions = loadedCreature.actions || [];
	}

	reflectArrays() {
		this.reflectTraits();
		this.reflectLanguages();
		this.reflectWeaknesses();
		this.reflectImmunities();
		this.reflectResistances();
		this.reflectSkills();
		this.reflectActions();
	}

	reflectTraits() {
		const ul = document.getElementById("traits-list");
		if (ul !== null) {
			ul.removeChild(ul.lastElementChild);
			this.otherTraits.forEach(function (item) {
				const li = document.createElement("li");
				const input = document.createElement("input");
				input.type = "text";
				input.placeholder = "New Trait";
				input.value = item;
				li.appendChild(input);
				ul.appendChild(li);
			})
		}
	}

	reflectLanguages() {
		const ul = document.getElementById("languages-list");
		if (ul !== null) {
			ul.removeChild(ul.lastElementChild);
			this.languages.forEach(function (item) {
				const li = document.createElement("li");
				const input = document.createElement("input");
				input.type = "text";
				input.placeholder = "New Language";
				input.value = item;
				li.appendChild(input);
				ul.appendChild(li);
			})
		}
	}

	reflectWeaknesses() {
		const ul = document.getElementById("weaknesses-list");
		if (ul !== null) {
			ul.removeChild(ul.lastElementChild);
			this.weaknesses.forEach(function (item) {
				const li = document.createElement("li");
				const input = document.createElement("input");
				input.type = "text";
				input.placeholder = "New Weakness";
				input.value = item;
				li.appendChild(input);
				ul.appendChild(li);
			})
		}
	}

	reflectImmunities() {
		const ul = document.getElementById("immunities-list");
		if (ul !== null) {
			ul.removeChild(ul.lastElementChild);
			this.immunities.forEach(function (item) {
				const li = document.createElement("li");
				const input = document.createElement("input");
				input.type = "text";
				input.value = item;
				input.placeholder = "New Immunity";
				li.appendChild(input);
				ul.appendChild(li);
			})
		}
	}

	reflectResistances() {
		const ul = document.getElementById("resistances-list");
		if (ul !== null) {
			ul.removeChild(ul.lastElementChild);
			this.resistances.forEach(function (item) {
				const li = document.createElement("li");
				const input = document.createElement("input");
				input.type = "text";
				input.placeholder = "New Resistance";
				input.value = item;
				li.appendChild(input);
				ul.appendChild(li);
			})
		}
	}

	reflectSkills() {
		const ul = document.getElementById("skills-list");
		if (ul !== null) {
			ul.removeChild(ul.lastElementChild);
			this.skills.forEach(function (item) {
				const li = document.createElement("li");
				const input = document.createElement("input");
				input.type = "text";
				input.placeholder = "New Skill";
				input.value = item;
				li.appendChild(input);
				ul.appendChild(li);
			})
		}
	}

	reflectActions() {
		const ul = document.getElementById("actions-list");
		if (ul !== null) {
			ul.removeChild(ul.lastElementChild);
			this.actions.forEach(function (item) {
				const li = document.createElement("li");
				const input = document.createElement("input");
				input.type = "text";
				input.placeholder = "New Action";
				input.value = item;
				li.appendChild(input);
				ul.appendChild(li);
			})
		}
	}

}

const createCreature = () => {
	if (localStorage.getItem("loadCreature") !== "new") {
		const creatureObj = new Creature();
		creatureObj.loadCreature(localStorage.getItem("loadCreature"));
		return creatureObj;
	}
	return new Creature();
}

const creature = createCreature();

// Set trait arrays
const newTraitsList = document.getElementById("traits-list");
const newTraitsAdd = document.getElementById("traitsAdd");
const newTraitsMinus = document.getElementById("traitsMinus");

newTraitsAdd.addEventListener("click", function (event) {
	event.preventDefault();
	const listItem = document.createElement("li");
	listItem.classList.add("newTrait");

	const traitInput = document.createElement("input");
	traitInput.type = "text";
	traitInput.placeholder = "New Trait";
	traitInput.classList.add("trait-input");

	listItem.appendChild(traitInput);
	newTraitsList.appendChild(listItem);

	creature.updateTraits();
})

newTraitsMinus.addEventListener("click", function (event) {
	event.preventDefault();
	newTraitsList.removeChild(newTraitsList.lastElementChild);
	creature.otherTraits.pop();
})


// Set Language arrays
const newLanguagesList = document.getElementById("languages-list");
const newLanguagesAdd = document.getElementById("languagesAdd");
const newLanguagesMinus = document.getElementById("languagesMinus");

newLanguagesAdd.addEventListener("click", function (event) {
	event.preventDefault();
	const listItem = document.createElement("li");
	listItem.classList.add("newLanguage");

	const languageInput = document.createElement("input");
	languageInput.type = "text";
	languageInput.placeholder = "New Language";
	languageInput.classList.add("language-input");

	listItem.appendChild(languageInput);
	newLanguagesList.appendChild(listItem);

	creature.updateLanguages();
})

newLanguagesMinus.addEventListener("click", function (event) {
	event.preventDefault();
	newLanguagesList.removeChild(newLanguagesList.lastElementChild);
	creature.languages.pop();
})


// Set Weakness arrays
const newWeaknessesList = document.getElementById("weaknesses-list");
const newWeaknessesAdd = document.getElementById("weaknessAdd");
const newWeaknessesMinus = document.getElementById("weaknessMinus");

newWeaknessesAdd.addEventListener("click", function (event) {
	event.preventDefault();
	const listItem = document.createElement("li");
	listItem.classList.add("newWeakness");

	const weaknessInput = document.createElement("input");
	weaknessInput.type = "text";
	weaknessInput.placeholder = "New Weakness";
	weaknessInput.classList.add("weakness-input");

	listItem.appendChild(weaknessInput);
	newWeaknessesList.appendChild(listItem);

	creature.updateWeaknesses();
})

newWeaknessesMinus.addEventListener("click", function (event) {
	event.preventDefault();
	newWeaknessesList.removeChild(newWeaknessesList.lastElementChild);
	creature.weaknesses.pop();
})


// Set Immunities arrays
const newImmunitiesList = document.getElementById("immunities-list");
const newImmunitiesAdd = document.getElementById("immunityAdd");
const newImmunitiesMinus = document.getElementById("immunityMinus");

newImmunitiesAdd.addEventListener("click", function (event) {
	event.preventDefault();
	const listItem = document.createElement("li");
	listItem.classList.add("newImmunity");

	const input = document.createElement("input");
	input.type = "text";
	input.placeholder = "New Immunity";
	input.classList.add("immunity-input");

	listItem.appendChild(input);
	newImmunitiesList.appendChild(listItem);

	creature.updateImmunities();
})

newImmunitiesMinus.addEventListener("click", function (event) {
	event.preventDefault();
	newImmunitiesList.removeChild(newImmunitiesList.lastElementChild);
	creature.immunities.pop();
})


// Set Resistances arrays
const resistancesList = document.getElementById("resistances-list");
const resistancesAdd = document.getElementById("resistanceAdd");
const resistancesMinus = document.getElementById("resistanceMinus");

resistancesAdd.addEventListener("click", function (event) {
	event.preventDefault();
	const listItem = document.createElement("li");
	listItem.classList.add("newResistance");

	const input = document.createElement("input");
	input.type = "text";
	input.placeholder = "New Resistance";
	input.classList.add("resistance-input");

	listItem.appendChild(input);
	resistancesList.appendChild(listItem);

	creature.updateResistances();
})

resistancesMinus.addEventListener("click", function (event) {
	event.preventDefault();
	resistancesList.removeChild(resistancesList.lastElementChild);
	creature.resistances.pop();
})


// Set Skills arrays
const skillsList = document.getElementById("skills-list");
const skillsAdd = document.getElementById("skillAdd");
const skillsMinus = document.getElementById("skillMinus");

skillsAdd.addEventListener("click", function (event) {
	event.preventDefault();
	const listItem = document.createElement("li");
	listItem.classList.add("newSkill");

	const input = document.createElement("input");
	input.type = "text";
	input.placeholder = "New Skill";
	input.classList.add("skill-input");

	listItem.appendChild(input);
	skillsList.appendChild(listItem);

	creature.updateSkills();
})

skillsMinus.addEventListener("click", function (event) {
	event.preventDefault();
	skillsList.removeChild(skillsList.lastElementChild);
	creature.skills.pop();
})


// Set Actions arrays
const actionsList = document.getElementById("actions-list");
const actionsAdd = document.getElementById("actionAdd");
const actionsMinus = document.getElementById("actionMinus");

actionsAdd.addEventListener("click", function (event) {
	event.preventDefault();
	const listItem = document.createElement("li");
	listItem.classList.add("newAction");

	const input = document.createElement("input");
	input.type = "text";
	input.placeholder = "New Action";
	input.classList.add("action-input");

	listItem.appendChild(input);
	actionsList.appendChild(listItem);

	creature.updateActions();
})

actionsMinus.addEventListener("click", function (event) {
	event.preventDefault();
	actionsList.removeChild(actionsList.lastElementChild);
	creature.actions.pop();
})

function logout() {
	localStorage.removeItem('userName');
	fetch(`/api/auth/logout`, {
	  method: 'delete',
	}).then(() => (window.location.href = 'index.html'));
}