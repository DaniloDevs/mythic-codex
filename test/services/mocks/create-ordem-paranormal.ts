import type { CharacterCreateInput } from "@/repository/character-repository";
import type { OrdemParanormalSheet } from "@/services/types/ordem-paranormal";

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
	fisicState: {
		vida: {
			total: 30,
			current: 25,
		},
		esforço: {
			total: 10,
			current: 7,
		},
		sanidade: {
			total: 20,
			current: 18,
		},
		defesa: 15,
		next: 5,
		deslocamento: "6m",
	},
	identidade: {
		classe: "Caçador",
		origem: "Cidade Antiga",
		patente: "Novato",
	},
	caracteristicas: {
		proteções: "Armadura Leve",
		resistências: "Fogo",
		proeficiências: ["Espadas", "Arcos"],
	},
	expertises: {
		acrobacia: {
			atributo: "agility",
			bonus: 2,
			nivel: "trained",
		},
	},
	skills: [
		{
			name: "Ataque Rápido",
			custo: 3,
			description: "Um ataque veloz que atinge rapidamente o inimigo. ",
			page: 12,
		},
		{
			name: "Esquiva",
			custo: 2,
			description: "Permite evitar ataques com agilidade.",
			page: 15,
		},
	],
};

export const inventoryMocks = { items: ["Corda", "Tocha"], money: 150 };
