import type { CharacterCreateInput } from "@/repository/character-repository";
import type {
	OrdemParanormalInventory,
	OrdemParanormalSheetCreateInput,
} from "@/services/types/ordem-paranormal";

export const characterDataMocks: CharacterCreateInput = {
	userId: "user-01",
	name: "Elara Stormwind",
	age: 27,
	rpgSystem: "Ordem Paranormal",
	description: "A half-elf ranger who roams the forests of the North.",
	avatar: null,
};

export const sheetMocks: OrdemParanormalSheetCreateInput = {
	attributes: {
		strength: 1,
		agility: 2,
		presence: 2,
		vigor: 2,
		intelligence: 2,
	},
	conditions: {
		defense: 15,
		next: 15,
		move: "6m",
	},
	identity: {
		class: "Combatente",
		origin: "Cidade Antiga",
		patent: "Recruta",
	},
	caracteristicas: {
		protections: "Armadura Leve",
		resistances: "Fogo",
		proefficiencies: ["Espadas", "Arcos"],
	},
	expertises: {
		acrobacia: {
			bonus: 2,
			level: "trained",
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

export const inventoryMocks: OrdemParanormalInventory = {
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
