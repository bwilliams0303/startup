class Creature {
	constructor() {
		this.owner = this.getOwnerName();
		this.createdDate = new Date().toLocaleDateString();
		this.creatureId = this.createId();
		this.overallAdjustment = 'normal';
		this.name = '';
		this.level = 0;
		this.alignment = 'neutral';
		this.size = 'medium';
		this.otherTraits = [];
		this.strength = 0;
		this.dexterity = 0;
		this.constitution = 0;
		this.intelligence = 0;
		this.wisdom = 0;
		this.charisma = 0;
		this.health = 15;
		this.armorClass = 15;
		this.perception = 2;
		this.fortitude = 0;
		this.reflex = 0;
		this.will = 0;
		this.weaknesses = [];
		this.immunities = [];
		this.resistances = [];
		this.skills = [];
		this.inventory = '';
		this.notes = '';
		this.strengthAdjustment = 'none';
		this.dexterityAdjustment = 'none';
		this.constitutionAdjustment = 'none';
		this.intelligenceAdjustment = 'none';
		this.wisdomAdjustment = 'none';
		this.charismaAdjustment = 'none';
		this.healthAdjustment = 'none';
		this.armorClassAdjustment = 'none';
		this.perceptionAdjustment = 'none';
		this.fortitudeAdjustment = 'none';
		this.reflexAdjustment = 'none';
		this.willAdjustment = 'none';
	}

	getOwnerName() {
		return localStorage.getItem('userName') || 'Unknown';
	}

	createId() {
		const min = 10000000;
		const max = 99999999;
		const randomID = Math.floor(Math.random() * (max - min + 1)) + min;
		return randomID.toString();
	}

	loadCreature(stringId) {
		const creaturesText = localStorage.getItem('creatures');
		const creatures = JSON.parse(creaturesText);
		for (let i = 0; i < creatures.length; i++) {
			const loadedCreature = creatures[i];
			if (loadedCreature.creatureId === stringId) {
				this.transferData(loadedCreature);
				break;
			}
		}
	}

	transferData(loadedCreature) {
		this.creatureId = loadedCreature.creatureId;
		this.overallAdjustment = loadedCreature.overallAdjustment;
		this.name = loadedCreature.name;
		this.level = loadedCreature.level;
		this.alignment = loadedCreature.alignment;
		this.size = loadedCreature.size;
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
		this.otherTraits = loadedCreature.otherTraits.slice();
		this.weaknesses = loadedCreature.weaknesses.slice();
		this.immunities = loadedCreature.immunities.slice();
		this.resistances = loadedCreature.resistances.slice();
		this.skills = loadedCreature.skills.slice();
		this.inventory = loadedCreature.inventory;
		this.notes = loadedCreature.notes;
	}

	saveCreature() {
		const creaturesText = localStorage.getItem('creatures');
		let creatures = JSON.parse(creaturesText);
		if (!creatures) {
			creatures = [];
		}
		const creatureData = this.getCreatureData();
		creatures.push(creatureData);
		localStorage.setItem('creatures', JSON.stringify(creatures));
		console.log(JSON.stringify(creatures));
	}

	getCreatureData() {
		return {
			creatureId: this.creatureId,
			overallAdjustment: this.overallAdjustment,
			name: this.name,
			level: this.level,
			alignment: this.alignment,
			size: this.size,
			strength: this.strength,
			dexterity: this.dexterity,
			constitution: this.constitution,
			intelligence: this.intelligence,
			wisdom: this.wisdom,
			charisma: this.charisma,
			health: this.health,
			armorClass: this.armorClass,
			perception: this.perception,
			fortitude: this.fortitude,
			reflex: this.reflex,
			will: this.will,
			strengthAdjustment: this.strengthAdjustment,
			dexterityAdjustment: this.dexterityAdjustment,
			constitutionAdjustment: this.constitutionAdjustment,
			intelligenceAdjustment: this.intelligenceAdjustment,
			wisdomAdjustment: this.wisdomAdjustment,
			charismaAdjustment: this.charismaAdjustment,
			healthAdjustment: this.healthAdjustment,
			armorClassAdjustment: this.armorClassAdjustment,
			perceptionAdjustment: this.perceptionAdjustment,
			fortitudeAdjustment: this.fortitudeAdjustment,
			reflexAdjustment: this.reflexAdjustment,
			willAdjustment: this.willAdjustment,
			otherTraits: this.otherTraits.slice(),
			weaknesses: this.weaknesses.slice(),
			immunities: this.immunities.slice(),
			resistances: this.resistances.slice(),
			skills: this.skills.slice(),
			inventory: this.inventory,
			notes: this.notes,
		};
	}

	updateCreature() {
		this.name = document.getElementById('name').value;
		this.level = parseInt(document.getElementById('level').value);
		this.alignment = document.getElementById('alignment').value;
		this.size = document.getElementById('size').value;
		this.strength = parseInt(document.getElementById('strength').value);
		this.dexterity = parseInt(document.getElementById('dexterity').value);
		this.constitution = parseInt(document.getElementById('constitution').value);
		this.intelligence = parseInt(document.getElementById('intelligence').value);
		this.wisdom = parseInt(document.getElementById('wisdom').value);
		this.charisma = parseInt(document.getElementById('charisma').value);
		this.health = parseInt(document.getElementById('health').value);
		this.armorClass = parseInt(document.getElementById('armor-class').value);
		this.perception = parseInt(document.getElementById('perception').value);
		this.fortitude = parseInt(document.getElementById('fortitude').value);
		this.reflex = parseInt(document.getElementById('reflex').value);
		this.will = parseInt(document.getElementById('will').value);
		this.otherTraits = this.getArrayFromInput('other-traits');
		this.weaknesses = this.getArrayFromInput('weaknesses');
		this.immunities = this.getArrayFromInput('immunities');
		this.resistances = this.getArrayFromInput('resistances');
		this.skills = this.getArrayFromInput('skills');
		this.inventory = document.getElementById('inventory').value;
		this.notes = document.getElementById('notes').value;
	}

	getArrayFromInput(inputId) {
		const input = document.getElementById(inputId).value;
		return input.split(',').map((item) => item.trim());
	}
}

const createCreature = () => {
	let creatureObj = new Creature();
	if (localStorage.getItem("loadCreature") !== "new") {
		creatureObj.loadCreature(localStorage.getItem("loadCreature"));
	}
	return creatureObj;
}

const creature = createCreature();
