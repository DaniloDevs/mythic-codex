import { randomUUID } from "node:crypto";
import type { Expertise, ExpertiseKey } from "@/@types/expertises-ordem-paranormal";
import type { ISheetOrdemParanormalRepository } from "@/repository/sheet-ordem-paranormal-repository";
import { CalculateConditionsClass } from "@/utils/calc-conditions-class-ordem-paranormal";
import { createExpertises } from "@/utils/create-expertise-ordem-sheet";
import type {
	SheetOrdemParanormal,
	SheetOrdemParanormalCreateInput,
} from "../../@types/sheet-ordem-paranormal";

interface RequestData {
	sheet: SheetOrdemParanormalCreateInput;
}

interface ResponseData {
	sheet: SheetOrdemParanormal;
}

export class CreateSheetOrdemParanormalService {
	constructor(private ordemParanormalRepositoy: ISheetOrdemParanormalRepository) {}

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

	async execute({ sheet }: RequestData): Promise<ResponseData> {
		const tranformedSheet = this.transformSheet(sheet);

		const sheetOrdemBase = await this.ordemParanormalRepositoy.create(tranformedSheet);

		return {
			sheet: sheetOrdemBase,
		};
	}
}
