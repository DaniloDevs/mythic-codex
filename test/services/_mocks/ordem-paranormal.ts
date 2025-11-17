import { faker } from "@faker-js/faker";
import type { CharacterCreateInput } from "@/@types/character";
import { expertisesAttributes } from "@/@types/expertises-ordem-paranormal";
import {
	ExpertiseRanksEnum,
	elementEnum,
	type InventoryOrdemParanormal,
	PatentEnum,
	type SheetOrdemParanormalCreateInput,
	TrailEnum,
} from "@/@types/sheet-ordem-paranormal";

export function createSheetOrdemParanormalMock({
	userId,
	trail,
	sheetId,
}: {
	userId: string;
	trail: keyof typeof TrailEnum.enum;
	sheetId: string;
}) {
	const characterDataMocks: CharacterCreateInput = {
		userId,
		sheetId,
		name: faker.person.firstName(),
		rpgSystem: "Ordem Paranormal",
		age: faker.number.int({ max: 60, min: 10 }),
		description: faker.person.bio(),
		avatar: faker.image.avatar(),
	};

	const sheetMocks: SheetOrdemParanormalCreateInput = {
		characterId: "",
		attributes: {
			strength: faker.number.int(5),
			agility: faker.number.int(5),
			presence: faker.number.int(5),
			vigor: faker.number.int(5),
			intellect: faker.number.int(5),
		},
		identity: {
			trail: TrailEnum.parse(trail),
			origem: faker.location.city(),
			patent: faker.helpers.arrayElement(PatentEnum.options),
			next: faker.number.int({ min: 0, max: 100 }),
			defense: "",
			dash: faker.date.weekday(),
			protections: [faker.book.publisher()],
			resistances: [faker.book.publisher()],
		},
		expertise: generateMockExpertises(),
		skill: [
			{
				name: faker.commerce.productName(),
				description: faker.commerce.productDescription(),
				cost: "",
				sale: "",
			},
		],
		ritual: [
			{
				name: faker.commerce.productName(),
				element: faker.helpers.arrayElement(elementEnum.options),
				circle: faker.helpers.arrayElement(["1", "2", "3", "4"]),
				execution: faker.book.publisher(),
				target: faker.book.publisher(),
				duration: faker.book.publisher(),
				resistance: faker.book.publisher(),
			},
		],
	};

	const inventoryMocks: InventoryOrdemParanormal = {
		itemLimit: {
			one: faker.number.int(5),
			two: faker.number.int(5),
			three: faker.number.int(5),
			four: faker.number.int(5),
		},
		creditLimit: "",
		maximumLoad: "",
		items: [
			{
				name: faker.commerce.productName(),
				category: "",
				space: faker.person.lastName(),
			},
		],
	};

	return {
		characterDataMocks,
		inventoryMocks,
		sheetMocks,
	};
}

function generateMockExpertises() {
	return Object.keys(expertisesAttributes).reduce((acc, key) => {
		acc[key as keyof typeof expertisesAttributes] = {
			extraBonus: faker.number.int({ min: 0, max: 5 }),
			level: faker.helpers.arrayElement(ExpertiseRanksEnum.options),
		};
		return acc;
	}, {} as any);
}
