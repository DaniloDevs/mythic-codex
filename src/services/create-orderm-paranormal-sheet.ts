import type { CharacterCreateInput } from "@/repository/character-repository";
import { calculatePoints } from "@/utils/calculate-points";
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

		let endeavorPoints: number, lifePoints: number, sanity: number;

		switch (sheet.identity.class) {
			case "Combatente":
				lifePoints = calculatePoints({
					base: 20,
					level,
					multiplier: 4,
					attribute: sheet.attributes.vigor,
				});
				endeavorPoints = calculatePoints({
					base: 2,
					level,
					multiplier: 2,
					attribute: sheet.attributes.presence,
				});
				sanity = calculatePoints({ base: 12, level, multiplier: 3 });

				break;
			case "Especialista":
				lifePoints = calculatePoints({
					base: 16,
					level,
					multiplier: 3,
					attribute: sheet.attributes.vigor,
				});
				endeavorPoints = calculatePoints({
					base: 3,
					level,
					multiplier: 3,
					attribute: sheet.attributes.presence,
				});
				sanity = calculatePoints({ base: 16, level, multiplier: 4 });

				break;
			case "Ocultista":
				lifePoints = calculatePoints({
					base: 12,
					level,
					multiplier: 2,
					attribute: sheet.attributes.vigor,
				});
				endeavorPoints = calculatePoints({
					base: 4,
					level,
					multiplier: 4,
					attribute: sheet.attributes.presence,
				});
				sanity = calculatePoints({ base: 20, level, multiplier: 5 });

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
				}
			},
			skills: sheet.skills.map((exp) => {
				return {
					name: exp.name,
					cost: exp.cost,
					description: exp.description,
					page: exp.page,
				};
			}),
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
