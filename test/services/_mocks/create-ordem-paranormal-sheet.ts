import { CharacterCreateInput } from "@/@types/character";
import type {
	OrdemParanormalInventory,
	OrdemParanormalSheetCreateInput,
} from "@/@types/ordem-paranormal-sheet";

export function createSheetOrdemParanormalMock({
	characterClass,
}: {
	characterClass: "Combatente" | "Especialista" | "Ocultista";
}) {
	const sheetMocks: OrdemParanormalSheetCreateInput = {
		attributes: {
			strength: 1,
			agility: 2,
			presence: 2,
			vigor: 2,
			intelligence: 2,
		},
		status: {
			defense: 15,
			next: 15,
			move: "6m",
		},
		identity: {
			class: characterClass,
			origin: "Cidade Antiga",
			patent: "Recruta",
		},
		characteristics: {
			protections: "Armadura Leve",
			resistances: "Fogo",
			proficiencies: ["Espadas", "Arcos"],
		},
		expertises: {
			acrobatics: {
				extraBonus: 0,
				level: "Untrained",
			},
			animalHandling: {
				extraBonus: 0,
				level: "Trained",
			},
			arts: {
				extraBonus: 0,
				level: "Veteran",
			},
			athletics: {
				extraBonus: 0,
				level: "Expert",
			},
			currentAffairs: {
				extraBonus: 0,
				level: "Untrained",
			},
			science: {
				extraBonus: 0,
				level: "Untrained",
			},
			crime: {
				extraBonus: 0,
				level: "Untrained",
			},
			diplomacy: {
				extraBonus: 0,
				level: "Untrained",
			},
			deception: {
				extraBonus: 0,
				level: "Untrained",
			},
			fortitude: {
				extraBonus: 0,
				level: "Untrained",
			},
			stealth: {
				extraBonus: 0,
				level: "Untrained",
			},
			initiative: {
				extraBonus: 0,
				level: "Untrained",
			},
			intimidation: {
				extraBonus: 0,
				level: "Untrained",
			},
			intuition: {
				extraBonus: 0,
				level: "Untrained",
			},
			investigation: {
				extraBonus: 0,
				level: "Untrained",
			},
			fighting: {
				extraBonus: 0,
				level: "Untrained",
			},
			medicine: {
				extraBonus: 0,
				level: "Untrained",
			},
			occultism: {
				extraBonus: 0,
				level: "Untrained",
			},
			perception: {
				extraBonus: 0,
				level: "Untrained",
			},
			piloting: {
				extraBonus: 0,
				level: "Untrained",
			},
			marksmanship: {
				extraBonus: 0,
				level: "Untrained",
			},
			profession: {
				extraBonus: 0,
				level: "Untrained",
			},
			reflexes: {
				extraBonus: 0,
				level: "Untrained",
			},
			religion: {
				extraBonus: 0,
				level: "Untrained",
			},
			survival: {
				extraBonus: 0,
				level: "Untrained",
			},
			tactics: {
				extraBonus: 0,
				level: "Untrained",
			},
			technology: {
				extraBonus: 0,
				level: "Untrained",
			},
			will: {
				extraBonus: 0,
				level: "Untrained",
			},
		},
		skills: [
			{
				name: "Ataque Rápido",
				cost: 3,
				description: "Um ataque veloz que atinge rapidamente o inimigo. ",
				page: 12,
			},
			{
				name: "Esquiva",
				cost: 2,
				description: "Permite evitar ataques com agilidade.",
				page: 15,
			},
		],
	};

	const characterDataMocks: CharacterCreateInput = {
		userId: "user-01",
		name: "Elara Stormwind",
		age: 27,
		rpgSystem: "Ordem Paranormal",
		description: "A half-elf ranger who roams the forests of the North.",
		avatar: null,
	};
	const inventoryMocks: OrdemParanormalInventory = {
		limitItems: {
			one: 2,
			two: 1,
			three: 0,
			four: 0,
		},
		creditLimit: 1000,
		limitCharge: 5,
		item: [
			{
				name: "Corda",
				category: 1,
				space: "1",
			},
			{
				name: "Tocha",
				category: 1,
				space: "1",
			},
		],
	};

	return {
		characterDataMocks,
		sheetMocks,
		inventoryMocks,
	};
}
