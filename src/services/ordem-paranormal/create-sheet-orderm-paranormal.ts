import type { Character, CharacterCreateInput } from "@/@types/character";
import { CalculateConditionsClass } from "@/utils/calc-conditions-class-ordem-paranormal";
import { CalculateExpertisesBonusOap } from "@/utils/calc-expertises-bonus-ordem-paranormal";
import type {
	OrdemParanormalInventory,
	OrdemParanormalSheet,
	OrdemParanormalSheetCreateInput,
} from "../../@types/ordem-paranormal-sheet";
import { CreateCharacterService } from "../character/create-character";

interface RequestData {
	characterData: CharacterCreateInput;
	sheet: OrdemParanormalSheetCreateInput; //
	inventory: OrdemParanormalInventory;
}

interface ResponseData {
	character: Character<OrdemParanormalSheet, OrdemParanormalInventory>;
}

export class CreateSheetOrdemParanormalService extends CreateCharacterService<
	OrdemParanormalSheet,
	OrdemParanormalInventory,
	OrdemParanormalSheetCreateInput
> {
	protected transformSheet(sheet: OrdemParanormalSheetCreateInput): OrdemParanormalSheet {
		const { endeavorPoints, lifePoints, sanity } = CalculateConditionsClass({
			next: sheet.status.next,
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
			status: {
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
				defense: sheet.status.defense,
				move: sheet.status.move,
				next: sheet.status.next,
			},
			identity: {
				class: sheet.identity.class,
				origin: sheet.identity.origin,
				patent: sheet.identity.patent,
			},
			characteristics: {
				proficiencies: sheet.characteristics.proficiencies,
				protections: sheet.characteristics.protections,
				resistances: sheet.characteristics.resistances,
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
			rituals: sheet.rituals?.map((ritual) => {
				return {
					name: ritual.name,
					type: ritual.type,
					description: ritual.description,
					circle: ritual.circle,
					execution: ritual.execution,
					range: ritual.range,
					target: ritual.target,
					duration: ritual.duration,
					resistance: ritual.resistance,
				};
			}),
		};

		return sheetOp;
	}

	async execute({ characterData, inventory, sheet }: RequestData): Promise<ResponseData> {
		const character = await super.execute({
			characterData,
			inventory,
			sheet,
		});

		return character;
	}
}
