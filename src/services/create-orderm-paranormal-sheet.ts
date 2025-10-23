import type { CharacterCreateInput } from "@/repository/character-repository";
import { CreateCharacterService } from "./create-character";
import type {
	OrdemParanormalInventory,
	OrdemParanormalSheet,
	OrdemParanormalSheetCreateInput,
} from "./types/ordem-paranormal";

interface CreateOrdemParanormalSheetResquest {
	characterData: CharacterCreateInput;
	sheet: OrdemParanormalSheetCreateInput;
	inventory: OrdemParanormalInventory;
}

export class CreateOrdemParanormalSheet extends CreateCharacterService<OrdemParanormalSheet, OrdemParanormalInventory> {
	async execute({characterData, inventory, sheet}: CreateOrdemParanormalSheetResquest) {

		const sheetOP: OrdemParanormalSheet = {
			attributes: {
				agility: sheet.attributes.agility,
				intelligence: sheet.attributes.intelligence,
				presence: sheet.attributes.presence,
				strength: sheet.attributes.strength,
				vigor: sheet.attributes.vigor,
			},
			conditions: {
				endeavorPoints: {
					current: sheet.conditions.endeavorPoints,
					total: sheet.conditions.endeavorPoints,
				},
				lifePoints: {
					current: sheet.conditions.lifePoints,
					total: sheet.conditions.lifePoints,
				},
				sanity: {
					current: sheet.conditions.sanity,
					total: sheet.conditions.sanity,
				},
				defense: sheet.conditions.defense,
				move: sheet.conditions.move,
				next: sheet.conditions.next,
			},
			identity: {
				class: sheet.identity.class,
				origin: sheet.identity.origin,
				patent: sheet.identity.patent,
			},
			caracteristicas: {
				proefficiencies: sheet.caracteristicas.proefficiencies,
				protections: sheet.caracteristicas.protections,
				resistances: sheet.caracteristicas.resistances,
			},
			expertises: {
				acrobacia: {
					attribute: 'agility',
					bonus: sheet.expertises.acrobacia.bonus,
					level: sheet.expertises.acrobacia.level,
				},
			},
			skills: [
				{
					name: sheet.skills[0].name,
					cost: sheet.skills[0].cost,
					description: sheet.skills[0].description,
					page: sheet.skills[0].page,
				},
			],
		};

		const character = await super.execute({
			characterData, inventory, sheet: sheetOP,
		});

		return character;
	}
}


