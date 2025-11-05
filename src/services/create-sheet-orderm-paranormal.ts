import type { Character, CharacterCreateInput } from "@/repository/character-repository";
import { CalculateConditionsClass } from "@/utils/calculate-conditions-class-oap";
import { CalculateExpertisesBonusOap } from "@/utils/calculate-expertises-bonus-oap";
import { CreateCharacterService } from "./create-character";
import type { OrdemParanormalSheetCreateInput } from "./types/ordem-paranomal-create-input";
import type {
	OrdemParanormalInventory,
	OrdemParanormalSheet,
} from "./types/ordem-paranormal-sheet";

interface RequestCreateSheetOrdemParanormal {
	characterData: CharacterCreateInput;
	sheet: OrdemParanormalSheetCreateInput;
	inventory: OrdemParanormalInventory;
}

interface ResponseCreateSheetOrdemParanormal {
	character: Character<OrdemParanormalSheet, OrdemParanormalInventory>;
}

export class CreateSheetOrdemParanormalService extends CreateCharacterService<
	OrdemParanormalSheet,
	OrdemParanormalInventory,
	OrdemParanormalSheetCreateInput
> {
	protected transformSheet(sheet: OrdemParanormalSheetCreateInput): OrdemParanormalSheet {
		const { endeavorPoints, lifePoints, sanity } = CalculateConditionsClass({
			next: sheet.conditions.next,
			characterClass: sheet.identity.class,
			presence: sheet.attributes.presence,
			vigor: sheet.attributes.vigor,
		});

		const skills = CalculateExpertisesBonusOap(sheet).skills;

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
			expertises: skills,
			skills: sheet.skills.map((skill) => {
				return {
					name: skill.name,
					cost: skill.cost,
					description: skill.description,
					page: skill.page,
				};
			}),
		};

		return sheetOp;
	}

	async execute({
		characterData,
		inventory,
		sheet,
	}: RequestCreateSheetOrdemParanormal): Promise<ResponseCreateSheetOrdemParanormal> {
		const character = await super.execute({
			characterData,
			inventory,
			sheet,
		});

		return character;
	}
}
