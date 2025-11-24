import { randomUUID } from "node:crypto";
import type { Character, CharacterCreateInput } from "@/@types/character";
import type { Expertise, ExpertiseKey } from "@/@types/expertises-ordem-paranormal";
import type {
	InventoryOrdemParanormal,
	InventoryOrdemParanormalCreateInput,
} from "@/@types/inventory-ordem-paranormal";
import type {
	SheetOrdemParanormal,
	SheetOrdemParanormalCreateInput,
} from "@/@types/sheet-ordem-paranormal";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import type { ICharacterRepository } from "@/repository/character-repository";
import type { IInventoryRepository } from "@/repository/inventory-repository";
import type { ISheetOrdemParanormalRepository } from "@/repository/sheet-ordem-paranormal-repository";
import type { IUserRepository } from "@/repository/user-repository";
import { CalculateConditionsClass } from "@/utils/calc-conditions-class-ordem-paranormal";
import { createExpertises } from "@/utils/create-expertise-ordem-sheet";

interface RequestData {
	userId: string;
	characterData: CharacterCreateInput;
	sheetData: SheetOrdemParanormalCreateInput;
	inventoryData: InventoryOrdemParanormalCreateInput;
}

interface ResponseData {
	character: Character;
	sheet: SheetOrdemParanormal;
	inventory: InventoryOrdemParanormal;
}

export class CreateCharacterOrdemService {
	constructor(
		private userRepository: IUserRepository,
		private characterRepository: ICharacterRepository,
		private inventoryRepository: IInventoryRepository<InventoryOrdemParanormal>,
		private sheetRepository: ISheetOrdemParanormalRepository,
	) {}

	async execute({
		userId,
		characterData,
		sheetData,
		inventoryData,
	}: RequestData): Promise<ResponseData> {
		// Valida o userId
		const existuUser = await this.userRepository.getById(userId);

		if (!existuUser) throw new ResourceNotFoundError("User non exist!");

		// Cria Character
		const character = await this.characterRepository.create(characterData);

		// Converte os dados de entrada da ficha na sua versão completa(calcs e logicas)
		const sheetTransformed = this.transformSheet({
			sheet: sheetData,
			characterId: character.id,
		});

		const sheet = await this.sheetRepository.create(sheetTransformed);

		// cria inventario
		const inventory = await this.inventoryRepository.create({
			...inventoryData,
			id: randomUUID(),
		});

		// retorna dados
		return {
			character,
			sheet,
			inventory,
		};
	}

	private transformSheet({
		sheet,
		characterId,
	}: {
		sheet: SheetOrdemParanormalCreateInput;
		characterId: string;
	}): SheetOrdemParanormal {
		const { endeavorPoints, vitality, sanity } = CalculateConditionsClass({
			next: sheet.identity.next,
			trail: sheet.identity.trail,
			presence: sheet.attributes.presence,
			vigor: sheet.attributes.vigor,
		});

		const ordemSheet: SheetOrdemParanormal = {
			id: randomUUID(),
			characterId,
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
}
