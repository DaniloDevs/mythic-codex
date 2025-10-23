import type { CharacterCreateInput } from "@/repository/character-repository";
import type { OrdemParanormalInventory, OrdemParanormalSheet } from "@/services/types/ordem-paranormal";

export const characterDataMocks: CharacterCreateInput = {
	userId: "user-01",
	name: "Elara Stormwind",
	age: 27,
	rpgSystem: "Ordem Paranormal",
	description: "A half-elf ranger who roams the forests of the North.",
	avatar: null,
};

export const sheetMocks: OrdemParanormalSheet = {
	attributes: {
		strength: 5,
		agility: 7,
		presence: 6,
		vigor: 8,
		intelligence: 9,
	},
	conditions: {
		lifePoints: {
			total: 30,
			current: 25,
		},
		endeavorPoints: {
			total: 10,
			current: 7,
		},
		sanity: {
			total: 20,
			current: 18,
		},
		defense: 15,
		next: 5,
		move: "6m",
	},
	identity: {
		class: "Caçador",
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
			attribute: "agility",
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
