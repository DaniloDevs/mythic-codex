import { randomUUID } from "node:crypto";
import type { Character, CharacterCreateInput } from "@/@types/character";
import type { Expertise, ExpertiseKey } from "@/@types/expertises-ordem-paranormal";
import type { ICharacterRepository } from "@/repository/character-repository";
import type { ISheetOrdemParanormalRepository } from "@/repository/sheet-ordem-paranormal-repository";
import { CalculateConditionsClass } from "@/utils/calc-conditions-class-ordem-paranormal";
import { createExpertises } from "@/utils/create-expertise-ordem-sheet";
import type { InventoryOrdemParanormal, SheetOrdemParanormal, SheetOrdemParanormalCreateInput } from "../../@types/sheet-ordem-paranormal";

interface RequestData {
	characterData: CharacterCreateInput;
	sheet: SheetOrdemParanormalCreateInput;
	inventory: InventoryOrdemParanormal;
}

interface ResponseData {
	character: Character;
	sheet: SheetOrdemParanormal
	inventory: InventoryOrdemParanormal;
}

export class CreateSheetOrdemParanormalService {
	constructor(
		private characterRepository: ICharacterRepository,
		private ordemParanormalRepositoy: ISheetOrdemParanormalRepository,
	) { }

	private transformSheet(
		characterId: string,
		sheet: SheetOrdemParanormalCreateInput,
	): SheetOrdemParanormal {
		const { endeavorPoints, vitality, sanity } = CalculateConditionsClass({
			next: sheet.identity.next,
			trail: sheet.identity.trail,
			presence: sheet.attributes.presence,
			vigor: sheet.attributes.vigor,
		});

		const ordemSheet: SheetOrdemParanormal = {
			id: randomUUID(),
			characterId: characterId,
			updatedAt: new Date(),
			identity: {
				next: sheet.identity.next,
				origem: sheet.identity.origem,
				trail: sheet.identity.trail,
				defense: sheet.identity.defense,
				dash: sheet.identity.dash,
				patent: sheet.identity.patent,
				protections: sheet.identity.protections,
				resistances: sheet.identity.resistances,
			},
			conditions: {
				vitality: {
					total: vitality,
					current: vitality,
				},
				sanity: {
					total: sanity,
					current: sanity,
				},
				endeavorPoints: {
					total: endeavorPoints,
					current: endeavorPoints,
				},
			},
			expertise: Object.entries(sheet.expertise).reduce((acc, [key, value]) => {
				// biome-ignore lint/performance/noAccumulatingSpread: <Erro de complexidade>
				Object.assign(acc, createExpertises(key as ExpertiseKey, value));

				return acc;
			}, {} as Expertise),
			skill: sheet.skill,
			attributes: {
				strength: sheet.attributes.strength,
				intellect: sheet.attributes.intellect,
				presence: sheet.attributes.presence,
				vigor: sheet.attributes.vigor,
				agility: sheet.attributes.agility,
			},
			ritual: sheet.ritual,
		};

		return ordemSheet;
	}

	async execute({ characterData, inventory, sheet }: RequestData): Promise<ResponseData> {
		// validar se o pp e pra ordem
		// validar se ja exist algum pp com as mesmas informações(character e identity )
		// criar o character
		const baseCharacter = await this.characterRepository.create({
			...characterData,
			sheetId: null,
		});

		// transformar dados de entrada em sheet
		const ordemSheetTransformed = this.transformSheet(baseCharacter.id, sheet);

		// criar o ordem sheet
		const ordemSheet = await this.ordemParanormalRepositoy.create(ordemSheetTransformed);
		// conecta character
		await this.characterRepository.create({
			...baseCharacter,
			sheetId: ordemSheet.id,
		});
		// criar o inventory

		// retornar um {character&sheet + inventory}


		return {
			character: baseCharacter,
			sheet: ordemSheet,
			inventory,
		};
	}
}
