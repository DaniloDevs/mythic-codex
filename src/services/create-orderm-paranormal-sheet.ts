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

export class CreateOrdemParanormalSheet extends CreateCharacterService<
	OrdemParanormalSheet,
	OrdemParanormalInventory,
	OrdemParanormalSheetCreateInput
> {
	protected transformSheet(sheet: OrdemParanormalSheetCreateInput): OrdemParanormalSheet {
		const level = sheet.conditions.next / 5;

		let endeavorPoints: number;
		let lifePoints: number;
		let sanity: number;

		switch (sheet.identity.class) {
			case "Combatente":
				lifePoints =
					20 + sheet.attributes.vigor + level * 4 + level * sheet.attributes.vigor;

				endeavorPoints =
					2 + sheet.attributes.presence + level * 2 + level * sheet.attributes.presence;

				sanity = 12 + level * 3;

				break;
			case "Especialista":
				lifePoints =
					16 + sheet.attributes.vigor + level * 3 + level * sheet.attributes.vigor;

				endeavorPoints =
					3 + sheet.attributes.presence + level * 3 + level * sheet.attributes.presence;

				sanity = 16 + level * 4;

				break;
			case "Ocultista":
				lifePoints =
					12 + sheet.attributes.vigor + level * 2 + level * sheet.attributes.vigor;

				endeavorPoints =
					4 + sheet.attributes.presence + level * 4 + level * sheet.attributes.presence;

				sanity = 20 + level * 5;

				break;
		}

		const sheetOp: OrdemParanormalSheet = {
			attributes: {
				agility: sheet.attributes.agility,
				intelligence: sheet.attributes.intelligence,
				presence: sheet.attributes.presence,
				strength: sheet.attributes.strength,
				vigor: sheet.attributes.vigor,
			},
			conditions: {
				endeavorPoints: {
					current: endeavorPoints,
					total: endeavorPoints,
				},
				lifePoints: {
					current: lifePoints,
					total: lifePoints,
				},
				sanity: {
					current: sanity,
					total: sanity,
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
					attribute: "agility",
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

		return sheetOp;
	}

	async execute({ characterData, inventory, sheet }: CreateOrdemParanormalSheetResquest) {
		const character = await super.execute({
			characterData,
			inventory,
			sheet,
		});

		return character;
	}
}
