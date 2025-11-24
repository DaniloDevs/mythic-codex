import { faker } from "@faker-js/faker";
import { expertisesAttributes } from "@/@types/expertises-ordem-paranormal";
import {
	ExpertiseRanksEnum,
	elementEnum,
	PatentEnum,
	type SheetOrdemParanormalCreateInput,
	TrailEnum,
} from "@/@types/sheet-ordem-paranormal";

export function createSheetOrdemParanormalMock({
	trail,
}: {
	trail: keyof typeof TrailEnum.enum;
}) {
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

	return {
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
