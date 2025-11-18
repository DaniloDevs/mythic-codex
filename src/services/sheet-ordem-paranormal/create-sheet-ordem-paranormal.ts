import { randomUUID } from "node:crypto";
import type { Character, CharacterCreateInput } from "@/@types/character";
import type { Expertise, ExpertiseKey } from "@/@types/expertises-ordem-paranormal";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import type { ICharacterRepository } from "@/repository/character-repository";
import type { IInventoryRepository } from "@/repository/inventory-repository";
import type { ISheetOrdemParanormalRepository } from "@/repository/sheet-ordem-paranormal-repository";
import { CalculateConditionsClass } from "@/utils/calc-conditions-class-ordem-paranormal";
import { createExpertises } from "@/utils/create-expertise-ordem-sheet";
import type {
	InventoryOrdemParanormal,
	SheetOrdemParanormal,
	SheetOrdemParanormalCreateInput,
} from "../../@types/sheet-ordem-paranormal";

interface RequestData {
	characterData: CharacterCreateInput;
	sheet: SheetOrdemParanormalCreateInput;
	inventory: InventoryOrdemParanormal;
}

interface ResponseData {
	character: Character;
	sheet: SheetOrdemParanormal;
	inventory: InventoryOrdemParanormal;
}

export class CreateSheetOrdemParanormalService {
	constructor(
		private characterRepository: ICharacterRepository,
		private ordemParanormalRepositoy: ISheetOrdemParanormalRepository,
		private inventoryParanormalRepositoy: IInventoryRepository<InventoryOrdemParanormal>,
	) {}

	private transformSheet(sheet: SheetOrdemParanormalCreateInput): SheetOrdemParanormal {
		const { endeavorPoints, vitality, sanity } = CalculateConditionsClass({
			next: sheet.identity.next,
			trail: sheet.identity.trail,
			presence: sheet.attributes.presence,
			vigor: sheet.attributes.vigor,
		});

		const ordemSheet: SheetOrdemParanormal = {
			id: randomUUID(),
			characterId: sheet.characterId,
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
		// Valida a ficha
		const tranformedSheet = this.transformSheet(sheet);

		// Cria Ficha e Inventario
		const [sheetOrdemBase, inventoryOrdemBase] = await Promise.all([
			await this.ordemParanormalRepositoy.create(tranformedSheet),
			await this.inventoryParanormalRepositoy.create(inventory),
		]);

		// Cria Personagem
		const character = await this.characterRepository.create({
			...characterData,
			sheetId: sheetOrdemBase.id,
			inventoryId: inventoryOrdemBase.id,
		});

		// Associa Ficha e inventario a um personagem
		const [sheetOrdem, inventoryOrdem] = await Promise.all([
			await this.ordemParanormalRepositoy.updateById(sheetOrdemBase.id, {
				characterId: character.id,
			}),
			await this.inventoryParanormalRepositoy.updateById(inventoryOrdemBase.id, {
				characterId: character.id,
			}),
		]);

		// Validação
		if (!sheetOrdem?.characterId || !inventoryOrdem?.characterId) {
			throw new ResourceNotFoundError();
		}

		return {
			character,
			inventory: inventoryOrdem,
			sheet: sheetOrdem,
		};
	}
}
